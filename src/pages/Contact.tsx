import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import BackButton from '@/components/BackButton';
import ScrollToTop from '@/components/ScrollToTop';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate form submission
    toast({
      title: "Message Sent Successfully!",
      description: "We'll get back to you within 24 hours.",
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone Number',
      info: '+91 91762 54234',
      description: 'Available 9 AM - 6 PM IST',
      action: 'tel:+919176254234',
    },
    {
      icon: MessageSquare,
      title: 'WhatsApp',
      info: '+91 91762 54234',
      description: '24/7 Quick Support',
      action: 'https://wa.me/919176254234',
    },
    {
      icon: Mail,
      title: 'Email Address',
      info: ['varshinienterprises099@gmail.com', 'contact@varshinienterprises.shop'],
      description: 'We reply within 24 hours',
      action: 'mailto:varshinienterprises099@gmail.com',
    },
    {
      icon: MapPin,
      title: 'Office Location',
      info: 'No 06, South Canal Bank Road, Mandaveli',
      description: 'Chennai, Tamil Nadu – 600028',
      action: 'https://maps.google.com/?q=No+06,+South+Canal+Bank+Road,+Mandaveli,+Chennai,+Tamil+Nadu+600028',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <div className="container mx-auto px-4 pt-8">
        <BackButton />
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-primary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Heart className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="font-nunito font-bold text-4xl md:text-6xl mb-6">
              Get in Touch
            </h1>
            <p className="font-inter text-xl text-white/80 max-w-2xl mx-auto">
              Have questions about our products or want to partner with us? We're here to help you with all your hygiene product needs.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-16 bg-gradient-soft">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((contact, index) => (
              <Card key={index} className="text-center border-0 shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-1 h-full">
                <CardContent className="p-6 h-full flex flex-col">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <contact.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-nunito font-semibold text-lg text-foreground mb-2">
                    {contact.title}
                  </h3>
                  <div className="font-inter text-primary font-medium mb-2 min-h-[3rem] flex flex-col items-center justify-center space-y-1">
                    {Array.isArray(contact.info) ? (
                      contact.info.map((email, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <Mail className="w-4 h-4" />
                          <span className="text-center">{email}</span>
                        </div>
                      ))
                    ) : (
                      <span className="text-center whitespace-pre-line">{contact.info}</span>
                    )}
                  </div>
                  <p className="font-inter text-sm text-muted-foreground mb-4 flex-grow flex items-center justify-center text-center">
                    {contact.description}
                  </p>
                  <div className="mt-auto">
                    <Button size="sm" asChild>
                      <a href={contact.action} target={contact.action.startsWith('http') ? '_blank' : '_self'}>
                        Contact Now
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Form */}
              <div>
                <div className="mb-8">
                  <h2 className="font-nunito font-bold text-3xl text-foreground mb-4">
                    Send us a Message
                  </h2>
                  <p className="font-inter text-lg text-muted-foreground">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                </div>

                <Card className="border-0 shadow-hover">
                  <CardContent className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            placeholder="Enter your full name"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            placeholder="+91 9876543210"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="Enter your email address"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject *</Label>
                        <Input
                          id="subject"
                          value={formData.subject}
                          onChange={(e) => handleInputChange('subject', e.target.value)}
                          placeholder="What is this about?"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          placeholder="Tell us how we can help you..."
                          rows={5}
                          required
                        />
                      </div>

                      <Button type="submit" size="lg" className="w-full">
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Additional Information */}
              <div className="space-y-8">
                <Card className="border-0 shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clock className="w-5 h-5 mr-2 text-primary" />
                      Business Hours
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-inter text-foreground">Monday - Friday</span>
                      <span className="font-inter text-muted-foreground">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-inter text-foreground">Saturday</span>
                      <span className="font-inter text-muted-foreground">9:00 AM - 2:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-inter text-foreground">Sunday</span>
                      <span className="font-inter text-muted-foreground">Closed</span>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="font-inter text-sm text-muted-foreground">
                        WhatsApp support available 24/7 for urgent queries
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-card">
                  <CardHeader>
                    <CardTitle>Quick Response</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-inter text-muted-foreground mb-4">
                      We typically respond to inquiries within:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-success rounded-full"></div>
                        <span className="font-inter text-sm">WhatsApp: Within 1 hour</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="font-inter text-sm">Email: Within 24 hours</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                        <span className="font-inter text-sm">Phone: Immediate during business hours</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gradient-soft">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-nunito font-bold text-3xl text-foreground mb-4">
                Frequently Asked Questions
              </h2>
              <p className="font-inter text-lg text-muted-foreground">
                Find answers to common questions about our products and services.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  question: 'What makes your products eco-friendly?',
                  answer: 'Our products are made from 100% organic cotton and biodegradable materials. We use sustainable manufacturing processes and minimal plastic packaging.',
                },
                {
                  question: 'Do you offer bulk discounts for NGOs?',
                  answer: 'Yes! We offer up to 40% discount for registered NGOs and social organizations. Contact our partnership team for special pricing.',
                },
                {
                  question: 'What is your return policy?',
                  answer: 'We offer a 30-day return policy for unopened products. For hygiene reasons, opened products cannot be returned unless there\'s a quality issue.',
                },
                {
                  question: 'Do you ship across India?',
                  answer: 'Yes, we ship nationwide across India. Free shipping is available for orders above ₹500. Express delivery available in major cities.',
                },
              ].map((faq, index) => (
                <Card key={index} className="border-0 shadow-card">
                  <CardContent className="p-6">
                    <h3 className="font-nunito font-semibold text-lg text-foreground mb-3">
                      {faq.question}
                    </h3>
                    <p className="font-inter text-muted-foreground">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
};

export default Contact;