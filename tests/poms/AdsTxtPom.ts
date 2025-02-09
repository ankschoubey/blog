import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class AdTxtPageObject {
	page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	async expectToContain(expectedText: string) {
		await this.page.goto('https://www.ankushchoubey.com/ads.txt');
		const text = await this.page.innerText('body');
		expect(text).toContain(expectedText);
	}
}
