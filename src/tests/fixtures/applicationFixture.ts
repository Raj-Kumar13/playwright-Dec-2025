import BasePage from "../pages/Base.page";
import type LogInPage from "../pages/LogIn.page";
import { test as base } from "@playwright/test";
import LoginPage from "../pages/LogIn.page";
type MyFixtures = {
  loginPage: LogInPage;
  basePage: BasePage;
};

export const test = base.extend<MyFixtures>({
    loginPage: async ({ page }, use) => await use(new LoginPage(page)),
    basePage: async ({ page }, use) => await use(new BasePage(page))
})