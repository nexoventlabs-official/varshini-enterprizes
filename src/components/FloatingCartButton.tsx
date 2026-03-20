import React, { useState } from 'react';
import { ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import NavigationPanel from '@/components/NavigationPanel';

const FloatingCartButton: React.FC = () => {
  const { state: cartState } = useCart();
  const { state: favoritesState } = useFavorites();
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'cart' | 'favorites'>('cart');

  const totalItems = cartState.itemCount + favoritesState.itemCount;

  const handleOpenPanel = (tab: 'cart' | 'favorites') => {
    setActiveTab(tab);
    setIsPanelOpen(true);
  };

  return (
    <>
      {/* Floating Button Group */}
      <div className="fixed bottom-20 right-6 z-40 flex flex-col space-y-3">
        {/* Cart Button */}
        <div className="relative">
          <Button
            onClick={() => handleOpenPanel('cart')}
            size="lg"
            className="rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 w-14 h-14 p-0"
            aria-label="View Cart"
          >
            <ShoppingCart className="w-6 h-6" />
          </Button>
          {cartState.itemCount > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-destructive text-white min-w-[20px] h-5 flex items-center justify-center text-xs">
              {cartState.itemCount}
            </Badge>
          )}
        </div>

        {/* Favorites Button */}
        <div className="relative">
          <Button
            onClick={() => handleOpenPanel('favorites')}
            size="lg"
            className="rounded-full bg-destructive hover:bg-destructive/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 w-14 h-14 p-0"
            aria-label="View Favorites"
          >
            <Heart className="w-6 h-6" />
          </Button>
          {favoritesState.itemCount > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-primary text-white min-w-[20px] h-5 flex items-center justify-center text-xs">
              {favoritesState.itemCount}
            </Badge>
          )}
        </div>
      </div>

      {/* Navigation Panel */}
      <NavigationPanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </>
  );
};

export default FloatingCartButton;
