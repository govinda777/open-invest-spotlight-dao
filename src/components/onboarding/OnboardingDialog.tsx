
import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, X } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import logo from '@/assets/svg/logo.svg';

interface OnboardingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OnboardingDialog({ open, onOpenChange }: OnboardingDialogProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  
  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onOpenChange(false);
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="h-6 w-auto" />
            Welcome to Open Invest DAO
          </DialogTitle>
          <DialogDescription>
            Let's get you started on your investment journey
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex items-center justify-center my-4">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full mx-1 ${
                currentStep === index + 1 ? "bg-purple-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
        
        {currentStep === 1 && (
          <div className="py-4 space-y-4">
            <h3 className="font-medium text-lg">Choose Your Journey</h3>
            <p className="text-sm text-muted-foreground">
              Open Invest DAO serves different users with unique goals:
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="border rounded-lg p-3 hover:border-primary cursor-pointer">
                <h4 className="font-medium">Investor</h4>
                <p className="text-xs text-muted-foreground">Invest in innovative projects</p>
              </div>
              <div className="border rounded-lg p-3 hover:border-primary cursor-pointer">
                <h4 className="font-medium">Project Owner</h4>
                <p className="text-xs text-muted-foreground">Submit and fund your project</p>
              </div>
            </div>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="link" className="text-sm p-0 h-auto">
                  Learn about all user types
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="space-y-2">
                  <h4 className="font-medium">User Types</h4>
                  <ul className="text-sm space-y-1">
                    <li><span className="font-medium">Investor:</span> Invest in projects</li>
                    <li><span className="font-medium">Project Owner:</span> Submit projects</li>
                    <li><span className="font-medium">DAO Member:</span> Participate in governance</li>
                    <li><span className="font-medium">Community Member:</span> Engage and learn</li>
                  </ul>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        )}
        
        {currentStep === 2 && (
          <div className="py-4 space-y-4">
            <h3 className="font-medium text-lg">How It Works</h3>
            <ol className="space-y-3">
              <li className="flex gap-3">
                <div className="bg-purple-100 text-purple-600 h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0">
                  1
                </div>
                <div>
                  <p className="font-medium">Connect Your Wallet</p>
                  <p className="text-sm text-muted-foreground">Access the full functionality of the platform</p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="bg-purple-100 text-purple-600 h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0">
                  2
                </div>
                <div>
                  <p className="font-medium">Make Initial Contribution</p>
                  <p className="text-sm text-muted-foreground">Start with an initial contribution to receive tokens</p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="bg-purple-100 text-purple-600 h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0">
                  3
                </div>
                <div>
                  <p className="font-medium">Participate in Governance</p>
                  <p className="text-sm text-muted-foreground">Vote on proposals and platform decisions</p>
                </div>
              </li>
            </ol>
          </div>
        )}
        
        {currentStep === 3 && (
          <div className="py-4 space-y-4">
            <h3 className="font-medium text-lg">Ready to Start?</h3>
            <p className="text-sm text-muted-foreground">
              You're now ready to begin your journey with Open Invest DAO.
            </p>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm">
                Explore projects, join our community, and start your investment journey today!
              </p>
            </div>
          </div>
        )}
        
        <DialogFooter className="flex items-center justify-between mt-4">
          <div>
            {currentStep > 1 && (
              <Button variant="outline" onClick={handlePrevious}>
                Previous
              </Button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Link to="/onboarding" onClick={() => onOpenChange(false)}>
              <Button variant="ghost" size="sm">
                Full Guide
              </Button>
            </Link>
            <Button onClick={handleNext}>
              {currentStep < totalSteps ? (
                <>Next <ChevronRight className="ml-1 h-4 w-4" /></>
              ) : (
                "Get Started"
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
