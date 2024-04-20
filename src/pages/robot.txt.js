// Outputs: /builtwith.json
const robotTxt = `User-agent: *
Allow: /
Sitemap: https://www.ankushchoubey.com/sitemap-index.xml`
export async function GET({params, request}) {
    return new Response(robotTxt)
  }