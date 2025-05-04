
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Form, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormDescription, 
  FormMessage 
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Map, Route, Plus, Flow, Save } from 'lucide-react';
import { Journey, JourneyStep } from '@/journeys/map';
import { JourneyGraph } from '@/components/journey/JourneyGraph';
import { JourneyStepEditor } from '@/components/journey/JourneyStepEditor';
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Schema para validação do formulário
const journeySchema = z.object({
  id: z.string().min(2, "ID deve ter pelo menos 2 caracteres"),
  label: z.string().min(3, "Título deve ter pelo menos 3 caracteres"),
});

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
  const [journeys, setJourneys] = useState<Journey[]>(() => {
    // Importar jornadas existentes
    const existingJourneys = require('@/journeys/map').journeys;
    return JSON.parse(JSON.stringify(existingJourneys));
  });
  
  const [selectedJourney, setSelectedJourney] = useState<Journey | null>(null);
  const [selectedStep, setSelectedStep] = useState<JourneyStep | null>(null);
  const [isEditingJourney, setIsEditingJourney] = useState(false);
  const [isEditingStep, setIsEditingStep] = useState(false);
  
  const form = useForm<z.infer<typeof journeySchema>>({
    resolver: zodResolver(journeySchema),
    defaultValues: {
      id: "",
      label: "",
    },
  });
  
  const stepForm = useForm<z.infer<typeof stepSchema>>({
    resolver: zodResolver(stepSchema),
    defaultValues: {
      id: "",
      title: "",
      description: "",
      nextSteps: [],
      paywall: false,
    },
  });
  
  // Seleção de jornada
  const handleSelectJourney = (journey: Journey) => {
    setSelectedJourney(journey);
    setSelectedStep(null);
  };

  // Seleção de etapa
  const handleSelectStep = (step: JourneyStep) => {
    setSelectedStep(step);
    stepForm.reset({
      id: step.id,
      title: step.title,
      description: step.description,
      nextSteps: step.nextSteps,
      paywall: step.paywall || false,
    });
  };

  // Adição de nova jornada
  const handleAddJourney = (values: z.infer<typeof journeySchema>) => {
    const newJourney: Journey = {
      id: values.id,
      label: values.label,
      steps: []
    };
    
    setJourneys([...journeys, newJourney]);
    setSelectedJourney(newJourney);
    setIsEditingJourney(false);
    form.reset();
    
    toast({
      title: "Jornada criada",
      description: `A jornada "${values.label}" foi criada com sucesso.`,
    });
  };
  
  // Adição de nova etapa
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
    stepForm.reset();
    
    toast({
      title: "Etapa adicionada",
      description: `A etapa "${values.title}" foi adicionada à jornada.`,
    });
  };
  
  // Atualização de etapa existente
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
  
  // Remover etapa
  const handleDeleteStep = (stepId: string) => {
    if (!selectedJourney) return;
    
    const updatedSteps = selectedJourney.steps.filter(step => step.id !== stepId);
    
    // Também remover referências a essa etapa de nextSteps
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
  
  // Exportar jornadas
  const handleExportJourneys = () => {
    const journeyData = JSON.stringify(journeys, null, 2);
    
    // Criar elemento temporário para download
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
  
  // Código para gerar JS a partir do JSON
  const generateJsCode = () => {
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
          <Button variant="outline" onClick={handleExportJourneys}>
            <Save className="mr-2 h-4 w-4" />
            Exportar Jornadas
          </Button>
          
          <Dialog open={isEditingJourney} onOpenChange={setIsEditingJourney}>
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
                <form onSubmit={form.handleSubmit(handleAddJourney)} className="space-y-4">
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
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          {/* Lista de Jornadas */}
          <div className="lg:col-span-3">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Jornadas</CardTitle>
                <CardDescription>Selecione uma jornada para editar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {journeys.map((journey) => (
                    <div
                      key={journey.id}
                      className={`p-3 rounded-md cursor-pointer transition-colors ${
                        selectedJourney?.id === journey.id
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-accent'
                      }`}
                      onClick={() => handleSelectJourney(journey)}
                    >
                      <div className="font-medium">{journey.label}</div>
                      <div className="text-xs opacity-70">{journey.steps.length} etapas</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Editor de Jornada */}
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
                    <Flow className="mr-2 h-4 w-4" />
                    Código
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="graph" className="space-y-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle>Mapa da Jornada: {selectedJourney.label}</CardTitle>
                      <CardDescription>
                        Visualização gráfica das etapas e fluxos da jornada
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-[500px] overflow-auto bg-accent/20 rounded-md">
                      <JourneyGraph journey={selectedJourney} onSelectStep={handleSelectStep} />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="steps" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold mb-4">
                      Etapas da Jornada: {selectedJourney.label}
                    </h3>
                    
                    <Dialog open={isEditingStep} onOpenChange={setIsEditingStep}>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="mr-2 h-4 w-4" />
                          Nova Etapa
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-lg">
                        <DialogHeader>
                          <DialogTitle>
                            {selectedStep ? "Editar Etapa" : "Adicionar Nova Etapa"}
                          </DialogTitle>
                          <DialogDescription>
                            {selectedStep 
                              ? "Modifique os detalhes desta etapa da jornada."
                              : "Defina os detalhes para uma nova etapa na jornada."}
                          </DialogDescription>
                        </DialogHeader>
                        <JourneyStepEditor 
                          journey={selectedJourney}
                          step={selectedStep}
                          onSave={selectedStep ? handleUpdateStep : handleAddStep}
                          onDelete={selectedStep ? () => handleDeleteStep(selectedStep.id) : undefined}
                        />
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    {selectedJourney.steps.map((step) => (
                      <Card 
                        key={step.id}
                        className={`cursor-pointer transition-all hover:shadow-md ${
                          selectedStep?.id === step.id ? 'ring-2 ring-primary' : ''
                        }`}
                        onClick={() => {
                          handleSelectStep(step);
                          setIsEditingStep(true);
                        }}
                      >
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-center">
                            <CardTitle className="text-base">{step.title}</CardTitle>
                            {step.paywall && (
                              <Badge variant="secondary" className="ml-2">
                                Paywall
                              </Badge>
                            )}
                          </div>
                          <CardDescription className="text-xs">{step.id}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm">{step.description}</p>
                        </CardContent>
                        <CardFooter className="pt-0">
                          <div className="text-xs text-muted-foreground">
                            {step.nextSteps.length > 0 ? (
                              <>
                                Próx.: {step.nextSteps.join(", ")}
                              </>
                            ) : (
                              "Etapa final"
                            )}
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="code">
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
                            {generateJsCode()}
                          </code>
                        </pre>
                        <Button
                          variant="secondary" 
                          size="sm" 
                          className="absolute top-2 right-2"
                          onClick={() => {
                            navigator.clipboard.writeText(generateJsCode());
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
    </div>
  );
};

export default JourneyMapper;
