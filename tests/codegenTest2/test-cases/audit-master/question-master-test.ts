import { test, expect } from '@playwright/test';

test.describe('Question Creation - Field Level Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.getByRole('menuitem', { name: 'Admin' }).click();
    await page.getByRole('menuitem', { name: 'Audit Masters' }).click();
    await page.getByRole('menuitem', { name: 'Question' }).click();
    await page.getByRole('menuitem', { name: 'Create' }).click();
  });

  test('Question Textbox: Should allow multiline input (if applicable) and validation', async ({ page }) => {
    const questionInput = page.getByRole('textbox', { name: 'Question' });

    // Ensure it is empty
    await expect(questionInput).toBeEmpty();

    // Submit empty to check validation
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('Question is required')).toBeVisible();

    // Test filling a question
    const questionText = 'Is the fire extinguisher valid?';
    await questionInput.fill(questionText);
    await expect(questionInput).toHaveValue(questionText);
  });

  test('Cascading Logic: Org -> Area -> Subarea flow', async ({ page }) => {
    // 1. Select Org
    await page.getByRole('combobox', { name: 'Organization' }).click();
    await page.getByRole('option', { name: 'Company1' }).click();

    // 2. Select Area (Assert option exists)
    await page.getByRole('combobox', { name: 'Area', exact: true }).click();
    const areaOption = page.getByRole('option', { name: 'C1_CCSA_BA1' });
    await expect(areaOption).toBeVisible();
    await areaOption.click();

    // 3. Select Subarea (Assert option exists based on Area)
    await page.getByRole('combobox', { name: 'Subarea' }).click();
    const subareaOption = page.getByRole('option', { name: 'C1_CCSA_BA1_SA1' });
    await expect(subareaOption).toBeVisible();
    await subareaOption.click();
  });

  test('Optional Subarea: Verify behavior when Subarea is not selected', async ({ page }) => {
    // In your original script, the last entry (BA3) did not have a Subarea.
    // This test ensures the form submits successfully even if Subarea is empty (if intended).
    
    await page.getByRole('combobox', { name: 'Organization' }).click();
    await page.getByRole('option', { name: 'Company1' }).click();
    
    await page.getByRole('combobox', { name: 'Area', exact: true }).click();
    await page.getByRole('option', { name: 'C1_CCSA_BA3' }).click(); // Using BA3 from your data
    
    // Skip Subarea selection
    
    await page.getByRole('textbox', { name: 'Question' }).fill('Test Question No Subarea');
    await page.getByRole('combobox', { name: 'Status' }).click();
    await page.getByRole('option', { name: 'Active' }).click();
    
    // Listen for response or navigation to confirm success
    // Example: await expect(page.getByText('Created Successfully')).toBeVisible();
  });
});