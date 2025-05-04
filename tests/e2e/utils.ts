import { Page } from '@playwright/test';

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const waitForAppLoad = async (page: Page) => {
  // Wait for the main content to be visible with reduced timeout
  await page.waitForSelector('main', { timeout: 2000, state: 'visible' });
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
    await page.waitForSelector('main', { timeout: 2000, state: 'visible' });
  }
};

export const selectUserType = async (page: Page, userType: 'Investor' | 'Project Owner' | 'DAO Member' | 'Community Member') => {
  // Click the user type text first
  await page.getByText(userType).click();
  
  // Then click the button to begin the journey
  await page.getByRole('button', { name: `Begin ${userType} Journey` }).click();
  
  // Wait for main content to be visible with reduced timeout
  await page.waitForSelector('main', { timeout: 2000, state: 'visible' });
};
