import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, MapPin, Package, CheckCircle, AlertCircle, Copy, CreditCard, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { PaymentMethod } from '@/contexts/CartContext';

const BACKEND_URL = 'https://varshini-enterprizes.onrender.com';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderComplete: (orderId: string) => void;
  cartItems: any[];
  total: number;
  itemCount: number;
}

interface ShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  landmark: string;
}

interface OrderDetails {
  orderId: string;
  items: any[];
  total: number;
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  estimatedDelivery: string;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onOrderComplete,
  cartItems,
  total,
  itemCount,
}) => {
  const [currentStep, setCurrentStep] = useState<'address' | 'payment' | 'confirmation' | 'success'>('address');
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: '',
    phone: '',
    email: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    landmark: '',
  });
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const paymentMethods = [
    {
      id: 'paytm' as PaymentMethod,
      name: 'Pay with Paytm',
      description: 'Credit/Debit Card, UPI, Net Banking',
      icon: CreditCard,
      popular: true,
    },
    {
      id: 'cash-on-delivery' as PaymentMethod,
      name: 'Cash on Delivery',
      description: 'Pay when your order arrives',
      icon: Package,
      popular: false,
    },
  ];

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
    'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
    'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
    'Uttarakhand', 'West Bengal', 'Delhi'
  ];

  const generateOrderId = () => {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `VE${timestamp.slice(-6)}${random}`;
  };

  const getEstimatedDelivery = () => {
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3); // 3 days from now
    return deliveryDate.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('payment');
  };

  const handlePaymentSelect = (method: PaymentMethod) => {
    setSelectedPaymentMethod(method);
  };

  const handlePaymentConfirm = () => {
    if (!selectedPaymentMethod) return;
    setCurrentStep('confirmation');
  };


  const handleOrderConfirm = async () => {
    setIsProcessing(true);

    // If Paytm payment is selected, initiate payment
    if (selectedPaymentMethod === 'paytm') {
      try {
        const orderId = generateOrderId();
        const customerId = `CUST_${Date.now()}`;
        
        const response = await fetch(`${BACKEND_URL}/api/payment/initiate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            orderId,
            amount: total.toFixed(2),
            customerId,
            customerEmail: shippingAddress.email,
            customerPhone: shippingAddress.phone
          }),
        });

        const data = await response.json();

        if (data.success) {
          // Create form and submit to Paytm
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
      return;
    }

    // For COD, process order normally
    setTimeout(() => {
      const orderId = generateOrderId();
      const order: OrderDetails = {
        orderId,
        items: cartItems,
        total,
        shippingAddress,
        paymentMethod: selectedPaymentMethod!,
        estimatedDelivery: getEstimatedDelivery(),
      };

      setOrderDetails(order);
      setCurrentStep('success');
      setIsProcessing(false);

      toast({
        title: "Order Placed Successfully!",
        description: `Your order ${orderId} has been confirmed.`,
      });

      onOrderComplete(orderId);

      // Redirect to order confirmation page
      setTimeout(() => {
        navigate(`/order-confirmation?orderId=${orderId}`);
      }, 1500);
    }, 2000);
  };

  const handleCopyOrderId = () => {
    if (orderDetails) {
      navigator.clipboard.writeText(orderDetails.orderId);
      toast({
        title: "Order ID Copied!",
        description: "Order ID has been copied to clipboard.",
      });
    }
  };

  const handleInputChange = (field: keyof ShippingAddress, value: string) => {
    setShippingAddress(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Checkout</CardTitle>
              <div className="flex items-center space-x-2 mt-2">
                {['address', 'payment', 'confirmation', 'success'].map((step, index) => (
                  <div key={step} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${currentStep === step || index < ['address', 'payment', 'confirmation', 'success'].indexOf(currentStep)
                      ? 'bg-primary text-white'
                      : 'bg-muted text-muted-foreground'
                      }`}>
                      {index + 1}
                    </div>
                    {index < 3 && <div className="w-8 h-0.5 bg-muted mx-2" />}
                  </div>
                ))}
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <div className="p-6">
          {currentStep === 'address' && (
            <form onSubmit={handleAddressSubmit} className="space-y-6">
              <div>
                <h3 className="font-nunito font-semibold text-lg mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-primary" />
                  Shipping Address
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={shippingAddress.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={shippingAddress.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={shippingAddress.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="addressLine1">Address Line 1 *</Label>
                  <Input
                    id="addressLine1"
                    value={shippingAddress.addressLine1}
                    onChange={(e) => handleInputChange('addressLine1', e.target.value)}
                    placeholder="House/Flat No., Building Name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="addressLine2">Address Line 2</Label>
                  <Input
                    id="addressLine2"
                    value={shippingAddress.addressLine2}
                    onChange={(e) => handleInputChange('addressLine2', e.target.value)}
                    placeholder="Street, Area, Locality"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={shippingAddress.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Select value={shippingAddress.state} onValueChange={(value) => handleInputChange('state', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {indianStates.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="pincode">Pincode *</Label>
                    <Input
                      id="pincode"
                      value={shippingAddress.pincode}
                      onChange={(e) => handleInputChange('pincode', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="landmark">Landmark (Optional)</Label>
                  <Input
                    id="landmark"
                    value={shippingAddress.landmark}
                    onChange={(e) => handleInputChange('landmark', e.target.value)}
                    placeholder="Near famous landmark"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg">
                Continue to Payment
              </Button>
            </form>
          )}

          {currentStep === 'payment' && (
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="w-full max-w-md space-y-3">
                  {paymentMethods.map((method) => {
                    const Icon = method.icon;
                    const isSelected = selectedPaymentMethod === method.id;

                    return (
                      <div
                        key={method.id}
                        onClick={() => handlePaymentSelect(method.id)}
                        className={`relative p-6 border-2 rounded-xl transition-all cursor-pointer hover:shadow-md ${
                          isSelected
                            ? 'border-primary bg-primary/5'
                            : 'border-muted hover:border-primary/50'
                        }`}
                      >
                        {method.popular && (
                          <Badge className="absolute -top-2 -right-2 bg-success">
                            Recommended
                          </Badge>
                        )}
                        <div className="flex items-center space-x-4">
                          <div className={`p-3 rounded-full ${
                            isSelected ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                          }`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <span className="font-nunito font-bold text-lg text-foreground">
                                {method.name}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {method.description}
                            </p>
                          </div>
                          {isSelected && <CheckCircle className="w-6 h-6 text-primary" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>



              <div className="flex space-x-4">
                <Button variant="outline" onClick={() => setCurrentStep('address')} className="flex-1">
                  Back to Address
                </Button>
                <Button
                  onClick={handlePaymentConfirm}
                  disabled={!selectedPaymentMethod}
                  className="flex-1"
                >
                  Continue to Review
                </Button>
              </div>
            </div>
          )}

          {currentStep === 'confirmation' && (
            <div className="space-y-6">
              <h3 className="font-nunito font-semibold text-lg mb-4 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-primary" />
                Order Confirmation
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Order Summary */}
                <div>
                  <h4 className="font-nunito font-semibold mb-3">Order Summary</h4>
                  <Card className="border-0 bg-secondary/50">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex items-center space-x-3">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div className="flex-1">
                              <p className="font-medium text-sm">{item.name}</p>
                              <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                            </div>
                            <p className="font-semibold">₹{item.price * item.quantity}</p>
                          </div>
                        ))}
                        <Separator />
                        <div className="flex justify-between font-bold text-lg">
                          <span>Total:</span>
                          <span className="text-primary">₹{total}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Shipping & Payment Details */}
                <div className="space-y-4">
                  <div>
                    <h4 className="font-nunito font-semibold mb-3">Shipping Address</h4>
                    <Card className="border-0 bg-secondary/50">
                      <CardContent className="p-4">
                        <div className="text-sm space-y-1">
                          <p className="font-medium">{shippingAddress.fullName}</p>
                          <p>{shippingAddress.phone}</p>
                          <p>{shippingAddress.addressLine1}</p>
                          {shippingAddress.addressLine2 && <p>{shippingAddress.addressLine2}</p>}
                          <p>{shippingAddress.city}, {shippingAddress.state} - {shippingAddress.pincode}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <h4 className="font-nunito font-semibold mb-3">Payment Method</h4>
                    <Card className="border-0 bg-secondary/50">
                      <CardContent className="p-4">
                        <p className="font-medium">
                          {paymentMethods.find(m => m.id === selectedPaymentMethod)?.name}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button variant="outline" onClick={() => setCurrentStep('payment')} className="flex-1">
                  Back to Payment
                </Button>
                <Button
                  onClick={handleOrderConfirm}
                  disabled={isProcessing}
                  className="flex-1"
                  size="lg"
                >
                  {isProcessing ? (
                    <div className="flex items-center space-x-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Processing...</span>
                    </div>
                  ) : selectedPaymentMethod === 'paytm' ? (
                    'Proceed to Payment'
                  ) : (
                    'Confirm Order'
                  )}
                </Button>
              </div>
            </div>
          )}

          {currentStep === 'success' && orderDetails && (
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <CheckCircle className="w-16 h-16 text-success" />
              </div>

              <div>
                <h3 className="font-nunito font-bold text-2xl text-foreground mb-2">
                  Order Placed Successfully!
                </h3>
                <p className="text-muted-foreground">
                  Thank you for your order. We'll send you a confirmation email shortly.
                </p>
              </div>

              <Card className="border-0 bg-success/10">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-center space-x-2">
                      <span className="font-nunito font-semibold text-lg">Order ID:</span>
                      <span className="font-mono font-bold text-xl text-primary">
                        {orderDetails.orderId}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleCopyOrderId}
                        className="ml-2"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="text-sm text-muted-foreground">
                      <p>Estimated Delivery: <strong>{orderDetails.estimatedDelivery}</strong></p>
                      <p>Payment Method: <strong>{paymentMethods.find(m => m.id === orderDetails.paymentMethod)?.name}</strong></p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-muted p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-primary mt-0.5" />
                  <div className="text-left">
                    <p className="font-medium text-foreground">Order Cancellation</p>
                    <p className="text-sm text-muted-foreground">
                      You can cancel your order within 2 hours of placing it. Contact us at +91 98765 43210 or use Order ID for reference.
                    </p>
                  </div>
                </div>
              </div>

              <Button onClick={onClose} size="lg" className="w-full">
                Continue Shopping
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default CheckoutModal;
