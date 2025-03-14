import { expect, test } from '@playwright/test';
import { redirects } from '../../src/redirects';
import { CURRENT_ENV_URL } from '../testConfig';

test('redirects should not lead to 404', async ({ page }) => {
    const duplicates = new Set();
    for (let [source, destination] of Object.entries(redirects)) {
        if (source == destination) {
            duplicates.add(source);
        }
    }
    expect(duplicates).toEqual(new Set());

    const failedRedirects: string[] = [];
    const notFound: string[] = [];
    const errors = [];
    test.setTimeout(500_000);
    for (let [source, destination] of Object.entries(redirects)) {
        try {
        source = CURRENT_ENV_URL + source;
        source = source.replace(/([^:]\/)\/+/g, "$1");
        destination = CURRENT_ENV_URL + destination;
        destination = destination.replace(/([^:]\/)\/+/g, "$1");

        console.log(`Checking ${source} redirects to ${destination}`);
        await page.goto(source, { waitUntil: "domcontentloaded", timeout: 1_000 });
        if (page.url() !== destination) {
            failedRedirects.push(source);
        }
        await page.waitForTimeout(1000);


        const title = await page.title();
        if (title.includes('404')) {
            notFound.push(source);
        }
    } catch (e) {
        errors.push(e);
    }
    }

    expect(notFound).toEqual([]);
    expect(failedRedirects).toEqual([]);
    expect(errors).toEqual([]);
});
