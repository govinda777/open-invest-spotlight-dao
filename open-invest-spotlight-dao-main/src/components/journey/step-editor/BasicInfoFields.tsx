
import React from 'react';
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormDescription, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";

export const BasicInfoFields: React.FC = () => {
  const { control } = useFormContext();

  return (
    <>
      <FormField
        control={control}
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
        control={control}
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
        control={control}
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
    </>
  );
};
