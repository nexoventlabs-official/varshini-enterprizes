import React from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  Users,
  Target,
  Award,
  Leaf,
  Shield,
  TrendingUp,
  MapPin,
  Phone,
  Mail,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import BackButton from '@/components/BackButton';
import ScrollToTop from '@/components/ScrollToTop';

const AboutUs = () => {
  const values = [
    {
      icon: Heart,
      title: "Women's Health First",
      description: "We prioritize women's health and dignity above all else, ensuring every product meets the highest safety standards."
    },
    {
      icon: Leaf,
      title: "Eco-Friendly",
      description: "Committed to sustainable practices with biodegradable materials and environmentally conscious manufacturing."
    },
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "All products are certified safe, tested for quality, and manufactured under strict hygiene protocols."
    },
    {
      icon: Users,
      title: "Community Impact",
      description: "Working with NGOs, schools, and communities to create awareness and provide access to menstrual hygiene."
    }
  ];

  const milestones = [
    {
      year: "2020",
      title: "Company Founded",
      description: "Started with a mission to make menstrual hygiene accessible to all women in Tamil Nadu."
    },
    {
      year: "2021",
      title: "First 1000 Customers",
      description: "Reached our first milestone of serving 1000 women with quality hygiene products."
    },
    {
      year: "2022",
      title: "NGO Partnerships",
      description: "Established partnerships with 100+ NGOs for rural distribution and awareness programs."
    },
    {
      year: "2023",
      title: "50,000 Women Served",
      description: "Expanded operations to serve over 50,000 women across South India."
    },
    {
      year: "2024",
      title: "Eco-Friendly Initiative",
      description: "Launched 100% biodegradable product line and sustainable packaging solutions."
    },
    {
      year: "2025",
      title: "Digital Transformation",
      description: "Launched e-commerce platform for wider reach and better customer experience."
    }
  ];

  const team = [
    {
      name: "Priya Varshini",
      role: "Founder & CEO",
      description: "Passionate advocate for women's health with 10+ years in healthcare industry."
    },
    {
      name: "Dr. Meera Nair",
      role: "Medical Advisor",
      description: "Gynecologist and women's health expert ensuring product safety and efficacy."
    },
    {
      name: "Rajesh Kumar",
      role: "Operations Head",
      description: "Manufacturing and supply chain expert with focus on quality and sustainability."
    },
    {
      name: "Anjali Reddy",
      role: "Community Outreach",
      description: "Leading awareness programs and NGO partnerships across rural communities."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <div className="container mx-auto px-4 pt-8">
        <BackButton />
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-hero py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="bg-white/20 text-white border-white/30 mb-6">
              <Heart className="w-4 h-4 mr-2" />
              About Varshini Enterprises
            </Badge>
            <h1 className="font-nunito font-bold text-4xl md:text-6xl text-white mb-6">
              Empowering Women Through
              <span className="block text-white/90">Quality Hygiene Products</span>
            </h1>
            <p className="font-inter text-xl text-white/80 mb-8 max-w-3xl mx-auto">
              Founded with a vision to make menstrual hygiene accessible and affordable for every woman,
              we're committed to breaking barriers and promoting women's health across India.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-white text-gray-900 hover:bg-gray-100 font-bold shadow-lg">
                <Link to="/products">
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Shop Our Products
                </Link>
              </Button>
              <Button size="lg" asChild className="bg-white text-gray-900 hover:bg-gray-100 font-bold shadow-lg">
                <Link to="/partner">
                  <Users className="w-5 h-5 mr-2" />
                  Partner With Us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="border-0 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-2xl">
                  <Target className="w-6 h-6 text-primary" />
                  <span>Our Mission</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-inter text-muted-foreground text-lg leading-relaxed">
                  To provide affordable, high-quality menstrual hygiene products to every woman in India,
                  while promoting awareness and breaking the stigma around menstruation. We believe that
                  no woman should compromise her health, education, or dreams due to lack of access to
                  proper menstrual care.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-2xl">
                  <TrendingUp className="w-6 h-6 text-primary" />
                  <span>Our Vision</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-inter text-muted-foreground text-lg leading-relaxed">
                  A world where every woman has access to safe, sustainable menstrual products and
                  comprehensive menstrual health education. We envision communities where menstruation
                  is discussed openly, without shame or stigma, and where women's health is prioritized
                  at every level of society.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-nunito font-bold text-3xl md:text-4xl text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do at Varshini Enterprises
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="text-center border-0 shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="inline-flex p-3 bg-primary/10 rounded-full mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-nunito font-semibold text-lg text-foreground mb-3">
                      {value.title}
                    </h3>
                    <p className="font-inter text-muted-foreground text-sm">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <section className="py-16 bg-gradient-soft">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-nunito font-bold text-3xl md:text-4xl text-foreground mb-4">
              Our Journey
            </h2>
            <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
              From a small startup to a trusted name in women's hygiene
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                      <span className="font-nunito font-bold text-white text-sm">
                        {milestone.year}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <Card className="border-0 shadow-card">
                      <CardContent className="p-6">
                        <h3 className="font-nunito font-semibold text-xl text-foreground mb-2">
                          {milestone.title}
                        </h3>
                        <p className="font-inter text-muted-foreground">
                          {milestone.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-nunito font-bold text-3xl md:text-4xl text-foreground mb-4">
              Meet Our Team
            </h2>
            <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
              Passionate individuals dedicated to women's health and empowerment
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <Card key={index} className="text-center border-0 shadow-card hover:shadow-hover transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-20 h-20 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-nunito font-semibold text-lg text-foreground mb-1">
                    {member.name}
                  </h3>
                  <Badge variant="secondary" className="mb-3">
                    {member.role}
                  </Badge>
                  <p className="font-inter text-muted-foreground text-sm">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-nunito font-bold text-3xl md:text-4xl text-white mb-4">
              Our Impact
            </h2>
            <p className="font-inter text-xl text-white/80 max-w-2xl mx-auto">
              Making a difference in women's lives across India
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { number: "50,000+", label: "Women Served" },
              { number: "500+", label: "NGO Partners" },
              { number: "200+", label: "Schools Reached" },
              { number: "100%", label: "Eco-Friendly Products" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-nunito font-bold text-4xl text-white mb-2">
                  {stat.number}
                </div>
                <p className="font-inter text-white/80">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-nunito font-bold text-3xl md:text-4xl text-foreground mb-4">
              Get in Touch
            </h2>
            <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions or want to learn more about our mission? We'd love to hear from you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center border-0 shadow-card">
              <CardContent className="p-6">
                <MapPin className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="font-nunito font-semibold text-foreground mb-2">Visit Us</h3>
                <p className="font-inter text-muted-foreground text-sm">
                  Chennai, Tamil Nadu<br />
                  India
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-card">
              <CardContent className="p-6">
                <Phone className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="font-nunito font-semibold text-foreground mb-2">Call Us</h3>
                <p className="font-inter text-muted-foreground text-sm">
                  +91 91762 54234<br />
                  Mon-Sat: 9AM-6PM
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-card">
              <CardContent className="p-6">
                <Mail className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="font-nunito font-semibold text-foreground mb-2">Email Us</h3>
                <p className="font-inter text-muted-foreground text-sm">
                  varshinienterprises099@gmail.com<br />
                  We reply within 24 hours
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link to="/contact">
                <ArrowRight className="w-5 h-5 mr-2" />
                Contact Us Today
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
};

export default AboutUs;
