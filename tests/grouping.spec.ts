import { test, expect, Page } from "@playwright/test";

test("grouping page tests filter-by-my-level", async ({ page }) => {
	await page.goto("https://www.ddoaudit.com/");

	await expect(page).toHaveTitle(/DDO Audit/);
	await page.getByRole("link", { name: "Grouping" }).hover();
	await page
		.locator("#nav-dropdown-to-grouping")
		.getByRole("link", { name: "Argonnessen" })
		.click();
	await page
		.locator("div")
		.filter({ hasText: /^Filters$/ })
		.click();
	expect(await getLocalStorage(page, "filter-by-my-level")).toBe(undefined);
	await page.getByLabel("Filter groups based on my current level").check();
	expect(await getLocalStorage(page, "filter-by-my-level")).toBe("true");
	await page.getByLabel("Filter groups based on my current level").uncheck();
	expect(await getLocalStorage(page, "filter-by-my-level")).toBe("false");
});

const getLocalStorage = async (page: Page, key: string) => {
	const localStorage = await page.evaluate(() => window.localStorage);
	console.log(localStorage);
	return localStorage[key];
};
