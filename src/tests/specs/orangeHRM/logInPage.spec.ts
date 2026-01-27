import { expect } from "@playwright/test";
import { orangeHRM } from "../../fixtures/applicationFixture";
import { log } from "node:console";

orangeHRM.describe("Orange HRM - Application Test", () => {
  orangeHRM("User validate login process with valid credentials", async ({
    basePage,
    loginPage,
    page
  }) => {
    await orangeHRM.step(`Navigate to application login page`, async () => { 
      await basePage.openApplication()
    })
    await orangeHRM.step(`Validate the login page`, async () => {
      await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible({timeout: basePage.defaultTimeOut})
    })
    await orangeHRM.step(`Enter Credentials`, async () => { 
      await loginPage.doLogin()
    })
    await orangeHRM.step(`Validate the Dashboard landing page`, async () => {
     await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible({timeout: basePage.defaultTimeOut})
    });
  });
});
