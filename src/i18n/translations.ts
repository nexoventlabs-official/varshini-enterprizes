export type Locale = 'en-IN' | 'en-US' | 'de-EU';

export interface Translation {
  // Navigation
  nav: {
    home: string;
    products: string;
    awareness: string;
    contact: string;
    callUs: string;
    shopNow: string;
  };
  // Hero
  hero: {
    badge: string;
    title1: string;
    title2: string;
    subtitle: string;
    buyNow: string;
    certifiedSafe: string;
    ecoFriendly: string;
    happyCustomers: string;
    ngoPartners: string;
  };
  // Categories
  categories: {
    heading: string;
    subtitle: string;
    sanitaryNapkins: string;
    sanitaryNapkinsDesc: string;
    hygienePads: string;
    hygienePadsDesc: string;
    bulkPacks: string;
    bulkPacksDesc: string;
    exploreProducts: string;
  };
  // Featured Products
  featured: {
    heading: string;
    subtitle: string;
    viewAll: string;
  };
  // Awareness Section
  awarenessSection: {
    heading1: string;
    heading2: string;
    quote: string;
    description: string;
    learnMore: string;
    stat1Label: string;
    stat2Label: string;
    stat3Label: string;
    stat4Label: string;
  };
  // Testimonials
  testimonials: {
    heading: string;
    subtitle: string;
    items: {
      name: string;
      location: string;
      text: string;
    }[];
  };
  // Product Card
  productCard: {
    ecoFriendly: string;
    certified: string;
    inStock: string;
    outOfStock: string;
    fastDelivery: string;
    quickAdd: string;
    viewDetails: string;
    bulkOrder: string;
    off: string;
  };
  // Shop Page
  shop: {
    heading: string;
    subtitle: string;
    searchPlaceholder: string;
    allCategories: string;
    allPrices: string;
    sortFeatured: string;
    sortPriceLow: string;
    sortPriceHigh: string;
    sortName: string;
    productsFound: string;
    noProducts: string;
    noProductsHint: string;
  };
  // Product Detail
  productDetail: {
    home: string;
    shop: string;
    backToShop: string;
    reviews: string;
    dermoTested: string;
    inStockLabel: string;
    outOfStockLabel: string;
    available: string;
    quantity: string;
    maxAvailable: string;
    addToCart: string;
    bulkOrder: string;
    removeFromFavorites: string;
    addToFavorites: string;
    shareProduct: string;
    quickSupport: string;
    quickSupportDesc: string;
    whatsappNow: string;
    description: string;
    specifications: string;
    certifications: string;
    productFeatures: string;
    techSpecs: string;
    qualityCerts: string;
    relatedProducts: string;
    productNotFound: string;
    productNotFoundDesc: string;
  };
  // Footer
  footer: {
    tagline: string;
    quickLinks: string;
    aboutUs: string;
    ourProducts: string;
    awareness: string;
    contactUs: string;
    privacyPolicy: string;
    termsConditions: string;
    shippingPolicy: string;
    cancellationRefund: string;
    allRightsReserved: string;
  };
  // Bulk Order Modal
  bulkModal: {
    title: string;
    minOrder: string;
    orgName: string;
    contactPerson: string;
    email: string;
    phone: string;
    orgType: string;
    selectOrgType: string;
    quantityLabel: string;
    deliveryAddress: string;
    specialRequirements: string;
    specialReqPlaceholder: string;
    submit: string;
    submitting: string;
    cancel: string;
    needHelp: string;
    helpContact: string;
    successTitle: string;
    successDesc: string;
    bulkPricing: string;
    basePrice: string;
    discount: string;
    finalPrice: string;
    pricingNote: string;
    perUnit: string;
    units: string;
    minQuantityError: string;
    orgTypes: {
      ngo: string;
      school: string;
      hospital: string;
      corporate: string;
      government: string;
      distributor: string;
    };
  };
  // Price Ranges (for Shop filter)
  priceRanges: {
    under: string;
    range: string;
  };
  // Common
  common: {
    addedToCart: string;
    addedToFavorites: string;
    removedFromFavorites: string;
    orderPlaced: string;
    whatsapp: string;
  };
}

