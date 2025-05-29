
import React from 'react';
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
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from 'lucide-react';

// Schema for form validation
const journeySchema = z.object({
  id: z.string().min(2, "ID deve ter pelo menos 2 caracteres"),
  label: z.string().min(3, "Título deve ter pelo menos 3 caracteres"),
});

interface CreateJourneyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateJourney: (values: z.infer<typeof journeySchema>) => void;
}

export const CreateJourneyDialog: React.FC<CreateJourneyDialogProps> = ({
  open,
  onOpenChange,
  onCreateJourney
}) => {
  const form = useForm<z.infer<typeof journeySchema>>({
    resolver: zodResolver(journeySchema),
    defaultValues: {
      id: "",
      label: "",
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nova Jornada
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar Nova Jornada</DialogTitle>
          <DialogDescription>
            Defina os detalhes básicos para uma nova jornada de usuário.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onCreateJourney)} className="space-y-4">
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ID da Jornada</FormLabel>
                  <FormControl>
                    <Input placeholder="investor" {...field} />
                  </FormControl>
                  <FormDescription>
                    Um identificador único para esta jornada (sem espaços, minúsculas)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título da Jornada</FormLabel>
                  <FormControl>
                    <Input placeholder="Investidor" {...field} />
                  </FormControl>
                  <FormDescription>
                    Um título amigável para exibição ao usuário
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button type="submit">Criar Jornada</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
