import React, { useState, useEffect } from 'react';
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
    : 'https://varshini-enterprises-gqnz.onrender.com');

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

  // Load PayTM Checkout Script
  useEffect(() => {
    if (isOpen && !window.Paytm) {
      const script = document.createElement('script');
      script.src = 'https://securegw.paytm.in/paytnx/js/checkout.js';
      script.async = true;
      script.onload = () => {
        console.log('PayTM Checkout script loaded');
      };
      script.onerror = () => {
        console.error('Failed to load PayTM Checkout script');
        toast({
          title: "Error",
          description: "Failed to load payment gateway. Please refresh and try again.",
          variant: "destructive",
        });
      };
      document.head.appendChild(script);
    }
  }, [isOpen, toast]);

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

      if (data.success) {
        console.log('Payment initiation successful, preparing checkout');

        // Use PayTM JS Checkout
        if (window.Paytm && window.Paytm.CheckoutJS) {
          const { paytmParams } = data.data;

          // Initialize checkout
          window.Paytm.CheckoutJS.onSuccess(async (response) => {
            console.log('Payment successful:', response);
            setIsSuccess(true);
            toast({
              title: "Success!",
              description: "Payment processed successfully.",
            });
            setTimeout(() => {
              onClose();
            }, 2000);
          });

          window.Paytm.CheckoutJS.onError((error) => {
            console.error('Payment error:', error);
            toast({
              title: "Payment Failed",
              description: "Transaction was cancelled or failed. Please try again.",
              variant: "destructive",
            });
            setIsProcessing(false);
          });

          // Invoke checkout
          window.Paytm.CheckoutJS.invoke(paytmParams);
        } else {
          // Fallback to form-based redirect if JS library not loaded
          console.log('PayTM JS not available, using form redirect');
          const form = document.createElement('form');
          form.method = 'POST';
          form.action = data.data.transactionUrl;

          const bodyInput = document.createElement('input');
          bodyInput.type = 'hidden';
          bodyInput.name = 'body';
          bodyInput.value = JSON.stringify(data.data.paytmParams.body);
          form.appendChild(bodyInput);

          const headInput = document.createElement('input');
          headInput.type = 'hidden';
          headInput.name = 'head';
          headInput.value = JSON.stringify(data.data.paytmParams.head);
          form.appendChild(headInput);

          document.body.appendChild(form);
          form.submit();
        }
      } else {
        throw new Error(data.message || 'Payment initiation failed');
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
