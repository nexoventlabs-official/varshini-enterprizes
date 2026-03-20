import React, { useState } from 'react';
import { X, CreditCard, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { PaymentMethod } from '@/contexts/CartContext';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSelect: (method: PaymentMethod) => void;
  total: number;
  itemCount: number;
  customerEmail?: string;
  customerPhone?: string;
  customerId?: string;
}

// Dynamic backend URL detection
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ||
  (typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? 'http://localhost:3000'
    : 'https://varshini-enterprizes.onrender.com');

const PAYTM_SCRIPT = 'https://securegw.paytm.in/paytnx/js/checkout.js';

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  onPaymentSelect,
  total,
  itemCount,
  customerEmail = '',
  customerPhone = '',
  customerId = '',
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  // Load PayTM script globally - Enhanced with better error handling
  const loadPaytmScript = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      console.log('🔍 Checking PayTM script status...');

      // Check if script already loaded and functional
      if (window.Paytm?.CheckoutJS?.invoke) {
        console.log('✅ PayTM script already loaded and ready');
        resolve();
        return;
      }

      // Check if script is already in the DOM
      const existingScript = document.querySelector(`script[src*="checkout.js"]`);
      if (existingScript) {
        console.log('📝 PayTM script already in DOM, waiting for initialization...');
        let attempts = 0;
        const checkInterval = setInterval(() => {
          attempts++;
          if (window.Paytm?.CheckoutJS?.invoke) {
            console.log(`✅ PayTM initialized after ${attempts * 100}ms`);
            clearInterval(checkInterval);
            resolve();
          } else if (attempts > 50) {
            clearInterval(checkInterval);
            console.error('❌ PayTM failed to initialize after 5 seconds');
            reject(new Error('PayTM script loaded but failed to initialize'));
          }
        }, 100);
        return;
      }

      // Create and load script with enhanced error handling
      console.log('📥 Creating new PayTM script tag...');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = PAYTM_SCRIPT;
      script.async = true;
      script.defer = false;

      // DO NOT add crossorigin - script tags don't need CORS headers

      // Timeout after 15 seconds
      const timeoutId = setTimeout(() => {
        console.error('❌ PayTM script load timeout (15s)');
        reject(new Error('PayTM script load timeout'));
      }, 15000);

      script.onload = () => {
        console.log('✅ PayTM script tag onload fired');
        clearTimeout(timeoutId);

        // Wait for Paytm object to be available
        let waitAttempts = 0;
        const waitInterval = setInterval(() => {
          waitAttempts++;
          console.log(`⏳ Waiting for Paytm object... (${waitAttempts})`);

          if (window.Paytm?.CheckoutJS?.invoke) {
            console.log('✅ Paytm.CheckoutJS.invoke is available');
            clearInterval(waitInterval);
            resolve();
          } else if (waitAttempts > 30) {
            clearInterval(waitInterval);
            console.error('❌ Paytm object not available after 3 seconds');
            console.log('Window.Paytm:', window.Paytm);
            console.log('Window.Paytm?.CheckoutJS:', window.Paytm?.CheckoutJS);
            reject(new Error('Paytm object not available after script load'));
          }
        }, 100);
      };

      script.onerror = (error) => {
        console.error('❌ PayTM script load failed:', error);
        clearTimeout(timeoutId);

        // Log detailed error info
        console.error('Script URL:', PAYTM_SCRIPT);
        console.error('Error event:', error);
        console.error('Script element:', script);

        reject(new Error(`Failed to load PayTM script: ${error}`));
      };

      // Handle potential network errors
      script.addEventListener('error', (event) => {
        console.error('❌ Script error event:', event);
      });

      console.log('📍 Appending script to document head...');
      document.head.appendChild(script);
      console.log('✅ Script appended to DOM, waiting for load...');
    });
  };

  const invokePaytmCheckout = async (paymentData: any) => {
    try {
      const txnToken = paymentData.data.txnToken;
      const mid = paymentData.data.mid;
      const orderId = paymentData.data.orderId;
      const amount = paymentData.data.amount;

      if (!txnToken || !mid || !orderId) {
        throw new Error('Missing required payment data: txnToken, mid, or orderId');
      }

      console.log('🔄 Loading PayTM script...');
      await loadPaytmScript();

      console.log('📋 Invoking PayTM checkout with config:', {
        mid,
        orderId,
        amount,
        tokenLength: txnToken.length
      });

      if (!window.Paytm?.CheckoutJS?.invoke) {
        console.error('❌ window.Paytm:', window.Paytm);
        console.error('❌ window.Paytm?.CheckoutJS:', window.Paytm?.CheckoutJS);
        throw new Error('PayTM CheckoutJS.invoke method not available');
      }

      // Define the transaction configuration
      const txn = {
        clientId: mid,
        orderId: orderId,
        token: txnToken,
        tokenType: 'TXN_TOKEN',
        amount: String(amount),
        walletCurrency: 'INR',
        theme: 'new',
        redirectUrl: `${window.location.origin}/order-confirmation?orderId=${orderId}`,
        callback: {
          onSuccess: (response: any) => {
            console.log('✅ Payment success:', response);
            setIsSuccess(true);
            toast({
              title: "Success!",
              description: "Payment processed successfully.",
            });
            setTimeout(() => {
              onClose();
            }, 2000);
          },
          onFailure: (error: any) => {
            console.error('❌ Payment failed:', error);
            toast({
              title: "Payment Failed",
              description: "Transaction was unsuccessful. Please try again.",
              variant: "destructive",
            });
            setIsProcessing(false);
          },
          onCancel: () => {
            console.log('⏸️ Payment cancelled');
            toast({
              title: "Cancelled",
              description: "Payment cancelled. Try again if needed.",
              variant: "destructive",
            });
            setIsProcessing(false);
          }
        }
      };

      console.log('🚀 Calling window.Paytm.CheckoutJS.invoke()...');
      window.Paytm.CheckoutJS.invoke(txn);
    } catch (error) {
      console.error('❌ Checkout error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to open checkout",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  const handlePaytmPayment = async () => {
    setIsProcessing(true);

    try {
      const orderId = `ORDER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const custId = customerId || `CUST_${Date.now()}`;

      console.log('💳 Initiating PayTM payment:', {
        orderId,
        total,
        custId,
        backend: BACKEND_URL
      });

      // Call backend to initiate payment
      const response = await fetch(`${BACKEND_URL}/api/payment/initiate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          amount: total.toFixed(2),
          customerId: custId,
          customerEmail: customerEmail || 'customer@example.com',
          customerPhone: customerPhone || '9876543210'
        }),
      });

      if (!response.ok) {
        throw new Error(`Backend error: ${response.status}`);
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Payment initiation failed');
      }

      if (!data.data?.txnToken) {
        console.error('Backend response:', data);
        throw new Error('No txnToken received from backend');
      }

      console.log('✅ txnToken received:', {
        tokenLength: data.data.txnToken.length
      });

      await invokePaytmCheckout(data);
    } catch (error) {
      console.error('❌ Payment error:', error);
      toast({
        title: "Payment Error",
        description: error instanceof Error ? error.message : "Unable to process payment",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  if (isSuccess) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
            <h3 className="font-nunito font-bold text-xl text-foreground mb-2">
              Payment Successful!
            </h3>
            <p className="text-muted-foreground">
              Your order has been confirmed.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="font-nunito font-bold text-xl text-foreground">
            Complete Payment
          </h2>
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="p-2 hover:bg-muted rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <CardContent className="p-6">
          <div className="bg-secondary rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">
                {itemCount} item{itemCount > 1 ? 's' : ''}
              </span>
              <span className="font-bold text-2xl text-primary">
                ₹{total.toFixed(2)}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              Including taxes and delivery
            </div>
          </div>

          <Button
            onClick={handlePaytmPayment}
            disabled={isProcessing}
            className="w-full h-14 text-lg"
          >
            {isProcessing ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Processing...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <CreditCard className="w-5 h-5" />
                <span>Pay ₹{total.toFixed(2)} with Paytm</span>
              </div>
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center mt-4">
            Secure payment by Paytm. Your data is encrypted.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentModal;
