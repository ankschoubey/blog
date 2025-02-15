import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class AdTxtPageObject {
	page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	async expectToContain(expectedText: string) {
		const response = await this.page.goto('https://www.ankushchoubey.com/ads.txt');
		const text = await this.page.innerText('body');
		if (response) {
			expect(response.status()).toBe(200);
			expect(response.headers()['content-type']).toBe('text/plain; charset=utf-8');
		} else {
			throw new Error('Failed to load ads.txt');
		}
		const contentLength = parseInt(response.headers()['content-length'], 10);
		expect(contentLength).toBe(expectedText.length);
		expect(text).toContain(expectedText);
	}
}
