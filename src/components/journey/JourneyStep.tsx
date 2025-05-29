
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface JourneyStepProps {
  title: string;
  description: string;
  isCompleted: boolean;
  isActive: boolean;
  stepNumber: number;
  details?: string[];
}

export const JourneyStep = ({ 
  title, 
  description, 
  isCompleted, 
  isActive,
  stepNumber,
  details = [] 
}: JourneyStepProps) => {
  return (
    <Card className={`relative transition-all duration-300 ${
      isActive ? 'border-primary shadow-md' : 
      isCompleted ? 'border-green-500' : 'border-muted'
    }`}>
      <Badge 
        className={`absolute -top-3 -left-3 ${
          isCompleted ? 'bg-green-500' : isActive ? 'bg-primary' : 'bg-muted-foreground'
        }`}
      >
        {isCompleted ? <Check size={16} /> : stepNumber}
      </Badge>
      
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-lg">
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      
      {details.length > 0 && (
        <CardContent>
          <ul className="space-y-1 list-inside">
            {details.map((detail, index) => (
              <li key={index} className="text-sm flex items-start">
                <ChevronRight size={16} className="mr-1 mt-1 flex-shrink-0" />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      )}
    </Card>
  );
};
