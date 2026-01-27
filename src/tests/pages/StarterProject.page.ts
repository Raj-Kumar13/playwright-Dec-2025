import type { Locator, Page } from "@playwright/test";


export class StarterProject {
  constructor(private readonly page: Page) {}

  private getElementByText(text: "Username" | "Password"): Locator {
    return this.page.locator(`//p[contains(normalize-space(), '${text}')]`);
  }

  async extractCredentials(): Promise<Record<string, string>> {
    const username =
      (await this.getElementByText("Username").textContent())
        ?.split(": ")?.[1]
        ?.trim() ?? "";

    const password =
      (await this.getElementByText("Password").textContent())
        ?.split(": ")?.[1]
        ?.trim() ?? "";

    return { username, password };
  }
}
