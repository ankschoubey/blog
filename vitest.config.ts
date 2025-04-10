/// <reference types="vitest" />
import { getViteConfig } from 'astro/config';

export default getViteConfig({
	test: {
		/* for example, use global to avoid globals imports (describe, test, expect): */
		// globals: true,
        // skip /tests/playwright folder
        // files: '/tests/**/*.spec.{ts,tsx}',
		globals: true,
		exclude: [
			'./tests/playwright/**/*',
		],
		include: [
			'./tests/*.spec.{ts,tsx}',
		],
		watch: true,
	},
});
