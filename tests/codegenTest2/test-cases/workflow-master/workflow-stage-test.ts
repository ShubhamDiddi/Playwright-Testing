import { test, expect } from "@playwright/test";

test.describe("Workflow Stage Creation - Field Level Tests", () => {
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
    await page.getByRole("link", { name: "Create Workflow Stages" }).click();
  });

  // ---------------------------------------------------------
  // 1. VALIDATION TESTS
  // ---------------------------------------------------------
  test("Validation: Should require Stage Workflow, Stage Name, and Audit Type", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Submit" }).click();

    await expect(page.getByText("Workflow is required")).toBeVisible();
    await expect(
      page.getByText("Workflow Stage Name is required")
    ).toBeVisible();
    await expect(page.getByText("Audit Type is required")).toBeVisible();
  });

  // ---------------------------------------------------------
  // 2. STAGE NAME TEXTBOX VALIDATION
  // ---------------------------------------------------------
  test("Workflow Stage Name: Should allow max length & special characters", async ({
    page,
  }) => {
    const stageName = page.getByRole("textbox", {
      name: "Workflow Stage Name",
    });

    const longString = "A".repeat(50);
    await stageName.fill(longString);
    await expect(stageName).toHaveValue(longString);

    await stageName.fill("Audit Planned");
    await expect(stageName).toHaveValue("Audit Planned");
  });

  // ---------------------------------------------------------
  // 3. SUCCESS CASE: CREATE STAGE
  // ---------------------------------------------------------
  test("Success: Should create Workflow Stage successfully", async ({
    page,
  }) => {
    await page.getByLabel("", { exact: true }).click();
    await page.getByRole("option", { name: "C1 Concurrent WA" }).click();

    await page
      .getByRole("textbox", { name: "Workflow Stage Name" })
      .fill("Audit Planned");

    await page
      .getByRole("combobox", { name: "Audit Type", exact: true })
      .click();
    await page.getByRole("option", { name: "ACTIVE" }).click();

    await page.getByRole("button", { name: "Submit" }).click();

    await expect(
      page.getByText("Workflow Stage created successfully")
    ).toBeVisible();
  });
});
