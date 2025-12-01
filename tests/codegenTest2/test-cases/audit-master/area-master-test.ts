import { test, expect } from "@playwright/test";

test.describe("Area Creation - Field Level Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(
      "http://localhost:8080/realms/aspl-realm/protocol/openid-connect/auth?response_type=code&client_id=aspl-open-id&redirect_uri=http%3A%2F%2Flocalhost%3A3000&code_challenge=50YiQ-drtThl3xA2StcjuE0QoC-u47YR076scb0tJsk&code_challenge_method=S256&scope=profile+openid&state=customLoginState"
    );
    await page.pause();
    await page.getByRole("textbox", { name: "Username or email" }).click();
    await page
      .getByRole("textbox", { name: "Username or email" })
      .fill("shubhamd");
    await page.getByRole("textbox", { name: "Password" }).click();
    await page.getByRole("textbox", { name: "Password" }).fill("1234");
    await page.getByRole("button", { name: "Sign In" }).click();
    await page.getByRole("menuitem", { name: "Admin" }).click();
    await page.getByRole("menuitem", { name: "Audit Masters" }).click();
    // Navigate to Area Create page before each test
    await page.getByRole("menuitem", { name: "Area", exact: true }).click();
    await page.getByRole("menuitem", { name: "Create" }).click();
  });

  test("Should show validation errors when submitting empty fields", async ({
    page,
  }) => {
    // Click submit without filling anything
    await page.getByRole("button", { name: "Submit" }).click();

    // Assert Validation Messages (Update text based on your app)
    await expect(page.getByText("Organization is required")).toBeVisible();
    await expect(page.getByText("Area is required")).toBeVisible();
    await expect(page.getByText("Status is required")).toBeVisible();
  });

  test("Area Textbox: Should be visible, editable, and accept text", async ({
    page,
  }) => {
    const areaInput = page.getByRole("textbox", { name: "Area" });

    // Assert initial state
    await expect(areaInput).toBeVisible();
    await expect(areaInput).toBeEnabled();
    await expect(areaInput).toBeEmpty();

    // Test input
    await areaInput.fill("Test_Area_123");
    await expect(areaInput).toHaveValue("Test_Area_123");
  });

  test("Organization Dropdown: Should contain valid options", async ({
    page,
  }) => {
    const orgDropdown = page.getByRole("combobox", { name: "Organization" });

    await expect(orgDropdown).toBeVisible();
    await orgDropdown.click();

    // Assert that the specific option exists in the list
    await expect(page.getByRole("option", { name: "Company1" })).toBeVisible();
  });

  test("Status Dropdown: Should allow selecting Active status", async ({
    page,
  }) => {
    const statusDropdown = page.getByRole("combobox", { name: "Status" });

    await statusDropdown.click();
    await page.getByRole("option", { name: "Active", exact: true }).click();

    // Assert the dropdown now holds the value (Implementation depends on UI lib, usually inner text)
    await expect(statusDropdown).toContainText("Active");
  });
});
