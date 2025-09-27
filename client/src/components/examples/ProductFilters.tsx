import { useState } from 'react';
import ProductFilters from '../ProductFilters';

export default function ProductFiltersExample() {
  const [filters, setFilters] = useState({
    categories: [] as string[],
    festivals: ["Diwali"] as string[],
    priceRange: [0, 1000] as [number, number],
    inStockOnly: false,
    minRating: 0
  });

  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="w-80">
      <ProductFilters 
        filters={filters}
        onFiltersChange={setFilters}
        onClearFilters={() => setFilters({
          categories: [],
          festivals: [],
          priceRange: [0, 2000],
          inStockOnly: false,
          minRating: 0
        })}
        isOpen={isOpen}
        onToggle={() => setIsOpen(!isOpen)}
      />
    </div>
  );
}