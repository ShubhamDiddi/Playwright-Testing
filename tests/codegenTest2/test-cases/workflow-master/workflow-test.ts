import { test, expect } from "@playwright/test";

test.describe("Workflow Creation - Field Level Tests", () => {
  // ---------------------------------------------------------
  // BEFORE EACH → Navigate to Workflow Create Page
  // ---------------------------------------------------------
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
    await page.getByRole("menuitem", { name: "Workflow", exact: true }).click();
    await page.getByRole("menuitem", { name: "Create" }).click();
  });

  // ---------------------------------------------------------
  // 1. VALIDATION TESTS
  // ---------------------------------------------------------
  test("Validation: Should require Workflow Name and Audit Type", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Submit" }).click();

    await expect(page.getByText("Workflow Name is required")).toBeVisible();
    await expect(page.getByText("Audit Type is required")).toBeVisible();
  });

  // ---------------------------------------------------------
  // 2. WORKFLOW NAME TEXTBOX VALIDATION
  // ---------------------------------------------------------
  test("Workflow Name Textbox: Should allow max length & special characters", async ({
    page,
  }) => {
    const workflowName = page.getByRole("textbox", { name: "Workflow Name" });

    const longString = "A".repeat(50);
    await workflowName.fill(longString);
    await expect(workflowName).toHaveValue(longString);

    await workflowName.fill("Maker Checker (C1CONCURRENTWA)");
    await expect(workflowName).toHaveValue("Maker Checker (C1CONCURRENTWA)");
  });

  // ---------------------------------------------------------
  // 3. AUDIT TYPE DROPDOWN TEST
  // ---------------------------------------------------------
  test("Audit Type Dropdown: Should display ACTIVE option", async ({
    page,
  }) => {
    await page
      .getByRole("combobox", { name: "Audit Type", exact: true })
      .click();

    await expect(
      page.getByRole("option", { name: "ACTIVE", exact: true })
    ).toBeVisible();
  });

  // ---------------------------------------------------------
  // 4. SUCCESS CASE: CREATE WORKFLOW
  // ---------------------------------------------------------
  test("Success: Should create Workflow successfully", async ({ page }) => {
    await page
      .getByRole("textbox", { name: "Workflow Name" })
      .fill("Maker Checker (C1CONCURRENTWA)");

    await page
      .getByRole("combobox", { name: "Audit Type", exact: true })
      .click();
    await page.getByRole("option", { name: "ACTIVE" }).click();

    await page.getByRole("button", { name: "Submit" }).click();

    await expect(page.getByText("Workflow created successfully")).toBeVisible();
  });
});
