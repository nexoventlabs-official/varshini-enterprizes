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

const PAYTM_MID = 'WtByJK14940032907936';
const PAYTM_HOST = 'https://secure.paytmpayments.com';
const PAYTM_SCRIPT = `${PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${PAYTM_MID}.js`;

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

  const loadPaytmScript = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (window.Paytm && window.Paytm.CheckoutJS) {
        resolve();
        return;
      }

      const existingScript = document.querySelector(`script[src*="merchantpgpui/checkoutjs"]`);
      if (existingScript) {
        let attempts = 0;
        const checkInterval = setInterval(() => {
          attempts++;
          if (window.Paytm && window.Paytm.CheckoutJS) {
            clearInterval(checkInterval);
            resolve();
          } else if (attempts > 100) {
            clearInterval(checkInterval);
            reject(new Error('PayTM script loaded but CheckoutJS not available'));
          }
        }, 100);
        return;
      }

      const script = document.createElement('script');
      script.type = 'application/javascript';
      script.src = PAYTM_SCRIPT;
      script.crossOrigin = 'anonymous';

      const timeoutId = setTimeout(() => {
        reject(new Error('PayTM script load timeout'));
      }, 20000);

      script.onload = () => {
        clearTimeout(timeoutId);
        let waitAttempts = 0;
        const waitInterval = setInterval(() => {
          waitAttempts++;
          if (window.Paytm && window.Paytm.CheckoutJS) {
            clearInterval(waitInterval);
            resolve();
          } else if (waitAttempts > 50) {
            clearInterval(waitInterval);
            reject(new Error('Paytm CheckoutJS not available after script load'));
          }
        }, 100);
      };

      script.onerror = () => {
        clearTimeout(timeoutId);
        reject(new Error(`Failed to load PayTM script from ${PAYTM_SCRIPT}`));
      };

      document.head.appendChild(script);
    });
  };

  const invokePaytmCheckout = async (paymentData: any) => {
    try {
      const txnToken = paymentData.data.txnToken;
      const orderId = paymentData.data.orderId;
      const amount = paymentData.data.amount;

      if (!txnToken || !orderId) {
        throw new Error('Missing required payment data: txnToken or orderId');
      }

      await loadPaytmScript();

      if (!window.Paytm || !window.Paytm.CheckoutJS) {
        throw new Error('PayTM CheckoutJS not available after script load');
      }

      const config = {
        root: '',
        flow: 'DEFAULT',
        data: {
          orderId: orderId,
          token: txnToken,
          tokenType: 'TXN_TOKEN',
          amount: String(parseFloat(amount).toFixed(2)),
        },
        handler: {
          notifyMerchant: (eventName: string, eventData: any) => {
            console.log('notifyMerchant:', eventName, eventData);
            if (eventName === 'APP_CLOSED') {
              setIsProcessing(false);
            }
          },
          transactionStatus: (paymentStatus: any) => {
            console.log('Payment status:', paymentStatus);
            if (paymentStatus.STATUS === 'TXN_SUCCESS') {
              setIsSuccess(true);
              toast({
                title: "Success!",
                description: "Payment processed successfully.",
              });
              setTimeout(() => {
                onClose();
              }, 2000);
            } else {
              toast({
                title: "Payment Failed",
                description: paymentStatus.RESPMSG || 'Transaction was unsuccessful.',
                variant: "destructive",
              });
              setIsProcessing(false);
            }
          },
        },
      };

      window.Paytm.CheckoutJS.onLoad(function () {
        window.Paytm.CheckoutJS.init(config)
          .then(function () {
            window.Paytm.CheckoutJS.invoke();
          })
          .catch(function (error: any) {
            console.error('Paytm init error:', error);
            toast({
              title: "Payment Error",
              description: "Failed to initialize payment gateway.",
              variant: "destructive",
            });
            setIsProcessing(false);
          });
      });
    } catch (error) {
      console.error('Checkout error:', error);
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
