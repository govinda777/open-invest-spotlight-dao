
import React from 'react';
import { FormDescription, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Trash } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormContext } from "react-hook-form";
import { Journey } from '@/journeys/map';

interface NextStepsFieldProps {
  journey: Journey | null;
  currentStepId?: string;
}

export const NextStepsField: React.FC<NextStepsFieldProps> = ({ journey, currentStepId }) => {
  const { watch, setValue } = useFormContext();
  
  // Get available steps (excluding the current step)
  const availableSteps = journey?.steps
    ?.filter(s => !currentStepId || s.id !== currentStepId)
    .map(s => s.id) || [];

  // Add a step to nextSteps
  const addNextStep = (stepId: string) => {
    const currentNextSteps = watch("nextSteps") || [];
    if (!currentNextSteps.includes(stepId)) {
      setValue("nextSteps", [...currentNextSteps, stepId]);
    }
  };

  // Remove a step from nextSteps
  const removeNextStep = (stepId: string) => {
    const currentNextSteps = watch("nextSteps") || [];
    setValue("nextSteps", currentNextSteps.filter(id => id !== stepId));
  };

  return (
    <div className="space-y-4">
      <div>
        <FormLabel>Próximas Etapas</FormLabel>
        <FormDescription className="mb-2">
          Selecione as etapas que podem ser acessadas após esta
        </FormDescription>

        {availableSteps.length > 0 ? (
          <div className="space-y-3">
            <Select onValueChange={addNextStep}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Adicionar próxima etapa" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {availableSteps.map(stepId => (
                    <SelectItem key={stepId} value={stepId}>
                      {stepId}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            
            <div className="space-y-2">
              {(watch("nextSteps") || []).map(stepId => (
                <div 
                  key={stepId} 
                  className="flex items-center justify-between p-2 bg-accent rounded-md"
                >
                  <span>{stepId}</span>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => removeNextStep(stepId)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              
              {(watch("nextSteps") || []).length === 0 && (
                <p className="text-sm text-muted-foreground italic">
                  Esta será uma etapa final da jornada.
                </p>
              )}
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Não há outras etapas disponíveis. Adicione mais etapas para criar conexões.
          </p>
        )}
      </div>
    </div>
  );
};
