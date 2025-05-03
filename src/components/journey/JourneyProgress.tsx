
import React from 'react';
import { Progress } from "@/components/ui/progress";

interface JourneyProgressProps {
  progress: number;
  userType: string;
}

export const JourneyProgress = ({ progress, userType }: JourneyProgressProps) => {
  return (
    <div className="space-y-2 mb-6">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">Journey Progress</h3>
        <span className="text-sm font-semibold">{progress}%</span>
      </div>
      <Progress value={progress} className="h-2" />
      <p className="text-xs text-muted-foreground">
        Your {userType} journey is {progress < 100 ? 'in progress' : 'complete'}
      </p>
    </div>
  );
};
