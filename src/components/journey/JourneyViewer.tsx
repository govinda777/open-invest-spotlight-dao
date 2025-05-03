
import React, { useState } from 'react';
import { UserJourney, JourneyStep as JourneyStepType, UserType } from '@/utils/userJourneys';
import { JourneyStep } from './JourneyStep';
import { JourneyProgress } from './JourneyProgress';
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Info } from 'lucide-react';

interface JourneyViewerProps {
  journey: UserJourney;
  onCompleteStep?: (stepId: string) => void;
}

export const JourneyViewer = ({ journey, onCompleteStep }: JourneyViewerProps) => {
  const { toast } = useToast();
  const progress = Math.round((journey.completedSteps.length / Object.keys(journey.steps).length) * 100);
  const [showTip, setShowTip] = useState(false);

  const handleCompleteStep = (step: JourneyStepType) => {
    if (onCompleteStep) {
      onCompleteStep(step.id);
      toast({
        title: "Step completed",
        description: `You've completed: ${step.title}`,
      });
    }
  };

  const getUserTypeLabel = (type: UserType) => {
    switch (type) {
      case 'investor': return 'Investor';
      case 'projectOwner': return 'Project Owner';
      case 'daoMember': return 'DAO Member';
      case 'communityMember': return 'Community Member';
    }
  };

  // Convert step details from description to array of points
  const getStepDetails = (step: JourneyStepType): string[] => {
    const details = step.description.split('.');
    return details.filter(d => d.trim().length > 0).map(d => `${d.trim()}`);
  };

  return (
    <div className="space-y-8 my-6">
      <JourneyProgress progress={progress} userType={getUserTypeLabel(journey.userType)} />
      
      {showTip && (
        <Alert className="bg-blue-50 border-blue-200">
          <Info className="h-4 w-4 text-blue-500" />
          <AlertTitle>Journey Information</AlertTitle>
          <AlertDescription>
            Complete each step in your journey to unlock new features and opportunities.
            Click "Complete Step" when you finish an activity to track your progress.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(journey.steps).map(([id, step], index) => {
          const isCompleted = journey.completedSteps.includes(id);
          const isCurrentStep = journey.currentStep === id;
          
          return (
            <div key={id} className="flex flex-col">
              <JourneyStep
                title={step.title}
                description={step.description}
                isCompleted={isCompleted}
                isActive={isCurrentStep}
                stepNumber={index + 1}
                details={getStepDetails(step)}
              />
              
              {isCurrentStep && !isCompleted && onCompleteStep && (
                <Button 
                  className="mt-2 self-end"
                  onClick={() => handleCompleteStep(step)}
                >
                  Complete Step <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
