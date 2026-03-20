import React, { useState } from 'react';
import { X, ShoppingCart, Heart, Eye, Trash2, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useToast } from '@/hooks/use-toast';
import CheckoutModal from '@/components/CheckoutModal';

interface NavigationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: 'cart' | 'favorites';
  onTabChange: (tab: 'cart' | 'favorites') => void;
}

const NavigationPanel: React.FC<NavigationPanelProps> = ({
  isOpen,
  onClose,
  activeTab,
  onTabChange,
}) => {
  const { state: cartState, removeItem, updateQuantity, clearCart } = useCart();
  const { state: favoritesState, removeFavorite, clearFavorites } = useFavorites();
  const { toast } = useToast();
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  const handleCheckout = () => {
    if (cartState.items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add some items to your cart before checkout.",
      });
      return;
    }
    setShowCheckoutModal(true);
  };

  const handleOrderComplete = (orderId: string) => {
    toast({
      title: "Order Placed Successfully!",
      description: `Your order ${orderId} has been confirmed.`,
    });
    clearCart();
    setShowCheckoutModal(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      
      {/* Panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 transform transition-transform duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex space-x-4">
            <button
              onClick={() => onTabChange('cart')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                activeTab === 'cart'
                  ? 'bg-primary text-white'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="font-medium">Cart</span>
              {cartState.itemCount > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {cartState.itemCount}
                </Badge>
              )}
            </button>
            <button
              onClick={() => onTabChange('favorites')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                activeTab === 'favorites'
                  ? 'bg-primary text-white'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Heart className="w-4 h-4" />
              <span className="font-medium">Favorites</span>
              {favoritesState.itemCount > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {favoritesState.itemCount}
                </Badge>
              )}
            </button>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'cart' && (
            <div className="space-y-4">
              {cartState.items.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-nunito font-semibold text-foreground mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Add some products to get started
                  </p>
                </div>
              ) : (
                <>
                  {cartState.items.map((item) => (
                    <Card key={item.id} className="border-0 shadow-sm">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-nunito font-medium text-sm text-foreground line-clamp-2">
                              {item.name}
                            </h4>
                            <p className="text-xs text-muted-foreground">{item.category}</p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="font-nunito font-bold text-primary">
                                ₹{item.price}
                              </span>
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="w-8 h-8 p-0"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                  <Minus className="w-3 h-3" />
                                </Button>
                                <span className="text-sm font-medium w-8 text-center">
                                  {item.quantity}
                                </span>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="w-8 h-8 p-0"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  <Plus className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {/* Cart Summary */}
                  <Card className="border-0 bg-primary/5">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-nunito font-semibold text-foreground">Total:</span>
                        <span className="font-nunito font-bold text-xl text-primary">
                          ₹{cartState.total}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <Button onClick={handleCheckout} className="w-full" size="lg">
                          Proceed to Checkout
                        </Button>
                        <Button
                          variant="outline"
                          onClick={clearCart}
                          className="w-full"
                          size="sm"
                        >
                          Clear Cart
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          )}

          {activeTab === 'favorites' && (
            <div className="space-y-4">
              {favoritesState.items.length === 0 ? (
                <div className="text-center py-8">
                  <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-nunito font-semibold text-foreground mb-2">
                    No favorites yet
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Heart products you love to save them here
                  </p>
                </div>
              ) : (
                <>
                  {favoritesState.items.map((item) => (
                    <Card key={item.id} className="border-0 shadow-sm">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-nunito font-medium text-sm text-foreground line-clamp-2">
                              {item.name}
                            </h4>
                            <p className="text-xs text-muted-foreground">{item.category}</p>
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center space-x-2">
                                <span className="font-nunito font-bold text-primary">
                                  ₹{item.price}
                                </span>
                                {item.originalPrice && (
                                  <span className="text-xs text-muted-foreground line-through">
                                    ₹{item.originalPrice}
                                  </span>
                                )}
                              </div>
                              <Button variant="outline" size="sm">
                                <Eye className="w-3 h-3 mr-1" />
                                View
                              </Button>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                            onClick={() => removeFavorite(item.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  <Button
                    variant="outline"
                    onClick={clearFavorites}
                    className="w-full"
                    size="sm"
                  >
                    Clear All Favorites
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={showCheckoutModal}
        onClose={() => setShowCheckoutModal(false)}
        onOrderComplete={handleOrderComplete}
        cartItems={cartState.items}
        total={cartState.total}
        itemCount={cartState.itemCount}
      />
    </>
  );
};

export default NavigationPanel;
