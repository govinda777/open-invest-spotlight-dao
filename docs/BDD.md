# Behavior Driven Development (BDD)

## Visão Geral

Este documento detalha a abordagem de BDD (Behavior Driven Development) utilizada no Open Invest Spotlight DAO, incluindo cenários, regras de negócio e implementação.

## Estrutura de Cenários

### Formato Padrão

```gherkin
Funcionalidade: [Nome da Funcionalidade]
  Como [ator]
  Quero [ação]
  Para que [benefício]

  Cenário: [Nome do Cenário]
    Dado [condição inicial]
    Quando [ação]
    Então [resultado esperado]
```

### Exemplo de Implementação

```typescript
// src/journeys/bdd/investor.ts
import { defineFeature, loadFeature } from 'jest-cucumber';
import { InvestorJourney } from '../types';

const feature = loadFeature('features/investor.feature');

defineFeature(feature, test => {
  test('Realizar investimento', ({ given, when, then }) => {
    let investor: InvestorJourney;
    let investmentAmount: number;

    given('que sou um investidor autenticado', () => {
      investor = new InvestorJourney();
      investor.authenticate();
    });

    when('seleciono um projeto para investir', () => {
      investor.selectProject('Projeto A');
    });

    when('informo o valor de investimento', () => {
      investmentAmount = 1000;
      investor.setInvestmentAmount(investmentAmount);
    });

    then('o sistema deve validar o investimento', () => {
      expect(investor.validateInvestment()).toBeTruthy();
    });

    then('devo receber confirmação do investimento', () => {
      expect(investor.getConfirmation()).toBeDefined();
    });
  });
});
```

## Cenários Principais

### 1. Investimentos

#### Funcionalidade: Realizar Investimento
```gherkin
Funcionalidade: Realizar Investimento
  Como investidor
  Quero investir em um projeto
  Para que possa obter retorno financeiro

  Cenário: Investimento bem-sucedido
    Dado que sou um investidor autenticado
    E tenho saldo suficiente
    Quando seleciono um projeto para investir
    E informo o valor de investimento
    Então o sistema deve validar o investimento
    E devo receber confirmação do investimento

  Cenário: Saldo insuficiente
    Dado que sou um investidor autenticado
    E não tenho saldo suficiente
    Quando tento realizar um investimento
    Então o sistema deve exibir mensagem de erro
    E o investimento não deve ser realizado
```

#### Funcionalidade: Monitorar Performance
```gherkin
Funcionalidade: Monitorar Performance
  Como investidor
  Quero acompanhar o desempenho dos meus investimentos
  Para tomar melhores decisões

  Cenário: Visualizar dashboard
    Dado que sou um investidor autenticado
    E tenho investimentos ativos
    Quando acesso o dashboard
    Então devo ver o retorno total
    E o desempenho por projeto
    E gráficos de evolução
```

### 2. Projetos

#### Funcionalidade: Submeter Projeto
```gherkin
Funcionalidade: Submeter Projeto
  Como proprietário de projeto
  Quero submeter um novo projeto
  Para obter financiamento

  Cenário: Submissão bem-sucedida
    Dado que sou um proprietário autenticado
    E tenho toda documentação necessária
    Quando preencho o formulário de submissão
    E envio o projeto
    Então o sistema deve validar a submissão
    E o projeto deve ser listado para investimentos

  Cenário: Documentação incompleta
    Dado que sou um proprietário autenticado
    E não tenho toda documentação necessária
    Quando tento submeter o projeto
    Então o sistema deve indicar documentos faltantes
    E a submissão não deve ser concluída
```

#### Funcionalidade: Gerenciar Projeto
```gherkin
Funcionalidade: Gerenciar Projeto
  Como proprietário de projeto
  Quero gerenciar meu projeto
  Para manter investidores informados

  Cenário: Atualizar progresso
    Dado que sou o proprietário do projeto
    E o projeto está em desenvolvimento
    Quando atualizo o progresso
    Então os investidores devem ser notificados
    E o dashboard deve refletir as mudanças
```

### 3. Governança

#### Funcionalidade: Votar em Proposta
```gherkin
Funcionalidade: Votar em Proposta
  Como membro DAO
  Quero votar em propostas
  Para participar da governança

  Cenário: Voto bem-sucedido
    Dado que sou um membro DAO autenticado
    E tenho tokens suficientes
    Quando seleciono uma proposta
    E registro meu voto
    Então o sistema deve confirmar meu voto
    E o resultado deve ser atualizado

  Cenário: Tokens insuficientes
    Dado que sou um membro DAO autenticado
    E não tenho tokens suficientes
    Quando tento votar
    Então o sistema deve exibir mensagem de erro
    E o voto não deve ser registrado
```

#### Funcionalidade: Criar Proposta
```gherkin
Funcionalidade: Criar Proposta
  Como membro DAO
  Quero criar uma nova proposta
  Para sugerir mudanças

  Cenário: Criação bem-sucedida
    Dado que sou um membro DAO autenticado
    E tenho tokens suficientes
    Quando preencho os detalhes da proposta
    E submeto para votação
    Então a proposta deve ser listada
    E outros membros devem poder votar
```

## Implementação

### Estrutura de Arquivos

```
src/
  journeys/
    bdd/
      features/
        investor.feature
        project.feature
        governance.feature
      steps/
        investor.steps.ts
        project.steps.ts
        governance.steps.ts
      support/
        hooks.ts
        world.ts
```

### Configuração do Ambiente

```typescript
// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./src/journeys/bdd/support/hooks.ts'],
  testMatch: ['**/features/**/*.steps.ts'],
};
```

### Hooks e World

```typescript
// src/journeys/bdd/support/hooks.ts
import { Before, After, setWorldConstructor } from '@cucumber/cucumber';
import { World } from './world';

setWorldConstructor(World);

Before(async function() {
  await this.setup();
});

After(async function() {
  await this.teardown();
});
```

## Próximos Passos

1. **Expansão de Cenários**:
   - Adicionar mais casos de teste
   - Refinar regras de negócio
   - Implementar novos fluxos

2. **Melhorias**:
   - Automação de testes
   - Relatórios de cobertura
   - Integração com CI/CD 