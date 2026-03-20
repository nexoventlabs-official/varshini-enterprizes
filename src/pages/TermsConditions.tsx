import React, { useEffect } from 'react';
import { FileText, ShoppingCart, AlertTriangle, Scale, Phone, MapPin, Mail, CreditCard, Truck, RotateCcw, Shield, Gavel, Headphones } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import BackButton from '@/components/BackButton';
import ScrollToTop from '@/components/ScrollToTop';

const TermsConditions = () => {
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
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-nunito font-bold text-4xl text-foreground mb-4">
              Terms & Conditions
            </h1>
            <p className="font-inter text-lg text-muted-foreground max-w-3xl mx-auto">
              Welcome to Varshini Enterprises. By accessing our website, placing an order, or engaging in business with us, you agree to abide by the following Terms & Conditions.
            </p>
            <p className="font-inter text-sm text-muted-foreground mt-4">
              Last Updated: August 2025
            </p>
          </div>

          {/* Introduction */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <p className="font-inter text-muted-foreground leading-relaxed">
                These terms govern the use of our site, purchases, and services. Please read them carefully before proceeding.
              </p>
            </CardContent>
          </Card>

          {/* Content */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Scale className="w-5 h-5 text-primary" />
                  <span>1. General Use of Website & Services</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="list-disc list-inside space-y-2 font-inter text-muted-foreground ml-4">
                  <li>You must be at least 18 years old or using our services under the supervision of a parent/guardian.</li>
                  <li>You agree to use our website and services only for lawful purposes.</li>
                  <li>Varshini Enterprises reserves the right to restrict or terminate access in cases of misuse or fraudulent activity.</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ShoppingCart className="w-5 h-5 text-primary" />
                  <span>2. Products & Descriptions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="list-disc list-inside space-y-2 font-inter text-muted-foreground ml-4">
                  <li>We specialize in sanitary napkins and hygiene products.</li>
                  <li>While we strive to ensure accuracy in product descriptions, slight variations in packaging, design, or appearance may occur.</li>
                  <li>All products are manufactured under strict hygiene and quality standards.</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="w-5 h-5 text-primary" />
                  <span>3. Pricing & Payments</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="list-disc list-inside space-y-2 font-inter text-muted-foreground ml-4">
                  <li>Prices are listed in Indian Rupees (INR ₹) unless otherwise stated.</li>
                  <li>Prices may be updated without prior notice due to raw material costs or market conditions.</li>
                  <li>Payments must be made in full at the time of order unless alternate terms are pre-approved (for B2B clients).</li>
                  <li>We accept secure payment methods via trusted third-party gateways and do not store sensitive payment details.</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Truck className="w-5 h-5 text-primary" />
                  <span>4. Shipping & Delivery</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="list-disc list-inside space-y-2 font-inter text-muted-foreground ml-4">
                  <li>Orders are shipped through reliable logistics partners.</li>
                  <li>Delivery timelines will be communicated at checkout but may vary due to location and courier factors.</li>
                  <li>Customers are responsible for providing accurate delivery details.</li>
                  <li>Please refer to our Shipping Policy for more details.</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <RotateCcw className="w-5 h-5 text-primary" />
                  <span>5. Returns, Cancellations & Refunds</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="font-inter text-muted-foreground">
                  Due to the hygienic nature of our products, returns are accepted only if:
                </p>
                <ul className="list-disc list-inside space-y-2 font-inter text-muted-foreground ml-4">
                  <li>Products are damaged in transit</li>
                  <li>Wrong items are delivered</li>
                </ul>
                <div className="bg-destructive/10 p-4 rounded-lg">
                  <p className="font-inter text-destructive font-medium">
                    Opened or used sanitary products cannot be returned under any circumstances.
                  </p>
                </div>
                <p className="font-inter text-muted-foreground">
                  For complete details, refer to our Cancellation & Refund Policy.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-primary" />
                  <span>6. Customer Responsibilities</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="font-inter text-muted-foreground">
                  By purchasing from us, you agree to:
                </p>
                <ul className="list-disc list-inside space-y-2 font-inter text-muted-foreground ml-4">
                  <li>Provide accurate billing and shipping details</li>
                  <li>Inspect products upon delivery and raise concerns within the reporting window</li>
                  <li>Not misuse or misrepresent our brand in resale or distribution</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-primary" />
                  <span>7. Intellectual Property</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="list-disc list-inside space-y-2 font-inter text-muted-foreground ml-4">
                  <li>All logos, product designs, packaging, text, and images are the intellectual property of Varshini Enterprises.</li>
                  <li>Unauthorized reproduction or use of our content is prohibited.</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Limitation of Liability</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="font-inter text-muted-foreground mb-4">
                  Varshini Enterprises shall not be held liable for:
                </p>
                <ul className="list-disc list-inside space-y-2 font-inter text-muted-foreground ml-4">
                  <li>Minor variations in product specifications</li>
                  <li>Delays in delivery caused by courier/logistics partners</li>
                  <li>Indirect or incidental damages arising from product use</li>
                </ul>
                <div className="bg-accent/10 p-4 rounded-lg">
                  <p className="font-inter text-accent font-medium">
                    Our liability is limited to the invoice value of the products purchased.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Gavel className="w-5 h-5 text-primary" />
                  <span>9. Governing Law</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-inter text-muted-foreground">
                  These terms are governed by the laws of India. Any disputes will be subject to the jurisdiction of the courts in Chennai, Tamil Nadu.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Phone className="w-5 h-5 text-primary" />
                  <span>10. Contact Us</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-inter text-muted-foreground mb-6">
                  For any questions or assistance regarding these Terms & Conditions, please contact:
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

export default TermsConditions;
