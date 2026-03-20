import React, { useState, useMemo } from 'react';
import { Search, Filter, Grid, List, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import ProductCard from '@/components/ProductCard';
import BackButton from '@/components/BackButton';
import ScrollToTop from '@/components/ScrollToTop';
import sanitaryPadsImage from '@/assets/product-sanitary-pads.png';
import hygienePadsImage from '@/assets/product-hygiene-pads.png';

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState('all');

  // Sample products data
  const allProducts = [
    {
      id: '1',
      name: 'Ultra Soft Sanitary Napkins - Regular Flow',
      price: 45,
      originalPrice: 60,
      image: sanitaryPadsImage,
      category: 'Sanitary Napkins',
      isEcoFriendly: true,
      isCertified: true,
      inStock: true,
    },
    {
      id: '2',
      name: 'Organic Cotton Hygiene Pads - Heavy Flow',
      price: 55,
      originalPrice: 70,
      image: hygienePadsImage,
      category: 'Hygiene Pads',
      isEcoFriendly: true,
      isCertified: true,
      inStock: true,
    },
    {
      id: '3',
      name: 'Night Time Protection Pads - Extra Long',
      price: 65,
      originalPrice: 80,
      image: sanitaryPadsImage,
      category: 'Sanitary Napkins',
      isEcoFriendly: true,
      isCertified: true,
      inStock: true,
    },
    {
      id: '4',
      name: 'Bulk Economy Pack - 50 Pieces',
      price: 120,
      originalPrice: 180,
      image: hygienePadsImage,
      category: 'Bulk Packs',
      isEcoFriendly: true,
      isCertified: true,
      inStock: true,
    },
    {
      id: '5',
      name: 'Sensitive Skin Organic Pads',
      price: 70,
      originalPrice: 90,
      image: sanitaryPadsImage,
      category: 'Hygiene Pads',
      isEcoFriendly: true,
      isCertified: true,
      inStock: false,
    },
    {
      id: '6',
      name: 'Daily Panty Liners - Pack of 30',
      price: 35,
      originalPrice: 50,
      image: hygienePadsImage,
      category: 'Panty Liners',
      isEcoFriendly: true,
      isCertified: true,
      inStock: true,
    },
  ];

  const categories = [
    'all',
    'Sanitary Napkins',
    'Hygiene Pads',
    'Bulk Packs',
    'Panty Liners',
  ];

  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: '0-50', label: 'Under ₹50' },
    { value: '50-100', label: '₹50 - ₹100' },
    { value: '100-200', label: '₹100 - ₹200' },
  ];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = allProducts;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by price range
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number);
      filtered = filtered.filter(product => {
        if (max) {
          return product.price >= min && product.price <= max;
        } else {
          return product.price >= min;
        }
      });
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Keep original order for 'featured'
        break;
    }

    return filtered;
  }, [searchTerm, selectedCategory, sortBy, priceRange]);

  return (
    <div className="min-h-screen bg-gradient-soft">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <BackButton />
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-nunito font-bold text-4xl text-foreground mb-4">
            Shop Our Products
          </h1>
          <p className="font-inter text-lg text-muted-foreground">
            Premium quality, eco-friendly hygiene products for every woman's needs.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-card p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="relative lg:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Price Range */}
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger>
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                {priceRanges.map((range) => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="name">Name: A to Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results and View Toggle */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <span className="font-inter text-muted-foreground">
              {filteredProducts.length} products found
            </span>
            {selectedCategory !== 'all' && (
              <Badge variant="secondary" className="capitalize">
                {selectedCategory}
              </Badge>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="font-nunito font-semibold text-xl text-muted-foreground mb-2">
              No products found
            </div>
            <p className="font-inter text-muted-foreground">
              Try adjusting your search criteria or browse all categories.
            </p>
          </div>
        ) : (
          <div className={`grid gap-6 ${viewMode === 'grid'
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1'
            }`}>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                className={viewMode === 'list' ? 'flex-row' : ''}
              />
            ))}
          </div>
        )}

      </div>

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
};

export default Shop;
