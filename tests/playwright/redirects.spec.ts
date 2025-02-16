import { expect, test } from '@playwright/test';
import { redirects } from '../../src/redirects';
import { SITE } from '../../src/utils/config';

test('redirects should not lead to 404', async ({ page }) => {
    const failedRedirects: string[] = [];
    const notFound: string[] = [];

    for (let [source, destination] of Object.entries(redirects)) {
        source = SITE.site + source;
        source = source.replace(/([^:]\/)\/+/g, "$1");
        destination = SITE.site + destination;
        destination = destination.replace(/([^:]\/)\/+/g, "$1");

        await page.goto(source);
        if (page.url() !== destination) {
            failedRedirects.push(source);
        }
        await page.waitForTimeout(400);
        const title = await page.title();
        if (title.includes('404')) {
            notFound.push(source);
        }
    }

    expect(notFound).toEqual([]);
    expect(failedRedirects).toEqual([]);
});
