import { test, expect, Page } from "@playwright/test";

test("registration page register a character", async ({ page }) => {
	await page.goto("https://www.ddoaudit.com/");

	await expect(page).toHaveTitle(/DDO Audit/);
	await page
		.getByRole("link", {
			name: /Register Characters/,
		})
		.click();
	await page.getByText("Add Character").click();
	await page.getByLabel("Name").fill("Clemeit-1");
	await page.getByRole("combobox", { name: "Server" }).selectOption("Thelanis");
	await page.getByText("Add", { exact: true }).click();
	await expect(
		page.locator("div").filter({ hasText: /^Clemeit-1$/ })
	).toBeVisible({ timeout: 20000 });
});

test("registration page removes a registered character", async ({ page }) => {
	await page.goto("https://www.ddoaudit.com/");

	await expect(page).toHaveTitle(/DDO Audit/);
	await page
		.getByRole("link", {
			name: /Register Characters/,
		})
		.click();
	await page.getByText("Add Character").click();
	await page.getByLabel("Name").fill("Clemeit-1");
	await page.getByRole("combobox", { name: "Server" }).selectOption("Thelanis");
	await page.getByText("Add", { exact: true }).click();
	await expect(
		page.locator("div").filter({ hasText: /^Clemeit-1$/ })
	).toBeVisible({ timeout: 20000 });
	await page
		.locator("div")
		.filter({ hasText: /^Clemeit-1$/ })
		.locator("svg")
		.first()
		.click();
	await expect(
		page.locator("div").filter({ hasText: /^Clemeit-1$/ })
	).not.toBeVisible();
});
