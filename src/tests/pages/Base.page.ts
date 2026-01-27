import type { Locator, Page } from "@playwright/test";
import type { SelectorWithLocator } from "../types/types";
import { config } from "dotenv";
import { join } from "path";

config({ path: join(process.cwd(), ".env") });
class BasePage {
  readonly page: Page;
  readonly defaultTimeOut: number = 180000;
  protected defaultLatency: number = 180000;

  constructor(page: Page) {
    this.page = page;
  }

  getSelectorWithLocator(selector: string): SelectorWithLocator {
    return {
      selector: selector,
      locator: this.page.locator(selector),
    };
  }
  async openApplication(): Promise<void> {
    const appUrl = process.env.APPLICATION_URL;

    if (!appUrl) {
      throw new Error(
        "[ERROR] || APPLICATION_URL is not defined in environment variables",
      );
    }

    try {
      await this.page.goto(appUrl, { waitUntil: "domcontentloaded" , timeout: this.defaultTimeOut});
      // report step can be added here
    } catch (error) {
      throw new Error(
        `[ERROR] || Failed to open application URL: ${appUrl}. Reason: ${(error as Error).message}`,
      );
    }
  }
  async waitForClickable(selector: string): Promise<void> {
    try {
      const element: SelectorWithLocator =
        this.getSelectorWithLocator(selector);
      await this.page.waitForSelector(element.selector, {
        state: "visible",
        timeout: this.defaultTimeOut,
      });
      await element.locator.isEnabled({ timeout: this.defaultLatency });
    } catch {
      throw new Error(
        `[ERROR] || Timeout: expected element to be clickable after ${this.defaultTimeOut / 1000} sec - '${selector}'`,
      );
    }
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
        `[ERROR] || Timeout: expected element to be visible after ${this.defaultTimeOut / 1000} sec - '${selector}'`,
      );
    }
  }
  async clickElement(
    selector: string | Locator,
    forceCheck: boolean = true,
  ): Promise<void> {
    let locator: Locator;
    let selectorText: string;

    if (typeof selector === "string") {
      const element: SelectorWithLocator =
        this.getSelectorWithLocator(selector);
      locator = element.locator;
      selectorText = element.selector.toString();
    } else {
      locator = selector;
      selectorText = locator.toString();
    }
    try {
      await locator.waitFor({ state: "visible" });
      await locator.waitFor({ state: "attached" });
      await locator.click({ force: forceCheck, timeout: this.defaultTimeOut });
      //report step
    } catch (error) {
      throw new Error(
        `[ERROR] || Failed: to click the element: '${selector}'. Error:${error}`,
      );
    }
  }
  async fillValueInElement(
    selector: string | Locator,
    value: string,
  ): Promise<void> {
    let locator: Locator;
    let selectorText: string;

    if (typeof selector === "string") {
      const element: SelectorWithLocator =
        this.getSelectorWithLocator(selector);
      locator = element.locator;
      selectorText = element.selector.toString();
    } else {
      locator = selector;
      selectorText = locator.toString();
    }
    await locator.waitFor({ state: "visible", timeout: this.defaultTimeOut });
    if (!(await locator.isEditable())) {
      throw new Error(`[ERROR] || Element is not editable: '${selectorText}'`);
    }
    if (await locator.inputValue().catch(() => false)) {
      await locator.fill("");
    }
    await locator.scrollIntoViewIfNeeded();
    await locator.fill(value);
    //report step
  }
}
export default BasePage;
