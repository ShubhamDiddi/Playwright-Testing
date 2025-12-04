import { test, expect } from "@playwright/test";

test.describe("Assign Workflow Stages - Field Level Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page
      .getByRole("link", { name: "Assign Sequence to Workflow" })
      .click();
  });

  // ---------------------------------------------------------
  // 1. VALIDATION TESTS
  // ---------------------------------------------------------
  test("Validation: Should require Workflow, Stage & Sequence Number", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Submit" }).click();

    await expect(page.getByText("Workflow is required")).toBeVisible();
    await expect(page.getByText("Workflow Stage is required")).toBeVisible();
    await expect(page.getByText("Stage Number is required")).toBeVisible();
  });

  // ---------------------------------------------------------
  // 2. SUCCESS CASE: ASSIGN SEQUENCE
  // ---------------------------------------------------------
  test("Success: Should assign Workflow Stage sequence successfully", async ({
    page,
  }) => {
    await page.getByRole("combobox", { name: "Stage Workflow" }).click();
    await page
      .getByRole("option", { name: "Maker Checker (C1CONCURRENTWA)" })
      .click();

    await page.getByRole("combobox", { name: "Select Workflow Stage" }).click();
    await page.getByRole("option", { name: "Document Upload" }).click();

    await page
      .getByRole("spinbutton", { name: "Workflow Stage Number" })
      .fill("3");

    await page.getByRole("button", { name: "Submit" }).click();

    await expect(
      page.getByText("Workflow sequence assigned successfully")
    ).toBeVisible();
  });
});
