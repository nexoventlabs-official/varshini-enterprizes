import React, { useState } from 'react';
import { Search, Package, Truck, CheckCircle, X, AlertTriangle, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

interface OrderStatus {
  orderId: string;
  status: 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    image: string;
  }>;
  total: number;
  orderDate: string;
  estimatedDelivery: string;
  shippingAddress: string;
  paymentMethod: string;
  canCancel: boolean;
  trackingNumber?: string;
}

const OrderTracker: React.FC = () => {
  const [searchOrderId, setSearchOrderId] = useState('');
  const [orderDetails, setOrderDetails] = useState<OrderStatus | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const { toast } = useToast();

  // Mock order data - in real app, this would come from API
  const mockOrders: Record<string, OrderStatus> = {
    'VE123456ABC': {
      orderId: 'VE123456ABC',
      status: 'confirmed',
      items: [
        {
          name: 'Ultra Soft Sanitary Napkins - Regular Flow',
          quantity: 2,
          price: 45,
          image: '/api/placeholder/100/100'
        },
        {
          name: 'Organic Cotton Hygiene Pads - Heavy Flow',
          quantity: 1,
          price: 55,
          image: '/api/placeholder/100/100'
        }
      ],
      total: 145,
      orderDate: '2025-01-17',
      estimatedDelivery: '2025-01-20',
      shippingAddress: 'John Doe, 123 Main St, Chennai, Tamil Nadu - 600001',
      paymentMethod: 'UPI Payment',
      canCancel: true,
      trackingNumber: 'TRK789012345'
    }
  };

  const getStatusColor = (status: OrderStatus['status']) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-500';
      case 'processing': return 'bg-yellow-500';
      case 'shipped': return 'bg-purple-500';
      case 'delivered': return 'bg-green-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: OrderStatus['status']) => {
    switch (status) {
      case 'confirmed': return 'Order Confirmed';
      case 'processing': return 'Processing';
      case 'shipped': return 'Shipped';
      case 'delivered': return 'Delivered';
      case 'cancelled': return 'Cancelled';
      default: return 'Unknown';
    }
  };

  const handleSearchOrder = async () => {
    if (!searchOrderId.trim()) {
      toast({
        title: "Please enter Order ID",
        description: "Enter a valid order ID to track your order.",
      });
      return;
    }

    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      const order = mockOrders[searchOrderId.toUpperCase()];
      if (order) {
        setOrderDetails(order);
        toast({
          title: "Order Found!",
          description: `Order ${order.orderId} details loaded.`,
        });
      } else {
        setOrderDetails(null);
        toast({
          title: "Order Not Found",
          description: "Please check your Order ID and try again.",
          variant: "destructive",
        });
      }
      setIsSearching(false);
    }, 1000);
  };

  const handleCancelOrder = async () => {
    if (!orderDetails) return;

    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      const updatedOrder = { ...orderDetails, status: 'cancelled' as const, canCancel: false };
      setOrderDetails(updatedOrder);
      setShowCancelConfirm(false);
      setIsSearching(false);
      
      toast({
        title: "Order Cancelled Successfully",
        description: `Order ${orderDetails.orderId} has been cancelled. Refund will be processed within 3-5 business days.`,
      });
    }, 1000);
  };

  const renderOrderTimeline = () => {
    if (!orderDetails) return null;

    const steps = [
      { key: 'confirmed', label: 'Order Confirmed', icon: CheckCircle },
      { key: 'processing', label: 'Processing', icon: Package },
      { key: 'shipped', label: 'Shipped', icon: Truck },
      { key: 'delivered', label: 'Delivered', icon: CheckCircle },
    ];

    const currentStepIndex = steps.findIndex(step => step.key === orderDetails.status);
    
    if (orderDetails.status === 'cancelled') {
      return (
        <div className="flex items-center justify-center p-4 bg-destructive/10 rounded-lg">
          <X className="w-6 h-6 text-destructive mr-2" />
          <span className="font-medium text-destructive">Order Cancelled</span>
        </div>
      );
    }

    return (
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = index <= currentStepIndex;
          const isCurrent = index === currentStepIndex;
          
          return (
            <div key={step.key} className="flex flex-col items-center flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isCompleted ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
              } ${isCurrent ? 'ring-2 ring-primary ring-offset-2' : ''}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className={`text-xs mt-2 text-center ${
                isCompleted ? 'text-foreground font-medium' : 'text-muted-foreground'
              }`}>
                {step.label}
              </span>
              {index < steps.length - 1 && (
                <div className={`absolute h-0.5 w-full top-5 left-1/2 transform -translate-y-1/2 ${
                  index < currentStepIndex ? 'bg-primary' : 'bg-muted'
                }`} style={{ zIndex: -1 }} />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Search Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="w-5 h-5 text-primary" />
            <span>Track Your Order</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Input
              placeholder="Enter your Order ID (e.g., VE123456ABC)"
              value={searchOrderId}
              onChange={(e) => setSearchOrderId(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleSearchOrder} disabled={isSearching}>
              {isSearching ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Searching...</span>
                </div>
              ) : (
                'Track Order'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Order Details */}
      {orderDetails && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Order Details</CardTitle>
                <p className="text-muted-foreground">Order ID: {orderDetails.orderId}</p>
              </div>
              <Badge className={`${getStatusColor(orderDetails.status)} text-white`}>
                {getStatusText(orderDetails.status)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Order Timeline */}
            <div>
              <h4 className="font-nunito font-semibold mb-4">Order Status</h4>
              <div className="relative">
                {renderOrderTimeline()}
              </div>
            </div>

            <Separator />

            {/* Order Items */}
            <div>
              <h4 className="font-nunito font-semibold mb-4">Items Ordered</h4>
              <div className="space-y-3">
                {orderDetails.items.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-secondary/50 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-semibold">₹{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between items-center mt-4 p-3 bg-primary/10 rounded-lg">
                <span className="font-nunito font-semibold">Total Amount:</span>
                <span className="font-nunito font-bold text-xl text-primary">₹{orderDetails.total}</span>
              </div>
            </div>

            <Separator />

            {/* Order Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-nunito font-semibold mb-3">Order Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Order Date:</span>
                    <span>{new Date(orderDetails.orderDate).toLocaleDateString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Estimated Delivery:</span>
                    <span>{new Date(orderDetails.estimatedDelivery).toLocaleDateString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Payment Method:</span>
                    <span>{orderDetails.paymentMethod}</span>
                  </div>
                  {orderDetails.trackingNumber && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tracking Number:</span>
                      <span className="font-mono">{orderDetails.trackingNumber}</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-nunito font-semibold mb-3">Shipping Address</h4>
                <p className="text-sm text-muted-foreground">
                  {orderDetails.shippingAddress}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            {orderDetails.canCancel && orderDetails.status !== 'cancelled' && (
              <div className="flex space-x-4">
                <Button
                  variant="destructive"
                  onClick={() => setShowCancelConfirm(true)}
                  className="flex-1"
                >
                  Cancel Order
                </Button>
                <Button variant="outline" className="flex-1">
                  <Phone className="w-4 h-4 mr-2" />
                  Contact Support
                </Button>
              </div>
            )}

            {/* Support Information */}
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Need Help?</p>
                  <p className="text-sm text-muted-foreground">
                    Contact our support team at +91 98765 43210 or email varshinienterprises29@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Cancel Confirmation Modal */}
      {showCancelConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-destructive" />
                <span>Cancel Order</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Are you sure you want to cancel order {orderDetails?.orderId}? This action cannot be undone.
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                If you paid online, the refund will be processed within 3-5 business days.
              </p>
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  onClick={() => setShowCancelConfirm(false)}
                  className="flex-1"
                >
                  Keep Order
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleCancelOrder}
                  disabled={isSearching}
                  className="flex-1"
                >
                  {isSearching ? 'Cancelling...' : 'Cancel Order'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default OrderTracker;
