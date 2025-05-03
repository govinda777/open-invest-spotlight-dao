# Testes End-to-End (E2E)

## Visão Geral

O Open Invest Spotlight DAO utiliza dois frameworks de teste E2E: Cypress e Playwright. Esta documentação detalha a configuração, execução e boas práticas para os testes E2E.

## Configuração

### Cypress

```javascript
// cypress.config.cjs
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.js',
    video: false,
    screenshotOnRunFailure: true,
  },
});
```

### Playwright

```typescript
// playwright.config.ts
import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests',
  timeout: 30000,
  retries: 2,
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'firefox',
      use: { browserName: 'firefox' },
    },
    {
      name: 'webkit',
      use: { browserName: 'webkit' },
    },
  ],
};

export default config;
```

## Scripts de Execução

```json
{
  "scripts": {
    "test:e2e": "cypress run",
    "test:e2e:dev": "cypress open",
    "test:e2e:ci": "playwright test",
    "test:e2e:debug": "playwright test --debug",
    "test:e2e:report": "playwright show-report"
  }
}
```

## Executando Testes

### Modo Desenvolvimento

```bash
# Cypress
npm run test:e2e:dev

# Playwright
npm run test:e2e:debug
```

### Modo CI/CD

```bash
# Cypress
npm run test:e2e

# Playwright
npm run test:e2e:ci
```

### Gerando Relatórios

```bash
# Cypress
npm run test:e2e -- --reporter mochawesome

# Playwright
npm run test:e2e:report
```

## Estrutura de Testes

### Cypress

```
cypress/
├── e2e/
│   ├── auth/
│   │   ├── login.cy.ts
│   │   └── register.cy.ts
│   ├── investments/
│   │   ├── create.cy.ts
│   │   └── list.cy.ts
│   └── governance/
│       ├── proposals.cy.ts
│       └── voting.cy.ts
├── fixtures/
│   └── users.json
└── support/
    └── commands.ts
```

### Playwright

```
tests/
├── auth/
│   ├── login.spec.ts
│   └── register.spec.ts
├── investments/
│   ├── create.spec.ts
│   └── list.spec.ts
└── governance/
    ├── proposals.spec.ts
    └── voting.spec.ts
```

## Boas Práticas

### 1. Organização de Testes

- Agrupar por funcionalidade
- Nomes descritivos
- Isolamento de testes
- Reutilização de código

### 2. Seletores

```typescript
// Boas práticas para seletores
const selectors = {
  // Data attributes
  loginButton: '[data-testid="login-button"]',
  
  // IDs
  emailInput: '#email',
  
  // Classes
  errorMessage: '.error-message',
  
  // Texto
  submitButton: 'button:has-text("Submit")',
};
```

### 3. Fixtures

```typescript
// Exemplo de fixture
export const testUser = {
  email: 'test@example.com',
  password: 'password123',
  name: 'Test User',
};
```

### 4. Hooks

```typescript
// Exemplo de hooks
beforeEach(async () => {
  await page.goto('/');
  await login(testUser);
});

afterEach(async () => {
  await cleanup();
});
```

### 5. Asserções

```typescript
// Exemplo de asserções
await expect(page).toHaveURL('/dashboard');
await expect(element).toBeVisible();
await expect(input).toHaveValue('test@example.com');
```

## Exemplo de Teste

### Login Flow (Playwright)

```typescript
import { test, expect } from '@playwright/test';
import { testUser } from '../fixtures/users';

test.describe('Login Flow', () => {
  test('should login successfully', async ({ page }) => {
    // Arrange
    await page.goto('/login');
    
    // Act
    await page.fill('#email', testUser.email);
    await page.fill('#password', testUser.password);
    await page.click('[data-testid="login-button"]');
    
    // Assert
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('.welcome-message')).toContainText(testUser.name);
  });

  test('should show error with invalid credentials', async ({ page }) => {
    // Arrange
    await page.goto('/login');
    
    // Act
    await page.fill('#email', 'invalid@example.com');
    await page.fill('#password', 'wrongpassword');
    await page.click('[data-testid="login-button"]');
    
    // Assert
    await expect(page.locator('.error-message')).toBeVisible();
    await expect(page.locator('.error-message')).toContainText('Invalid credentials');
  });
});
```

## CI/CD Integration

### GitHub Actions

```yaml
name: E2E Tests

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run E2E tests
        run: npm run test:e2e:ci
        
      - name: Upload test results
        uses: actions/upload-artifact@v2
        with:
          name: test-results
          path: test-results/
```

## Troubleshooting

### Problemas Comuns

1. **Testes Falhando**
   - Verificar seletores
   - Aumentar timeouts
   - Verificar estado da aplicação

2. **Problemas com Seletores**
   - Usar data-testid
   - Evitar seletores frágeis
   - Atualizar seletores após mudanças

3. **Timeouts**
   - Ajustar configurações
   - Verificar performance
   - Implementar waits explícitos

### Debugging

```typescript
// Exemplo de debugging
test('debug example', async ({ page }) => {
  // Pausa o teste
  await page.pause();
  
  // Log de informações
  console.log(await page.url());
  
  // Screenshot
  await page.screenshot({ path: 'debug.png' });
});
```

## Recursos Adicionais

- [Documentação Playwright](https://playwright.dev/docs/intro)
- [Documentação Cypress](https://docs.cypress.io/guides/overview/why-cypress)
- [Allure Reports](https://docs.qameta.io/allure/) 