
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Journey } from '@/journeys/map';
import { generateJsCode } from '@/utils/journeyUtils';
import { useToast } from "@/hooks/use-toast";

interface JourneyCodeViewProps {
  journeys: Journey[];
}

export const JourneyCodeView: React.FC<JourneyCodeViewProps> = ({ journeys }) => {
  const { toast } = useToast();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Código da Jornada</CardTitle>
        <CardDescription>
          Código TypeScript para implementação das jornadas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <pre className="p-4 rounded-md bg-secondary overflow-x-auto max-h-[600px]">
            <code className="text-sm font-mono">
              {generateJsCode(journeys)}
            </code>
          </pre>
          <Button
            variant="secondary" 
            size="sm" 
            className="absolute top-2 right-2"
            onClick={() => {
              navigator.clipboard.writeText(generateJsCode(journeys));
              toast({
                title: "Código copiado",
                description: "O código foi copiado para a área de transferência.",
              });
            }}
          >
            Copiar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