const translations: Record<Locale, Translation> = {
  'en-IN': {
    nav: {
      home: 'Home',
      products: 'Products',
      awareness: 'Awareness',
      contact: 'Contact',
      callUs: 'Call Us',
      shopNow: 'Shop Now',
    },
    hero: {
      badge: 'Trusted by 10,000+ Women Across India',
      title1: 'Premium Feminine Hygiene,',
      title2: 'Crafted for Indian Women',
      subtitle: 'Clinically tested, BIS-certified sanitary napkins and organic hygiene pads — designed for superior comfort, maximum absorbency, and complete peace of mind. Proudly manufactured in India.',
      buyNow: 'Shop Now',
      certifiedSafe: 'BIS Certified',
      ecoFriendly: '100% Biodegradable',
      happyCustomers: '10,000+ Satisfied Customers',
      ngoPartners: '50+ NGO Partners',
    },
    categories: {
      heading: 'Explore Our Product Range',
      subtitle: 'Scientifically formulated feminine hygiene solutions — from daily-use napkins to eco-conscious organic pads and institutional bulk packs.',
      sanitaryNapkins: 'Sanitary Napkins',
      sanitaryNapkinsDesc: 'Ultra-thin, high-absorbency napkins with leak-proof technology for all-day confidence.',
      hygienePads: 'Organic Cotton Pads',
      hygienePadsDesc: '100% certified organic cotton pads — gentle on sensitive skin, dermatologically approved.',
      bulkPacks: 'Institutional Packs',
      bulkPacksDesc: 'Cost-effective bulk packs for NGOs, schools, hospitals, and corporate wellness programs.',
      exploreProducts: 'View Collection',
    },
    featured: {
      heading: 'Bestselling Products',
      subtitle: 'Our most trusted and highest-rated products — loved by thousands of women for quality, comfort, and reliability.',
      viewAll: 'Browse All Products',
    },
    awarenessSection: {
      heading1: 'Championing',
      heading2: 'Menstrual Health Awareness',
      quote: '"Access to safe, affordable menstrual hygiene products is not a privilege — it is a fundamental right for every woman and girl."',
      description: 'Through our educational outreach programs, free product distribution drives, and strategic partnerships with over 50 NGOs across Tamil Nadu and neighbouring states, we are working to ensure no woman is left behind.',
      learnMore: 'Learn More About Our Mission',
      stat1Label: 'of girls miss school during menstruation',
      stat2Label: 'Active NGO partnerships',
      stat3Label: 'Women reached through awareness programs',
      stat4Label: 'BIS & ISO certified materials',
    },
    testimonials: {
      heading: 'Trusted by Women Nationwide',
      subtitle: 'Hear from real customers and healthcare professionals who rely on Varshini Enterprises.',
      items: [
        { name: 'Priya Sharma', location: 'Chennai, Tamil Nadu', text: 'Exceptional quality at an honest price. These napkins are incredibly comfortable and I feel confident recommending them to everyone.' },
        { name: 'Dr. Meera Nair', location: 'NGO Director, Kochi', text: 'We have been distributing Varshini products in rural communities for over two years. The feedback from women has been overwhelmingly positive — they trust this brand.' },
        { name: 'Anjali Reddy', location: 'Hyderabad, Telangana', text: 'As someone with sensitive skin, finding products that are both eco-friendly and comfortable was a challenge — until I discovered Varshini Enterprises. Absolutely outstanding.' },
      ],
    },
    productCard: {
      ecoFriendly: 'Eco-Friendly',
      certified: 'BIS Certified',
      inStock: 'In Stock',
      outOfStock: 'Out of Stock',
      fastDelivery: 'Express Delivery',
      quickAdd: 'Add to Cart',
      viewDetails: 'View Details',
      bulkOrder: 'Bulk Enquiry',
      off: 'OFF',
    },
    shop: {
      heading: 'Our Complete Product Catalogue',
      subtitle: 'Explore our full range of clinically tested, eco-friendly feminine hygiene products — designed for every need.',
      searchPlaceholder: 'Search by product name or category...',
      allCategories: 'All Categories',
      allPrices: 'All Price Ranges',
      sortFeatured: 'Recommended',
      sortPriceLow: 'Price: Low to High',
      sortPriceHigh: 'Price: High to Low',
      sortName: 'Name: A to Z',
      productsFound: 'products found',
      noProducts: 'No matching products',
      noProductsHint: 'Try adjusting your filters or search terms to discover more products.',
    },
    productDetail: {
      home: 'Home',
      shop: 'Shop',
      backToShop: 'Back to Shop',
      reviews: 'reviews',
      dermoTested: 'Dermatologically Tested',
      inStockLabel: 'In Stock',
      outOfStockLabel: 'Currently Unavailable',
      available: 'available',
      quantity: 'Quantity',
      maxAvailable: 'Maximum available',
      addToCart: 'Add to Cart',
      bulkOrder: 'Request Bulk Quote',
      removeFromFavorites: 'Remove from Wishlist',
      addToFavorites: 'Add to Wishlist',
      shareProduct: 'Share',
      quickSupport: 'Need Help?',
      quickSupportDesc: 'Our support team is available on WhatsApp for instant assistance.',
      whatsappNow: 'Chat on WhatsApp',
      description: 'Description',
      specifications: 'Specifications',
      certifications: 'Certifications',
      productFeatures: 'Key Features',
      techSpecs: 'Technical Specifications',
      qualityCerts: 'Quality & Compliance Certifications',
      relatedProducts: 'You May Also Like',
      productNotFound: 'Product Not Found',
      productNotFoundDesc: 'Sorry, the product you are looking for is unavailable or has been discontinued.',
    },
    footer: {
      tagline: 'India\'s trusted manufacturer of premium, eco-friendly feminine hygiene products. Committed to quality, affordability, and women\'s well-being since 2020.',
      quickLinks: 'Quick Links',
      aboutUs: 'About Us',
      ourProducts: 'Our Products',
      awareness: 'Awareness',
      contactUs: 'Contact Us',
      privacyPolicy: 'Privacy Policy',
      termsConditions: 'Terms & Conditions',
      shippingPolicy: 'Shipping Policy',
      cancellationRefund: 'Cancellation & Refund',
      allRightsReserved: 'All rights reserved.',
    },
    bulkModal: {
      title: 'Institutional & Bulk Order Enquiry',
      minOrder: 'Minimum order quantity:',
      orgName: 'Organisation Name',
      contactPerson: 'Contact Person',
      email: 'Email Address',
      phone: 'Phone Number',
      orgType: 'Organisation Type',
      selectOrgType: 'Select your organisation type',
      quantityLabel: 'Quantity',
      deliveryAddress: 'Delivery Address',
      specialRequirements: 'Additional Requirements',
      specialReqPlaceholder: 'Custom branding, packaging preferences, delivery schedule, or any other specifications...',
      submit: 'Submit Enquiry',
      submitting: 'Submitting...',
      cancel: 'Cancel',
      needHelp: 'Need immediate assistance?',
      helpContact: 'Call us at +91 91762 54234 or email varshinienterprises099@gmail.com',
      successTitle: 'Enquiry Submitted Successfully!',
      successDesc: 'Our dedicated bulk orders team will contact you within 24 business hours with a customised quotation.',
      bulkPricing: 'Estimated Pricing',
      basePrice: 'Base Price',
      discount: 'Discount',
      finalPrice: 'Estimated Total',
      pricingNote: '*Final pricing is subject to delivery location, order volume, and any custom requirements.',
      perUnit: 'per unit',
      units: 'units',
      minQuantityError: 'Minimum order quantity is',
      orgTypes: {
        ngo: 'NGO / Non-Profit Organisation',
        school: 'School / Educational Institution',
        hospital: 'Hospital / Healthcare Facility',
        corporate: 'Corporate / Private Enterprise',
        government: 'Government Body / PSU',
        distributor: 'Distributor / Retail Partner',
      },
    },
    priceRanges: {
      under: 'Under',
      range: '-',
    },
    common: {
      addedToCart: 'Added to Cart',
      addedToFavorites: 'Added to Wishlist',
      removedFromFavorites: 'Removed from Wishlist',
      orderPlaced: 'Order Placed Successfully!',
      whatsapp: 'WhatsApp',
    },
  },

  'en-US': {
    nav: {
      home: 'Home',
      products: 'Products',
      awareness: 'Our Mission',
      contact: 'Contact',
      callUs: 'Call Us',
      shopNow: 'Shop Now',
    },
    hero: {
      badge: 'Globally Trusted Feminine Hygiene Brand',
      title1: 'Clinically Proven Comfort,',
      title2: 'Sustainably Crafted for You',
      subtitle: 'Award-winning organic feminine hygiene products made with GOTS-certified cotton and zero harmful chemicals. Trusted by healthcare professionals and eco-conscious women worldwide.',
      buyNow: 'Shop Collection',
      certifiedSafe: 'FDA Compliant',
      ecoFriendly: '100% Biodegradable',
      happyCustomers: '10,000+ Women Worldwide',
      ngoPartners: 'Global Impact Partners',
    },
    categories: {
      heading: 'Shop by Category',
      subtitle: 'Purpose-built feminine care products — rigorously tested for safety, engineered for comfort, and designed with sustainability at their core.',
      sanitaryNapkins: 'Premium Sanitary Pads',
      sanitaryNapkinsDesc: 'Medical-grade, ultra-thin pads with advanced leak-lock technology for worry-free protection.',
      hygienePads: 'Organic Cotton Pads',
      hygienePadsDesc: 'GOTS-certified 100% organic cotton — hypoallergenic, chemical-free, and dermatologist recommended.',
      bulkPacks: 'Wholesale & Value Packs',
      bulkPacksDesc: 'Bulk supply solutions for nonprofits, healthcare facilities, universities, and corporate wellness initiatives.',
      exploreProducts: 'Shop Now',
    },
    featured: {
      heading: 'Customer Favorites',
      subtitle: 'Our top-rated products — consistently chosen by women who value quality, safety, and environmental responsibility.',
      viewAll: 'View Full Collection',
    },
    awarenessSection: {
      heading1: 'Advancing Global',
      heading2: 'Menstrual Health Equity',
      quote: '"Menstrual hygiene is a public health imperative. Every woman deserves access to safe, dignified care — regardless of geography or income."',
      description: 'We partner with international NGOs, healthcare institutions, and educational organizations to provide free menstrual products, health education workshops, and sustainable supply programs in underserved communities.',
      learnMore: 'Explore Our Impact',
      stat1Label: 'of women globally lack adequate period care',
      stat2Label: 'International partnerships',
      stat3Label: 'Women empowered through outreach',
      stat4Label: 'Certified safe & sustainable materials',
    },
    testimonials: {
      heading: 'What Women Are Saying',
      subtitle: 'Verified reviews from real customers and healthcare professionals across the globe.',
      items: [
        { name: 'Sarah Mitchell', location: 'New York, NY', text: 'I have tried dozens of brands over the years. Varshini products offer the best combination of comfort, absorbency, and sustainability I have ever experienced.' },
        { name: 'Dr. Emily Carter', location: 'Women\'s Health Director, California', text: 'As a healthcare professional, I am extremely selective about what I recommend. Varshini products meet the highest clinical standards — I recommend them without reservation.' },
        { name: 'Jessica Ramirez', location: 'Austin, TX', text: 'Switching to Varshini was the best decision I made for both my body and the planet. The organic cotton pads are incredibly soft and I love that they are fully biodegradable.' },
      ],
    },
    productCard: {
      ecoFriendly: 'Eco-Friendly',
      certified: 'Certified',
      inStock: 'In Stock',
      outOfStock: 'Sold Out',
      fastDelivery: 'Free Shipping',
      quickAdd: 'Add to Cart',
      viewDetails: 'View Details',
      bulkOrder: 'Wholesale Inquiry',
      off: 'OFF',
    },
    shop: {
      heading: 'Our Complete Collection',
      subtitle: 'Clinically tested, sustainably produced feminine care — from everyday essentials to specialty organic products.',
      searchPlaceholder: 'Search by product name, category, or keyword...',
      allCategories: 'All Categories',
      allPrices: 'All Price Ranges',
      sortFeatured: 'Recommended',
      sortPriceLow: 'Price: Low to High',
      sortPriceHigh: 'Price: High to Low',
      sortName: 'Name: A to Z',
      productsFound: 'products found',
      noProducts: 'No results found',
      noProductsHint: 'Try broadening your search or resetting the filters to explore more products.',
    },
    productDetail: {
      home: 'Home',
      shop: 'Shop',
      backToShop: 'Back to Shop',
      reviews: 'reviews',
      dermoTested: 'Dermatologist Approved',
      inStockLabel: 'In Stock',
      outOfStockLabel: 'Currently Unavailable',
      available: 'available',
      quantity: 'Quantity',
      maxAvailable: 'Maximum available',
      addToCart: 'Add to Cart',
      bulkOrder: 'Request Wholesale Quote',
      removeFromFavorites: 'Remove from Wishlist',
      addToFavorites: 'Save to Wishlist',
      shareProduct: 'Share',
      quickSupport: 'Have Questions?',
      quickSupportDesc: 'Our customer care team is ready to help — reach out via WhatsApp for instant support.',
      whatsappNow: 'Chat with Us',
      description: 'Overview',
      specifications: 'Specifications',
      certifications: 'Certifications',
      productFeatures: 'Key Features & Benefits',
      techSpecs: 'Technical Specifications',
      qualityCerts: 'Quality & Safety Certifications',
      relatedProducts: 'You May Also Like',
      productNotFound: 'Product Not Found',
      productNotFoundDesc: 'The product you are looking for is no longer available or may have been discontinued.',
    },
    footer: {
      tagline: 'A globally recognized manufacturer of premium, sustainable feminine hygiene products. Committed to clinical excellence, environmental stewardship, and women\'s empowerment.',
      quickLinks: 'Quick Links',
      aboutUs: 'About Us',
      ourProducts: 'Our Products',
      awareness: 'Our Mission',
      contactUs: 'Contact Us',
      privacyPolicy: 'Privacy Policy',
      termsConditions: 'Terms of Service',
      shippingPolicy: 'Shipping & Delivery',
      cancellationRefund: 'Returns & Refunds',
      allRightsReserved: 'All rights reserved.',
    },
    bulkModal: {
      title: 'Wholesale & Institutional Inquiry',
      minOrder: 'Minimum order quantity:',
      orgName: 'Organization Name',
      contactPerson: 'Point of Contact',
      email: 'Business Email',
      phone: 'Phone Number',
      orgType: 'Organization Type',
      selectOrgType: 'Select your organization type',
      quantityLabel: 'Quantity',
      deliveryAddress: 'Shipping Address',
      specialRequirements: 'Additional Notes',
      specialReqPlaceholder: 'Private labeling, custom packaging, preferred delivery window, or other specifications...',
      submit: 'Submit Inquiry',
      submitting: 'Processing...',
      cancel: 'Cancel',
      needHelp: 'Need immediate assistance?',
      helpContact: 'Call us at +91 91762 54234 or email varshinienterprises099@gmail.com',
      successTitle: 'Inquiry Received!',
      successDesc: 'Our wholesale team will prepare a customized quotation and reach out within 1 business day.',
      bulkPricing: 'Wholesale Pricing Estimate',
      basePrice: 'Subtotal',
      discount: 'Volume Discount',
      finalPrice: 'Estimated Total',
      pricingNote: '*Final pricing is subject to shipping destination, order volume, and any custom specifications.',
      perUnit: 'per unit',
      units: 'units',
      minQuantityError: 'Minimum order quantity is',
      orgTypes: {
        ngo: 'Nonprofit / Foundation',
        school: 'School / University',
        hospital: 'Hospital / Healthcare Provider',
        corporate: 'Corporation / Private Company',
        government: 'Government Agency',
        distributor: 'Distributor / Retail Partner',
      },
    },
    priceRanges: {
      under: 'Under',
      range: '-',
    },
    common: {
      addedToCart: 'Added to Cart',
      addedToFavorites: 'Saved to Wishlist',
      removedFromFavorites: 'Removed from Wishlist',
      orderPlaced: 'Order Confirmed!',
      whatsapp: 'WhatsApp',
    },
  },

  'de-EU': {
    nav: {
      home: 'Startseite',
      products: 'Produkte',
      awareness: 'Unsere Mission',
      contact: 'Kontakt',
      callUs: 'Anrufen',
      shopNow: 'Jetzt Einkaufen',
    },
    hero: {
      badge: 'International ausgezeichnete Damenhygiene',
      title1: 'Klinisch geprüfter Komfort,',
      title2: 'nachhaltig gefertigt für Sie',
      subtitle: 'Preisgekrönte Bio-Damenhygieneprodukte aus GOTS-zertifizierter Baumwolle — frei von Schadstoffen. Von Fachärztinnen empfohlen und von umweltbewussten Frauen weltweit geschätzt.',
      buyNow: 'Kollektion Entdecken',
      certifiedSafe: 'EU-Konform & Zertifiziert',
      ecoFriendly: '100% Biologisch Abbaubar',
      happyCustomers: '10.000+ zufriedene Kundinnen',
      ngoPartners: 'Internationale Hilfspartner',
    },
    categories: {
      heading: 'Nach Kategorie Einkaufen',
      subtitle: 'Klinisch getestete Damenhygieneprodukte — entwickelt für höchste Sicherheit, optimalen Tragekomfort und konsequente Nachhaltigkeit.',
      sanitaryNapkins: 'Premium-Damenbinden',
      sanitaryNapkinsDesc: 'Medizinisch geprüfte, ultradünne Binden mit fortschrittlicher Auslaufschutz-Technologie für sorgenfreien Schutz.',
      hygienePads: 'Bio-Baumwoll-Einlagen',
      hygienePadsDesc: 'GOTS-zertifizierte 100% Bio-Baumwolle — hypoallergen, chemiefrei und dermatologisch empfohlen.',
      bulkPacks: 'Großhandel & Vorteilspakete',
      bulkPacksDesc: 'Mengenrabatte für gemeinnützige Organisationen, Gesundheitseinrichtungen, Bildungsstätten und betriebliche Gesundheitsprogramme.',
      exploreProducts: 'Jetzt Einkaufen',
    },
    featured: {
      heading: 'Unsere Bestseller',
      subtitle: 'Die am besten bewerteten Produkte — gewählt von Frauen, die Qualität, Sicherheit und ökologische Verantwortung schätzen.',
      viewAll: 'Gesamtes Sortiment Anzeigen',
    },
    awarenessSection: {
      heading1: 'Für weltweite',
      heading2: 'Menstruationshygiene-Gerechtigkeit',
      quote: '„Menstruationshygiene ist ein grundlegendes Gesundheitsrecht. Jede Frau verdient Zugang zu sicherer, würdevoller Versorgung — unabhängig von Herkunft oder Einkommen."',
      description: 'Gemeinsam mit internationalen NGOs, medizinischen Einrichtungen und Bildungsorganisationen stellen wir kostenlose Hygieneprodukte bereit, führen Aufklärungsworkshops durch und unterstützen nachhaltige Versorgungsprogramme in unterversorgten Regionen.',
      learnMore: 'Mehr Über Unser Engagement',
      stat1Label: 'der Frauen weltweit ohne angemessene Versorgung',
      stat2Label: 'Internationale Partnerschaften',
      stat3Label: 'Frauen durch Programme erreicht',
      stat4Label: 'Zertifiziert sichere & nachhaltige Materialien',
    },
    testimonials: {
      heading: 'Das Sagen Unsere Kundinnen',
      subtitle: 'Verifizierte Bewertungen von Kundinnen und medizinischen Fachkräften aus aller Welt.',
      items: [
        { name: 'Anna Müller', location: 'Berlin, Deutschland', text: 'Ich habe im Laufe der Jahre zahlreiche Marken ausprobiert. Varshini-Produkte bieten die beste Kombination aus Komfort, Saugfähigkeit und Nachhaltigkeit, die ich je erlebt habe.' },
        { name: 'Dr. Sophie Weber', location: 'Leiterin Frauengesundheit, München', text: 'Als Medizinerin bin ich bei meinen Empfehlungen äußerst wählerisch. Varshini-Produkte erfüllen die höchsten klinischen Standards — ich empfehle sie uneingeschränkt.' },
        { name: 'Laura Schmidt', location: 'Hamburg, Deutschland', text: 'Der Wechsel zu Varshini war die beste Entscheidung für meinen Körper und unseren Planeten. Die Bio-Baumwoll-Einlagen sind unglaublich weich und vollständig biologisch abbaubar.' },
      ],
    },
    productCard: {
      ecoFriendly: 'Umweltfreundlich',
      certified: 'EU-Zertifiziert',
      inStock: 'Auf Lager',
      outOfStock: 'Ausverkauft',
      fastDelivery: 'Kostenloser Versand',
      quickAdd: 'In den Warenkorb',
      viewDetails: 'Details Ansehen',
      bulkOrder: 'Großhandelsanfrage',
      off: 'RABATT',
    },
    shop: {
      heading: 'Unser Gesamtes Sortiment',
      subtitle: 'Klinisch getestete, nachhaltig produzierte Damenhygiene — von Alltagsprodukten bis hin zu Bio-Spezialartikeln.',
      searchPlaceholder: 'Nach Produktname, Kategorie oder Stichwort suchen...',
      allCategories: 'Alle Kategorien',
      allPrices: 'Alle Preisklassen',
      sortFeatured: 'Empfohlen',
      sortPriceLow: 'Preis: Aufsteigend',
      sortPriceHigh: 'Preis: Absteigend',
      sortName: 'Name: A bis Z',
      productsFound: 'Produkte gefunden',
      noProducts: 'Keine Ergebnisse',
      noProductsHint: 'Erweitern Sie Ihre Suche oder setzen Sie die Filter zurück, um weitere Produkte zu entdecken.',
    },
    productDetail: {
      home: 'Startseite',
      shop: 'Shop',
      backToShop: 'Zurück zum Shop',
      reviews: 'Bewertungen',
      dermoTested: 'Dermatologisch Geprüft',
      inStockLabel: 'Auf Lager',
      outOfStockLabel: 'Derzeit Nicht Verfügbar',
      available: 'verfügbar',
      quantity: 'Menge',
      maxAvailable: 'Maximal verfügbar',
      addToCart: 'In den Warenkorb',
      bulkOrder: 'Großhandelsangebot Anfragen',
      removeFromFavorites: 'Von Merkliste Entfernen',
      addToFavorites: 'Auf Merkliste Setzen',
      shareProduct: 'Teilen',
      quickSupport: 'Haben Sie Fragen?',
      quickSupportDesc: 'Unser Kundenservice hilft Ihnen gerne — kontaktieren Sie uns per WhatsApp für sofortige Unterstützung.',
      whatsappNow: 'Jetzt Chatten',
      description: 'Übersicht',
      specifications: 'Spezifikationen',
      certifications: 'Zertifizierungen',
      productFeatures: 'Hauptmerkmale & Vorteile',
      techSpecs: 'Technische Daten',
      qualityCerts: 'Qualitäts- & Sicherheitszertifizierungen',
      relatedProducts: 'Das Könnte Ihnen Auch Gefallen',
      productNotFound: 'Produkt Nicht Gefunden',
      productNotFoundDesc: 'Das gesuchte Produkt ist leider nicht mehr verfügbar oder wurde aus dem Sortiment genommen.',
    },
    footer: {
      tagline: 'International anerkannter Hersteller von hochwertigen, nachhaltigen Damenhygieneprodukten. Unser Engagement gilt klinischer Exzellenz, Umweltschutz und der Stärkung von Frauen weltweit.',
      quickLinks: 'Schnelllinks',
      aboutUs: 'Über Uns',
      ourProducts: 'Unsere Produkte',
      awareness: 'Unsere Mission',
      contactUs: 'Kontakt',
      privacyPolicy: 'Datenschutzerklärung',
      termsConditions: 'Allgemeine Geschäftsbedingungen',
      shippingPolicy: 'Versand & Lieferung',
      cancellationRefund: 'Rückgabe & Erstattung',
      allRightsReserved: 'Alle Rechte vorbehalten.',
    },
    bulkModal: {
      title: 'Großhandels- & Institutionsanfrage',
      minOrder: 'Mindestbestellmenge:',
      orgName: 'Name der Organisation',
      contactPerson: 'Ansprechpartner/in',
      email: 'Geschäftliche E-Mail',
      phone: 'Telefonnummer',
      orgType: 'Organisationstyp',
      selectOrgType: 'Bitte wählen Sie Ihren Organisationstyp',
      quantityLabel: 'Menge',
      deliveryAddress: 'Lieferadresse',
      specialRequirements: 'Zusätzliche Hinweise',
      specialReqPlaceholder: 'Eigenmarkierung, individuelle Verpackung, gewünschter Liefertermin oder sonstige Anforderungen...',
      submit: 'Anfrage Absenden',
      submitting: 'Wird verarbeitet...',
      cancel: 'Abbrechen',
      needHelp: 'Benötigen Sie sofortige Unterstützung?',
      helpContact: 'Rufen Sie uns an: +91 91762 54234 oder schreiben Sie an varshinienterprises099@gmail.com',
      successTitle: 'Anfrage Erfolgreich Übermittelt!',
      successDesc: 'Unser Großhandelsteam erstellt ein individuelles Angebot und meldet sich innerhalb eines Werktages bei Ihnen.',
      bulkPricing: 'Kalkulierter Großhandelspreis',
      basePrice: 'Zwischensumme',
      discount: 'Mengenrabatt',
      finalPrice: 'Geschätzter Gesamtbetrag',
      pricingNote: '*Endpreis abhängig von Lieferdestination, Bestellvolumen und individuellen Anforderungen.',
      perUnit: 'pro Stück',
      units: 'Stück',
      minQuantityError: 'Mindestbestellmenge beträgt',
      orgTypes: {
        ngo: 'NGO / Gemeinnützige Organisation',
        school: 'Schule / Universität',
        hospital: 'Krankenhaus / Gesundheitseinrichtung',
        corporate: 'Unternehmen / GmbH / AG',
        government: 'Behörde / Öffentliche Einrichtung',
        distributor: 'Distributor / Handelspartner',
      },
    },
    priceRanges: {
      under: 'Unter',
      range: '-',
    },
    common: {
      addedToCart: 'Zum Warenkorb Hinzugefügt',
      addedToFavorites: 'Auf Merkliste Gesetzt',
      removedFromFavorites: 'Von Merkliste Entfernt',
      orderPlaced: 'Bestellung Bestätigt!',
      whatsapp: 'WhatsApp',
    },
  },
};

export default translations;
