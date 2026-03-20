import React, { useEffect } from 'react';
import { RotateCcw, Clock, AlertTriangle, CheckCircle, Phone, XCircle, MapPin, Mail, Package, Headphones } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import BackButton from '@/components/BackButton';
import ScrollToTop from '@/components/ScrollToTop';

const CancellationRefund = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-soft">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <BackButton />
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex p-3 bg-primary/10 rounded-full mb-4">
              <RotateCcw className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-nunito font-bold text-4xl text-foreground mb-4">
              Cancellation & Refund Policy
            </h1>
            <h2 className="font-nunito font-semibold text-2xl text-primary mb-4">
              Fair, Transparent & Hygiene-Focused
            </h2>
            <p className="font-inter text-lg text-muted-foreground max-w-3xl mx-auto">
              At Varshini Enterprises, we are dedicated to delivering high-quality sanitary napkins and hygiene products that meet strict safety and hygiene standards.
            </p>
            <p className="font-inter text-sm text-muted-foreground mt-4">
              Last Updated: August 2025
            </p>
          </div>

          {/* Introduction */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <p className="font-inter text-muted-foreground leading-relaxed">
                Due to the nature of our products, cancellations and refunds must follow clear rules to ensure fairness and maintain hygiene compliance.
              </p>
            </CardContent>
          </Card>

          {/* Content */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <XCircle className="w-5 h-5 text-primary" />
                  <span>Order Cancellations</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-primary/5 p-4 rounded-lg">
                  <p className="font-inter text-primary font-medium mb-2">
                    Cancellation Window: Orders can be cancelled within 2 hours of purchase
                  </p>
                  <p className="font-inter text-sm text-muted-foreground">
                    Provided they have not yet been processed, packed, or dispatched.
                  </p>
                </div>

                <ul className="list-disc list-inside space-y-2 font-inter text-muted-foreground ml-4">
                  <li>Once an order has been shipped or prepared for dispatch, cancellations will no longer be possible.</li>
                  <li>To request cancellation, please provide your Order ID and reason for cancellation via email or phone.</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <RotateCcw className="w-5 h-5 text-primary" />
                  <span>Returns & Replacements</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-destructive/10 p-4 rounded-lg">
                  <p className="font-inter text-destructive font-medium">
                    For health and hygiene reasons, we cannot accept returns of opened or used sanitary products.
                  </p>
                </div>

                <p className="font-inter text-muted-foreground">
                  However, replacements or refunds are available in the following cases:
                </p>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex items-start space-x-3 p-3 bg-success/10 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Transit Damage</p>
                      <p className="text-sm text-muted-foreground">Products damaged in transit</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-success/10 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Wrong Items</p>
                      <p className="text-sm text-muted-foreground">Incorrect items delivered</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-success/10 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Manufacturing Defects</p>
                      <p className="text-sm text-muted-foreground">Verified defects</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-nunito font-semibold text-foreground mb-3">Conditions:</h4>
                  <ul className="list-disc list-inside space-y-2 font-inter text-muted-foreground ml-4">
                    <li>Return requests must be raised within 48 hours of delivery.</li>
                    <li>Products must remain sealed, unused, and in original packaging.</li>
                    <li>Customers must provide photos/videos of the issue for verification.</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-primary" />
                  <span>Non-Returnable Items</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="font-inter text-muted-foreground">
                  The following are not eligible for return or refund:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-destructive/10 rounded-lg">
                      <div className="w-2 h-2 bg-destructive rounded-full"></div>
                      <span className="font-inter text-foreground">Opened or partially used sanitary napkin packs</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-destructive/10 rounded-lg">
                      <div className="w-2 h-2 bg-destructive rounded-full"></div>
                      <span className="font-inter text-foreground">Products damaged due to mishandling after delivery</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-destructive/10 rounded-lg">
                      <div className="w-2 h-2 bg-destructive rounded-full"></div>
                      <span className="font-inter text-foreground">Items returned without prior authorization</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-destructive/10 rounded-lg">
                      <div className="w-2 h-2 bg-destructive rounded-full"></div>
                      <span className="font-inter text-foreground">Bulk/wholesale orders unless a verified defect is confirmed</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>Refunds</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="font-inter text-muted-foreground">
                  Once a return or issue is verified, refunds are initiated within 3–5 business days.
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                      <Clock className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium text-foreground">Processing Time</p>
                        <p className="text-sm text-muted-foreground">3–5 business days after verification</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                      <Package className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium text-foreground">Refund Method</p>
                        <p className="text-sm text-muted-foreground">Original payment method (UPI, card, etc.)</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-accent/10 p-4 rounded-lg">
                    <p className="font-inter text-accent font-medium text-sm mb-2">
                      Bank Processing Time
                    </p>
                    <p className="font-inter text-muted-foreground text-sm">
                      Depending on the bank/payment provider, it may take 5–10 business days for the refund to reflect.
                    </p>
                  </div>
                </div>

                <div className="bg-primary/5 p-4 rounded-lg">
                  <p className="font-inter text-primary font-medium">
                    Alternative Options: Customers may also choose a replacement product or store credit instead of a monetary refund.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Exceptions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="font-inter text-muted-foreground">
                  Refunds or replacements are not provided for:
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                    <span className="font-inter text-foreground">Delays caused by courier/logistics partners beyond our control</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                    <span className="font-inter text-foreground">Incorrect delivery information provided by the customer</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                    <span className="font-inter text-foreground">Natural variations in product packaging due to updates in design or branding</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Phone className="w-5 h-5 text-primary" />
                  <span>Need Help?</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-inter text-muted-foreground mb-6">
                  For any questions or assistance regarding cancellations and refunds, please contact:
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="font-inter text-muted-foreground">No 06, South Canal Bank Road, Mandaveli, Chennai, Tamil Nadu – 600028</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-primary" />
                    <span className="font-inter text-muted-foreground">+91 91762 54234</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-primary" />
                    <span className="font-inter text-muted-foreground">Email: varshinienterprises099@gmail.com</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Headphones className="w-4 h-4 text-primary" />
                    <span className="font-inter text-muted-foreground">Customer Support: contact@varshinienterprises.shop</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="text-center py-8 border-t border-border">
              <p className="font-inter text-sm text-muted-foreground">
                © 2025 Varshini Enterprises. All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
};

export default CancellationRefund;
