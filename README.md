# 🚀 Open Invest Spotlight DAO

Test deployment to GitHub Pages.

<div align="center">
    <img src="public/banner.svg" alt="Open Invest Spotlight DAO Banner" width="100%"/>
</div>

<div align="center">

[![E2E Tests](https://github.com/open-invest/spotlight-dao/actions/workflows/e2e-tests.yml/badge.svg)](https://github.com/open-invest/spotlight-dao/actions/workflows/e2e-tests.yml)
[![Test Coverage](https://codecov.io/gh/open-invest/spotlight-dao/branch/main/graph/badge.svg)](https://codecov.io/gh/open-invest/spotlight-dao)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=flat&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)

</div>

## 🌟 Visão Geral

O Open Invest Spotlight DAO é uma plataforma descentralizada de investimento colaborativo baseada em princípios de governança aberta. A plataforma permite que investidores descubram e invistam em projetos promissores, enquanto os criadores de projetos podem obter financiamento e suporte da comunidade.

### 🎯 Demonstração

> Site: https://open-invest-spotlight-dao.lovable.app/

<iframe src="https://open-invest-spotlight-dao.lovable.app/" width="100%" height="1000px" style="border: 1px solid #ccc; border-radius: 8px;"></iframe>

## 🛠️ Tecnologias Principais

<div align="center">

| Frontend | UI | Testes | CI/CD |
|----------|----|--------|-------|
| React | shadcn-ui | Cypress | GitHub Actions |
| TypeScript | Tailwind CSS | Playwright | - |
| Vite | - | - | - |

</div>

## 📁 Estrutura do Projeto

```bash
open-invest-spotlight-dao/
├── src/
│   ├── components/     # Componentes React
│   ├── pages/         # Páginas da aplicação
│   ├── hooks/         # Custom hooks
│   ├── services/      # Serviços e APIs
│   ├── utils/         # Funções utilitárias
│   ├── types/         # Definições TypeScript
│   ├── styles/        # Estilos globais
│   ├── config/        # Configurações
│   ├── assets/        # Recursos estáticos
│   └── journeys/      # Fluxos de usuário
├── tests/
│   ├── e2e/          # Testes end-to-end
│   └── unit/         # Testes unitários
├── docs/             # Documentação
└── public/           # Arquivos públicos
```

## 🚀 Começando

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/open-invest/spotlight-dao.git
cd spotlight-dao
```

2. Instale as dependências:
```bash
# Install and show verbose output

npm install --verbose --registry=https://registry.npmjs.org/
# Install and force the installation
npm install --force
```
3. Pre-commit hooks
```bash
npx husky install --repository-url https://registry.npmjs.org/ --verbose

npm install --save-dev @vitest/coverage-v8@^1.3.1 --repository https://registry.npmjs.org/ --verbose
```

npm install --save-dev @vitest/coverage-v8@^1.3.1 --verbose

## 💻 Desenvolvimento

### Iniciando o Servidor

```bash
npm run dev
```

### Testes

```bash
# Testes unitários
npm run test

# Testes E2E
npm run test:e2e

# Testes com relatório
chmod +x run-e2e-with-report.sh
./run-e2e-with-report.sh

# Testes com UI
npx playwright test --ui
```

## 📚 Documentação

A documentação completa do projeto está disponível na pasta `docs/`:

- 📄 [Arquitetura](docs/ARCHITECTURE.md) - Arquitetura do sistema
- 📄 [Casos de Uso](docs/USE_CASES.md) - Casos de uso do sistema
- 📄 [Atores](docs/ACTORS.md) - Atores do sistema
- 📄 [BDD](docs/BDD.md) - Behavior Driven Development
- 📄 [Jornadas](docs/JOURNEYS.md) - Jornadas do usuário
- 📄 [Testes E2E](docs/E2E_TESTING.md) - Testes end-to-end

## 👥 Tipos de Usuário

| Tipo | Descrição |
|------|-----------|
| **Investidores** | Descobrir projetos, realizar investimentos, monitorar performance, participar da governança |
| **Proprietários de Projeto** | Submeter projetos, receber feedback, gerenciar desenvolvimento, reportar progresso |
| **Membros DAO** | Participar de discussões, votar em propostas, influenciar direção, receber recompensas |
| **Membros da Comunidade** | Explorar projetos, participar de discussões, aprender sobre investimentos, engajar com a comunidade |

## 🧪 Testes

### 1. Testes Unitários
- Jest para testes unitários
- Cobertura de código
- Testes de componentes

### 2. Testes E2E
- Cypress e Playwright
- Testes de fluxos completos
- Relatórios automatizados

### 3. BDD
- Cenários de comportamento
- Regras de negócio
- Documentação viva

## 🔄 CI/CD

### 1. Testes Automatizados
- Execução em pull requests
- Relatórios de cobertura
- Notificações de falhas

### 2. Deploy
- Deploy automático
- Ambientes separados
- Rollback automático

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 📞 Contato

Para mais informações, entre em contato:

- 📧 Email: contact@openinvest.xyz
- 🌐 Website: https://openinvest.xyz
- 💬 Discord: https://discord.gg/openinvest

## 📊 Relatórios de Teste

Os relatórios de teste são gerados automaticamente após cada execução dos testes E2E e publicados no GitHub Pages. Você pode acessar o relatório mais recente em:

https://[seu-usuario].github.io/[nome-do-repo]/

### Comandos Locais

```bash
# Executar testes e gerar relatório
npm run test:e2e:allure

# Apenas gerar relatório (após executar os testes)
npm run test:e2e:allure:generate

# Abrir relatório no navegador
npm run test:e2e:allure:open
```

npm install --repository-url https://registry.npmjs.org/