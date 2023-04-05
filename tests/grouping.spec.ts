import { test, expect, Page } from "@playwright/test";

const filters = [
	{
		name: "Filter groups based on my current level",
		localStorageKey: "filter-by-my-level",
		default: undefined,
		first: "true",
	},
	{
		name: "Show groups I am not eligible for",
		localStorageKey: "show-not-eligible",
		default: undefined,
		first: "false",
	},
	{
		name: "Sort groups ascending",
		localStorageKey: "sort-order",
		default: undefined,
		first: "false",
	},
	{
		name: "Text-Based View",
		localStorageKey: "alternative-lfm-look",
		default: undefined,
		first: "true",
	},
	{
		name: "High Contrast",
		localStorageKey: "high-visibility",
		default: undefined,
		first: "true",
	},
	{
		name: "Large Font",
		localStorageKey: "font-modifier",
		default: undefined,
		first: "5",
		second: "0",
	},
	{
		name: "Show Raid Timer Indicator",
		localStorageKey: "show-raid-timer-indicator",
		default: undefined,
		first: "true",
	},
	{
		name: "Show Completion Progress Bar",
		localStorageKey: "completion-percentage",
		default: undefined,
		first: "true",
	},
	{
		name: "Show Member Count",
		localStorageKey: "member-count",
		default: undefined,
		first: "false",
	},
	{
		name: "Show Quest Guesses",
		localStorageKey: "quest-guess",
		default: undefined,
		first: "false",
	},
	{
		name: "Show Quest Tips",
		localStorageKey: "quest-tips",
		default: undefined,
		first: "false",
	},
	{
		name: "Show Character Guild Names",
		localStorageKey: "show-guild-names",
		default: undefined,
		first: "true",
	},
];

filters.forEach((filter) => {
	test(`grouping page tests ${filter.name}`, async ({ page }) => {
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
		expect(await getLocalStorage(page, filter.localStorageKey)).toBe(
			filter.default
		);
		await page.getByLabel(filter.name).click();
		expect(await getLocalStorage(page, filter.localStorageKey)).toBe(
			filter.first
		);
		await page.getByLabel(filter.name).click();
		if (filter.second) {
			expect(await getLocalStorage(page, filter.localStorageKey)).toBe(
				filter.second
			);
		} else {
			expect(await getLocalStorage(page, filter.localStorageKey)).toBe(
				filter.first === "true" ? "false" : "true"
			);
		}
	});
});

const getLocalStorage = async (page: Page, key: string) => {
	const localStorage = await page.evaluate(() => window.localStorage);
	return localStorage[key];
};
