import { test, expect } from '@playwright/test';

test.describe('Wallet Connection', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.clear();
    });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('body', { state: 'visible' });
  });

  test('should connect to wallet', async ({ page }) => {
    // Espera mais específica para o botão
    const connectButton = page.getByRole('button', { name: 'Connect Wallet' });
    await connectButton.waitFor({ state: 'visible', timeout: 5000 });
    
    // Clica no botão
    await connectButton.click();
    
    // Verifica conexão com timeout reduzido
    await expect(page.getByText('Connected')).toBeVisible({ timeout: 5000 });
  });

  test('should handle wallet disconnection', async ({ page }) => {
    // Conecta wallet
    const connectButton = page.getByRole('button', { name: 'Connect Wallet' });
    await connectButton.waitFor({ state: 'visible', timeout: 5000 });
    await connectButton.click();
    await expect(page.getByText('Connected')).toBeVisible({ timeout: 5000 });
    
    // Desconecta wallet
    const disconnectButton = page.getByRole('button', { name: 'Disconnect' });
    await disconnectButton.waitFor({ state: 'visible', timeout: 5000 });
    await disconnectButton.click();
    
    // Verifica desconexão
    await expect(page.getByText('Connect Wallet')).toBeVisible({ timeout: 5000 });
  });
}); 