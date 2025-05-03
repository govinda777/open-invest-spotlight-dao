# Open Invest Spotlight DAO

[![E2E Tests](https://github.com/open-invest/spotlight-dao/actions/workflows/e2e-tests.yml/badge.svg)](https://github.com/open-invest/spotlight-dao/actions/workflows/e2e-tests.yml)
[![Test Coverage](https://codecov.io/gh/open-invest/spotlight-dao/branch/main/graph/badge.svg)](https://codecov.io/gh/open-invest/spotlight-dao)

## Visão Geral

O Open Invest Spotlight DAO é uma plataforma descentralizada de investimento colaborativo baseada em princípios de governança aberta. A plataforma permite que investidores descubram e invistam em projetos promissores, enquanto os criadores de projetos podem obter financiamento e suporte da comunidade.

## Tecnologias Principais

- **Frontend**: React, TypeScript, Vite
- **UI**: shadcn-ui, Tailwind CSS
- **Testes**: Cypress, Playwright
- **CI/CD**: GitHub Actions

## Estrutura do Projeto

```
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

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/open-invest/spotlight-dao.git
cd spotlight-dao
```

2. Instale as dependências:
```bash
# Install and show verbose output
npm install --verbose --repository-url https://registry.npmjs.org/
# Install and force the installation
npm install --force
```

## Desenvolvimento

1. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

2. Execute os testes:
```bash
# Testes unitários
npm run test

# Testes E2E
npm run test:e2e
```

3. Execute os testes com relatório:
```bash
chmod +x run-e2e-with-report.sh
./run-e2e-with-report.sh
```

## Documentação

A documentação completa do projeto está disponível na pasta `docs/`:

- [Arquitetura](docs/ARCHITECTURE.md) - Arquitetura do sistema
- [Casos de Uso](docs/USE_CASES.md) - Casos de uso do sistema
- [Atores](docs/ACTORS.md) - Atores do sistema
- [BDD](docs/BDD.md) - Behavior Driven Development
- [Jornadas](docs/JOURNEYS.md) - Jornadas do usuário
- [Testes E2E](docs/E2E_TESTING.md) - Testes end-to-end

## Tipos de Usuário

O sistema suporta diferentes tipos de usuários:

1. **Investidores**
   - Descobrir projetos
   - Realizar investimentos
   - Monitorar performance
   - Participar da governança

2. **Proprietários de Projeto**
   - Submeter projetos
   - Receber feedback
   - Gerenciar desenvolvimento
   - Reportar progresso

3. **Membros DAO**
   - Participar de discussões
   - Votar em propostas
   - Influenciar direção
   - Receber recompensas

4. **Membros da Comunidade**
   - Explorar projetos
   - Participar de discussões
   - Aprender sobre investimentos
   - Engajar com a comunidade

## Testes

O projeto utiliza uma abordagem abrangente de testes:

1. **Testes Unitários**
   - Jest para testes unitários
   - Cobertura de código
   - Testes de componentes

2. **Testes E2E**
   - Cypress e Playwright
   - Testes de fluxos completos
   - Relatórios automatizados

3. **BDD**
   - Cenários de comportamento
   - Regras de negócio
   - Documentação viva

## CI/CD

O projeto utiliza GitHub Actions para automação:

1. **Testes Automatizados**
   - Execução em pull requests
   - Relatórios de cobertura
   - Notificações de falhas

2. **Deploy**
   - Deploy automático
   - Ambientes separados
   - Rollback automático

## Contribuição

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## Contato

Para mais informações, entre em contato:

- Email: contact@openinvest.xyz
- Website: https://openinvest.xyz
- Discord: https://discord.gg/openinvest

## Relatórios de Teste

Os relatórios de teste são gerados automaticamente após cada execução dos testes E2E e publicados no GitHub Pages. Você pode acessar o relatório mais recente em:

https://[seu-usuario].github.io/[nome-do-repo]/

### Comandos Locais

Para gerar e visualizar os relatórios localmente:

```bash
# Executar testes e gerar relatório
npm run test:e2e:allure

# Apenas gerar relatório (após executar os testes)
npm run test:e2e:allure:generate

# Abrir relatório no navegador
npm run test:e2e:allure:open
```