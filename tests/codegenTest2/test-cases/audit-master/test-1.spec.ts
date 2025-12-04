import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto(
    "http://localhost:8080/realms/aspl-realm/protocol/openid-connect/auth?response_type=code&client_id=aspl-open-id&redirect_uri=http%3A%2F%2Flocalhost%3A3000&code_challenge=eHxPlQjW5GMuu_-gu8rZkPRQLkT--ez4NONUDIu8UBo&code_challenge_method=S256&state=customLoginState&scope=profile+openid"
  );
  await page
    .getByRole("textbox", { name: "Username or email" })
    .fill("shubhamd");
  await page.getByRole("textbox", { name: "Password" }).click();
  await page.getByRole("textbox", { name: "Password" }).fill("1234");
  await page.getByRole("button", { name: "Sign In" }).click();
  await page.locator("div").filter({ hasText: "AMS" }).nth(4).click();
  await page.getByRole("menuitem", { name: "Admin" }).click();
  await page.getByRole("menuitem", { name: "Audit Masters" }).click();
  await page.getByRole("menuitem", { name: "Risk Type" }).click();
  await page.getByRole("menuitem", { name: "Create" }).click();
  await page.getByRole("combobox", { name: "Organization" }).click();
  await page.getByRole("option", { name: "Demo Bank" }).click();
  await page.getByRole("textbox", { name: "Risk-type" }).click();
  await page
    .getByRole("textbox", { name: "Risk-type" })
    .fill("Operational Risk");
  await page.getByRole("combobox", { name: "Status" }).click();
  await page.getByRole("option", { name: "Active", exact: true }).click();
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByRole("menuitem", { name: "Admin" }).click();
  await page.getByRole("menuitem", { name: "Audit Masters" }).click();
  await page.getByRole("menuitem", { name: "Risk Type" }).click();
  await page.getByRole("menuitem", { name: "View List" }).click();
  await page.getByRole("combobox", { name: "Organization" }).click();
  await page.getByRole("option", { name: "Demo Bank" }).click();
});
