import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BackButtonProps {
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  text?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ 
  className = '', 
  variant = 'outline',
  size = 'default',
  text = 'Back'
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    // Check if there's history to go back to
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      // If no history, go to homepage
      navigate('/');
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleBack}
      className={`flex items-center space-x-2 ${className}`}
    >
      <ArrowLeft className="w-4 h-4" />
      <span>{text}</span>
    </Button>
  );
};

export default BackButton;
