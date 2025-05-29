Planejamento, Execução e Testes para Centralização das Jornadas

As jornadas do projeto é estruturada no arquivo `src/journeys/map.ts`, e é utilizada no componente `JourneyViewer.tsx` para renderizar as jornadas.

### 1. **Planejamento**

**Objetivo:**  
Centralizar a definição das jornadas do usuário em um único arquivo de configuração, facilitando visualização, manutenção e controle de bloqueios como paywall.

**Tarefas:**
- [ ] Criar um arquivo `src/journeys/map.ts` contendo todas as jornadas, passos, caminhos e flags de paywall.
- [ ] Refatorar componentes (`JourneyViewer`, `Onboarding`, etc.) para consumir esse mapa ao invés de objetos locais.
- [ ] Garantir que o paywall seja exibido conforme definido no mapa.
- [ ] Documentar como adicionar/editar jornadas e passos.
- [ ] Testar todos os fluxos para garantir que não há travamentos e que o paywall aparece corretamente.

---

### 2. **Execução**

#### a) **Criação do Mapa de Jornadas**

```ts
// src/journeys/map.ts
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
      { id: 'welcome', title: 'Bem-vindo', description: 'Introdução', nextSteps: ['chooseJourney'] },
      { id: 'chooseJourney', title: 'Escolha sua Jornada', description: 'Selecione o tipo de usuário', nextSteps: ['howItWorks'] },
      { id: 'howItWorks', title: 'Como Funciona', description: 'Explicação do funcionamento', nextSteps: ['notifications'] },
      { id: 'notifications', title: 'Notificações', description: 'Configuração de notificações', nextSteps: ['paywall'], paywall: true },
      { id: 'paywall', title: 'Paywall', description: 'Desbloqueie recursos premium', nextSteps: [] },
    ]
  },
  // ...outras jornadas
];
```

#### b) **Refatoração dos Componentes**

- Importe e utilize o mapa de jornadas nos componentes.
- Exemplo de uso no Onboarding:

```tsx
import { journeys } from '@/journeys/map';

const onboarding = journeys.find(j => j.id === 'onboarding');
const [currentStepId, setCurrentStepId] = useState(onboarding.steps[0].id);
const currentStep = onboarding.steps.find(s => s.id === currentStepId);

if (currentStep.paywall && !userHasAccess) {
  // Renderiza o paywall
}
```

- Atualize a navegação entre passos usando `nextSteps`.

#### c) **Documentação**

- Adicione instruções no README ou em `docs/journeys.md` explicando:
  - Como editar/adicionar jornadas e passos.
  - Como marcar um passo como paywall.

---

### 3. **Testes**

#### a) **Testes Manuais**

- [ ] Percorra cada jornada e verifique se todos os passos aparecem na ordem correta.
- [ ] Confirme que o paywall aparece apenas nos passos marcados com `paywall: true`.
- [ ] Teste o desbloqueio do paywall (ex: compra de NFT) e verifique se o usuário pode prosseguir.
- [ ] Tente acessar jornadas diferentes e veja se o fluxo está correto.
- [ ] Simule um usuário sem acesso e veja se ele fica bloqueado no paywall.

#### b) **Testes Automatizados (opcional)**

- Escreva testes unitários para funções de navegação e verificação de paywall.
- Escreva testes de integração para garantir que o fluxo de onboarding não deixa o usuário preso.

---

### 4. **Checklist de Aceite**

- [ ] Todas as jornadas estão centralizadas e visíveis em um único arquivo.
- [ ] Os componentes consomem o mapa centralizado.
- [ ] O paywall aparece exatamente onde foi definido.
- [ ] Não há mais bugs de usuário preso em jornadas.
- [ ] Documentação clara para manutenção futura.

