const express = require('express');
const router = express.Router();
const PaytmChecksum = require('paytmchecksum');
const https = require('https');

const {
  PAYTM_MERCHANT_ID,
  PAYTM_MERCHANT_KEY,
  PAYTM_WEBSITE,
  PAYTM_INDUSTRY_TYPE,
  PAYTM_CHANNEL_ID_WEB,
  PAYTM_CALLBACK_URL,
  PAYTM_TRANSACTION_URL,
  PAYTM_STATUS_URL
} = process.env;

// Decode merchant key if URL encoded (for special characters like #)
const merchantKey = PAYTM_MERCHANT_KEY ? decodeURIComponent(PAYTM_MERCHANT_KEY) : PAYTM_MERCHANT_KEY;

// Validate configuration on startup
if (!PAYTM_MERCHANT_ID || !PAYTM_MERCHANT_KEY) {
  console.error('ERROR: PayTM credentials are missing in .env file');
  process.exit(1);
}

console.log('✓ PayTM Configuration Loaded:');
console.log('  Merchant ID:', PAYTM_MERCHANT_ID);
console.log('  Website:', PAYTM_WEBSITE);
console.log('  Industry Type:', PAYTM_INDUSTRY_TYPE);
console.log('  Callback URL:', PAYTM_CALLBACK_URL);
console.log('  Merchant Key Length:', merchantKey?.length);
console.log('  Merchant Key:', merchantKey ? '****' + merchantKey.slice(-4) : 'MISSING');

