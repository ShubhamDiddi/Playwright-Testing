import { test, expect } from "@playwright/test";

test.describe("Document Creation - Field Level Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.getByRole("menuitem", { name: "Admin" }).click();
    await page.getByRole("menuitem", { name: "Audit Masters" }).click();
    await page.getByRole("menuitem", { name: "Document" }).click();
    await page.getByRole("menuitem", { name: "Create" }).click();
  });

  // ------------------------------------
  // 1. REQUIRED FIELD VALIDATION TEST
  // ------------------------------------
  test("Validation: Should require all mandatory fields", async ({ page }) => {
    await page.getByRole("button", { name: "Submit" }).click();

    await expect(page.getByText("Organization is required")).toBeVisible();
    await expect(page.getByText("Area is required")).toBeVisible();
    await expect(page.getByText("Subarea is required")).toBeVisible();
    await expect(page.getByText("Question is required")).toBeVisible();
    await expect(page.getByText("Document name is required")).toBeVisible();
    await expect(page.getByText("Category is required")).toBeVisible();
    await expect(page.getByText("Document type is required")).toBeVisible();
    await expect(page.getByText("File is required")).toBeVisible();
  });

  // ------------------------------------
  // 2. DROPDOWN DEPENDENCY TEST
  // ------------------------------------
  test("Dependency: Area/Subarea/Question must populate after selecting previous fields", async ({
    page,
  }) => {
    // Select Organization
    await page.getByRole("combobox", { name: "Organization" }).click();
    await page.getByRole("option", { name: "Company1" }).click();

    // Area dropdown should now load values
    await page.getByRole("combobox", { name: "Area" }).click();
    await expect(
      page.getByRole("option", { name: "C1_CCSA_BA1" })
    ).toBeVisible();

    // Subarea dropdown
    await page.getByRole("option", { name: "C1_CCSA_BA1" }).click();
    await page.getByRole("combobox", { name: "Subarea" }).click();
    await expect(
      page.getByRole("option", { name: "C1_CCSA_BA1_SA1" })
    ).toBeVisible();

    // Questions dropdown
    await page.getByRole("option", { name: "C1_CCSA_BA1_SA1" }).click();
    await page.getByRole("combobox", { name: "Question" }).click();
    await expect(
      page.getByRole("option", { name: "C1_CCSA_BA1_SA1 QUESTION1" })
    ).toBeVisible();
  });

  // ------------------------------------
  // 3. DOCUMENT NAME FIELD TEST
  // ------------------------------------
  test("Document Name: Should accept max characters and special characters", async ({
    page,
  }) => {
    const docName = page.getByRole("textbox", { name: "Document Name" });

    // Test long string (assuming limit around 50 chars)
    const longString = "A".repeat(50);
    await docName.fill(longString);
    await expect(docName).toHaveValue(longString);

    // Test special characters
    await docName.fill("Doc_Test@#$%123");
    await expect(docName).toHaveValue("Doc_Test@#$%123");
  });

  // ------------------------------------
  // 4. CATEGORY AND DOCUMENT TYPE TEST
  // ------------------------------------
  test("Category & Document Type dropdown must populate correctly", async ({
    page,
  }) => {
    await page.getByRole("combobox", { name: "Category" }).click();
    await expect(page.getByRole("option", { name: "AUDITOR" })).toBeVisible();
    await expect(page.getByRole("option", { name: "AUDITEE" })).toBeVisible();
    await page.getByRole("option", { name: "AUDITOR" }).click();

    await page.getByRole("combobox", { name: "Document Type" }).click();
    await expect(page.getByRole("option", { name: "Annexure" })).toBeVisible();
    await expect(
      page.getByRole("option", { name: "Supporting" })
    ).toBeVisible();
    await page.getByRole("option", { name: "Annexure" }).click();
  });

  // ------------------------------------
  // 5. FILE UPLOAD TEST
  // ------------------------------------
  test("File Upload: Should accept file and update UI state", async ({
    page,
  }) => {
    await page
      .getByRole("button", { name: "Choose File" })
      .setInputFiles("C1_CCSA_AuditLevelDocument1.xlsx");

    const fileUploaded = page.getByText("C1_CCSA_AuditLevelDocument1.xlsx");
    await expect(fileUploaded).toBeVisible();
  });

  // ------------------------------------
  // 6. SUCCESSFUL DOCUMENT CREATION TEST
  // ------------------------------------
  test("Success Case: Should create document successfully", async ({
    page,
  }) => {
    // Fill form
    await page.getByRole("combobox", { name: "Organization" }).click();
    await page.getByRole("option", { name: "Company1" }).click();

    await page.getByRole("combobox", { name: "Area" }).click();
    await page.getByRole("option", { name: "C1_CCSA_BA1" }).click();

    await page.getByRole("combobox", { name: "Subarea" }).click();
    await page.getByRole("option", { name: "C1_CCSA_BA1_SA1" }).click();

    await page.getByRole("combobox", { name: "Question" }).click();
    await page
      .getByRole("option", { name: "C1_CCSA_BA1_SA1 QUESTION1" })
      .click();

    await page
      .getByRole("textbox", { name: "Document Name" })
      .fill("C1_CCSA_AuditLevelDocument1");

    await page.getByRole("combobox", { name: "Category" }).click();
    await page.getByRole("option", { name: "AUDITOR" }).click();

    await page.getByRole("combobox", { name: "Document Type" }).click();
    await page.getByRole("option", { name: "Annexure" }).click();

    await page
      .getByRole("button", { name: "Choose File" })
      .setInputFiles("C1_CCSA_AuditLevelDocument1.xlsx");

    await page.getByRole("combobox", { name: "Status" }).click();
    await page.getByRole("option", { name: "Active" }).click();

    await page.getByRole("button", { name: "Submit" }).click();

    // Assertion - success message
    await expect(page.getByText("Document created successfully")).toBeVisible();
  });

  // ------------------------------------
  // 7. AUDIT LEVEL DOCUMENT YES/NO RADIO BEHAVIOR
  // ------------------------------------
  test("Audit Level Document Radio: YES disables Area field, NO enables Area field", async ({
    page,
  }) => {
    const areaCombobox = page.getByRole("combobox", { name: "Area" });

    // Select YES → Area should be disabled
    await page.getByRole("radio", { name: "Yes" }).check();
    await expect(areaCombobox).toBeDisabled();

    // Select NO → Area should be enabled again
    await page.getByRole("radio", { name: "No" }).check();
    await expect(areaCombobox).toBeEnabled();
  });

  // ------------------------------------
  // 8. SUCCESS CASE WITH RADIO BUTTON LOGIC
  // ------------------------------------
  test("Success: Should create document when Audit Level Document = NO", async ({
    page,
  }) => {
    const areaCombobox = page.getByRole("combobox", { name: "Area" });

    // Select NO → allows selecting Area and Subarea
    await page.getByRole("radio", { name: "No" }).check();
    await expect(areaCombobox).toBeEnabled();

    // Fill form
    await page.getByRole("combobox", { name: "Organization" }).click();
    await page.getByRole("option", { name: "Company1" }).click();

    await areaCombobox.click();
    await page.getByRole("option", { name: "C1_CCSA_BA1" }).click();

    await page.getByRole("combobox", { name: "Subarea" }).click();
    await page.getByRole("option", { name: "C1_CCSA_BA1_SA1" }).click();

    await page.getByRole("combobox", { name: "Question" }).click();
    await page
      .getByRole("option", { name: "C1_CCSA_BA1_SA1 QUESTION1" })
      .click();

    await page
      .getByRole("textbox", { name: "Document Name" })
      .fill("C1_CCSA_AuditLevelDocument1");

    await page.getByRole("combobox", { name: "Category" }).click();
    await page.getByRole("option", { name: "AUDITOR" }).click();

    await page.getByRole("combobox", { name: "Document Type" }).click();
    await page.getByRole("option", { name: "Annexure" }).click();

    await page
      .getByRole("button", { name: "Choose File" })
      .setInputFiles("C1_CCSA_AuditLevelDocument1.xlsx");

    await page.getByRole("combobox", { name: "Status" }).click();
    await page.getByRole("option", { name: "Active" }).click();

    await page.getByRole("button", { name: "Submit" }).click();

    // Success Message
    await expect(page.getByText("Document created successfully")).toBeVisible();
  });
});
