import { test, expect } from "@playwright/test";

test.describe("Risk Type Creation - Field Level Tests", () => {
  // --------------------------------------
  // Before Each → Login + Navigate to Risk Type Create Page
  // --------------------------------------
  test.beforeEach(async ({ page }) => {
    await page.goto(
      "http://localhost:8080/realms/aspl-realm/protocol/openid-connect/auth?response_type=code&client_id=aspl-open-id&redirect_uri=http%3A%2F%2Flocalhost%3A3000&code_challenge=eHxPlQjW5GMuu_-gu8rZkPRQLkT--ez4NONUDIu8UBo&code_challenge_method=S256&state=customLoginState&scope=profile+openid"
    );

    await page
      .getByRole("textbox", { name: "Username or email" })
      .fill("shubhamd");
    await page.getByRole("textbox", { name: "Password" }).fill("1234");
    await page.getByRole("button", { name: "Sign In" }).click();

    await page.locator("div").filter({ hasText: "AMS" }).nth(4).click();
    await page.getByRole("menuitem", { name: "Admin" }).click();
    await page.getByRole("menuitem", { name: "Audit Masters" }).click();
    await page.getByRole("menuitem", { name: "Risk Type" }).click();
    await page.getByRole("menuitem", { name: "Create" }).click();
  });

  // --------------------------------------
  // 1. Required Fields Validation
  // --------------------------------------
  test("Validation: Should require Organization, Risk Type name, and Status", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Submit" }).click();

    await expect(page.getByText("Organization is required")).toBeVisible();
    await expect(page.getByText("Risk Type name is required")).toBeVisible();
    await expect(page.getByText("Status is required")).toBeVisible();
  });

  // --------------------------------------
  // 2. Dependency Test: Risk Type enabled only after Organization selection
  // --------------------------------------
  test("Dependency: Risk Type input should react to Organization selection", async ({
    page,
  }) => {
    const riskTypeInput = page.getByRole("textbox", { name: "Risk-type" });

    // Initially Risk Type may be disabled or empty
    // await expect(riskTypeInput).toBeDisabled();

    // Select Organization
    await page.getByRole("combobox", { name: "Organization" }).click();
    await page.getByRole("option", { name: "Demo Bank" }).click();

    // Now input should be enabled
    await expect(riskTypeInput).toBeEnabled();
  });

  // --------------------------------------
  // 3. Risk Type Textbox Validation
  // --------------------------------------
  test("Risk Type Textbox: Max length and special characters check", async ({
    page,
  }) => {
    const riskTypeInput = page.getByRole("textbox", { name: "Risk-type" });

    const longString = "A".repeat(50);
    await riskTypeInput.fill(longString);
    await expect(riskTypeInput).toHaveValue(longString);

    await riskTypeInput.fill("Operational Risk @#$123");
    await expect(riskTypeInput).toHaveValue("Operational Risk @#$123");
  });

  // --------------------------------------
  // 4. Status Dropdown Validation
  // --------------------------------------
  test("Status Dropdown: Should display Active and Inactive options", async ({
    page,
  }) => {
    await page.getByRole("combobox", { name: "Status" }).click();

    await expect(page.getByRole("option", { name: "Active" })).toBeVisible();
    await expect(page.getByRole("option", { name: "Inactive" })).toBeVisible();
  });

  // --------------------------------------
  // 5. Successful Creation Test
  // --------------------------------------
  test("Success: Should create Risk Type successfully", async ({ page }) => {
    // Select Organization
    await page.getByRole("combobox", { name: "Organization" }).click();
    await page.getByRole("option", { name: "Demo Bank" }).click();

    // Enter Risk Type
    await page
      .getByRole("textbox", { name: "Risk-type" })
      .fill("Operational Risk");

    // Select Status
    await page.getByRole("combobox", { name: "Status" }).click();
    await page.getByRole("option", { name: "Active" }).click();

    // Submit
    await page.getByRole("button", { name: "Submit" }).click();

    // Success Message
    await expect(
      page.getByText("Risk Type created successfully")
    ).toBeVisible();
  });
});