// Initiate payment - Proper JS Checkout with txnToken
router.post('/initiate', async (req, res) => {
  try {
    const { orderId, amount, customerId, customerEmail, customerPhone } = req.body;

    // Validate required fields
    if (!orderId || !amount || !customerId) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: orderId, amount, customerId',
        received: { orderId, amount, customerId }
      });
    }

    // Validate amount
    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid amount. Must be a positive number'
      });
    }

    console.log('Payment initiation request:', {
      orderId,
      amount,
      customerId,
      email: customerEmail,
      phone: customerPhone
    });

    // Build payment parameters for PayTM Initiate Transaction API
    const paytmParams = {
      body: {
        requestType: 'Payment',
        mid: PAYTM_MERCHANT_ID,
        websiteName: PAYTM_WEBSITE,
        orderId: String(orderId),
        callbackUrl: PAYTM_CALLBACK_URL,
        txnAmount: {
          value: String(parseFloat(amount).toFixed(2)),
          currency: 'INR'
        },
        userInfo: {
          custId: String(customerId),
          email: customerEmail || 'customer@example.com',
          mobile: customerPhone || '9876543210'
        }
      }
    };

    // Generate checksum for the request
    const checksum = await PaytmChecksum.generateSignature(
      JSON.stringify(paytmParams.body),
      merchantKey
    );

    if (!checksum) {
      throw new Error('Failed to generate checksum');
    }

    paytmParams.head = {
      signature: checksum
    };

    console.log('✓ Initiating PayTM transaction for order:', orderId);

    const paytmResponse = await new Promise((resolve, reject) => {
      const postData = JSON.stringify(paytmParams);

      const options = {
        hostname: 'secure.paytmpayments.com',
        port: 443,
        path: `/theia/api/v1/initiateTransaction?mid=${PAYTM_MERCHANT_ID}&orderId=${orderId}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData)
        },
        timeout: 10000
      };

      const request = https.request(options, (response) => {
        let data = '';
        response.on('data', (chunk) => {
          data += chunk;
        });
        response.on('end', () => {
          try {
            const jsonData = JSON.parse(data);
            resolve(jsonData);
          } catch (err) {
            reject(new Error('Failed to parse PayTM response: ' + err.message));
          }
        });
      });

      request.on('error', (error) => {
        reject(new Error('PayTM API request failed: ' + error.message));
      });

      request.on('timeout', () => {
        request.destroy();
        reject(new Error('PayTM API request timeout'));
      });

      request.write(postData);
      request.end();
    });

    // Check if PayTM API returned success
    if (paytmResponse?.body?.resultInfo?.resultStatus === 'S') {
      const txnToken = paytmResponse.body.txnToken;

      console.log('✓ Transaction token received from PayTM');
      console.log('  Order ID:', orderId);
      console.log('  Amount:', amount);
      console.log('  Token Length:', txnToken?.length);

      res.json({
        success: true,
        data: {
          txnToken: txnToken,
          orderId: orderId,
          amount: amount,
          customerId: customerId,
          mid: PAYTM_MERCHANT_ID,
          website: PAYTM_WEBSITE,
          callbackUrl: PAYTM_CALLBACK_URL
        }
      });
    } else {
      const errorMsg = paytmResponse?.body?.resultInfo?.resultMsg || 'PayTM API error';
      const errorCode = paytmResponse?.body?.resultInfo?.resultCode || 'UNKNOWN';
      console.error('✗ PayTM API error:', { errorCode, errorMsg });
      throw new Error(`PayTM Error: ${errorCode} - ${errorMsg}`);
    }
  } catch (error) {
    console.error('✗ Payment initiation error:', error);
    res.status(500).json({
      success: false,
      message: 'Payment initiation failed',
      error: error.message
    });
  }
});

// Payment callback - Secure verification
router.post('/callback', async (req, res) => {
  try {
    console.log('Payment callback received');

    const paytmChecksum = req.body.CHECKSUMHASH;
    const callbackData = { ...req.body };
    delete callbackData.CHECKSUMHASH;

    console.log('Callback data:', {
      orderId: req.body.ORDERID,
      status: req.body.STATUS,
      txnId: req.body.TXNID,
      responseCode: req.body.RESPCODE
    });

    // Verify checksum
    const isVerified = PaytmChecksum.verifySignature(
      callbackData,
      merchantKey,
      paytmChecksum
    );

    if (!isVerified) {
      console.error('✗ Checksum verification failed');
      const errorUrl = `${process.env.FRONTEND_URL || 'https://varshinienterprises.vercel.app'}/order-confirmation?status=FAILED&error=Invalid%20Checksum`;
      return res.redirect(errorUrl);
    }

    const { ORDERID, TXNID, TXNAMOUNT, STATUS, RESPCODE, RESPMSG } = req.body;

    console.log('✓ Payment verified:', {
      orderId: ORDERID,
      txnId: TXNID,
      status: STATUS,
      responseCode: RESPCODE
    });

    // Determine success based on status code
    const isSuccess = RESPCODE === '01000' || STATUS === 'TXN_SUCCESS';

    // Redirect to frontend with payment status
    const frontendUrl = process.env.FRONTEND_URL || 'https://varshinienterprises.vercel.app';
    const baseUrl = frontendUrl.replace(/\/$/, '');
    const redirectUrl = `${baseUrl}/order-confirmation?orderId=${ORDERID}&status=${STATUS}&txnId=${TXNID}&amount=${TXNAMOUNT}&success=${isSuccess}`;

    console.log('Redirecting to:', redirectUrl.substring(0, 80) + '...');
    res.redirect(redirectUrl);
  } catch (error) {
    console.error('✗ Callback error:', error);
    const errorUrl = `${process.env.FRONTEND_URL || 'https://varshinienterprises.vercel.app'}/order-confirmation?status=ERROR&error=${encodeURIComponent(error.message)}`;
    res.redirect(errorUrl);
  }
});

// Check payment status
router.post('/status', async (req, res) => {
  try {
    const { orderId } = req.body;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: 'Order ID is required'
      });
    }

    console.log('Checking status for order:', orderId);

    const paytmParams = {
      body: {
        mid: PAYTM_MERCHANT_ID,
        orderId: String(orderId),
        requestType: 'Payment'
      }
    };

    const checksum = await PaytmChecksum.generateSignature(
      JSON.stringify(paytmParams.body),
      merchantKey
    );

    paytmParams.head = {
      signature: checksum
    };

    const postData = JSON.stringify(paytmParams);

    const options = {
      hostname: new URL(PAYTM_STATUS_URL).hostname,
      port: 443,
      path: new URL(PAYTM_STATUS_URL).pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': postData.length
      }
    };

    const request = https.request(options, (response) => {
      let data = '';
      response.on('data', (chunk) => {
        data += chunk;
      });
      response.on('end', () => {
        try {
          const statusData = JSON.parse(data);
          console.log('Status check response:', {
            orderId,
            status: statusData.body?.resultInfo?.resultStatus
          });
          res.json({ success: true, data: statusData });
        } catch (err) {
          console.error('Status response parse error:', err);
          res.status(500).json({
            success: false,
            message: 'Failed to parse status response',
            error: err.message
          });
        }
      });
    });

    request.on('error', (error) => {
      console.error('Status check request error:', error);
      res.status(500).json({
        success: false,
        message: 'Status check failed',
        error: error.message
      });
    });

    request.write(postData);
    request.end();
  } catch (error) {
    console.error('Status check error:', error);
    res.status(500).json({
      success: false,
      message: 'Status check failed',
      error: error.message
    });
  }
});

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    success: true,
    status: 'healthy',
    paytmConfigured: !!(PAYTM_MERCHANT_ID && PAYTM_MERCHANT_KEY),
    message: 'Payment API is operational'
  });
});

module.exports = router;
