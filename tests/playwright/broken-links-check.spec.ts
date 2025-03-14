// import blc from 'broken-link-checker';
// import { expect, test } from 'vitest';

// const siteUrl = 'https://ankushchoubey.com';

// const options = {
//   filterLevel: 3,
//   excludeExternalLinks: false,
//   excludeInternalLinks: false,
//   excludeLinksToSamePage: false
// };

// const siteChecker = new blc.SiteChecker(options, {
//   link: (result) => {
//     if (result.broken) {
//       console.log(`Broken link: ${result.url.original}`);
//     }
//   },
//   end: () => {
//     console.log('Scan completed.');
//   }
// });

// siteChecker.enqueue(siteUrl);

// // Run the test

// test('no broken links', async (a) => {
//     const siteChecker = new blc.SiteChecker(options, {
//         link: (result) => {
//             if (result.broken) {
//                 console.log(`Broken link: ${result.url.original}`);
//             }
//         },
//         end: () => {
//             console.log('Scan completed.');
//         }
//     });
// });

