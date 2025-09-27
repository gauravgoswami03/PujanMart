import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { X, Filter } from "lucide-react";

interface FilterOptions {
  categories: string[];
  festivals: string[];
  priceRange: [number, number];
  inStockOnly: boolean;
  minRating: number;
}

interface ProductFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  onClearFilters: () => void;
  isOpen?: boolean;
  onToggle?: () => void;
}

export default function ProductFilters({ 
  filters, 
  onFiltersChange, 
  onClearFilters,
  isOpen = true,
  onToggle 
}: ProductFiltersProps) {
  const [localPriceRange, setLocalPriceRange] = useState(filters.priceRange);

  // todo: remove mock functionality
  const categories = [
    "Diya & Tila",
    "Dhoop & Agarbatti", 
    "Chandan & Roli",
    "Narial (Coconut)",
    "Flowers & Paan",
    "Kalash & Thali",
    "Sacred Threads",
    "Ghee & Oil"
  ];

  const festivals = [
    "Diwali",
    "Navratri", 
    "Ganesh Chaturthi",
    "Karva Chauth",
    "Dussehra",
    "Holi",
    "Janmashtami",
    "Daily Worship"
  ];

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked 
      ? [...filters.categories, category]
      : filters.categories.filter(c => c !== category);
    
    onFiltersChange({ ...filters, categories: newCategories });
  };

  const handleFestivalChange = (festival: string, checked: boolean) => {
    const newFestivals = checked 
      ? [...filters.festivals, festival]
      : filters.festivals.filter(f => f !== festival);
    
    onFiltersChange({ ...filters, festivals: newFestivals });
  };

  const handlePriceRangeCommit = (value: number[]) => {
    const newRange: [number, number] = [value[0], value[1]];
    onFiltersChange({ ...filters, priceRange: newRange });
  };

  const activeFiltersCount = 
    filters.categories.length + 
    filters.festivals.length + 
    (filters.inStockOnly ? 1 : 0) + 
    (filters.minRating > 0 ? 1 : 0);

  if (!isOpen) {
    return (
      <div className="lg:hidden mb-4">
        <Button 
          variant="outline" 
          onClick={onToggle}
          className="w-full justify-center gap-2"
          data-testid="button-toggle-filters"
        >
          <Filter className="w-4 h-4" />
          Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filters</h3>
        <Button variant="ghost" size="icon" onClick={onToggle} data-testid="button-close-filters">
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Active Filters Summary */}
      {activeFiltersCount > 0 && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {activeFiltersCount} filter{activeFiltersCount !== 1 ? 's' : ''} applied
            </span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClearFilters}
            data-testid="button-clear-filters"
          >
            Clear All
          </Button>
        </div>
      )}

      {/* Price Range */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Price Range</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Slider
            value={localPriceRange}
            onValueChange={(value) => setLocalPriceRange([value[0], value[1]])}
            onValueCommit={handlePriceRangeCommit}
            max={2000}
            min={0}
            step={50}
            className="w-full"
            data-testid="slider-price-range"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>₹{localPriceRange[0]}</span>
            <span>₹{localPriceRange[1]}</span>
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox 
                id={`category-${category}`}
                checked={filters.categories.includes(category)}
                onCheckedChange={(checked) => handleCategoryChange(category, !!checked)}
                data-testid={`checkbox-category-${category.toLowerCase().replace(/\s+/g, '-')}`}
              />
              <label 
                htmlFor={`category-${category}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {category}
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Festivals */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Festival Type</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {festivals.map((festival) => (
            <div key={festival} className="flex items-center space-x-2">
              <Checkbox 
                id={`festival-${festival}`}
                checked={filters.festivals.includes(festival)}
                onCheckedChange={(checked) => handleFestivalChange(festival, !!checked)}
                data-testid={`checkbox-festival-${festival.toLowerCase().replace(/\s+/g, '-')}`}
              />
              <label 
                htmlFor={`festival-${festival}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {festival}
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Availability */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Availability</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="in-stock"
              checked={filters.inStockOnly}
              onCheckedChange={(checked) => 
                onFiltersChange({ ...filters, inStockOnly: !!checked })
              }
              data-testid="checkbox-in-stock"
            />
            <label 
              htmlFor="in-stock"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              In Stock Only
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Rating */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Minimum Rating</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox 
                id={`rating-${rating}`}
                checked={filters.minRating === rating}
                onCheckedChange={(checked) => 
                  onFiltersChange({ 
                    ...filters, 
                    minRating: checked ? rating : 0 
                  })
                }
                data-testid={`checkbox-rating-${rating}`}
              />
              <label 
                htmlFor={`rating-${rating}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex items-center gap-1"
              >
                {rating}+ Stars
              </label>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}