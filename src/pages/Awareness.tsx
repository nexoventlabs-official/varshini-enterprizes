import React from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  Users,
  BookOpen,
  Award,
  TrendingUp,
  Shield,
  Lightbulb,
  Target,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import BackButton from '@/components/BackButton';
import ScrollToTop from '@/components/ScrollToTop';

const Awareness = () => {
  const statistics = [
    {
      number: "75%",
      description: "Girls in rural India miss school during menstruation",
      icon: BookOpen,
      color: "text-destructive"
    },
    {
      number: "500M+",
      description: "Women globally lack access to menstrual facilities",
      icon: Users,
      color: "text-primary"
    },
    {
      number: "23%",
      description: "Girls drop out of school after reaching puberty",
      icon: TrendingUp,
      color: "text-accent"
    },
    {
      number: "88%",
      description: "Women in India use unhygienic materials",
      icon: Shield,
      color: "text-destructive"
    }
  ];

  const myths = [
    {
      myth: "Menstruating women are impure",
      fact: "Menstruation is a natural biological process, not a sign of impurity",
      icon: Heart
    },
    {
      myth: "You can't exercise during periods",
      fact: "Light exercise can actually help reduce menstrual cramps",
      icon: Target
    },
    {
      myth: "Periods sync up when women live together",
      fact: "Scientific studies show no evidence of menstrual synchrony",
      icon: Users
    },
    {
      myth: "You can't wash your hair during periods",
      fact: "There's no medical reason to avoid washing hair during menstruation",
      icon: Shield
    }
  ];

  const initiatives = [
    {
      title: "School Education Programs",
      description: "Conducting awareness sessions in 200+ schools across Tamil Nadu",
      impact: "50,000+ students educated",
      icon: BookOpen
    },
    {
      title: "Free Distribution Drives",
      description: "Monthly distribution of sanitary napkins in rural communities",
      impact: "25,000+ women benefited",
      icon: Heart
    },
    {
      title: "NGO Partnerships",
      description: "Collaborating with local NGOs for wider reach",
      impact: "500+ partner organizations",
      icon: Users
    },
    {
      title: "Healthcare Training",
      description: "Training healthcare workers on menstrual hygiene",
      impact: "1,000+ workers trained",
      icon: Award
    }
  ];

  const tips = [
    "Change sanitary napkins every 4-6 hours",
    "Maintain proper hygiene during menstruation",
    "Stay hydrated and eat nutritious food",
    "Track your menstrual cycle",
    "Consult a doctor for irregular periods",
    "Use quality, certified sanitary products"
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
              <Lightbulb className="w-4 h-4 mr-2" />
              Menstrual Health Awareness
            </Badge>
            <h1 className="font-nunito font-bold text-4xl md:text-6xl text-white mb-6">
              Breaking the Silence Around
              <span className="block text-white/90">Menstrual Health</span>
            </h1>
            <p className="font-inter text-xl text-white/80 mb-8 max-w-3xl mx-auto">
              Education, awareness, and access to quality menstrual products are fundamental rights.
              Join us in creating a world where no woman or girl is held back by her period.
            </p>
            <Button size="lg" asChild className="bg-white text-gray-900 hover:bg-gray-100 font-bold shadow-lg">
              <Link to="/contact">
                <Phone className="w-5 h-5 mr-2" />
                Get Involved
              </Link>
            </Button>
          </div>
        </div>

      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-nunito font-bold text-3xl md:text-4xl text-foreground mb-4">
              The Reality of Menstrual Health
            </h2>
            <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
              Understanding the challenges faced by women and girls worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statistics.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="text-center border-0 shadow-card hover:shadow-hover transition-all duration-300">
                  <CardContent className="p-6">
                    <div className={`inline-flex p-3 rounded-full bg-muted mb-4`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <div className={`font-nunito font-bold text-3xl mb-2 ${stat.color}`}>
                      {stat.number}
                    </div>
                    <p className="font-inter text-sm text-muted-foreground">
                      {stat.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section >

      {/* Myth Busting Section */}
      < section className="py-16" >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-nunito font-bold text-3xl md:text-4xl text-foreground mb-4">
              Busting Menstrual Myths
            </h2>
            <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
              Separating facts from fiction to promote better understanding
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {myths.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card key={index} className="border-0 shadow-card hover:shadow-hover transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-destructive/10 rounded-full">
                        <Icon className="w-5 h-5 text-destructive" />
                      </div>
                      <div className="flex-1">
                        <div className="mb-3">
                          <Badge variant="destructive" className="mb-2">Myth</Badge>
                          <p className="font-inter text-foreground font-medium">
                            "{item.myth}"
                          </p>
                        </div>
                        <div>
                          <Badge variant="secondary" className="mb-2 bg-success text-success-foreground">Fact</Badge>
                          <p className="font-inter text-muted-foreground">
                            {item.fact}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section >

      {/* Our Initiatives */}
      < section className="py-16 bg-gradient-soft" >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-nunito font-bold text-3xl md:text-4xl text-foreground mb-4">
              Our Awareness Initiatives
            </h2>
            <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
              Making a real difference in communities across India
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {initiatives.map((initiative, index) => {
              const Icon = initiative.icon;
              return (
                <Card key={index} className="border-0 shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="text-center pb-4">
                    <div className="inline-flex p-3 bg-primary/10 rounded-full mx-auto mb-3">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="font-nunito text-lg">{initiative.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="font-inter text-muted-foreground mb-4">
                      {initiative.description}
                    </p>
                    <Badge variant="secondary" className="bg-success text-success-foreground">
                      {initiative.impact}
                    </Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section >

      {/* Menstrual Health Tips */}
      < section className="py-16" >
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-nunito font-bold text-3xl md:text-4xl text-foreground mb-6">
                Essential Menstrual Health Tips
              </h2>
              <p className="font-inter text-lg text-muted-foreground mb-8">
                Simple practices that can make a significant difference in menstrual health and hygiene.
              </p>

              <div className="space-y-4">
                {tips.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <span className="font-inter text-foreground">{tip}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Button asChild>
                  <Link to="/products">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Shop Quality Products
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <Card className="p-8 bg-gradient-primary text-white border-0">
                <div className="text-center">
                  <Heart className="w-12 h-12 mx-auto mb-4 text-white" />
                  <h3 className="font-nunito font-bold text-2xl mb-4">
                    Need Help or Support?
                  </h3>
                  <p className="font-inter text-white/90 mb-6">
                    Our team is here to provide guidance, answer questions, and connect you with resources.
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-center justify-center space-x-2">
                      <Phone className="w-4 h-4" />
                      <span className="font-inter">+91 91762 54234</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <Mail className="w-4 h-4" />
                      <span className="font-inter">varshinienterprises099@gmail.com</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span className="font-inter">Chennai, Tamil Nadu</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section >

      {/* Call to Action */}
      < section className="py-16 bg-primary" >
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-nunito font-bold text-3xl md:text-4xl text-white mb-6">
              Together, We Can Create Change
            </h2>
            <p className="font-inter text-xl text-white/80 mb-8">
              Join our mission to ensure every woman and girl has access to quality menstrual products and education.
              Your support can transform lives and communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                <Link to="/partner" className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Become a Partner
                </Link>
              </Button>
              <Button size="lg" variant="secondary">
                <Link to="/products" className="flex items-center">
                  <Heart className="w-5 h-5 mr-2" />
                  Support Our Cause
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section >

      {/* Scroll to Top Button */}
      < ScrollToTop />
    </div >
  );
};

export default Awareness;
