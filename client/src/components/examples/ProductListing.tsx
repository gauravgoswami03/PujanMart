import ProductListing from '../ProductListing';

export default function ProductListingExample() {
  return (
    <ProductListing 
      searchQuery=""
      selectedCategory=""
      onProductClick={(product) => console.log('Product clicked:', product.name)}
      onAddToCart={(product) => console.log('Added to cart:', product.name)}
      onToggleWishlist={(id) => console.log('Wishlist toggled:', id)}
    />
  );
}