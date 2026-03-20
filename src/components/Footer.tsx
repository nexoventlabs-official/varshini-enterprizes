import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <span className="font-nunito font-bold text-2xl">
                Varshini Enterprises
              </span>
            </div>
            <p className="font-inter text-primary-foreground/80 mb-6 max-w-md">
              Promoting women's health and dignity through affordable, eco-friendly hygiene products.
              Every woman deserves access to safe, quality menstrual care.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-nunito font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: 'About Us', href: '/about-us' },
                { name: 'Our Products', href: '/products' },

                { name: 'Awareness', href: '/awareness' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="font-inter text-primary-foreground/80 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-nunito font-semibold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 mt-1 text-primary-foreground/80" />
                <span className="font-inter text-primary-foreground/80">
                  No 06, South Canal Bank Road, Mandaveli<br />
                  Chennai, Tamil Nadu – 600028
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-foreground/80" />
                <span className="font-inter text-primary-foreground/80">
                  +91 91762 54234
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-foreground/80" />
                <span className="font-inter text-primary-foreground/80">
                  varshinienterprises099@gmail.com
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-foreground/80" />
                <span className="font-inter text-primary-foreground/80">
                  contact@varshinienterprises.shop
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="font-inter text-primary-foreground/70 text-sm">
              © 2025 Varshini Enterprises. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2">
              <Link
                to="/privacy-policy"
                className="font-inter text-primary-foreground/70 hover:text-white text-sm transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms-conditions"
                className="font-inter text-primary-foreground/70 hover:text-white text-sm transition-colors"
              >
                Terms & Conditions
              </Link>
              <Link
                to="/shipping-policy"
                className="font-inter text-primary-foreground/70 hover:text-white text-sm transition-colors"
              >
                Shipping Policy
              </Link>
              <Link
                to="/cancellation-refund"
                className="font-inter text-primary-foreground/70 hover:text-white text-sm transition-colors"
              >
                Cancellation & Refund
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;