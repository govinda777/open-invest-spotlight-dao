export type JourneyStep = {
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

export const journeys: Journey[] = [
  {
    id: 'onboarding',
    label: 'Onboarding',
    steps: [
      { 
        id: 'welcome', 
        title: 'Bem-vindo', 
        description: 'Introdução ao Open Invest Spotlight DAO', 
        nextSteps: ['chooseJourney'] 
      },
      { 
        id: 'chooseJourney', 
        title: 'Escolha sua Jornada', 
        description: 'Selecione o tipo de usuário que melhor se encaixa com você', 
        nextSteps: ['howItWorks'] 
      },
      { 
        id: 'howItWorks', 
        title: 'Como Funciona', 
        description: 'Entenda como o Open Invest Spotlight DAO funciona', 
        nextSteps: ['notifications'] 
      },
      { 
        id: 'notifications', 
        title: 'Notificações', 
        description: 'Configure suas preferências de notificação', 
        nextSteps: ['paywall'],
        paywall: true 
      },
      { 
        id: 'paywall', 
        title: 'Paywall', 
        description: 'Desbloqueie recursos premium para uma experiência completa', 
        nextSteps: [] 
      },
    ]
  },
  {
    id: 'investor',
    label: 'Investidor',
    steps: [
      {
        id: 'portfolio',
        title: 'Portfólio',
        description: 'Gerencie seus investimentos',
        nextSteps: ['analysis']
      },
      {
        id: 'analysis',
        title: 'Análise',
        description: 'Acesse análises detalhadas',
        nextSteps: ['recommendations'],
        paywall: true
      },
      {
        id: 'recommendations',
        title: 'Recomendações',
        description: 'Receba recomendações personalizadas',
        nextSteps: []
      }
    ]
  }
]; 