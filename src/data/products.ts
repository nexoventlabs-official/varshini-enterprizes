import sanitaryPadsImage from '@/assets/product-sanitary-pads.png';
import hygienePadsImage from '@/assets/product-hygiene-pads.png';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: string;
  isEcoFriendly: boolean;
  isCertified: boolean;
  inStock: boolean;
  stockCount?: number;
  rating?: number;
  reviewCount?: number;
  description?: string;
  features?: string[];
  specifications?: Record<string, string>;
  certifications?: string[];
}

const allProducts: Product[] = [
  {
    id: '1',
    name: 'Ultra Soft Sanitary Napkins - Regular Flow',
    price: 45,
    originalPrice: 60,
    image: sanitaryPadsImage,
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
  },
  {
    id: '2',
    name: 'Organic Cotton Hygiene Pads - Heavy Flow',
    price: 55,
    originalPrice: 70,
    image: hygienePadsImage,
    images: [hygienePadsImage, sanitaryPadsImage, hygienePadsImage],
    category: 'Hygiene Pads',
    isEcoFriendly: true,
    isCertified: true,
    inStock: true,
    stockCount: 200,
    rating: 4.6,
    reviewCount: 189,
    description: 'Organic cotton hygiene pads designed for heavy flow days. Extra absorbent core with leak-proof barriers for maximum protection and comfort throughout the day.',
    features: [
      'Organic Cotton Surface',
      'Extra Absorbent Core for Heavy Flow',
      'Leak-Proof Side Barriers',
      'Soft and Comfortable Fit',
      'Individually Wrapped',
      'Eco-Friendly Packaging',
    ],
    specifications: {
      'Length': '280mm',
      'Width': '200mm',
      'Thickness': '4mm',
      'Absorbency': 'Heavy Flow (10-12 hours)',
      'Pack Size': '8 pieces',
      'Material': 'Organic Cotton, Super Absorbent Polymer',
    },
    certifications: [
      'ISO 9001:2015 Certified',
      'FDA Approved Materials',
      'Dermatologically Tested',
      'Eco-Friendly Certification',
    ],
  },
  {
    id: '3',
    name: 'Night Time Protection Pads - Extra Long',
    price: 65,
    originalPrice: 80,
    image: sanitaryPadsImage,
    images: [sanitaryPadsImage, hygienePadsImage, sanitaryPadsImage],
    category: 'Sanitary Napkins',
    isEcoFriendly: true,
    isCertified: true,
    inStock: true,
    stockCount: 120,
    rating: 4.9,
    reviewCount: 312,
    description: 'Extra long night time protection pads with wider back coverage. Designed for overnight use with superior absorbency and leak protection for a peaceful sleep.',
    features: [
      'Extra Long for Night Protection',
      'Wider Back Coverage',
      'Superior Absorbency',
      'Leak-Proof Barriers',
      'Soft Cotton Surface',
      'Biodegradable Materials',
    ],
    specifications: {
      'Length': '320mm',
      'Width': '220mm',
      'Thickness': '5mm',
      'Absorbency': 'Overnight (12+ hours)',
      'Pack Size': '8 pieces',
      'Material': 'Organic Cotton, Super Absorbent Polymer',
    },
    certifications: [
      'ISO 9001:2015 Certified',
      'FDA Approved Materials',
      'Dermatologically Tested',
      'Eco-Friendly Certification',
    ],
  },
  {
    id: '4',
    name: 'Bulk Economy Pack - 50 Pieces',
    price: 120,
    originalPrice: 180,
    image: hygienePadsImage,
    images: [hygienePadsImage, sanitaryPadsImage, hygienePadsImage],
    category: 'Bulk Packs',
    isEcoFriendly: true,
    isCertified: true,
    inStock: true,
    stockCount: 80,
    rating: 4.7,
    reviewCount: 156,
    description: 'Economy bulk pack of 50 premium sanitary napkins. Perfect for families, hostels, and organizations. Great value with no compromise on quality.',
    features: [
      '50 Pieces Value Pack',
      'Premium Quality Pads',
      'Mix of Regular and Heavy Flow',
      'Individually Wrapped',
      'Eco-Friendly Materials',
      'Great for Bulk Orders',
    ],
    specifications: {
      'Length': '240mm (Regular), 280mm (Heavy)',
      'Pack Size': '50 pieces (30 Regular + 20 Heavy)',
      'Material': 'Organic Cotton Blend',
      'Shelf Life': '3 years',
      'Storage': 'Cool, dry place',
      'Weight': '1.2 kg',
    },
    certifications: [
      'ISO 9001:2015 Certified',
      'FDA Approved Materials',
      'Dermatologically Tested',
      'Eco-Friendly Certification',
    ],
  },
  {
    id: '5',
    name: 'Sensitive Skin Organic Pads',
    price: 70,
    originalPrice: 90,
    image: sanitaryPadsImage,
    images: [sanitaryPadsImage, hygienePadsImage, sanitaryPadsImage],
    category: 'Hygiene Pads',
    isEcoFriendly: true,
    isCertified: true,
    inStock: false,
    stockCount: 0,
    rating: 4.5,
    reviewCount: 98,
    description: 'Specially formulated pads for sensitive skin. Hypoallergenic, fragrance-free, and made with the gentlest organic cotton for maximum comfort.',
    features: [
      'Hypoallergenic Materials',
      'Fragrance-Free',
      '100% Organic Cotton',
      'Ultra-Gentle on Skin',
      'Dermatologist Recommended',
      'Biodegradable',
    ],
    specifications: {
      'Length': '260mm',
      'Width': '190mm',
      'Thickness': '3mm',
      'Absorbency': 'Regular to Heavy Flow',
      'Pack Size': '10 pieces',
      'Material': '100% Organic Cotton',
    },
    certifications: [
      'ISO 9001:2015 Certified',
      'FDA Approved Materials',
      'Dermatologically Tested',
      'Hypoallergenic Certified',
    ],
  },
  {
    id: '6',
    name: 'Daily Panty Liners - Pack of 30',
    price: 35,
    originalPrice: 50,
    image: hygienePadsImage,
    images: [hygienePadsImage, sanitaryPadsImage, hygienePadsImage],
    category: 'Panty Liners',
    isEcoFriendly: true,
    isCertified: true,
    inStock: true,
    stockCount: 300,
    rating: 4.4,
    reviewCount: 145,
    description: 'Ultra-thin daily panty liners for everyday freshness. Breathable, comfortable, and discreet. Perfect for daily hygiene and light discharge days.',
    features: [
      'Ultra-Thin Design',
      'Breathable Materials',
      'Comfortable for All-Day Wear',
      'Discreet and Flexible',
      'Individually Wrapped',
      'Eco-Friendly',
    ],
    specifications: {
      'Length': '155mm',
      'Width': '60mm',
      'Thickness': '1mm',
      'Absorbency': 'Light (daily use)',
      'Pack Size': '30 pieces',
      'Material': 'Cotton Blend, Breathable Film',
    },
    certifications: [
      'ISO 9001:2015 Certified',
      'FDA Approved Materials',
      'Dermatologically Tested',
      'Eco-Friendly Certification',
    ],
  },
  {
    id: '7',
    name: 'Varshini Sample Pad - Try Our Quality',
    price: 1,
    originalPrice: 10,
    image: sanitaryPadsImage,
    images: [sanitaryPadsImage, hygienePadsImage, sanitaryPadsImage],
    category: 'Sanitary Napkins',
    isEcoFriendly: true,
    isCertified: true,
    inStock: true,
    stockCount: 500,
    rating: 4.9,
    reviewCount: 420,
    description: 'Try our premium quality sanitary napkin at just Re.1! This sample pack lets you experience the comfort and quality of Varshini Enterprises products. Perfect for first-time buyers.',
    features: [
      'Premium Quality Sample',
      '100% Organic Cotton',
      'Ultra-Soft Top Layer',
      'Try Before You Buy',
      'Individually Wrapped',
      'Biodegradable Materials',
    ],
    specifications: {
      'Length': '240mm',
      'Width': '180mm',
      'Thickness': '3mm',
      'Absorbency': 'Regular Flow (8-10 hours)',
      'Pack Size': '1 piece',
      'Material': 'Organic Cotton, Biodegradable Polymer',
    },
    certifications: [
      'ISO 9001:2015 Certified',
      'FDA Approved Materials',
      'Dermatologically Tested',
      'Eco-Friendly Certification',
    ],
  },
];

export const getProductById = (id: string): Product | undefined => {
  return allProducts.find(product => product.id === id);
};

export const getRelatedProducts = (id: string, limit: number = 3): Product[] => {
  const product = getProductById(id);
  if (!product) return allProducts.slice(0, limit);
  return allProducts
    .filter(p => p.id !== id && p.category === product.category)
    .slice(0, limit);
};

export default allProducts;
