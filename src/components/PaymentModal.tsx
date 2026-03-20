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

  const handlePaytmPayment = async () => {
    setIsProcessing(true);

    try {
      const orderId = `ORDER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const custId = customerId || `CUST_${Date.now()}`;

      console.log('Initiating PayTM payment:', { orderId, total, custId });

      const response = await fetch(`${BACKEND_URL}/api/payment/initiate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          amount: total.toFixed(2),
          customerId: custId,
          customerEmail: customerEmail || 'customer@varshinienterprises.com',
          customerPhone: customerPhone || '9876543210'
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.data.txnToken) {
        console.log('✓ Transaction token received from backend');

        // Load PayTM checkout script if not already loaded
        if (!window.Paytm?.CheckoutJS) {
          const script = document.createElement('script');
          script.src = 'https://securegw.paytm.in/paytnx/js/checkout.js';
          script.async = true;
          script.onload = () => {
            console.log('PayTM script loaded, invoking checkout');
            invokePaytmCheckout(data);
          };
          script.onerror = () => {
            throw new Error('Failed to load PayTM checkout script');
          };
          document.head.appendChild(script);
        } else {
          invokePaytmCheckout(data);
        }
      } else {
        throw new Error(data.message || 'Failed to initiate payment');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Failed",
        description: error instanceof Error ? error.message : "Unable to process payment. Please try again.",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  const invokePaytmCheckout = (data: any) => {
    try {
      const txnToken = data.data.txnToken;
      const mid = data.data.mid;
      const orderId = data.data.orderId;
      const amount = data.data.amount;

      console.log('Invoking PayTM checkout with:', { mid, orderId, amount });

      if (!window.Paytm?.CheckoutJS?.invoke) {
        throw new Error('PayTM CheckoutJS.invoke not available');
      }

      const txn = {
        clientId: mid,
        orderId: orderId,
        token: txnToken,
        tokenType: 'TXN_TOKEN',
        amount: amount.toString(),
        walletCurrency: 'INR',
        theme: 'new',
        redirectUrl: `${window.location.origin}/order-confirmation?orderId=${orderId}`,
        callback: {
          onSuccess: (response: any) => {
            console.log('Payment success callback:', response);
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
            console.error('Payment failure callback:', error);
            toast({
              title: "Payment Failed",
              description: "Transaction was cancelled or failed. Please try again.",
              variant: "destructive",
            });
            setIsProcessing(false);
          },
          onCancel: () => {
            console.log('Payment cancelled by user');
            toast({
              title: "Payment Cancelled",
              description: "You've cancelled the payment. Please try again if you wish to proceed.",
              variant: "destructive",
            });
            setIsProcessing(false);
          }
        }
      };

      window.Paytm.CheckoutJS.invoke(txn);
    } catch (error) {
      console.error('Checkout invoke error:', error);
      toast({
        title: "Checkout Error",
        description: error instanceof Error ? error.message : "Failed to invoke checkout",
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
              Order Placed Successfully!
            </h3>
            <p className="text-muted-foreground">
              Your order will be processed shortly.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="font-nunito font-bold text-xl text-foreground">
            Complete Payment
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors"
            disabled={isProcessing}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <CardContent className="p-6">
          {/* Order Summary */}
          <div className="bg-secondary rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="font-inter text-sm text-muted-foreground">
                {itemCount} item{itemCount > 1 ? 's' : ''}
              </span>
              <span className="font-nunito font-bold text-2xl text-primary">
                ₹{total.toFixed(2)}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              Including all taxes and delivery charges
            </div>
          </div>

          {/* Payment Button */}
          <Button
            onClick={handlePaytmPayment}
            disabled={isProcessing}
            className="w-full h-14 text-lg"
            size="lg"
          >
            {isProcessing ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Processing...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <CreditCard className="w-5 h-5" />
                <span>Pay with Paytm</span>
              </div>
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center mt-4">
            Secure payment powered by Paytm. Your payment information is encrypted and secure.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentModal;
