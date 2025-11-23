import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('http://localhost:8080/realms/aspl-realm/protocol/openid-connect/auth?response_type=code&client_id=aspl-open-id&redirect_uri=http%3A%2F%2Flocalhost%3A3000&code_challenge=UW0Eb3jCQySRSm6IYatJ1DfOG3EhgglgD-rdEW9uM90&code_challenge_method=S256&scope=profile+openid&state=customLoginState');
    await page.getByRole('textbox', { name: 'Username or email' }).click();
    await page.getByRole('textbox', { name: 'Username or email' }).fill('vishalp');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('12345');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.locator('div').filter({ hasText: 'AMS' }).nth(4).click();
    await page.getByRole('menuitem', { name: 'Admin' }).click();
    await page.getByRole('menuitem', { name: 'Audit Masters' }).click();
    // ---------------------- CREATE AREAS ----------------------
   
    // ---------------------- CREATE QUESTIONS ----------------------
    
//  ---------------------- Create Audit Type ----------------------

  // ---------------------- MAP AUDIT TYPE ----------------------
  
// -------------Create Workflow-----------------

  // ------------------Create Workflow Stages-----------------
  
  // ------------------Assign Workflow Stages-----------------
 
  // ------------------Manage Workflow Access-----------------
  
  // ------------------Define Workflow-----------------
  
  // ------------------Create Audit-----------------
  
});