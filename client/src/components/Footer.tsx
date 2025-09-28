import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Instagram, 
  Twitter,
  Heart
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-card-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold font-hindi">॥</span>
              </div>
              <h3 className="text-xl font-bold text-card-foreground font-serif">
                Maruti Pujan Samagri
              </h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Your trusted source for authentic Hindu pujan samagri. Bringing spirituality 
              and tradition to your doorstep with pure, blessed items for all rituals.
            </p>
            <div className="flex gap-3">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 hover-elevate"
                data-testid="button-facebook"
              >
                <Facebook className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 hover-elevate"
                data-testid="button-instagram"
              >
                <Instagram className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 hover-elevate"
                data-testid="button-twitter"
              >
                <Twitter className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-card-foreground">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {[
                "All Categories",
                "Festival Collections", 
                "Daily Worship Items",
                "Bulk Orders",
                "Gift Cards",
                "Temple Partnerships"
              ].map((link) => (
                <li key={link}>
                  <button 
                    className="text-muted-foreground hover:text-card-foreground transition-colors hover-elevate"
                    onClick={() => console.log(`Navigate to ${link}`)}
                    data-testid={`link-${link.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Support */}
          <div className="space-y-4">
            <h4 className="font-semibold text-card-foreground">Support</h4>
            <ul className="space-y-2 text-sm">
              {[
                "Contact Us",
                "Track Your Order",
                "Shipping & Returns", 
                "Size Guide",
                "FAQ",
                "Ritual Guidance"
              ].map((link) => (
                <li key={link}>
                  <button 
                    className="text-muted-foreground hover:text-card-foreground transition-colors hover-elevate"
                    onClick={() => console.log(`Navigate to ${link}`)}
                    data-testid={`link-${link.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
            
            {/* Contact Info */}
            <div className="space-y-3 pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-primary" />
                <span data-testid="text-phone">+91 94254-55256</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-primary" />
                <span data-testid="text-email">ggoswami312@gmail.com</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                <address className="not-italic leading-snug" data-testid="text-address">
                  <span>Besides Ramkumar School,</span><br />
                  <span>Kirti Stambh to District Hospital Road,</span><br />
                  <span>Damoh, MP 470661, India</span>
                </address>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-semibold text-card-foreground">Festival Updates</h4>
            <p className="text-sm text-muted-foreground">
              Get notified about upcoming festivals and special pujan item collections.
            </p>
            <div className="space-y-3">
              <Input 
                type="email" 
                placeholder="Enter your email"
                className="text-sm"
                data-testid="input-newsletter-email"
              />
              <Button 
                className="w-full hover-elevate active-elevate-2"
                data-testid="button-subscribe"
              >
                Subscribe
              </Button>
            </div>
            
            {/* Trust Badges */}
            <div className="space-y-2 pt-4">
              <Badge variant="secondary" className="text-xs">
                ✓ 100% Authentic Items
              </Badge>
              <Badge variant="secondary" className="text-xs">
                ✓ Free Shipping Above ₹499
              </Badge>
              <Badge variant="secondary" className="text-xs">
                ✓ 10,000+ Happy Customers
              </Badge>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>© {currentYear} PujanSamagri. All rights reserved.</span>
          </div>
          
          <div className="flex items-center gap-1">
            <span>Made with</span>
            <Heart className="w-4 h-4 fill-red-500 text-red-500" />
            <span>for devotees worldwide</span>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              className="hover:text-card-foreground transition-colors hover-elevate"
              onClick={() => console.log('Privacy Policy')}
              data-testid="link-privacy"
            >
              Privacy Policy
            </button>
            <button 
              className="hover:text-card-foreground transition-colors hover-elevate"
              onClick={() => console.log('Terms of Service')}
              data-testid="link-terms"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}