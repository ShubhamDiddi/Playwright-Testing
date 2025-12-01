import { test, expect } from '@playwright/test';

test.describe('Subarea Creation - Field Level Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.getByRole('menuitem', { name: 'Subarea' }).click();
    await page.getByRole('menuitem', { name: 'Create' }).click();
  });

  test('Validation: Should require Organization, Area, and Subarea name', async ({ page }) => {
    await page.getByRole('button', { name: 'Submit' }).click();
    
    // Assertions for required fields
    await expect(page.getByText('Organization is required')).toBeVisible();
    await expect(page.getByText('Area is required')).toBeVisible(); // This might only appear if Org is selected first, depends on app logic
    await expect(page.getByText('Subarea is required')).toBeVisible();
  });

  test('Dependency: Area dropdown should react to Organization selection', async ({ page }) => {
    const areaDropdown = page.getByRole('combobox', { name: 'Area' });
    
    // Step 1: Check if Area is disabled or empty initially (if app supports this logic)
    // await expect(areaDropdown).toBeDisabled(); 

    // Step 2: Select Organization
    await page.getByRole('combobox', { name: 'Organization' }).click();
    await page.getByRole('option', { name: 'Company1' }).click();

    // Step 3: Verify Area options are now populated/clickable
    await areaDropdown.click();
    await expect(page.getByRole('option', { name: 'C1_CCSA_BA1' })).toBeVisible();
  });

  test('Subarea Textbox: Max length and special characters check', async ({ page }) => {
    const subareaInput = page.getByRole('textbox', { name: 'Subarea' });
    
    // Example: Test a very long string (if your app has a limit, e.g., 50 chars)
    const longString = 'A'.repeat(50);
    await subareaInput.fill(longString);
    await expect(subareaInput).toHaveValue(longString);
    
    // Verify it handles special characters
    await subareaInput.fill('Subarea @#$ Test');
    await expect(subareaInput).toHaveValue('Subarea @#$ Test');
  });
});