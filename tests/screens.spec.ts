import { test, expect } from '@playwright/test';

const SCREENS = [
  'HOME',
  'SPLASH',
  'ONBOARDING',
  'MOBILE_NUMBER',
  'SMS_OTP',
  'PERMISSIONS',
  'PAY_ANYONE',
  'SEND_AMOUNT',
  'ELECTRICITY',
  'PAYMENT_SUCCESS',
  'HISTORY',
  'RECEIVE',
  'SCAN',
  'REQUEST_MONEY',
  'PROFILE',
  'BANK_ACCOUNTS',
  'UPI_SETTINGS',
  'PAYMENT_METHODS',
  'SECURITY',
  'NOTIFICATIONS',
  'ALL_SERVICES',
  'MONEY_REQUESTS',
  'HELP_SUPPORT',
  'PRIVACY',
  'SHOPPING',
  'MESSAGES',
  'TRAVEL',
  'REWARDS',
  'FOOD',
];

const MODALS = [
  { name: 'LanguageModal', openMethod: 'setIsLanguageModalOpen', text: 'Select Language' },
  { name: 'LogoutModal', openMethod: 'setIsLogoutModalOpen', text: 'Log Out' },
  { name: 'AddBankModal', openMethod: 'setIsAddBankModalOpen', text: 'Link Bank Account' },
  { name: 'AppLinksModal', openMethod: 'setIsAppLinksModalOpen', text: 'Application Links' },
  { name: 'EditProfileModal', openMethod: 'setIsEditProfileModalOpen', text: 'Profile' },
  {
    name: 'PayBillPinModal',
    openMethod: 'openPinModal',
    args: [{ title: 'Test Payment', amount: 100, subTitle: 'Electricity Bill' }],
    text: 'PIN',
  },
];

test.describe('QtPay All Screens and Modals Verification Suite', () => {
  let consoleErrors: string[] = [];

  test.beforeEach(async ({ page }) => {
    consoleErrors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        // Filter out benign Vite/React internal logs or network aborts if any
        const text = msg.text();
        if (!text.includes('favicon') && !text.includes('chrome-extension')) {
          consoleErrors.push(text);
        }
      }
    });
    page.on('pageerror', (err) => {
      consoleErrors.push(err.message);
    });
  });

  test('Bottom Navigation is sticky and fixed at the bottom', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('nav[role="navigation"]');

    const nav = page.locator('nav[role="navigation"]');
    await expect(nav).toBeVisible();

    const position = await nav.evaluate((el) => window.getComputedStyle(el).position);
    expect(position).toBe('fixed');

    const bottom = await nav.evaluate((el) => window.getComputedStyle(el).bottom);
    expect(bottom).toBe('0px');
  });

  for (const screenId of SCREENS) {
    test(`Screen: ${screenId} renders with zero runtime errors`, async ({ page }) => {
      await page.goto(`/?screen=${screenId}`);
      await page.waitForLoadState('domcontentloaded');

      // Wait a moment for async effects
      await page.waitForTimeout(150);

      // Viewport must exist
      const viewport = page.locator('.app-viewport');
      await expect(viewport).toBeVisible();

      // Screen content must exist
      const content = page.locator('.screen-content');
      await expect(content).toBeVisible();

      // Assert no JavaScript runtime / console errors occurred
      expect(consoleErrors, `Errors found on screen ${screenId}`).toEqual([]);
    });
  }

  for (const modal of MODALS) {
    test(`Modal: ${modal.name} opens and renders cleanly`, async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');

      // Trigger modal open via test helper
      await page.evaluate(
        ({ method, args }) => {
          const qtpay = (window as any).__qtpay;
          if (qtpay && qtpay[method]) {
            qtpay[method](...(args || [true]));
          }
        },
        { method: modal.openMethod, args: (modal as any).args }
      );

      await page.waitForTimeout(200);

      // Assert modal text or sheet is visible
      const bodyText = await page.textContent('body');
      expect(bodyText).toContain(modal.text);

      // Assert no JavaScript errors
      expect(consoleErrors, `Errors found when opening modal ${modal.name}`).toEqual([]);
    });
  }
});
