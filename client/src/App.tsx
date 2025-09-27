import { useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

// Components
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CategoryGrid from "@/components/CategoryGrid";
import ProductListing from "@/components/ProductListing";
import Footer from "@/components/Footer";
import AuthModal from "@/components/AuthModal";
import ProductDetailModal from "@/components/ProductDetailModal";
import ShoppingCart from "@/components/ShoppingCart";

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

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  maxQuantity?: number;
}

function Home() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [user, setUser] = useState<{ phone: string; name: string } | null>(null);
  const [wishlistedProducts, setWishlistedProducts] = useState<Set<string>>(new Set());

  // todo: remove mock functionality
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "diya-001",
      name: "Traditional Brass Diya Set",
      price: 299,
      quantity: 1,
      image: diyaImage,
      maxQuantity: 10
    }
  ]);

  // Mock product for detailed view
  const createDetailedProduct = (basicProduct: any): Product => ({
    ...basicProduct,
    images: [basicProduct.image, basicProduct.image, basicProduct.image],
    stockCount: 25,
    description: "Handcrafted traditional item perfect for festivals and daily worship. Made with authentic materials following traditional methods.",
    uses: [
      "Daily prayers and worship",
      "Festival celebrations",
      "Temple decoration",
      "Meditation sessions"
    ],
    festivals: ["Diwali", "Navratri", "Daily Worship"]
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedCategory(""); // Clear category when searching
  };

  const handleCategoryClick = (category: any) => {
    setSelectedCategory(category.name);
    setSearchQuery(""); // Clear search when selecting category
  };

  const handleAuthSuccess = (phoneNumber: string) => {
    setUser({ phone: phoneNumber, name: "Devotee" });
    toast({
      title: "Welcome to PujanSamagri!",
      description: "You're now logged in and ready to shop for sacred items.",
    });
  };

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCartItems(current => {
      const existingItem = current.find(item => item.id === product.id);
      if (existingItem) {
        return current.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        const newItem: CartItem = {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: quantity,
          image: product.image,
          maxQuantity: product.stockCount
        };
        return [...current, newItem];
      }
    });

    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleUpdateCartQuantity = (itemId: string, quantity: number) => {
    setCartItems(current =>
      current.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveCartItem = (itemId: string) => {
    setCartItems(current => current.filter(item => item.id !== itemId));
    toast({
      title: "Item Removed",
      description: "Item has been removed from your cart.",
    });
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlistedProducts(current => {
      const newSet = new Set(current);
      if (newSet.has(productId)) {
        newSet.delete(productId);
        toast({
          title: "Removed from Wishlist",
          description: "Item has been removed from your wishlist.",
        });
      } else {
        newSet.add(productId);
        toast({
          title: "Added to Wishlist",
          description: "Item has been added to your wishlist.",
        });
      }
      return newSet;
    });
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(createDetailedProduct(product));
  };

  const handleCheckout = () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    
    toast({
      title: "Proceeding to Checkout",
      description: "Redirecting to secure payment page...",
    });
    console.log("Checkout with items:", cartItems);
  };

  const handleShopNow = () => {
    // Scroll to product listing section
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleExploreCategories = () => {
    // Scroll to categories section  
    document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });
  };

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header
        cartItemCount={totalCartItems}
        onCartClick={() => setIsCartOpen(true)}
        onAuthClick={() => setIsAuthModalOpen(true)}
        onSearchChange={handleSearch}
      />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <HeroSection
          onShopNowClick={handleShopNow}
          onExploreClick={handleExploreCategories}
        />

        {/* Categories Section */}
        <section id="categories">
          <CategoryGrid onCategoryClick={handleCategoryClick} />
        </section>

        {/* Products Section */}
        <section id="products" className="py-12 bg-muted/30">
          <ProductListing
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            onProductClick={handleProductClick}
            onAddToCart={(product) => handleAddToCart(product, 1)}
            onToggleWishlist={handleToggleWishlist}
          />
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals and Overlays */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      <ProductDetailModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={selectedProduct ? wishlistedProducts.has(selectedProduct.id) : false}
      />

      <ShoppingCart
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={handleCheckout}
        isOpen={isCartOpen}
        onOpenChange={setIsCartOpen}
      />

      {/* User Status Display */}
      {user && (
        <div className="fixed top-20 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm z-40">
          Welcome, {user.name}!
        </div>
      )}
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/products" component={Home} />
      <Route path="/category/:name" component={Home} />
      <Route component={() => <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
        <p className="text-muted-foreground">The page you're looking for doesn't exist.</p>
      </div>} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
