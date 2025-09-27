import ProductCard from '../ProductCard';
import diyaImage from '@assets/generated_images/Brass_diya_product_shot_ee1b5e3f.png';

export default function ProductCardExample() {
  // todo: remove mock functionality
  const mockProduct = {
    id: "diya-001",
    name: "Traditional Brass Diya Set",
    nameHindi: "पारंपरिक पीतल का दीया",
    price: 299,
    originalPrice: 399,
    image: diyaImage,
    rating: 4.5,
    reviewCount: 128,
    category: "Diya",
    inStock: true,
    festivalTag: "Diwali Special"
  };

  return (
    <div className="w-80">
      <ProductCard 
        product={mockProduct}
        onAddToCart={(product) => console.log('Added to cart:', product.name)}
        onToggleWishlist={(id) => console.log('Wishlist toggled:', id)}
        onQuickView={(product) => console.log('Quick view:', product.name)}
        isWishlisted={false}
      />
    </div>
  );
}