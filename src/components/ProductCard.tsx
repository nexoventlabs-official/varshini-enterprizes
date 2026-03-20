import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Leaf, Award, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import PaymentModal from '@/components/PaymentModal';
import BulkOrderModal from '@/components/BulkOrderModal';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  isEcoFriendly?: boolean;
  isCertified?: boolean;
  category: string;
  inStock?: boolean;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  originalPrice,
  image,
  isEcoFriendly = true,
  isCertified = true,
  category,
  inStock = true,
  className = '',
}) => {
  const { addItem, state } = useCart();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const { toast } = useToast();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showBulkOrderModal, setShowBulkOrderModal] = useState(false);

  const handleToggleFavorite = () => {
    const favoriteItem = {
      id,
      name,
      price,
      originalPrice,
      image,
      category,
    };

    if (isFavorite(id)) {
      removeFavorite(id);
      toast({
        title: "Removed from Favorites",
        description: `${name} has been removed from your favorites.`,
      });
    } else {
      addFavorite(favoriteItem);
      toast({
        title: "Added to Favorites!",
        description: `${name} has been added to your favorites.`,
      });
    }
  };

  const handleQuickAdd = () => {
    addItem({
      id,
      name,
      price,
      image,
      category,
    });

    toast({
      title: "Added to Cart!",
      description: `${name} has been added to your cart.`,
    });

    // Show payment modal immediately after adding to cart
    setShowPaymentModal(true);
  };

  const { clearCart } = useCart();

  const handlePaymentSelect = (method: string) => {
    toast({
      title: "Order Placed!",
      description: `Your order will be processed via ${method.replace('-', ' ')}.`,
    });
    // Clear cart after payment is done
    clearCart();
  };
  return (
    <>
      <Card className={`group overflow-hidden border-0 shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-1 ${className}`}>
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {isEcoFriendly && (
              <Badge variant="secondary" className="bg-success text-success-foreground">
                <Leaf className="w-3 h-3 mr-1" />
                Eco-Friendly
              </Badge>
            )}
            {isCertified && (
              <Badge variant="outline" className="bg-white/90">
                <Award className="w-3 h-3 mr-1" />
                Certified
              </Badge>
            )}
          </div>

          {/* Heart Icon */}
          <button
            onClick={handleToggleFavorite}
            className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white hover:scale-110 transition-all"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${isFavorite(id)
                ? 'text-destructive fill-destructive'
                : 'text-muted-foreground hover:text-destructive'
                }`}
            />
          </button>

          {/* Quick Add to Cart - Appears on Hover */}
          <div className="absolute inset-x-3 bottom-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <Button size="sm" className="w-full" onClick={handleQuickAdd} disabled={!inStock}>
              <ShoppingCart className="w-4 h-4 mr-2" />
              {inStock ? 'Quick Add' : 'Out of Stock'}
            </Button>
          </div>
        </div>

        <CardContent className="p-4">
          <div className="mb-2">
            <Badge variant="outline" className="text-xs font-medium">
              {category}
            </Badge>
          </div>

          <h3 className="font-nunito font-semibold text-lg text-foreground mb-2 line-clamp-2">
            {name}
          </h3>

          <div className="flex items-center space-x-2 mb-3">
            <span className="font-inter font-bold text-xl text-primary">
              ₹{price}
            </span>
            {originalPrice && (
              <span className="font-inter text-sm text-muted-foreground line-through">
                ₹{originalPrice}
              </span>
            )}
            {originalPrice && (
              <Badge variant="secondary" className="text-xs">
                {Math.round(((originalPrice - price) / originalPrice) * 100)}% OFF
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between">
            <span className={`font-inter text-sm ${inStock ? 'text-success' : 'text-destructive'}`}>
              {inStock ? 'In Stock' : 'Out of Stock'}
            </span>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="font-inter text-xs text-muted-foreground">
                Fast Delivery
              </span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0 space-x-2">
          <Button asChild className="flex-1">
            <Link to={`/product/${id}`}>
              View Details
            </Link>
          </Button>
          <Button variant="outline" onClick={() => setShowBulkOrderModal(true)}>
            Bulk Order
          </Button>
        </CardFooter>

        {/* Payment Modal */}
      </Card>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onPaymentSelect={handlePaymentSelect}
        total={state.total}
        itemCount={state.itemCount}
      />

      {/* Bulk Order Modal */}
      <BulkOrderModal
        isOpen={showBulkOrderModal}
        onClose={() => setShowBulkOrderModal(false)}
        product={{
          id,
          name,
          price,
          image,
          category,
        }}
      />
    </>
  );
};

export default ProductCard;