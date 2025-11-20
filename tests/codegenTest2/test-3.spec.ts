import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.bing.com/search?q=audilytics+solutions&cvid=bcdf2dc182ee4c768634598764e677db&gs_lcrp=EgRlZGdlKgYIABBFGDkyBggAEEUYOdIBCDc2MThqMGoyqAIAsAIB&FORM=ANAB01&PC=U531');
  
  const page1Promise = page.waitForEvent('popup');
  await page.locator('a').filter({ hasText: /^audilyticssolutions\.com$/ }).click();
});