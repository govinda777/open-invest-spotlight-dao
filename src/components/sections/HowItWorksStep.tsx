
import React from 'react';

interface HowItWorksStepProps {
  number: number;
  title: string;
  description: string;
  isLast?: boolean;
}

const HowItWorksStep = ({ number, title, description, isLast = false }: HowItWorksStepProps) => {
  return (
    <div className="flex">
      <div className="flex flex-col items-center mr-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-dao-purple text-white font-bold">
          {number}
        </div>
        {!isLast && <div className="h-full w-0.5 bg-dao-lightPurple/30 my-2"></div>}
      </div>
      <div className="pb-8">
        <h3 className="text-xl font-medium mb-2">{title}</h3>
        <p className="text-slate-600">{description}</p>
      </div>
    </div>
  );
};

export default HowItWorksStep;
