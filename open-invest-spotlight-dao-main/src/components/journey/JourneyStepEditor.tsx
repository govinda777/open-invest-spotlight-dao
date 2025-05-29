
import React, { useEffect } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { 
  Form
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Trash } from 'lucide-react';
import { DialogFooter } from "@/components/ui/dialog";
import { Journey, JourneyStep } from '@/journeys/map';

import { BasicInfoFields } from './step-editor/BasicInfoFields';
import { NextStepsField } from './step-editor/NextStepsField';
import { PaywallToggle } from './step-editor/PaywallToggle';
import { stepSchema, StepFormValues } from './step-editor/schema';

interface JourneyStepEditorProps {
  journey: Journey | null;
  step: JourneyStep | null;
  onSave: (values: StepFormValues) => void;
  onDelete?: () => void;
}

export const JourneyStepEditor = ({ journey, step, onSave, onDelete }: JourneyStepEditorProps) => {
  const form = useForm<StepFormValues>({
    resolver: zodResolver(stepSchema),
    defaultValues: {
      id: step?.id || "",
      title: step?.title || "",
      description: step?.description || "",
      nextSteps: step?.nextSteps || [],
      paywall: step?.paywall || false,
    },
  });

  // Atualizar o formulário quando a etapa mudar
  useEffect(() => {
    if (step) {
      form.reset({
        id: step.id,
        title: step.title,
        description: step.description,
        nextSteps: step.nextSteps,
        paywall: step.paywall || false,
      });
    } else {
      form.reset({
        id: "",
        title: "",
        description: "",
        nextSteps: [],
        paywall: false,
      });
    }
  }, [step, form]);

  const onSubmit = (values: StepFormValues) => {
    onSave(values);
  };

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 my-4">
          <BasicInfoFields />
          <NextStepsField journey={journey} currentStepId={step?.id} />
          <PaywallToggle />

          <DialogFooter className="flex justify-between">
            {onDelete && (
              <Button 
                type="button" 
                variant="destructive" 
                onClick={onDelete}
              >
                <Trash className="mr-2 h-4 w-4" />
                Excluir Etapa
              </Button>
            )}
            <Button type="submit">
              {step ? "Atualizar Etapa" : "Adicionar Etapa"}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </FormProvider>
  );
};
