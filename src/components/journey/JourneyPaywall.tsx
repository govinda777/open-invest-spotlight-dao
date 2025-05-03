
import { useState } from "react";
import { UserType } from "@/utils/userJourneys";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Clock } from "lucide-react";

interface JourneyPaywallProps {
  userType: UserType;
  onPurchase?: () => void;
}

export function JourneyPaywall({ userType, onPurchase }: JourneyPaywallProps) {
  const [purchasing, setPurchasing] = useState(false);
  
  const getUserTypeLabel = (type: UserType) => {
    switch (type) {
      case 'investor': return 'Investor';
      case 'projectOwner': return 'Project Owner';
      case 'daoMember': return 'DAO Member';
      case 'communityMember': return 'Community Member';
    }
  };

  const handlePurchase = () => {
    setPurchasing(true);
    
    // Simulate purchase process
    setTimeout(() => {
      setPurchasing(false);
      
      // Save purchase date to localStorage
      const purchaseDate = new Date();
      localStorage.setItem(`${userType}NftPurchaseDate`, purchaseDate.toISOString());
      
      toast.success("NFT purchased successfully!", {
        description: "You now have 30 days of premium access.",
      });
      
      if (onPurchase) {
        onPurchase();
      }
    }, 1500);
  };
  
  return (
    <Card className="w-full border-2 border-primary/50">
      <CardHeader className="bg-primary/5">
        <CardTitle className="flex items-center justify-between">
          <span>Unlock Advanced {getUserTypeLabel(userType)} Features</span>
        </CardTitle>
        <CardDescription>
          Upgrade your journey with our exclusive Investor NFT
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div className="grid gap-4">
          <div className="flex flex-col space-y-2">
            <h3 className="font-medium text-lg">Benefits include:</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
              <li>Exclusive access to premium {getUserTypeLabel(userType)} content</li>
              <li>Advanced tools and analytics</li>
              <li>Priority support from DAO members</li>
              <li>Governance voting rights</li>
              <li>Early access to new features</li>
            </ul>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4 pt-0">
        <div className="w-full flex justify-between items-center">
          <span className="font-medium">Price: 0.05 ETH</span>
          <Button 
            onClick={handlePurchase} 
            disabled={purchasing}
            className="w-1/2"
          >
            {purchasing ? "Processing..." : "Purchase Investor NFT"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
