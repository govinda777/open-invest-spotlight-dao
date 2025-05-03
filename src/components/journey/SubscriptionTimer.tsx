
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clock } from "lucide-react";
import { UserType } from "@/utils/userJourneys";

interface SubscriptionTimerProps {
  userType: UserType;
}

export function SubscriptionTimer({ userType }: SubscriptionTimerProps) {
  const [daysLeft, setDaysLeft] = useState<number>(30);
  const [progress, setProgress] = useState<number>(100);
  
  useEffect(() => {
    const calculateRemainingTime = () => {
      const purchaseDateStr = localStorage.getItem(`${userType}NftPurchaseDate`);
      
      if (!purchaseDateStr) {
        return { daysLeft: 0, progress: 0 };
      }
      
      const purchaseDate = new Date(purchaseDateStr);
      const now = new Date();
      
      // Calculate days left (30 days subscription)
      const expirationDate = new Date(purchaseDate);
      expirationDate.setDate(expirationDate.getDate() + 30);
      
      const totalDays = 30;
      const msLeft = expirationDate.getTime() - now.getTime();
      const daysLeft = Math.max(0, Math.ceil(msLeft / (1000 * 60 * 60 * 24)));
      
      // Calculate progress percentage
      const progress = Math.max(0, Math.min(100, (daysLeft / totalDays) * 100));
      
      return { daysLeft, progress };
    };
    
    const { daysLeft, progress } = calculateRemainingTime();
    setDaysLeft(daysLeft);
    setProgress(progress);
    
    // Update every day
    const interval = setInterval(() => {
      const { daysLeft, progress } = calculateRemainingTime();
      setDaysLeft(daysLeft);
      setProgress(progress);
    }, 86400000); // 24 hours
    
    return () => clearInterval(interval);
  }, [userType]);
  
  if (daysLeft <= 0) {
    return null;
  }
  
  return (
    <Card className="w-full border-2 border-green-500/50 mb-6">
      <CardHeader className="bg-green-50 pb-2">
        <CardTitle className="flex items-center text-green-700">
          <Clock className="mr-2 h-5 w-5" />
          <span>Active Subscription</span>
        </CardTitle>
        <CardDescription className="text-green-700/80">
          Your Investor NFT subscription is active
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">
              {daysLeft} {daysLeft === 1 ? 'day' : 'days'} remaining
            </span>
            <span className="text-muted-foreground">30 days total</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
}
