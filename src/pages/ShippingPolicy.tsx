import React, { useEffect } from 'react';
import { Truck, Clock, MapPin, Package, Phone, IndianRupee, Mail, Globe, AlertTriangle, CheckCircle, Search, Headphones } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import BackButton from '@/components/BackButton';
import ScrollToTop from '@/components/ScrollToTop';

const ShippingPolicy = () => {
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
              <Truck className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-nunito font-bold text-4xl text-foreground mb-4">
              Shipping Policy
            </h1>
            <h2 className="font-nunito font-semibold text-2xl text-primary mb-4">
              Timely, Safe & Hygienic Deliveries
            </h2>
            <p className="font-inter text-lg text-muted-foreground max-w-3xl mx-auto">
              At Varshini Enterprises, we are committed to ensuring that your sanitary napkins and hygiene products reach you in perfect condition—fresh, safe, and on time.
            </p>
            <p className="font-inter text-sm text-muted-foreground mt-4">
              Last Updated: August 2025
            </p>
          </div>

          {/* Introduction */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <p className="font-inter text-muted-foreground leading-relaxed">
                This Shipping Policy explains how we process, package, and deliver orders, both for retail customers and B2B clients.
              </p>
            </CardContent>
          </Card>

          {/* Content */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>Order Processing Time</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="list-disc list-inside space-y-2 font-inter text-muted-foreground ml-4">
                  <li>Orders are processed within 2–3 business days of payment confirmation.</li>
                  <li>Orders placed on Sundays or public holidays will be processed on the next business day.</li>
                  <li>Large wholesale/B2B orders may require additional time for production and packing, and timelines will be shared in advance.</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>Shipping Destinations & Timelines</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-nunito font-semibold text-foreground mb-3 flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-primary" />
                    Domestic Shipping (India)
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-success/10 rounded-lg">
                      <div className="font-nunito font-bold text-2xl text-success mb-2">3–6 Days</div>
                      <p className="font-inter text-sm text-muted-foreground">Metro Cities</p>
                      <p className="font-inter text-xs text-muted-foreground">After dispatch</p>
                    </div>
                    <div className="text-center p-4 bg-primary/10 rounded-lg">
                      <div className="font-nunito font-bold text-2xl text-primary mb-2">5–10 Days</div>
                      <p className="font-inter text-sm text-muted-foreground">Non-Metro Cities & Rural Areas</p>
                      <p className="font-inter text-xs text-muted-foreground">After dispatch</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-nunito font-semibold text-foreground mb-3 flex items-center">
                    <Globe className="w-4 h-4 mr-2 text-primary" />
                    International Shipping (for B2B/Export clients)
                  </h4>
                  <div className="bg-accent/10 p-4 rounded-lg">
                    <ul className="list-disc list-inside space-y-1 font-inter text-muted-foreground ml-4">
                      <li>Delivery timelines vary by country, customs clearance, and freight provider.</li>
                      <li>Estimated delivery times will be communicated during order confirmation.</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <IndianRupee className="w-5 h-5 text-primary" />
                  <span>Shipping Charges</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="list-disc list-inside space-y-2 font-inter text-muted-foreground ml-4">
                  <li>Charges are calculated based on order value, weight, and location.</li>
                  <li>Shipping costs are displayed during checkout before final payment.</li>
                  <li>Free shipping promotions may apply for select orders or seasonal offers.</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Package className="w-5 h-5 text-primary" />
                  <span>Packaging & Hygiene Assurance</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex items-start space-x-3 p-3 bg-success/10 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Sealed Packaging</p>
                      <p className="text-sm text-muted-foreground">Tamper-proof & moisture-resistant</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-success/10 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Health Protocols</p>
                      <p className="text-sm text-muted-foreground">Strict sanitation compliance</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-success/10 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Bulk Shipping</p>
                      <p className="text-sm text-muted-foreground">Securely palletized/boxed</p>
                    </div>
                  </div>
                </div>
                <p className="font-inter text-muted-foreground">
                  All products are packed in sealed, tamper-proof, and moisture-resistant packaging to maintain hygiene and quality. Orders are handled with strict compliance to health and sanitation protocols. For bulk/wholesale shipments, products are securely palletized or boxed for safe transport.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Search className="w-5 h-5 text-primary" />
                  <span>Tracking Your Order</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="font-inter text-muted-foreground">
                  Once shipped, customers will receive:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="font-inter text-foreground">A tracking number via email or SMS</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="font-inter text-foreground">A tracking link to follow shipment progress</span>
                    </div>
                  </div>
                  <div className="bg-primary/5 p-4 rounded-lg">
                    <p className="font-inter text-primary font-medium text-sm">
                      Tracking updates may take 24–48 hours to reflect after dispatch.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-primary" />
                  <span>Delays & Exceptions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="font-inter text-muted-foreground">
                  While we strive for timely delivery, delays may occur due to:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="list-disc list-inside space-y-2 font-inter text-muted-foreground ml-4">
                    <li>Courier or logistics disruptions</li>
                    <li>Weather conditions or regional restrictions</li>
                  </ul>
                  <ul className="list-disc list-inside space-y-2 font-inter text-muted-foreground ml-4">
                    <li>Customs clearance (for international orders)</li>
                    <li>Peak season demand or unforeseen events</li>
                  </ul>
                </div>
                <div className="bg-accent/10 p-4 rounded-lg">
                  <p className="font-inter text-accent font-medium">
                    In such cases, we will keep you informed and provide revised delivery estimates.
                  </p>
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
                  For any questions or assistance regarding our Shipping Policy, please contact:
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

export default ShippingPolicy;
