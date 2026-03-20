import React, { useEffect } from 'react';
import { Shield, Eye, Lock, Database, Users, Phone, MapPin, Mail, CheckCircle, Headphones } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import BackButton from '@/components/BackButton';
import ScrollToTop from '@/components/ScrollToTop';

const PrivacyPolicy = () => {
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
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-nunito font-bold text-4xl text-foreground mb-4">
              Privacy Policy
            </h1>
            <h2 className="font-nunito font-semibold text-2xl text-primary mb-4">
              Your Privacy, Our Assurance
            </h2>
            <p className="font-inter text-lg text-muted-foreground max-w-3xl mx-auto">
              At Varshini Enterprises, your trust is at the heart of everything we do. As a manufacturer of sanitary napkins and hygiene products, we recognize the sensitivity of the information you share with us.
            </p>
            <p className="font-inter text-sm text-muted-foreground mt-4">
              Last updated: August 2025
            </p>
          </div>

          {/* Introduction */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <p className="font-inter text-muted-foreground leading-relaxed">
                We are committed to safeguarding your personal data with the highest standards of security, confidentiality, and transparency—aligned with the Indian IT Act and internationally recognized data protection practices such as the GDPR. This Privacy Policy explains what information we collect, why we collect it, how we protect it, and your rights when engaging with our website, products, and services.
              </p>
            </CardContent>
          </Card>

          {/* Content */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Eye className="w-5 h-5 text-primary" />
                  <span>Information We Collect</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="font-inter text-muted-foreground">
                  When you interact with Varshini Enterprises—whether by browsing our website, placing an order, or making a business inquiry—we may collect the following types of information:
                </p>
                <ul className="list-disc list-inside space-y-2 font-inter text-muted-foreground ml-4">
                  <li>Full Name / Business Name</li>
                  <li>Email Address & Phone Number</li>
                  <li>Shipping & Billing Address</li>
                  <li>Order History & Purchase Preferences</li>
                  <li>Payment Details (processed via secure third-party gateways)</li>
                  <li>Device & Browser Information (if shopping online)</li>
                  <li>Cookies & Tracking Data (for performance and analytics)</li>
                </ul>
                <div className="bg-primary/5 p-4 rounded-lg mt-4">
                  <p className="font-inter text-primary font-medium">
                    We collect only the data necessary to provide you with a safe, seamless, and hygienic shopping experience.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="w-5 h-5 text-primary" />
                  <span>Why We Collect Your Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="font-inter text-muted-foreground">
                  Your data is collected and used strictly for legitimate purposes, including:
                </p>
                <ul className="list-disc list-inside space-y-2 font-inter text-muted-foreground ml-4">
                  <li>Processing and fulfilling orders</li>
                  <li>Communicating updates on delivery and service requests</li>
                  <li>Coordinating wholesale/B2B supply chain logistics</li>
                  <li>Providing customer service and after-sales support</li>
                  <li>Sending optional promotional or educational content (only if you opt in)</li>
                  <li>Improving our hygiene product offerings and digital experience</li>
                  <li>Complying with legal, taxation, and regulatory obligations</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lock className="w-5 h-5 text-primary" />
                  <span>How We Protect Your Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="font-inter text-muted-foreground mb-4">
                  We adopt strong safeguards to ensure your data remains private and secure:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3 p-3 bg-success/10 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">SSL Encryption</p>
                      <p className="text-sm text-muted-foreground">All website data exchange is encrypted</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-success/10 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Secure Payment Processing</p>
                      <p className="text-sm text-muted-foreground">PCI-compliant third-party gateways</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-success/10 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Confidential Handling</p>
                      <p className="text-sm text-muted-foreground">Health inquiries treated with discretion</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-success/10 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Access Controls</p>
                      <p className="text-sm text-muted-foreground">Data accessible only to authorized staff</p>
                    </div>
                  </div>
                </div>
                <div className="bg-accent/10 p-4 rounded-lg">
                  <p className="font-inter text-accent font-medium">
                    We never store your card/banking details. Regular audits ensure systems are reviewed for vulnerabilities.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span>Your Rights & Choices</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="font-inter text-muted-foreground">
                  As our customer, you have full control of your data. You may:
                </p>
                <ul className="list-disc list-inside space-y-2 font-inter text-muted-foreground ml-4">
                  <li>Request access to the data we hold about you</li>
                  <li>Ask for corrections or updates to your information</li>
                  <li>Request deletion of your data (subject to applicable laws)</li>
                  <li>Withdraw consent for promotional communications</li>
                  <li>Raise concerns about data handling or misuse</li>
                </ul>
                <div className="bg-primary/5 p-4 rounded-lg">
                  <p className="font-inter text-primary font-medium">
                    We respond to valid requests within 30 business days.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="w-5 h-5 text-primary" />
                  <span>Third-Party Sharing</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="font-inter text-muted-foreground mb-4">
                  We do not sell or rent your data. Information is shared only with:
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="font-inter text-foreground">Logistics partners (for secure product delivery)</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="font-inter text-foreground">Payment processors (for verified transactions)</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="font-inter text-foreground">Regulatory authorities (only if legally required)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Policy Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-inter text-muted-foreground">
                  This Privacy Policy may be updated periodically to reflect changes in regulations, technologies, or our business practices. Updates will always be posted here with a revised "Last Updated" date.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Phone className="w-5 h-5 text-primary" />
                  <span>Contact Us</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-inter text-muted-foreground mb-6">
                  For any questions or concerns about this Privacy Policy, please contact:
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

export default PrivacyPolicy;
