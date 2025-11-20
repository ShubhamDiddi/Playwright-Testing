import { test, expect } from "@playwright/test";

test("ASPL Page", async ({ page }) => {
  await page.goto(
    "http://localhost:8080/realms/aspl-realm/protocol/openid-connect/auth?response_type=code&client_id=aspl-open-id&redirect_uri=http%3A%2F%2Flocalhost%3A3000&code_challenge=50YiQ-drtThl3xA2StcjuE0QoC-u47YR076scb0tJsk&code_challenge_method=S256&scope=profile+openid&state=customLoginState"
  );
  await page.pause();
  await page.getByRole("textbox", { name: "Username or email" }).click();
  await page
    .getByRole("textbox", { name: "Username or email" })
    .fill("c1admin");
  await page.getByRole("textbox", { name: "Password" }).click();
  await page.getByRole("textbox", { name: "Password" }).fill("12345");
  await page.getByRole("button", { name: "Sign In" }).click();

  //Check element Visible/Hidden
  await expect(
    page.locator("div").filter({ hasText: "AMS" }).nth(4)
  ).toBeVisible();

  await page.locator("div").filter({ hasText: "AMS" }).nth(4).click();

  //   await page.getByRole("menuitem", { name: "Audit" }).click();
  //   await page.getByRole("menuitem", { name: "List View" }).click();
  //   await page.getByRole("combobox", { name: "Location" }).click();

  // Assert specific option is visible inside the list
  //   await expect(page.getByRole("option", { name: "Pune Branch" })).toBeVisible();

  //   await page.getByRole("option", { name: "Pune Branch" }).click();
  //   await expect(locator('div').filter({ hasText: 'AMS' }).nth(4)).toBeHidden()
  await page.getByRole("menuitem", { name: "Admin" }).click();
  await page.getByRole("menuitem", { name: "Audit Masters" }).click();
  await page.getByRole("menuitem", { name: "Document" }).click();
  await page.getByRole("menuitem", { name: "Create" }).click();

  const areaCombobox = page.getByRole("combobox", {
    name: "Area",
    exact: true,
  });

  //Audit level document yes or no radio
  // -------------------------------
  // Select YES → Check combobox is DISABLED
  // -------------------------------
  await page.getByRole("radio", { name: "Yes" }).check();

  await expect(areaCombobox).toBeDisabled(); // Assertion

  // -------------------------------
  // Select NO → Check combobox is ENABLED
  // -------------------------------
  await page.getByRole("radio", { name: "No" }).check();

  await expect(areaCombobox).toBeEnabled(); // Assertion

  // If enabled, select an option
  await areaCombobox.click();
  await page.getByRole("option", { name: "C1_CCSA_BA1" }).click();
  await page.getByRole("combobox", { name: "Subarea" }).click();
  await page.getByRole("option", { name: "C1_CCSA_BA1_SA2" }).click();
  await page.getByRole("combobox", { name: "Question" }).click();
  await page.getByRole("option", { name: "C1_CCSA_BA1_SA2 QUESTION" }).click();
  await page.getByRole("textbox", { name: "Document Name" }).click();
  await page.getByRole("textbox", { name: "Document Name" }).fill("C1_CCSA_BA1_SA2 Document1");
  await page.getByRole("combobox", { name: "Category" }).click();
  await page.getByRole("option", { name: "AUDITEE" }).click();
  await page.getByRole("combobox", { name: "Document Type" }).click();
  await page.getByRole("option", { name: "Supporting" }).click();
  await page.getByRole("combobox", { name: "Status" }).click();
  await page.getByRole("option", { name: "Active", exact: true }).click();
  await page.getByRole("button", { name: "Choose File" }).click();
  await page
    .getByRole("button", { name: "Choose File" })
    .setInputFiles("Financial_Information_Template.xlsx");
  await page.getByRole("button", { name: "Submit" }).click();
  
});
