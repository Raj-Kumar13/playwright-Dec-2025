import type { Page } from "@playwright/test";
import type { SelectorWithLocator } from "../types/types";

class BasePage {
  readonly page: Page;
  protected defaultTimeOut: number = 180000;
  protected defaultLatency: number = 180000;
  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url + "?route=account/login");
  }
  getSelectorWithLocator(selector: string): SelectorWithLocator {
    return {
      selector: selector,
      locator: this.page.locator(selector),
    };
  }
  async waitForElementDisplay(selector: string): Promise<void> {
    try {
      const element: SelectorWithLocator =
        this.getSelectorWithLocator(selector);
      await this.page.waitForSelector(element.selector, {
        state: "visible",
        timeout: this.defaultTimeOut,
      });
    } catch {
      throw new Error(
        `[ERROR] || Timeout: expected element to be visible after ${
          this.defaultTimeOut / 1000
        } sec - '${selector}'`
      );
    }
  }
}
export default BasePage;
