import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Phone, ArrowRight, CheckCircle } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess?: (phoneNumber: string) => void;
}

export default function AuthModal({ isOpen, onClose, onAuthSuccess }: AuthModalProps) {
  const [step, setStep] = useState<'phone' | 'otp' | 'profile'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [profile, setProfile] = useState({
    name: '',
    email: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = async () => {
    if (phoneNumber.length !== 10) return;
    
    setIsLoading(true);
    // todo: remove mock functionality - Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
      console.log('OTP sent to:', phoneNumber);
    }, 1500);
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) return;
    
    setIsLoading(true);
    // todo: remove mock functionality - Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep('profile');
      console.log('OTP verified:', otp);
    }, 1000);
  };

  const handleCompleteProfile = async () => {
    if (!profile.name.trim()) return;
    
    setIsLoading(true);
    // todo: remove mock functionality - Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onAuthSuccess?.(phoneNumber);
      onClose();
      console.log('Profile completed:', profile);
    }, 1000);
  };

  const resetModal = () => {
    setStep('phone');
    setPhoneNumber('');
    setOtp('');
    setProfile({ name: '', email: '' });
    setIsLoading(false);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md" data-testid="dialog-auth">
        <DialogHeader>
          <DialogTitle className="text-center">
            {step === 'phone' && 'Welcome to PujanSamagri'}
            {step === 'otp' && 'Verify Your Number'}
            {step === 'profile' && 'Complete Your Profile'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Phone Number Step */}
          {step === 'phone' && (
            <>
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Phone className="w-8 h-8 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Enter your mobile number to continue with secure OTP verification
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="phone" className="text-sm font-medium">
                    Mobile Number
                  </Label>
                  <div className="flex mt-1">
                    <div className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted text-sm">
                      +91
                    </div>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter 10-digit mobile number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      className="rounded-l-none"
                      data-testid="input-phone"
                    />
                  </div>
                </div>

                <Button 
                  className="w-full"
                  onClick={handleSendOtp}
                  disabled={phoneNumber.length !== 10 || isLoading}
                  data-testid="button-send-otp"
                >
                  {isLoading ? 'Sending OTP...' : 'Send OTP'}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </>
          )}

          {/* OTP Verification Step */}
          {step === 'otp' && (
            <>
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">
                  We've sent a 6-digit OTP to +91 {phoneNumber}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="otp" className="text-sm font-medium">
                    Enter OTP
                  </Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="text-center text-lg tracking-widest"
                    data-testid="input-otp"
                  />
                </div>

                <Button 
                  className="w-full"
                  onClick={handleVerifyOtp}
                  disabled={otp.length !== 6 || isLoading}
                  data-testid="button-verify-otp"
                >
                  {isLoading ? 'Verifying...' : 'Verify OTP'}
                </Button>

                <div className="text-center">
                  <button 
                    className="text-sm text-primary hover:underline"
                    onClick={() => setStep('phone')}
                    data-testid="button-change-number"
                  >
                    Change Number
                  </button>
                  <span className="text-muted-foreground mx-2">•</span>
                  <button 
                    className="text-sm text-primary hover:underline"
                    onClick={handleSendOtp}
                    data-testid="button-resend-otp"
                  >
                    Resend OTP
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Profile Setup Step */}
          {step === 'profile' && (
            <>
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">🕉️</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Tell us a bit about yourself to personalize your experience
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    data-testid="input-name"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address (Optional)
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email for order updates"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    data-testid="input-email"
                  />
                </div>

                <Button 
                  className="w-full"
                  onClick={handleCompleteProfile}
                  disabled={!profile.name.trim() || isLoading}
                  data-testid="button-complete-profile"
                >
                  {isLoading ? 'Creating Account...' : 'Complete Profile'}
                </Button>
              </div>
            </>
          )}

          <Separator />

          <p className="text-xs text-center text-muted-foreground">
            By continuing, you agree to our Terms of Service and Privacy Policy.
            We respect your privacy and will never share your information.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}