
import React from 'react';
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormDescription 
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { useFormContext } from "react-hook-form";

export const PaywallToggle: React.FC = () => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
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
  );
};
