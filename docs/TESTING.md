# Testes E2E

## Visão Geral

O projeto utiliza dois frameworks de teste E2E: Cypress e Playwright. Esta documentação descreve a configuração, execução e boas práticas para os testes E2E.

## Configuração

### Cypress

O Cypress está configurado em `cypress.config.cjs`:

```javascript
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8080',
    supportFile: false,
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
  },
})
```

### Playwright

O Playwright está configurado em `playwright.config.ts`:

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './playwright',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:8080',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
```

## Scripts de Execução

Os seguintes scripts estão disponíveis no `package.json`:

```json
{
  "scripts": {
    "test:e2e": "playwright test || true",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:debug": "playwright test --debug",
    "test:e2e:report": "playwright show-report",
    "test:e2e:dev": "cypress open",
    "test:e2e:allure": "playwright test && allure generate allure-results --clean -o allure-report && allure open allure-report",
    "test:e2e:allure:generate": "allure generate allure-results --clean -o allure-report",
    "test:e2e:allure:open": "allure open allure-report",
    "test:e2e:serve": "concurrently \"playwright show-report\" \"allure open allure-report\"",
    "test:e2e:ci": "playwright test && allure generate allure-results --clean -o allure-report",
    "test:e2e:coverage": "./scripts/generate-coverage.sh"
  }
}
```

## Executando Testes

### Modo Desenvolvimento

Para executar os testes em modo desenvolvimento:

```bash
# Cypress (interface gráfica)
npm run test:e2e:dev

# Playwright (interface gráfica)
npm run test:e2e:ui
```

### Modo CI/CD

Para executar os testes em ambiente de CI/CD:

```bash
# Executa todos os testes e gera relatório Allure
npm run test:e2e:ci
```

### Modo Debug

Para executar os testes em modo debug:

```bash
# Playwright
npm run test:e2e:debug
```

## Relatórios

### Allure Reports

Os relatórios Allure são gerados automaticamente após a execução dos testes:

```bash
# Gerar relatório
npm run test:e2e:allure:generate

# Abrir relatório
npm run test:e2e:allure:open
```

### Playwright Reports

Os relatórios do Playwright são gerados automaticamente e podem ser visualizados com:

```bash
npm run test:e2e:report
```

## Boas Práticas

1. **Organização dos Testes**:
   - Mantenha os testes organizados por funcionalidade
   - Use nomes descritivos para os arquivos de teste
   - Documente os pré-requisitos de cada teste

2. **Seletores**:
   - Use data-testid para elementos que precisam ser testados
   - Evite seletores frágeis baseados em classes ou IDs
   - Mantenha os seletores consistentes

3. **Fixtures**:
   - Use fixtures para dados de teste reutilizáveis
   - Mantenha os fixtures atualizados com o estado atual do sistema

4. **Hooks**:
   - Use hooks para setup e teardown
   - Limpe o estado após cada teste
   - Evite dependências entre testes

5. **Asserções**:
   - Use asserções específicas e descritivas
   - Verifique tanto o estado positivo quanto negativo
   - Inclua mensagens de erro claras

## Exemplo de Teste

```typescript
import { test, expect } from '@playwright/test';

test('login flow', async ({ page }) => {
  // Navega para a página de login
  await page.goto('/login');

  // Preenche o formulário
  await page.fill('[data-testid="email"]', 'user@example.com');
  await page.fill('[data-testid="password"]', 'password123');
  await page.click('[data-testid="submit"]');

  // Verifica o redirecionamento
  await expect(page).toHaveURL('/dashboard');
  await expect(page.locator('[data-testid="welcome-message"]')).toContainText('Welcome');
});
```

## CI/CD Integration

Os testes E2E são executados automaticamente no GitHub Actions. O workflow está configurado em `.github/workflows/e2e-tests.yml`:

```yaml
name: E2E Tests

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '20'
        cache: 'npm'
    - name: Install dependencies
      run: npm ci
    - name: Install Playwright Browsers
      run: npx playwright install --with-deps
    - name: Run E2E Tests
      run: npm run test:e2e
    - name: Generate Allure Report
      run: npm run test:e2e:allure:generate
    - name: Upload Allure Report
      uses: actions/upload-artifact@v4
      with:
        name: allure-report
        path: allure-report/
```

## Troubleshooting

### Problemas Comuns

1. **Testes Falhando Intermitentemente**:
   - Verifique se há condições de corrida
   - Adicione waits explícitos quando necessário
   - Verifique a estabilidade da aplicação

2. **Seletores Não Encontrados**:
   - Verifique se o elemento está visível
   - Confirme se o data-testid está correto
   - Verifique se há iframes ou shadow DOM

3. **Timeout Errors**:
   - Aumente o timeout se necessário
   - Verifique a performance da aplicação
   - Considere usar polling para elementos dinâmicos

### Debugging

Para debug, use os seguintes comandos:

```bash
# Playwright com debug
npm run test:e2e:debug

# Cypress com debug
DEBUG=cypress:* npm run test:e2e:dev
```

## Recursos Adicionais

- [Documentação do Playwright](https://playwright.dev/docs/intro)
- [Documentação do Cypress](https://docs.cypress.io/guides/overview/why-cypress)
- [Documentação do Allure](https://docs.qameta.io/allure/) 