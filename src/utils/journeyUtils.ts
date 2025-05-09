
import { Journey, JourneyStep } from '@/journeys/map';
import { useToast } from "@/hooks/use-toast";

// Load journeys from the map module
export const loadJourneys = (): Journey[] => {
  // Import journeys from the map module and create a deep copy
  const existingJourneys = require('@/journeys/map').journeys;
  return JSON.parse(JSON.stringify(existingJourneys));
};

// Export journeys as JavaScript code
export const generateJsCode = (journeys: Journey[]): string => {
  return `export type JourneyStep = {
  id: string;
  title: string;
  description: string;
  nextSteps: string[];
  paywall?: boolean;
};

export type Journey = {
  id: string;
  label: string;
  steps: JourneyStep[];
};

export const journeys: Journey[] = ${JSON.stringify(journeys, null, 2)};`;
};

// Create handlers for journey operations
export const useJourneyOperations = () => {
  const { toast } = useToast();
  
  const handleExportJourneys = (journeys: Journey[]) => {
    const journeyData = JSON.stringify(journeys, null, 2);
    
    // Create temporary element for download
    const element = document.createElement("a");
    const file = new Blob([journeyData], {type: 'application/json'});
    element.href = URL.createObjectURL(file);
    element.download = "journeys-map.json";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Exportado com sucesso",
      description: "O mapeamento de jornadas foi exportado como JSON.",
    });
  };

  return {
    handleExportJourneys
  };
};
