import { Page } from '@playwright/test';

export const waitForAppLoad = async (page: Page) => {
  // Wait for the main content to be visible
  await page.waitForSelector('[data-testid="main-content"]', { timeout: 10000 });
};

export const mockWallet = async (page: Page, options = { hasBalance: true }) => {
  await page.evaluate(({ hasBalance }) => {
    window.ethereum = {
      request: async (params: { method: string }) => {
        if (params.method === 'eth_requestAccounts') {
          return ['0x123...abc'];
        }
        if (params.method === 'eth_getBalance') {
          return hasBalance ? '0x1000000000000000000' : '0x0';
        }
        return null;
      },
      isMetaMask: true,
      on: () => {},
      removeListener: () => {},
    };
  }, options);
};

export const clearLocalStorage = async (page: Page) => {
  await page.evaluate(() => localStorage.clear());
};

export const completeOnboardingSteps = async (page: Page, steps = 1) => {
  for (let i = 0; i < steps; i++) {
    await page.getByRole('button', { name: /Next|Continue|Complete/i }).click();
    await page.waitForTimeout(500); // Wait for animations
  }
};

export const selectUserType = async (page: Page, userType: 'Investor' | 'Project Owner' | 'DAO Member') => {
  // First find the card containing the user type
  const card = page.locator('.card', { hasText: userType });
  // Then click the button within that card
  await card.getByRole('button', { name: new RegExp(`Begin ${userType} Journey`, 'i') }).click();
  await page.waitForTimeout(500); // Wait for animations
}; 