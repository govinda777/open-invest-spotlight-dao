
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Journey } from '@/journeys/map';

interface JourneyListProps {
  journeys: Journey[];
  selectedJourney: Journey | null;
  onSelectJourney: (journey: Journey) => void;
}

export const JourneyList: React.FC<JourneyListProps> = ({
  journeys,
  selectedJourney,
  onSelectJourney
}) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Jornadas</CardTitle>
        <CardDescription>Selecione uma jornada para editar</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {journeys.map((journey) => (
            <div
              key={journey.id}
              className={`p-3 rounded-md cursor-pointer transition-colors ${
                selectedJourney?.id === journey.id
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-accent'
              }`}
              onClick={() => onSelectJourney(journey)}
            >
              <div className="font-medium">{journey.label}</div>
              <div className="text-xs opacity-70">{journey.steps.length} etapas</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
