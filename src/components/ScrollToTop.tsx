import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ScrollToTopProps {
  className?: string;
  showAfter?: number; // Show button after scrolling this many pixels
}

const ScrollToTop: React.FC<ScrollToTopProps> = ({ 
  className = '', 
  showAfter = 300 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > showAfter) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top smoothly
  const scrollToTop = () => {
    try {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } catch (error) {
      // Fallback for browsers that don't support smooth scrolling
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, [showAfter]);

  return (
    <>
      {isVisible && (
        <div className={`fixed bottom-6 right-6 z-[9999] ${className}`}>
          <Button
            onClick={scrollToTop}
            size="lg"
            className="rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 w-12 h-12 p-0 flex items-center justify-center"
            aria-label="Scroll to top"
          >
            <ChevronUp className="w-6 h-6" />
          </Button>
        </div>
      )}
    </>
  );
};

export default ScrollToTop;
