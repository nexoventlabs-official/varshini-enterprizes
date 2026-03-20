import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, Package, Truck, MapPin, CreditCard, Copy, Download, Phone, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import BackButton from '@/components/BackButton';
import ScrollToTop from '@/components/ScrollToTop';
import sanitaryPadsImage from '@/assets/product-sanitary-pads.png';
import hygienePadsImage from '@/assets/product-hygiene-pads.png';

const OrderConfirmation = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [orderDetails, setOrderDetails] = useState<any>(null);

  // Get order ID and payment status from URL parameters
  const orderId = searchParams.get('orderId') || 'VE' + Date.now().toString().slice(-8);
  const paymentStatus = searchParams.get('status');
  const txnId = searchParams.get('txnId');
  const amount = searchParams.get('amount');

  useEffect(() => {
    // In a real app, you would fetch order details from API using orderId
    // For now, we'll use mock data
    const mockOrderDetails = {
      orderId: orderId,
      orderDate: new Date().toISOString().split('T')[0],
      status: paymentStatus === 'TXN_SUCCESS' ? 'confirmed' : 'pending',
      paymentStatus: paymentStatus,
      transactionId: txnId,
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      items: [
        {
          id: '1',
          name: 'Ultra Soft Sanitary Napkins - Regular Flow',
          quantity: 2,
          price: 45,
          image: sanitaryPadsImage
        },
        {
          id: '2',
          name: 'Organic Cotton Hygiene Pads - Heavy Flow',
          quantity: 1,
          price: 55,
          image: hygienePadsImage
        }
      ],
      subtotal: 145,
      shipping: 0,
      total: amount ? parseFloat(amount) : 145,
      paymentMethod: 'Paytm Payment',
      shippingAddress: {
        name: 'John Doe',
        phone: '+91 98765 43210',
        address: '123 Main Street, Anna Nagar',
        city: 'Chennai',
        state: 'Tamil Nadu',
        pincode: '600040'
      },
      trackingNumber: 'TRK' + Date.now().toString().slice(-8)
    };

    setOrderDetails(mockOrderDetails);
  }, [orderId, paymentStatus, txnId, amount]);

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(orderId);
    toast({
      title: "Order ID Copied!",
      description: "Order ID has been copied to clipboard.",
    });
  };

  const handleDownloadInvoice = () => {
    toast({
      title: "Invoice Download",
      description: "Invoice will be sent to your email shortly.",
    });
  };

  if (!orderDetails) {
    return (
      <div className="min-h-screen bg-gradient-soft flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading order details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-soft">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <BackButton />
        </div>

        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className={`w-20 h-20 ${orderDetails.paymentStatus === 'TXN_SUCCESS' ? 'bg-success/10' : 'bg-warning/10'} rounded-full flex items-center justify-center`}>
              <CheckCircle className={`w-12 h-12 ${orderDetails.paymentStatus === 'TXN_SUCCESS' ? 'text-success' : 'text-warning'}`} />
            </div>
          </div>
          <h1 className="font-nunito font-bold text-4xl text-foreground mb-4">
            {orderDetails.paymentStatus === 'TXN_SUCCESS' ? 'Order Confirmed!' : 'Payment Pending'}
          </h1>
          <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
            {orderDetails.paymentStatus === 'TXN_SUCCESS' 
              ? "Thank you for your order. We've received your payment and will start processing your order shortly."
              : "Your order has been placed but payment is pending. Please complete the payment to confirm your order."}
          </p>
          {orderDetails.transactionId && (
            <p className="font-mono text-sm text-muted-foreground mt-2">
              Transaction ID: {orderDetails.transactionId}
            </p>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Order Information</span>
                  <Badge className="bg-success text-success-foreground">
                    {orderDetails.status.charAt(0).toUpperCase() + orderDetails.status.slice(1)}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Order ID:</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono font-semibold">{orderDetails.orderId}</span>
                      <Button variant="ghost" size="sm" onClick={handleCopyOrderId}>
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Order Date:</span>
                    <span className="font-semibold">{new Date(orderDetails.orderDate).toLocaleDateString('en-IN')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Payment Method:</span>
                    <span className="font-semibold">{orderDetails.paymentMethod}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Estimated Delivery:</span>
                    <span className="font-semibold text-primary">{orderDetails.estimatedDelivery}</span>
                  </div>
                </div>

                {orderDetails.trackingNumber && (
                  <div className="bg-primary/5 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Tracking Number</p>
                        <p className="font-mono text-sm text-muted-foreground">{orderDetails.trackingNumber}</p>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link to="/orders">
                          <Package className="w-4 h-4 mr-2" />
                          Track Order
                        </Link>
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orderDetails.items.map((item: any) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 bg-secondary/50 rounded-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-nunito font-semibold text-foreground">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-nunito font-bold text-primary">₹{item.price * item.quantity}</p>
                        <p className="text-sm text-muted-foreground">₹{item.price} each</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span>₹{orderDetails.subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping:</span>
                    <span className={orderDetails.shipping === 0 ? 'text-success' : ''}>
                      {orderDetails.shipping === 0 ? 'FREE' : `₹${orderDetails.shipping}`}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-primary">₹{orderDetails.total}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>Shipping Address</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 text-muted-foreground">
                  <p className="font-semibold text-foreground">{orderDetails.shippingAddress.name}</p>
                  <p>{orderDetails.shippingAddress.phone}</p>
                  <p>{orderDetails.shippingAddress.address}</p>
                  <p>{orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state} - {orderDetails.shippingAddress.pincode}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button onClick={handleDownloadInvoice} className="w-full" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download Invoice
                </Button>
                <Button asChild className="w-full" variant="outline">
                  <Link to="/orders">
                    <Package className="w-4 h-4 mr-2" />
                    Track Your Order
                  </Link>
                </Button>
                <Button asChild className="w-full">
                  <Link to="/products">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Continue Shopping
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Order Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>What's Next?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center mt-0.5">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Order Confirmed</p>
                      <p className="text-sm text-muted-foreground">Your order has been received and confirmed</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center mt-0.5">
                      <Package className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-muted-foreground">Processing</p>
                      <p className="text-sm text-muted-foreground">We're preparing your order for shipment</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center mt-0.5">
                      <Truck className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-muted-foreground">Shipped</p>
                      <p className="text-sm text-muted-foreground">Your order is on its way to you</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  If you have any questions about your order, feel free to contact us.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="w-4 h-4 text-primary" />
                    <span>+91 91762 54234</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Mail className="w-4 h-4 text-primary" />
                    <span>varshinienterprises099@gmail.com</span>
                  </div>
                </div>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link to="/contact">
                    Contact Support
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Cancellation Policy */}
            <Card className="bg-destructive/5 border-destructive/20">
              <CardContent className="p-4">
                <h4 className="font-nunito font-semibold text-foreground mb-2">Cancellation Policy</h4>
                <p className="text-sm text-muted-foreground">
                  You can cancel your order within 2 hours of placing it. After that, please contact our support team for assistance.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
};

export default OrderConfirmation;
