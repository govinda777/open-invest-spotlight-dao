
import * as z from "zod";

// Schema para validação de etapa
export const stepSchema = z.object({
  id: z.string().min(2, "ID deve ter pelo menos 2 caracteres"),
  title: z.string().min(2, "Título deve ter pelo menos 2 caracteres"),
  description: z.string().min(5, "Descrição deve ter pelo menos 5 caracteres"),
  nextSteps: z.array(z.string()),
  paywall: z.boolean().optional(),
});

export type StepFormValues = z.infer<typeof stepSchema>;
