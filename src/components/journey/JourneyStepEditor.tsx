
import React, { useEffect } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { 
  Form, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormDescription, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogFooter } from "@/components/ui/dialog";
import { Trash } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Journey, JourneyStep } from '@/journeys/map';

// Schema para validação de etapa
const stepSchema = z.object({
  id: z.string().min(2, "ID deve ter pelo menos 2 caracteres"),
  title: z.string().min(2, "Título deve ter pelo menos 2 caracteres"),
  description: z.string().min(5, "Descrição deve ter pelo menos 5 caracteres"),
  nextSteps: z.array(z.string()),
  paywall: z.boolean().optional(),
});

type FormValues = z.infer<typeof stepSchema>;

interface JourneyStepEditorProps {
  journey: Journey;
  step: JourneyStep | null;
  onSave: (values: FormValues) => void;
  onDelete?: () => void;
}

export const JourneyStepEditor = ({ journey, step, onSave, onDelete }: JourneyStepEditorProps) => {
  const form = useForm<FormValues>({
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

  const onSubmit = (values: FormValues) => {
    onSave(values);
  };

  // Obter IDs de etapas disponíveis (excluindo a etapa atual)
  const availableSteps = journey.steps
    .filter(s => !step || s.id !== step.id)
    .map(s => s.id);

  // Adicionar uma etapa ao nextSteps
  const addNextStep = (stepId: string) => {
    const currentNextSteps = form.getValues("nextSteps");
    if (!currentNextSteps.includes(stepId)) {
      form.setValue("nextSteps", [...currentNextSteps, stepId]);
    }
  };

  // Remover uma etapa do nextSteps
  const removeNextStep = (stepId: string) => {
    const currentNextSteps = form.getValues("nextSteps");
    form.setValue("nextSteps", currentNextSteps.filter(id => id !== stepId));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 my-4">
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID da Etapa</FormLabel>
              <FormControl>
                <Input placeholder="welcome" {...field} />
              </FormControl>
              <FormDescription>
                Identificador único para esta etapa (sem espaços, minúsculas)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input placeholder="Bem-vindo" {...field} />
              </FormControl>
              <FormDescription>
                Título descritivo para esta etapa
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Descreva o objetivo desta etapa..." 
                  className="min-h-[100px]"
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Explicação detalhada sobre esta etapa da jornada
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

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
                  {form.watch("nextSteps").map(stepId => (
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
                  
                  {form.watch("nextSteps").length === 0 && (
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

          <FormField
            control={form.control}
            name="paywall"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Etapa com Paywall
                  </FormLabel>
                  <FormDescription>
                    Marque esta opção se esta etapa requer acesso premium
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>

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
  );
};
