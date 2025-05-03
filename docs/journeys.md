# Jornadas do Usuário

## Visão Geral

O Open Invest Spotlight DAO oferece diferentes jornadas de usuário, cada uma adaptada para um tipo específico de usuário. Este documento detalha os fluxos e funcionalidades disponíveis para cada jornada.

## Jornadas Definidas

As jornadas são definidas no arquivo `src/journeys/map.ts` e são utilizadas pelo componente `JourneyViewer` para renderizar os fluxos de usuário.

### 1. Onboarding

```typescript
const onboardingJourney: Journey = {
  id: 'onboarding',
  title: 'Bem-vindo ao Open Invest',
  steps: [
    {
      id: 'welcome',
      title: 'Boas-vindas',
      component: WelcomeStep,
    },
    {
      id: 'select-journey',
      title: 'Escolha sua Jornada',
      component: JourneySelector,
    },
    {
      id: 'understand-platform',
      title: 'Entenda a Plataforma',
      component: PlatformOverview,
    },
    {
      id: 'set-notifications',
      title: 'Configure Notificações',
      component: NotificationSettings,
    },
    {
      id: 'paywall',
      title: 'Acesso Premium',
      component: JourneyPaywall,
    },
  ],
};
```

### 2. Investidor

```typescript
const investorJourney: Journey = {
  id: 'investor',
  title: 'Jornada do Investidor',
  steps: [
    {
      id: 'discover-projects',
      title: 'Descubra Projetos',
      component: ProjectDiscovery,
    },
    {
      id: 'research',
      title: 'Pesquise Oportunidades',
      component: InvestmentResearch,
    },
    {
      id: 'invest',
      title: 'Realize Investimentos',
      component: InvestmentFlow,
    },
    {
      id: 'monitor',
      title: 'Monitore Performance',
      component: PortfolioTracker,
    },
    {
      id: 'governance',
      title: 'Participe da Governança',
      component: GovernanceParticipation,
    },
  ],
};
```

### 3. Proprietário de Projeto

```typescript
const projectOwnerJourney: Journey = {
  id: 'project-owner',
  title: 'Jornada do Proprietário',
  steps: [
    {
      id: 'submit-project',
      title: 'Submeta seu Projeto',
      component: ProjectSubmission,
    },
    {
      id: 'community-feedback',
      title: 'Receba Feedback',
      component: CommunityFeedback,
    },
    {
      id: 'launch',
      title: 'Lance seu Projeto',
      component: ProjectLaunch,
    },
    {
      id: 'development',
      title: 'Desenvolva seu Projeto',
      component: ProjectDevelopment,
    },
    {
      id: 'report-progress',
      title: 'Reporte Progresso',
      component: ProgressReporting,
    },
  ],
};
```

### 4. Membro DAO

```typescript
const daoMemberJourney: Journey = {
  id: 'dao-member',
  title: 'Jornada do Membro DAO',
  steps: [
    {
      id: 'enter-dao',
      title: 'Entre na DAO',
      component: DAOEntry,
    },
    {
      id: 'participate',
      title: 'Participe de Discussões',
      component: DiscussionParticipation,
    },
    {
      id: 'vote',
      title: 'Vote em Propostas',
      component: ProposalVoting,
    },
    {
      id: 'influence',
      title: 'Influencie a Direção',
      component: DAOInfluence,
    },
    {
      id: 'rewards',
      title: 'Receba Recompensas',
      component: RewardSystem,
    },
  ],
};
```

## Implementação

### JourneyViewer Component

```typescript
interface JourneyViewerProps {
  journey: Journey;
  currentStep: number;
  onStepChange: (step: number) => void;
}

export const JourneyViewer: React.FC<JourneyViewerProps> = ({
  journey,
  currentStep,
  onStepChange,
}) => {
  const CurrentStep = journey.steps[currentStep].component;

  return (
    <div className="journey-viewer">
      <JourneyProgress
        steps={journey.steps}
        currentStep={currentStep}
        onStepChange={onStepChange}
      />
      <div className="journey-content">
        <CurrentStep />
      </div>
    </div>
  );
};
```

### JourneyPaywall Component

```typescript
interface JourneyPaywallProps {
  onUpgrade: () => void;
  onSkip: () => void;
}

export const JourneyPaywall: React.FC<JourneyPaywallProps> = ({
  onUpgrade,
  onSkip,
}) => {
  return (
    <div className="journey-paywall">
      <h2>Acesso Premium</h2>
      <p>Desbloqueie recursos exclusivos</p>
      <div className="paywall-features">
        <ul>
          <li>Análises detalhadas</li>
          <li>Relatórios exclusivos</li>
          <li>Suporte prioritário</li>
        </ul>
      </div>
      <div className="paywall-actions">
        <button onClick={onUpgrade}>Upgrade</button>
        <button onClick={onSkip}>Pular</button>
      </div>
    </div>
  );
};
```

## Boas Práticas

### 1. Organização de Jornadas

- Agrupar por tipo de usuário
- Manter fluxos lógicos
- Incluir pontos de decisão
- Permitir navegação flexível

### 2. Navegação

```typescript
// Exemplo de navegação
const navigateJourney = (journeyId: string, stepId: string) => {
  const journey = journeys.find(j => j.id === journeyId);
  const stepIndex = journey.steps.findIndex(s => s.id === stepId);
  
  setCurrentJourney(journey);
  setCurrentStep(stepIndex);
};
```

### 3. Paywall

```typescript
// Exemplo de verificação de acesso
const checkAccess = (journey: Journey, step: number) => {
  const currentStep = journey.steps[step];
  
  if (currentStep.requiresPremium && !user.isPremium) {
    return false;
  }
  
  return true;
};
```

### 4. Testes

```typescript
// Exemplo de teste de jornada
test('should complete investor journey', async () => {
  const { getByText, getByTestId } = render(<JourneyViewer journey={investorJourney} />);
  
  // Navegação
  await userEvent.click(getByText('Próximo'));
  expect(getByTestId('current-step')).toHaveTextContent('Pesquise Oportunidades');
  
  // Interação
  await userEvent.type(getByTestId('search-input'), 'blockchain');
  await userEvent.click(getByTestId('search-button'));
  
  // Verificação
  expect(getByTestId('results')).toBeInTheDocument();
});
```

## Exemplos de Uso

### Navegando entre Passos

```typescript
const App = () => {
  const [currentJourney, setCurrentJourney] = useState(journeys[0]);
  const [currentStep, setCurrentStep] = useState(0);
  
  const handleNext = () => {
    if (currentStep < currentJourney.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  return (
    <JourneyViewer
      journey={currentJourney}
      currentStep={currentStep}
      onStepChange={setCurrentStep}
    />
  );
};
```

### Verificando Acesso ao Paywall

```typescript
const StepWrapper = ({ step, children }) => {
  const { user } = useAuth();
  
  if (step.requiresPremium && !user.isPremium) {
    return <JourneyPaywall onUpgrade={handleUpgrade} onSkip={handleSkip} />;
  }
  
  return children;
};
```

## Próximos Passos

### 1. Expansão de Jornadas

- Adicionar novas jornadas
- Refinar fluxos existentes
- Implementar personalização

### 2. Melhorias

- Análise de dados de uso
- Otimização de conversão
- Integração com analytics 