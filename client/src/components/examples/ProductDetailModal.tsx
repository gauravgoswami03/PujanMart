import { useState } from 'react';
import ProductDetailModal from '../ProductDetailModal';
import { Button } from '@/components/ui/button';
import diyaImage from '@assets/generated_images/Brass_diya_product_shot_ee1b5e3f.png';

export default function ProductDetailModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  // todo: remove mock functionality
  const mockProduct = {
    id: "diya-001",
    name: "Traditional Brass Diya Set (Pack of 5)",
    nameHindi: "पारंपरिक पीतल का दीया सेट",
    price: 299,
    originalPrice: 399,
    images: [diyaImage, diyaImage, diyaImage],
    rating: 4.5,
    reviewCount: 128,
    category: "Diya & Tila",
    inStock: true,
    stockCount: 25,
    description: "Handcrafted traditional brass diyas perfect for festivals and daily worship. Made from pure brass with intricate designs, these diyas provide a warm, spiritual ambiance to your sacred space.",
    uses: [
      "Daily evening prayers",
      "Festival celebrations", 
      "Temple decoration",
      "Meditation sessions"
    ],
    festivals: ["Diwali", "Karva Chauth", "Daily Worship"],
    specifications: {
      "Material": "Pure Brass",
      "Dimensions": "3 x 3 x 1 inches",
      "Weight": "150g per diya",
      "Finish": "Antique Brass"
    }
  };

  return (
    <div className="p-4">
      <Button onClick={() => setIsOpen(true)}>
        View Product Details
      </Button>
      <ProductDetailModal 
        product={mockProduct}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onAddToCart={(product, quantity) => console.log('Added to cart:', product.name, 'Qty:', quantity)}
        onToggleWishlist={(id) => console.log('Wishlist toggled:', id)}
        isWishlisted={false}
      />
    </div>
  );
}