import { chromium, expect, request } from "@playwright/test"

// (async () => {
//   const browser = await chromium.launch({
//     headless: false,
//     channel:'chrome'
//   })
//   const context = await browser.newContext();
//   const page = await context.newPage();

//   await page.goto(`https://playwright.dev/docs/actionability`, {
//     waitUntil: "networkidle",
//   });
//   expect(page.url()).toContain(`/docs/actionability`);

//   const [newPage] = await Promise.all([
//     context.waitForEvent('page'), 
//     page.locator(`//a[contains(@href, '/docs/intro') and @tabindex='0']`).click({button:'middle'})
//   ])
//   await newPage.waitForLoadState();
//   await newPage.bringToFront();
//   console.log(`************Task Completed************`)
// })()

  (async () => { 
    const apiContext = await request.newContext()
    const response = await apiContext.put('URL', {
      "ignoreHTTPSErrors": true,
      "headers": {
        'authentication':`JWT Token`
      },
      data: {

      }
    })
    return response
  })()