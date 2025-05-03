# Guia de Jornadas do Usuário

Este documento explica como gerenciar as jornadas do usuário no Open Invest Spotlight DAO.

## Estrutura das Jornadas

As jornadas são definidas no arquivo `src/journeys/map.ts` e seguem a seguinte estrutura:

### Tipos

```typescript
type JourneyStep = {
  id: string;          // Identificador único do passo
  title: string;       // Título exibido ao usuário
  description: string; // Descrição do passo
  nextSteps: string[]; // IDs dos próximos passos possíveis
  paywall?: boolean;   // Se o passo requer acesso premium
};

type Journey = {
  id: string;          // Identificador único da jornada
  label: string;       // Nome exibido da jornada
  steps: JourneyStep[]; // Lista de passos da jornada
};
```

## Como Adicionar uma Nova Jornada

1. Abra o arquivo `src/journeys/map.ts`
2. Adicione um novo objeto `Journey` ao array `journeys`
3. Defina os passos da jornada usando o tipo `JourneyStep`
4. Certifique-se de que os IDs dos passos são únicos
5. Defina os `nextSteps` corretamente para criar o fluxo desejado

## Como Adicionar um Novo Passo

1. Dentro da jornada desejada, adicione um novo objeto `JourneyStep` ao array `steps`
2. Defina um ID único para o passo
3. Adicione o ID do novo passo aos `nextSteps` do passo anterior
4. Se necessário, marque o passo como `paywall: true`

## Exemplo de Uso nos Componentes

```typescript
import { journeys } from '@/journeys/map';

// Encontrar uma jornada específica
const journey = journeys.find(j => j.id === 'onboarding');

// Encontrar um passo específico
const step = journey.steps.find(s => s.id === 'welcome');

// Verificar se o passo requer acesso premium
if (step.paywall && !userHasAccess) {
  // Renderizar paywall
}
```

## Boas Práticas

1. Mantenha os IDs dos passos e jornadas únicos
2. Sempre defina `nextSteps` para criar um fluxo lógico
3. Use `paywall: true` apenas quando necessário
4. Mantenha as descrições claras e concisas
5. Teste o fluxo completo após fazer alterações

## Testes

Antes de implementar uma nova jornada ou passo:

1. Verifique se todos os IDs são únicos
2. Confirme que o fluxo faz sentido lógico
3. Teste o acesso com e sem paywall
4. Verifique se não há passos sem saída
5. Teste a navegação entre todos os passos 