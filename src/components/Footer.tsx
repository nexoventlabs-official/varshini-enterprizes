import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import { useLocale } from '@/i18n';

const Footer = () => {
  const { t } = useLocale();

  const quickLinks = [
    { name: t.footer.aboutUs, href: '/about-us' },
    { name: t.footer.ourProducts, href: '/products' },
    { name: t.footer.awareness, href: '/awareness' },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <span className="font-nunito font-bold text-2xl">
                Varshini Enterprises
              </span>
            </div>
            <p className="font-inter text-primary-foreground/80 mb-6 max-w-md">
              {t.footer.tagline}
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
            <h4 className="font-nunito font-semibold text-lg mb-6">{t.footer.quickLinks}</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
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
            <h4 className="font-nunito font-semibold text-lg mb-6">{t.footer.contactUs}</h4>
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
              © 2025 Varshini Enterprises. {t.footer.allRightsReserved}
            </p>
            <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2">
              <Link
                to="/privacy-policy"
                className="font-inter text-primary-foreground/70 hover:text-white text-sm transition-colors"
              >
                {t.footer.privacyPolicy}
              </Link>
              <Link
                to="/terms-conditions"
                className="font-inter text-primary-foreground/70 hover:text-white text-sm transition-colors"
              >
                {t.footer.termsConditions}
              </Link>
              <Link
                to="/shipping-policy"
                className="font-inter text-primary-foreground/70 hover:text-white text-sm transition-colors"
              >
                {t.footer.shippingPolicy}
              </Link>
              <Link
                to="/cancellation-refund"
                className="font-inter text-primary-foreground/70 hover:text-white text-sm transition-colors"
              >
                {t.footer.cancellationRefund}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;