
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Journey, JourneyStep } from '@/journeys/map';
import { JourneyGraph } from '@/components/journey/JourneyGraph';

interface JourneyVisualizationProps {
  journey: Journey;
  onSelectStep: (step: JourneyStep) => void;
}

export const JourneyVisualization: React.FC<JourneyVisualizationProps> = ({ 
  journey, 
  onSelectStep 
}) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Mapa da Jornada: {journey.label}</CardTitle>
        <CardDescription>
          Visualização gráfica das etapas e fluxos da jornada
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[500px] overflow-auto bg-accent/20 rounded-md">
        <JourneyGraph journey={journey} onSelectStep={onSelectStep} />
      </CardContent>
    </Card>
  );
};
