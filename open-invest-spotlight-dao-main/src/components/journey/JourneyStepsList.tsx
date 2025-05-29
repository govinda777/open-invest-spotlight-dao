
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import { Journey, JourneyStep } from '@/journeys/map';

interface JourneyStepsListProps {
  journey: Journey;
  selectedStep: JourneyStep | null;
  onSelectStep: (step: JourneyStep) => void;
  onAddStep: () => void;
}

export const JourneyStepsList: React.FC<JourneyStepsListProps> = ({
  journey,
  selectedStep,
  onSelectStep,
  onAddStep
}) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold mb-4">
          Etapas da Jornada: {journey.label}
        </h3>
        <Button onClick={onAddStep}>
          <Plus className="mr-2 h-4 w-4" />
          Nova Etapa
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {journey.steps.map((step) => (
          <Card 
            key={step.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedStep?.id === step.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => onSelectStep(step)}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-base">{step.title}</CardTitle>
                {step.paywall && (
                  <Badge variant="secondary" className="ml-2">
                    Paywall
                  </Badge>
                )}
              </div>
              <CardDescription className="text-xs">{step.id}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{step.description}</p>
            </CardContent>
            <CardFooter className="pt-0">
              <div className="text-xs text-muted-foreground">
                {step.nextSteps.length > 0 ? (
                  <>
                    Próx.: {step.nextSteps.join(", ")}
                  </>
                ) : (
                  "Etapa final"
                )}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
};
