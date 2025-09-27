import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Grid, List, Filter } from "lucide-react";
import ProductCard from "./ProductCard";
import ProductFilters from "./ProductFilters";

// Import product images
import diyaImage from '@assets/generated_images/Brass_diya_product_shot_ee1b5e3f.png';
import coconutImage from '@assets/generated_images/Sacred_coconut_product_shot_d4950347.png';
import incenseImage from '@assets/generated_images/Incense_and_sandalwood_products_48558875.png';
import flowersImage from '@assets/generated_images/Traditional_flowers_for_worship_17468d74.png';

interface Product {
  id: string;
  name: string;
  nameHindi?: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  rating: number;
  reviewCount: number;
  category: string;
  inStock: boolean;
  stockCount?: number;
  description: string;
  uses: string[];
  festivals: string[];
  festivalTag?: string;
}

interface ProductListingProps {
  searchQuery?: string;
  selectedCategory?: string;
  onProductClick?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
  onToggleWishlist?: (productId: string) => void;
}

export default function ProductListing({ 
  searchQuery = '',
  selectedCategory,
  onProductClick,
  onAddToCart,
  onToggleWishlist 
}: ProductListingProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({
    categories: [] as string[],
    festivals: [] as string[],
    priceRange: [0, 2000] as [number, number],
    inStockOnly: false,
    minRating: 0
  });

  // todo: remove mock functionality
  const allProducts: Product[] = [
    {
      id: "diya-001",
      name: "Traditional Brass Diya Set",
      nameHindi: "पारंपरिक पीतल का दीया",
      price: 299,
      originalPrice: 399,
      image: diyaImage,
      images: [diyaImage, diyaImage, diyaImage],
      rating: 4.5,
      reviewCount: 128,
      category: "Diya & Tila",
      inStock: true,
      stockCount: 25,
      description: "Handcrafted traditional brass diyas perfect for festivals and daily worship.",
      uses: ["Daily prayers", "Festival celebrations", "Temple decoration"],
      festivals: ["Diwali", "Karva Chauth", "Daily Worship"],
      festivalTag: "Diwali Special"
    },
    {
      id: "coconut-001",
      name: "Sacred Coconut (Fresh)",
      nameHindi: "पवित्र नारियल",
      price: 45,
      image: coconutImage,
      images: [coconutImage, coconutImage, coconutImage],
      rating: 4.8,
      reviewCount: 89,
      category: "Narial (Coconut)",
      inStock: true,
      stockCount: 50,
      description: "Fresh sacred coconuts for all Hindu rituals and ceremonies.",
      uses: ["Pujan rituals", "Kalash decoration", "Offering to deities"],
      festivals: ["All Festivals", "Daily Worship"]
    },
    {
      id: "incense-001",
      name: "Premium Sandalwood Incense",
      nameHindi: "प्रीमियम चंदन अगरबत्ती",
      price: 180,
      originalPrice: 220,
      image: incenseImage,
      images: [incenseImage, incenseImage, incenseImage],
      rating: 4.6,
      reviewCount: 156,
      category: "Dhoop & Agarbatti",
      inStock: true,
      stockCount: 100,
      description: "Premium quality sandalwood incense sticks for spiritual ambiance.",
      uses: ["Daily prayers", "Meditation", "Aarti ceremonies"],
      festivals: ["All Festivals", "Daily Worship"]
    },
    {
      id: "flowers-001",
      name: "Fresh Marigold Garland",
      nameHindi: "ताज़ी गेंदे की माला",
      price: 75,
      image: flowersImage,
      images: [flowersImage, flowersImage, flowersImage],
      rating: 4.3,
      reviewCount: 67,
      category: "Paan & Fool (Flowers)",
      inStock: true,
      stockCount: 20,
      description: "Fresh marigold garlands for temple decoration and offerings.",
      uses: ["Temple decoration", "Deity offerings", "Festival decorations"],
      festivals: ["Diwali", "Navratri", "Daily Worship"],
      festivalTag: "Daily Fresh"
    },
    {
      id: "diya-002",
      name: "Silver Plated Diya Pair",
      nameHindi: "चांदी चढ़ी दीया जोड़ी",
      price: 450,
      originalPrice: 550,
      image: diyaImage,
      images: [diyaImage, diyaImage, diyaImage],
      rating: 4.7,
      reviewCount: 92,
      category: "Diya & Tila",
      inStock: true,
      stockCount: 15,
      description: "Elegant silver plated diya pair for special occasions.",
      uses: ["Special festivals", "Wedding ceremonies", "Lakshmi pujan"],
      festivals: ["Diwali", "Karva Chauth"]
    },
    {
      id: "incense-002",
      name: "Rose Dhoop Cones",
      nameHindi: "गुलाब धूप कोन",
      price: 120,
      image: incenseImage,
      images: [incenseImage, incenseImage, incenseImage],
      rating: 4.4,
      reviewCount: 78,
      category: "Dhoop & Agarbatti",
      inStock: false,
      stockCount: 0,
      description: "Aromatic rose dhoop cones for peaceful meditation.",
      uses: ["Meditation", "Evening prayers", "Spiritual practices"],
      festivals: ["Daily Worship"]
    }
  ];

  // Filter products based on search, category, and filters
  const filteredProducts = allProducts.filter(product => {
    // Search filter
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !product.nameHindi?.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Category filter
    if (selectedCategory && product.category !== selectedCategory) {
      return false;
    }

    // Applied filters
    if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
      return false;
    }

    if (filters.festivals.length > 0 && product.festivalTag && 
        !filters.festivals.some(f => product.festivalTag?.includes(f))) {
      return false;
    }

    if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
      return false;
    }

    if (filters.inStockOnly && !product.inStock) {
      return false;
    }

    if (filters.minRating > 0 && product.rating < filters.minRating) {
      return false;
    }

    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0; // featured order
    }
  });

  const clearFilters = () => {
    setFilters({
      categories: [],
      festivals: [],
      priceRange: [0, 2000],
      inStockOnly: false,
      minRating: 0
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <ProductFilters
            filters={filters}
            onFiltersChange={setFilters}
            onClearFilters={clearFilters}
            isOpen={isFiltersOpen}
            onToggle={() => setIsFiltersOpen(!isFiltersOpen)}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {selectedCategory || 'All Products'}
              </h1>
              <p className="text-muted-foreground">
                {sortedProducts.length} product{sortedProducts.length !== 1 ? 's' : ''} found
                {searchQuery && ` for "${searchQuery}"`}
              </p>
            </div>

            <div className="flex items-center gap-4">
              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40" data-testid="select-sort">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Customer Rating</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                </SelectContent>
              </Select>

              {/* View Mode */}
              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="icon"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                  data-testid="button-view-grid"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="icon"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                  data-testid="button-view-list"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>

              {/* Mobile Filter Toggle */}
              <Button 
                variant="outline" 
                className="lg:hidden"
                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                data-testid="button-mobile-filters"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          {/* Active Filters */}
          {(filters.categories.length > 0 || filters.festivals.length > 0 || 
            filters.inStockOnly || filters.minRating > 0) && (
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {filters.categories.map(category => (
                <Badge key={category} variant="secondary">
                  {category}
                </Badge>
              ))}
              {filters.festivals.map(festival => (
                <Badge key={festival} variant="secondary">
                  {festival}
                </Badge>
              ))}
              {filters.inStockOnly && (
                <Badge variant="secondary">In Stock Only</Badge>
              )}
              {filters.minRating > 0 && (
                <Badge variant="secondary">{filters.minRating}+ Stars</Badge>
              )}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearFilters}
                className="text-xs"
                data-testid="button-clear-active-filters"
              >
                Clear All
              </Button>
            </div>
          )}

          {/* Products Grid/List */}
          {sortedProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground mb-2">No products found</p>
              <p className="text-sm text-muted-foreground">
                Try adjusting your filters or search terms
              </p>
              <Button 
                variant="outline" 
                onClick={clearFilters}
                className="mt-4"
                data-testid="button-clear-no-results"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className={
              viewMode === 'grid' 
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'space-y-4'
            }>
              {sortedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                  onToggleWishlist={onToggleWishlist}
                  onQuickView={onProductClick}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}