import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";

// Import product images
import diyaImage from '@assets/generated_images/Brass_diya_product_shot_ee1b5e3f.png';
import coconutImage from '@assets/generated_images/Sacred_coconut_product_shot_d4950347.png';
import incenseImage from '@assets/generated_images/Incense_and_sandalwood_products_48558875.png';
import flowersImage from '@assets/generated_images/Traditional_flowers_for_worship_17468d74.png';
import collectionImage from '@assets/generated_images/Pujan_samagri_collection_product_c5a56f04.png';

interface Category {
  id: string;
  name: string;
  nameHindi?: string;
  image: string;
  itemCount: number;
  description: string;
  featured?: boolean;
}

interface CategoryGridProps {
  onCategoryClick?: (category: Category) => void;
}

export default function CategoryGrid({ onCategoryClick }: CategoryGridProps) {
  // todo: remove mock functionality
  const categories: Category[] = [
    {
      id: "diya-tila",
      name: "Diya & Tila",
      nameHindi: "दीया और तिल",
      image: diyaImage,
      itemCount: 45,
      description: "Traditional oil lamps for festivals",
      featured: true
    },
    {
      id: "narial",
      name: "Narial (Coconut)",
      nameHindi: "नारियल",
      image: coconutImage,
      itemCount: 12,
      description: "Sacred coconuts for rituals",
      featured: false
    },
    {
      id: "dhoop-agarbatti",
      name: "Dhoop & Agarbatti",
      nameHindi: "धूप और अगरबत्ती",
      image: incenseImage,
      itemCount: 78,
      description: "Incense sticks and dhoop cones",
      featured: true
    },
    {
      id: "flowers",
      name: "Paan & Fool (Flowers)",
      nameHindi: "पान और फूल",
      image: flowersImage,
      itemCount: 34,
      description: "Fresh flowers and betel leaves",
      featured: false
    },
    {
      id: "chandan-roli",
      name: "Chandan & Roli",
      nameHindi: "चन्दन और रोली",
      image: incenseImage,
      itemCount: 23,
      description: "Sandalwood paste and vermillion",
      featured: false
    },
    {
      id: "kalash-thali",
      name: "Kalash & Pujan Thali",
      nameHindi: "कलश और पूजन थाली",
      image: collectionImage,
      itemCount: 56,
      description: "Sacred vessels and worship plates",
      featured: true
    }
  ];

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 font-serif">
            Shop by Category
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover authentic pujan samagri organized by traditional categories for all your spiritual needs
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card 
              key={category.id}
              className="group cursor-pointer overflow-hidden border-card-border hover-elevate transition-all duration-300"
              onClick={() => onCategoryClick?.(category)}
              data-testid={`card-category-${category.id}`}
            >
              <CardContent className="p-0">
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    data-testid={`img-category-${category.id}`}
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  
                  {/* Featured Badge */}
                  {category.featured && (
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-primary hover:bg-primary text-primary-foreground">
                        Featured
                      </Badge>
                    </div>
                  )}

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg mb-1" data-testid={`text-category-name-${category.id}`}>
                          {category.name}
                        </h3>
                        {category.nameHindi && (
                          <p className="text-sm text-white/80 font-hindi mb-1">
                            {category.nameHindi}
                          </p>
                        )}
                        <p className="text-xs text-white/70 mb-2">
                          {category.description}
                        </p>
                        <Badge variant="secondary" className="text-xs bg-white/20 text-white border-white/30">
                          {category.itemCount} items
                        </Badge>
                      </div>
                      <ChevronRight className="w-5 h-5 text-white/80 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-8">
          <button 
            className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-2 hover-elevate"
            onClick={() => console.log('View all categories')}
            data-testid="button-view-all-categories"
          >
            View All Categories
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}