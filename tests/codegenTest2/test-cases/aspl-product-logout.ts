import { test, expect } from "@playwright/test";

test("ASPL - Check logout Scenario", async ({ page }) => {

  // Login page
  await page.goto(
    "http://localhost:8080/realms/aspl-realm/protocol/openid-connect/auth?response_type=code&client_id=aspl-open-id&redirect_uri=http://localhost:3000&scope=openid"
  );

  // Login
  await page.getByRole("textbox", { name: "Username or email" }).fill("c1companyadmin");
  await page.getByRole("textbox", { name: "Password" }).fill("12345");
  await page.getByRole("button", { name: "Sign In" }).click();

  // Wait for dashboard
  await page.waitForSelector("text=AMS");

  // Open account settings
  await page.getByRole('button', { name: 'Account settings' }).click();
  await page.getByRole('menuitem', { name: 'Organization Company' }).locator('label').click();
  await page.getByRole('menuitem', { name: 'Location Mumbai Ho' }).locator('label').click();
  await page.getByRole('menuitem', { name: 'Username c1companyadmin' }).locator('label').click();
  await page.getByRole('menuitem', { name: 'Roles C1OrgAdmin' }).locator('label').click();

  // Check disabled fields (positive test)
  await expect(page.locator('input[name="organization"]')).toBeDisabled();
  await expect(page.locator('input[name="location"]')).toBeDisabled();
  await expect(page.locator('input[name="username"]')).toBeDisabled();
  await expect(page.locator('input[name="roles"]')).toBeDisabled();

  // Negative test: try typing in disabled fields (should not work)
  const orgInput = page.locator('input[name="organization"]');
  const locInput = page.locator('input[name="location"]');
  const userInput = page.locator('input[name="username"]');
  const roleInput = page.locator('input[name="roles"]');

  expect(await orgInput.isEditable()).toBe(false);
  expect(await locInput.isEditable()).toBe(false);
  expect(await userInput.isEditable()).toBe(false);
  expect(await roleInput.isEditable()).toBe(false);

  // Logout
  await page.getByRole('button', { name: 'Logout' }).click();

  // After logout user should return to Keycloak login page
  await expect(page).toHaveURL(/openid-connect\/auth/);
});
