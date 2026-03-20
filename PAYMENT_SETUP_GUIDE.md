# PayTM Payment Integration Setup & Testing Guide

## Overview
This guide covers the complete PayTM JS Checkout integration for Varshini Enterprises.

---

## 1. Configuration Setup ✅

### Backend Configuration (.env)
```
# .env file location: backend/.env
PAYTM_MERCHANT_ID=WtByJK14940032907936
PAYTM_MERCHANT_KEY=L&J4_ezs5LC8T#tA
PAYTM_WEBSITE=DEFAULT
PAYTM_INDUSTRY_TYPE=Retail
PAYTM_CHANNEL_ID_WEB=WEB
PAYTM_CHANNEL_ID_WAP=WAP

# URLs for API communication
PAYTM_CALLBACK_URL=http://localhost:3000/api/payment/callback
# For production: https://your-production-domain.com/api/payment/callback

PAYTM_TRANSACTION_URL=https://securegw.paytm.in/order/process
PAYTM_STATUS_URL=https://securegw.paytm.in/order/status

# Server Port
PORT=3000

# Optional: Frontend URL for callback redirects
FRONTEND_URL=http://localhost:5173
# For production: https://varshinienterprises.vercel.app
```

### Merchant Details
- **Merchant ID**: WtByJK14940032907936
- **Merchant Key**: L&J4_ezs5LC8T#tA
- **Website**: DEFAULT
- **Industry Type**: Retail
- **Channel ID (Web)**: WEB

---

## 2. Backend Setup

### API Endpoints

#### 1. Initiate Payment
**Endpoint**: `POST /api/payment/initiate`

**Request Body**:
```json
{
  "orderId": "ORDER_1234567890",
  "amount": "500.00",
  "customerId": "CUST_USER123",
  "customerEmail": "customer@example.com",
  "customerPhone": "9876543210"
}
```

**Success Response**:
```json
{
  "success": true,
  "data": {
    "paytmParams": {
      "body": {
        "requestType": "Payment",
        "mid": "WtByJK14940032907936",
        "websiteName": "DEFAULT",
        "orderId": "ORDER_1234567890",
        "callbackUrl": "http://localhost:3000/api/payment/callback",
        "txnAmount": {
          "value": "500.00",
          "currency": "INR"
        },
        "userInfo": {
          "custId": "CUST_USER123",
          "email": "customer@example.com",
          "mobile": "9876543210"
        }
      },
      "head": {
        "signature": "GENERATED_CHECKSUM_HERE",
        "channelId": "WEB"
      }
    },
    "transactionUrl": "https://securegw.paytm.in/order/process",
    "orderId": "ORDER_1234567890",
    "merchantId": "WtByJK14940032907936"
  }
}
```

---

## 3. Testing the Integration

### Test 1: Check Backend Health
```bash
curl http://localhost:3000/api/payment/health
```

Expected Response:
```json
{
  "success": true,
  "status": "healthy",
  "paytmConfigured": true
}
```

### Test 2: Test Payment Initiation
```bash
curl -X POST http://localhost:3000/api/payment/initiate \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": "TEST_001",
    "amount": "100.00",
    "customerId": "CUST_001",
    "customerEmail": "test@example.com",
    "customerPhone": "9876543210"
  }'
```

### Test 3: Frontend Payment Flow
1. Navigate to http://localhost:5173
2. Add items to cart
3. Click Checkout
4. Click "Pay with Paytm"
5. Complete payment on PayTM gateway

---

## 4. Production Setup

Update backend/.env:
```
PAYTM_CALLBACK_URL=https://your-backend-domain.com/api/payment/callback
FRONTEND_URL=https://varshinienterprises.vercel.app
```

Add production domain to CORS in backend/server.js

---

## 5. Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Checksum verification failed | Wrong Merchant Key | Verify key in .env exactly matches PayTM dashboard |
| Payment gateway not loading | JS library not loading | Check browser console for script errors |
| Callback not redirecting | URL mismatch | Verify PAYTM_CALLBACK_URL and FRONTEND_URL |
| CORS errors | Frontend not whitelisted | Add domain to CORS origin list in server.js |

---

## 6. Files Modified

✅ `backend/.env` - PayTM credentials and URLs
✅ `backend/server.js` - CORS configuration
✅ `backend/routes/payment.js` - Enhanced payment handling
✅ `src/components/PaymentModal.tsx` - PayTM JS Checkout integration
✅ `src/pages/OrderConfirmation.tsx` - Callback handling

---

Last Updated: 2026-03-20
Status: Ready for Testing & Deployment
