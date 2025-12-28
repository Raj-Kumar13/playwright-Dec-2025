import { expect } from "@playwright/test";
import { test } from "../fixtures/applicationFixture";

test.describe("Test Application Login page", () => {
  test("do login with valid credentials", async ({
    basePage,
    loginPage,
    page,
  }) => {
    await basePage.navigateTo(
      `https://naveenautomationlabs.com/opencart/index.php`
    );
    await basePage.waitForElementDisplay(`img[title="naveenopencart"]`);
    await loginPage.doLogin("pwtest@nal.com", "test123");
    await basePage.waitForElementDisplay(`//h2[normalize-space(text())='My Account']`);
    expect(page.locator(`//h2[normalize-space(text())='My Account']`)).toBeVisible({timeout: 5000});
  });
});
