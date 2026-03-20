import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Shield, Leaf, Users, Star, Phone, MessageSquare, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ProductCard from '@/components/ProductCard';
import ScrollToTop from '@/components/ScrollToTop';
import heroImage from '@/assets/hero-woman.jpg';
import sanitaryPadsImage from '@/assets/product-sanitary-pads.png';
import hygienePadsImage from '@/assets/product-hygiene-pads.png';

const Homepage = () => {
  // Sample product data
  const featuredProducts = [
    {
      id: '1',
      name: 'Ultra Soft Sanitary Napkins',
      price: 45,
      originalPrice: 60,
      image: sanitaryPadsImage,
      category: 'Sanitary Napkins',
      isEcoFriendly: true,
      isCertified: true,
    },
    {
      id: '2',
      name: 'Organic Cotton Hygiene Pads',
      price: 55,
      originalPrice: 70,
      image: hygienePadsImage,
      category: 'Hygiene Pads',
      isEcoFriendly: true,
      isCertified: true,
    },
    {
      id: '3',
      name: 'Bulk Pack - Economy Set',
      price: 120,
      originalPrice: 180,
      image: sanitaryPadsImage,
      category: 'Bulk Packs',
      isEcoFriendly: true,
      isCertified: true,
    },
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      location: 'Chennai',
      text: 'Safe, affordable, and comfortable. These products have truly made a difference in my life.',
      rating: 5,
    },
    {
      name: 'Dr. Meera Nair',
      location: 'NGO Director, Kochi',
      text: 'We distribute these products in rural areas. The quality is excellent and women trust this brand.',
      rating: 5,
    },
    {
      name: 'Anjali Reddy',
      location: 'Hyderabad',
      text: 'Finally, eco-friendly products that don\'t compromise on comfort. Highly recommended!',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero min-h-[80vh] flex items-center overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-white/20 text-white border-white/30">
                  <Heart className="w-4 h-4 mr-2" />
                  Women's Health First
                </Badge>
                <h1 className="font-nunito font-bold text-4xl md:text-6xl text-white leading-tight">
                  Affordable Hygiene,
                  <span className="block text-white/90">
                    Dignity for Every Woman
                  </span>
                </h1>
                <p className="font-inter text-lg text-white/80 max-w-lg">
                  Premium quality, eco-friendly sanitary napkins and hygiene pads made accessible for all women across India. Because every woman deserves comfort and confidence.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="bg-white text-gray-900 hover:bg-gray-100 font-bold shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-white">
                  <Link to="/products" className="text-gray-900 font-bold">
                    <ShoppingCart className="w-5 h-5 mr-2 text-gray-900" />
                    Buy Now
                  </Link>
                </Button>

              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 pt-4">
                <div className="flex items-center space-x-2 text-white/80">
                  <Shield className="w-5 h-5" />
                  <span className="font-inter text-sm">Certified Safe</span>
                </div>
                <div className="flex items-center space-x-2 text-white/80">
                  <Leaf className="w-5 h-5" />
                  <span className="font-inter text-sm">100% Eco-Friendly</span>
                </div>
                <div className="flex items-center space-x-2 text-white/80">
                  <Heart className="w-5 h-5" />
                  <span className="font-inter text-sm">10,000+ Happy Customers</span>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-hover">
                <img
                  src={heroImage}
                  alt="Confident woman promoting menstrual hygiene"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Floating Stats */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-hover">
                <div className="text-center">
                  <div className="font-nunito font-bold text-2xl text-primary">500+</div>
                  <div className="font-inter text-sm text-muted-foreground">NGO Partners</div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 bg-white rounded-xl p-4 shadow-hover">
                <div className="text-center">
                  <div className="font-nunito font-bold text-2xl text-success">100%</div>
                  <div className="font-inter text-sm text-muted-foreground">Eco-Friendly</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gradient-soft">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-nunito font-bold text-3xl md:text-4xl text-foreground mb-4">
              Our Product Categories
            </h2>
            <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose from our range of premium hygiene products designed for comfort, safety, and sustainability.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Sanitary Napkins',
                description: 'Ultra-soft, absorbent napkins for everyday comfort and protection.',
                image: sanitaryPadsImage,
                href: '/products?category=sanitary-napkins',
              },
              {
                title: 'Hygiene Pads',
                description: 'Premium organic cotton pads for sensitive skin and heavy flow days.',
                image: hygienePadsImage,
                href: '/products?category=hygiene-pads',
              },
              {
                title: 'Bulk Packs',
                description: 'Economy packs for NGOs, schools, and bulk requirements.',
                image: sanitaryPadsImage,
                href: '/products?category=bulk-packs',
              },
            ].map((category, index) => (
              <Card key={index} className="group overflow-hidden border-0 shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-1">
                <div className="relative overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-nunito font-semibold text-xl mb-2">{category.title}</h3>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="font-inter text-muted-foreground mb-4">{category.description}</p>
                  <Button asChild className="w-full">
                    <Link to={category.href}>
                      Explore Products
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-nunito font-bold text-3xl md:text-4xl text-foreground mb-4">
              Featured Products
            </h2>
            <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
              Our most popular and trusted products, loved by thousands of women across India.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" asChild>
              <Link to="/products">
                View All Products
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Awareness Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-nunito font-bold text-3xl md:text-4xl text-foreground">
                Breaking the Silence Around
                <span className="block text-primary">Menstrual Health</span>
              </h2>
              <div className="space-y-4">
                <p className="font-playfair italic text-lg text-foreground/80">
                  "Every girl deserves to understand her body, access quality products, and continue her education without interruption."
                </p>
                <p className="font-inter text-muted-foreground">
                  We're committed to menstrual health awareness through educational campaigns, free distribution programs, and partnerships with NGOs across Tamil Nadu and beyond.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild>
                  <Link to="/awareness">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>

              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-hover">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="font-nunito font-bold text-3xl text-primary">75%</div>
                    <div className="font-inter text-sm text-muted-foreground">Girls miss school during periods</div>
                  </div>
                  <div className="text-center">
                    <div className="font-nunito font-bold text-3xl text-success">500+</div>
                    <div className="font-inter text-sm text-muted-foreground">NGO partnerships</div>
                  </div>
                  <div className="text-center">
                    <div className="font-nunito font-bold text-3xl text-accent">50K+</div>
                    <div className="font-inter text-sm text-muted-foreground">Women educated</div>
                  </div>
                  <div className="text-center">
                    <div className="font-nunito font-bold text-3xl text-primary">100%</div>
                    <div className="font-inter text-sm text-muted-foreground">Safe materials</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-nunito font-bold text-3xl md:text-4xl text-foreground mb-4">
              What Our Customers Say
            </h2>
            <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
              Real stories from women who trust Varshini Enterprises for their hygiene needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-card hover:shadow-hover transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="font-playfair italic text-foreground/80 mb-4">
                    "{testimonial.text}"
                  </p>
                  <div className="border-t pt-4">
                    <div className="font-nunito font-semibold text-foreground">{testimonial.name}</div>
                    <div className="font-inter text-sm text-muted-foreground">{testimonial.location}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>



      {/* WhatsApp Sticky Button - Mobile */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button
          size="lg"
          className="rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          asChild
        >
          <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
            <MessageSquare className="w-6 h-6" />
            <span className="hidden sm:inline ml-2">WhatsApp</span>
          </a>
        </Button>
      </div>

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
};

export default Homepage;