
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Map, Route, Code, Save } from 'lucide-react';
import { Journey, JourneyStep } from '@/journeys/map';
import { Dialog } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { loadJourneys, useJourneyOperations } from '@/utils/journeyUtils';
import { JourneyList } from '@/components/journey/JourneyList';
import { JourneyVisualization } from '@/components/journey/JourneyVisualization';
import { JourneyStepsList } from '@/components/journey/JourneyStepsList';
import { JourneyCodeView } from '@/components/journey/JourneyCodeView';
import { CreateJourneyDialog } from '@/components/journey/CreateJourneyDialog';
import { JourneyStepEditor } from '@/components/journey/JourneyStepEditor';
import * as z from "zod";

// Schema for step validation
const stepSchema = z.object({
  id: z.string().min(2, "ID deve ter pelo menos 2 caracteres"),
  title: z.string().min(2, "Título deve ter pelo menos 2 caracteres"),
  description: z.string().min(5, "Descrição deve ter pelo menos 5 caracteres"),
  nextSteps: z.array(z.string()),
  paywall: z.boolean().optional(),
});

const JourneyMapper = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { handleExportJourneys } = useJourneyOperations();
  
  // State
  const [journeys, setJourneys] = useState<Journey[]>(() => loadJourneys());
  const [selectedJourney, setSelectedJourney] = useState<Journey | null>(null);
  const [selectedStep, setSelectedStep] = useState<JourneyStep | null>(null);
  const [isEditingJourney, setIsEditingJourney] = useState(false);
  const [isEditingStep, setIsEditingStep] = useState(false);
  
  // Journey selection handler
  const handleSelectJourney = (journey: Journey) => {
    setSelectedJourney(journey);
    setSelectedStep(null);
  };

  // Step selection handler
  const handleSelectStep = (step: JourneyStep) => {
    setSelectedStep(step);
  };

  // Add new journey
  const handleAddJourney = (values: z.infer<typeof stepSchema>) => {
    const newJourney: Journey = {
      id: values.id,
      label: values.title,
      steps: []
    };
    
    setJourneys([...journeys, newJourney]);
    setSelectedJourney(newJourney);
    setIsEditingJourney(false);
    
    toast({
      title: "Jornada criada",
      description: `A jornada "${values.title}" foi criada com sucesso.`,
    });
  };
  
  // Add step handler
  const handleAddStep = (values: z.infer<typeof stepSchema>) => {
    if (!selectedJourney) return;
    
    const newStep: JourneyStep = {
      id: values.id,
      title: values.title,
      description: values.description,
      nextSteps: values.nextSteps,
      paywall: values.paywall,
    };
    
    const updatedJourney = {
      ...selectedJourney,
      steps: [...selectedJourney.steps, newStep]
    };
    
    setJourneys(
      journeys.map(j => j.id === selectedJourney.id ? updatedJourney : j)
    );
    setSelectedJourney(updatedJourney);
    setSelectedStep(null);
    setIsEditingStep(false);
    
    toast({
      title: "Etapa adicionada",
      description: `A etapa "${values.title}" foi adicionada à jornada.`,
    });
  };
  
  // Update step handler
  const handleUpdateStep = (values: z.infer<typeof stepSchema>) => {
    if (!selectedJourney || !selectedStep) return;
    
    const updatedStep: JourneyStep = {
      id: values.id,
      title: values.title,
      description: values.description,
      nextSteps: values.nextSteps,
      paywall: values.paywall,
    };
    
    const updatedSteps = selectedJourney.steps.map(step => 
      step.id === selectedStep.id ? updatedStep : step
    );
    
    const updatedJourney = {
      ...selectedJourney,
      steps: updatedSteps
    };
    
    setJourneys(
      journeys.map(j => j.id === selectedJourney.id ? updatedJourney : j)
    );
    setSelectedJourney(updatedJourney);
    setSelectedStep(null);
    setIsEditingStep(false);
    
    toast({
      title: "Etapa atualizada",
      description: `A etapa "${values.title}" foi atualizada com sucesso.`,
    });
  };
  
  // Delete step handler
  const handleDeleteStep = (stepId: string) => {
    if (!selectedJourney) return;
    
    const updatedSteps = selectedJourney.steps.filter(step => step.id !== stepId);
    
    // Also remove references to this step from nextSteps
    const cleanedSteps = updatedSteps.map(step => ({
      ...step,
      nextSteps: step.nextSteps.filter(nextId => 
        updatedSteps.some(s => s.id === nextId)
      )
    }));
    
    const updatedJourney = {
      ...selectedJourney,
      steps: cleanedSteps
    };
    
    setJourneys(
      journeys.map(j => j.id === selectedJourney.id ? updatedJourney : j)
    );
    setSelectedJourney(updatedJourney);
    setSelectedStep(null);
    
    toast({
      title: "Etapa removida",
      description: "A etapa foi removida da jornada.",
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Button variant="ghost" className="mb-8" onClick={() => navigate("/journeys")}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar para Jornadas
      </Button>
      
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Mapeamento de Jornadas</h1>
          <p className="text-muted-foreground mt-2">
            Crie e gerencie jornadas de usuário para o Open Invest Spotlight DAO.
          </p>
        </div>

        <div className="flex gap-4 mb-6">
          <Button variant="outline" onClick={() => handleExportJourneys(journeys)}>
            <Save className="mr-2 h-4 w-4" />
            Exportar Jornadas
          </Button>
          
          <CreateJourneyDialog
            open={isEditingJourney}
            onOpenChange={setIsEditingJourney}
            onCreateJourney={handleAddJourney}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          {/* Journey List */}
          <div className="lg:col-span-3">
            <JourneyList 
              journeys={journeys}
              selectedJourney={selectedJourney}
              onSelectJourney={handleSelectJourney}
            />
          </div>

          {/* Journey Editor */}
          <div className="lg:col-span-9">
            {selectedJourney ? (
              <Tabs defaultValue="graph">
                <TabsList className="mb-4">
                  <TabsTrigger value="graph">
                    <Map className="mr-2 h-4 w-4" />
                    Visualização
                  </TabsTrigger>
                  <TabsTrigger value="steps">
                    <Route className="mr-2 h-4 w-4" />
                    Etapas
                  </TabsTrigger>
                  <TabsTrigger value="code">
                    <Code className="mr-2 h-4 w-4" />
                    Código
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="graph" className="space-y-4">
                  <JourneyVisualization 
                    journey={selectedJourney} 
                    onSelectStep={handleSelectStep} 
                  />
                </TabsContent>

                <TabsContent value="steps" className="space-y-4">
                  <JourneyStepsList 
                    journey={selectedJourney}
                    selectedStep={selectedStep}
                    onSelectStep={(step) => {
                      handleSelectStep(step);
                      setIsEditingStep(true);
                    }}
                    onAddStep={() => {
                      setSelectedStep(null);
                      setIsEditingStep(true);
                    }}
                  />
                </TabsContent>

                <TabsContent value="code">
                  <JourneyCodeView journeys={journeys} />
                </TabsContent>
              </Tabs>
            ) : (
              <div className="flex items-center justify-center h-[500px] border-2 border-dashed rounded-md">
                <div className="text-center">
                  <Map className="h-12 w-12 mx-auto text-muted-foreground" />
                  <h3 className="mt-4 font-medium">Nenhuma jornada selecionada</h3>
                  <p className="text-muted-foreground">
                    Selecione uma jornada da lista ou crie uma nova.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Step Edit Dialog */}
      <Dialog open={isEditingStep} onOpenChange={setIsEditingStep}>
        <JourneyStepEditor 
          journey={selectedJourney}
          step={selectedStep}
          onSave={selectedStep ? handleUpdateStep : handleAddStep}
          onDelete={selectedStep ? () => handleDeleteStep(selectedStep.id) : undefined}
        />
      </Dialog>
    </div>
  );
};

export default JourneyMapper;
