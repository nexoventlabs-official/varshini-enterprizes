import React from 'react';
import { Package } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import OrderTracker from '@/components/OrderTracker';
import BackButton from '@/components/BackButton';
import ScrollToTop from '@/components/ScrollToTop';

const Orders = () => {
  return (
    <div className="min-h-screen bg-gradient-soft">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <BackButton />
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="bg-primary/20 text-primary border-primary/30 mb-6">
            <Package className="w-4 h-4 mr-2" />
            Order Management
          </Badge>
          <h1 className="font-nunito font-bold text-4xl text-foreground mb-4">
            Track Your Orders
          </h1>
          <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
            Enter your order ID to track your order status, view details, and manage your purchases.
          </p>
        </div>

        {/* Order Tracker Component */}
        <OrderTracker />
      </div>

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
};

export default Orders;
