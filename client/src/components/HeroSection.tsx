import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImage from '@assets/generated_images/Traditional_pujan_thali_hero_5baa809c.png';

interface HeroSectionProps {
  onShopNowClick?: () => void;
  onExploreClick?: () => void;
}

export default function HeroSection({ onShopNowClick, onExploreClick }: HeroSectionProps) {
  return (
    <section className="relative min-h-[500px] lg:min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-2xl mx-auto text-center text-white">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span className="text-sm font-medium">Sacred & Authentic</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 font-serif leading-tight">
            Sacred Pujan Samagri
            <br />
            <span className="text-yellow-300">for Every Ritual</span>
          </h1>

          {/* Description */}
          <p className="text-lg lg:text-xl mb-8 text-white/90 leading-relaxed">
            Discover authentic Hindu ritual items for Diwali, Navratri, Ganesh Chaturthi, 
            and daily worship. Pure, traditional, and blessed for your spiritual journey.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover-elevate"
              onClick={onShopNowClick}
              data-testid="button-shop-now"
            >
              Shop Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover-elevate"
              onClick={onExploreClick}
              data-testid="button-explore"
            >
              Explore Categories
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-yellow-300">10k+</div>
              <div className="text-sm text-white/80">Happy Devotees</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-300">100%</div>
              <div className="text-sm text-white/80">Authentic Items</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-300">24/7</div>
              <div className="text-sm text-white/80">Festival Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
}