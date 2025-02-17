import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class AdTxtPageObject {
	page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	async extractRSS(expectedText: string) {
		const response = await this.page.goto('https://www.ankushchoubey.com/rss.xml');
	}
}
