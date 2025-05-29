
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

interface HowItWorksStepProps {
  number: number;
  title: string;
  description: string;
  details?: string;
  isLast?: boolean;
}

const HowItWorksStep = ({ 
  number, 
  title, 
  description, 
  details,
  isLast = false 
}: HowItWorksStepProps) => {
  return (
    <div className="flex">
      <div className="flex flex-col items-center mr-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-dao-purple text-white font-bold">
          {number}
        </div>
        {!isLast && <div className="h-full w-0.5 bg-dao-lightPurple/30 my-2"></div>}
      </div>
      <div className="pb-8">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-medium mb-2">{title}</h3>
          {details && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="cursor-help">
                  <Info size={16} className="text-dao-purple" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs text-sm p-2">
                  {details}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <p className="text-slate-600">{description}</p>
      </div>
    </div>
  );
};

export default HowItWorksStep;
