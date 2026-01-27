import BasePage from "../pages/Base.page";
import type LogInPage from "../pages/LogIn.page";
import { test as base, type Page } from "@playwright/test";
import LoginPage from "../pages/LogIn.page";
type MyFixtures = {
  loginPage: LogInPage;
  basePage: BasePage;
  pageWithMonitoring: Page;
};

export const orangeHRM = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => await use(new LoginPage(page)),
  basePage: async ({ page }, use) => await use(new BasePage(page)),
  //#### Network URL's Monitoring
  pageWithMonitoring: [
    async ({ page }, use, testInfo) => {
      const failedRequests: any[] = [];
      page.on("response", (response) => {
        const url = response.url();
        const status = response.status();
        console.log(`URL :: ${url}  ===> StatesCode :: ${status} \n`);
        if (status >= 400) {
          failedRequests.push({
            status,
            url,
          });
        }
      });
      await use(page);
      if (failedRequests.length > 0) {
        await testInfo.attach("failed-requests.json", {
          body: JSON.stringify(failedRequests, null, 2),
          contentType: "application/json",
        });
        throw new Error(`Hey there were failed request.....`);
      }
    },
    { auto: true },
  ],
});
