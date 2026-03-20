import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, ShoppingCart, Leaf, Award, Shield, Users, Minus, Plus, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProductCard from '@/components/ProductCard';
import BulkOrderModal from '@/components/BulkOrderModal';
import { useCart } from '@/contexts/CartContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useToast } from '@/hooks/use-toast';
import sanitaryPadsImage from '@/assets/product-sanitary-pads.png';
import hygienePadsImage from '@/assets/product-hygiene-pads.png';

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showBulkOrderModal, setShowBulkOrderModal] = useState(false);
  const { addItem, updateQuantity, state: cartState } = useCart();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const { toast } = useToast();

  // Sample product data (in real app, this would be fetched based on ID)
  const product = {
    id: '1',
    name: 'Ultra Soft Sanitary Napkins - Regular Flow',
    price: 45,
    originalPrice: 60,
    images: [sanitaryPadsImage, hygienePadsImage, sanitaryPadsImage],
    category: 'Sanitary Napkins',
    isEcoFriendly: true,
    isCertified: true,
    inStock: true,
    stockCount: 156,
    rating: 4.8,
    reviewCount: 234,
    description: 'Premium quality sanitary napkins made from 100% organic cotton. Ultra-soft, highly absorbent, and designed for comfort during regular flow days. Dermatologically tested and suitable for sensitive skin.',
    features: [
      '100% Organic Cotton Top Layer',
      'Super Absorbent Core',
      'Breathable Back Sheet',
      'Wings for Extra Protection',
      'Individually Wrapped',
      'Biodegradable Materials',
    ],
    specifications: {
      'Length': '240mm',
      'Width': '180mm',
      'Thickness': '3mm',
      'Absorbency': 'Regular Flow (8-10 hours)',
      'Pack Size': '10 pieces',
      'Material': 'Organic Cotton, Biodegradable Polymer',
    },
    certifications: [
      'ISO 9001:2015 Certified',
      'FDA Approved Materials',
      'Dermatologically Tested',
      'Eco-Friendly Certification',
    ],
  };

  const relatedProducts = [
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
      name: 'Night Time Protection Pads',
      price: 65,
      originalPrice: 80,
      image: sanitaryPadsImage,
      category: 'Sanitary Napkins',
      isEcoFriendly: true,
      isCertified: true,
    },
  ];

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      category: product.category,
    };

    // Check if item already exists in cart
    const existingItem = cartState.items.find(item => item.id === product.id);

    if (existingItem) {
      // If item exists, update quantity by adding the selected quantity
      updateQuantity(product.id, existingItem.quantity + quantity);
    } else {
      // If item doesn't exist, add it first then update quantity
      addItem(cartItem);
      // Use setTimeout to ensure the item is added before updating quantity
      setTimeout(() => {
        updateQuantity(product.id, quantity);
      }, 0);
    }

    toast({
      title: "Added to Cart!",
      description: `${quantity} x ${product.name} added to your cart.`,
    });
  };

  const handleBulkOrder = () => {
    setShowBulkOrderModal(true);
  };

  const handleToggleFavorite = () => {
    const favoriteItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.images[0],
      category: product.category,
    };

    if (isFavorite(product.id)) {
      removeFavorite(product.id);
      toast({
        title: "Removed from Favorites",
        description: `${product.name} has been removed from your favorites.`,
      });
    } else {
      addFavorite(favoriteItem);
      toast({
        title: "Added to Favorites!",
        description: `${product.name} has been added to your favorites.`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-primary">Shop</Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/products">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Shop
          </Link>
        </Button>

        {/* Product Details */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-xl overflow-hidden bg-white shadow-card">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex space-x-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${selectedImage === index ? 'border-primary' : 'border-transparent'
                    }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="outline" className="mb-3">
                {product.category}
              </Badge>
              <h1 className="font-nunito font-bold text-3xl text-foreground mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                        }`}
                    />
                  ))}
                </div>
                <span className="font-inter text-sm text-muted-foreground">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-3 mb-6">
                <span className="font-nunito font-bold text-3xl text-primary">
                  ₹{product.price}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="font-inter text-xl text-muted-foreground line-through">
                      ₹{product.originalPrice}
                    </span>
                    <Badge variant="secondary">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </Badge>
                  </>
                )}
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                {product.isEcoFriendly && (
                  <Badge variant="secondary" className="bg-success text-success-foreground">
                    <Leaf className="w-3 h-3 mr-1" />
                    Eco-Friendly
                  </Badge>
                )}
                {product.isCertified && (
                  <Badge variant="outline">
                    <Award className="w-3 h-3 mr-1" />
                    Certified
                  </Badge>
                )}
                <Badge variant="outline">
                  <Shield className="w-3 h-3 mr-1" />
                  Dermatologically Tested
                </Badge>
              </div>

              {/* Stock Status */}
              <div className="flex items-center space-x-2 mb-6">
                <div className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-success' : 'bg-destructive'}`}></div>
                <span className={`font-inter ${product.inStock ? 'text-success' : 'text-destructive'}`}>
                  {product.inStock ? `In Stock (${product.stockCount} available)` : 'Out of Stock'}
                </span>
              </div>

              <p className="font-inter text-muted-foreground leading-relaxed mb-6">
                {product.description}
              </p>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="font-inter font-medium">Quantity:</span>
                <div className="flex items-center border border-input rounded-md">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="px-4 py-2 font-inter font-medium min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                    disabled={quantity >= product.stockCount}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                {quantity >= product.stockCount && (
                  <span className="text-sm text-muted-foreground">
                    Max available: {product.stockCount}
                  </span>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={handleAddToCart}
                  className="flex-1"
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {product.inStock
                    ? `Add to Cart - ₹${product.price * quantity}`
                    : 'Out of Stock'
                  }
                </Button>
                <Button size="lg" variant="outline" onClick={handleBulkOrder}>
                  <Users className="w-5 h-5 mr-2" />
                  Bulk Order
                </Button>
              </div>

              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" onClick={handleToggleFavorite}>
                  <Heart className={`w-4 h-4 mr-2 transition-colors ${isFavorite(product.id)
                    ? 'text-destructive fill-destructive'
                    : 'text-muted-foreground hover:text-destructive'
                    }`} />
                  {isFavorite(product.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Product
                </Button>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-nunito font-semibold text-foreground">Quick Support</h3>
                    <p className="font-inter text-sm text-muted-foreground">
                      Have questions? Chat with us on WhatsApp
                    </p>
                  </div>
                  <Button asChild className="bg-green-500 hover:bg-green-600">
                    <a href="https://wa.me/919176254234" target="_blank" rel="noopener noreferrer">
                      WhatsApp Now
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mb-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="certifications">Certifications</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-nunito font-semibold text-xl mb-4">Product Features</h3>
                  <ul className="grid md:grid-cols-2 gap-3">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="font-inter text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-nunito font-semibold text-xl mb-4">Technical Specifications</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center py-2 border-b border-border">
                        <span className="font-inter font-medium text-foreground">{key}:</span>
                        <span className="font-inter text-muted-foreground">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="certifications" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-nunito font-semibold text-xl mb-4">Quality Certifications</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {product.certifications.map((cert, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-secondary rounded-lg">
                        <Award className="w-5 h-5 text-primary" />
                        <span className="font-inter text-foreground">{cert}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="font-nunito font-bold text-3xl text-foreground mb-8">
            Related Products
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>

        {/* Bulk Order Modal */}
        <BulkOrderModal
          isOpen={showBulkOrderModal}
          onClose={() => setShowBulkOrderModal(false)}
          product={{
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            category: product.category,
          }}
        />
      </div>
    </div>
  );
};

export default ProductDetail;