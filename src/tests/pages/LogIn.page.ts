import type { Locator, Page } from "@playwright/test";
import BasePage from "./Base.page";
import type { SelectorWithLocator } from "../types/types";
import { config } from "dotenv";
import { join } from "path";

config({ path: join(process.cwd(), ".env") });
class LoginPage extends BasePage {

  private getElementByPlaceHolder(
    text: "Username" | "Password",
  ): SelectorWithLocator {
    return this.getSelectorWithLocator(`input[placeholder='${text}']`);
  }
  async doLogin(credentials?: {
    username: string;
    password: string;
  }): Promise<void> {
    const username = credentials?.username ?? process.env.APP_USERNAME;
    const password = credentials?.password ?? process.env.APP_PASSWORD;
    
    if (!username || !password) {
      throw new Error(
        "Login failed: username or password is missing. Provide credentials or set USERNAME and PASSWORD env variables.",
      );
    }

    await this.fillValueInElement(
      this.getElementByPlaceHolder("Username").locator,
      username.trim(),
    );

    await this.fillValueInElement(
      this.getElementByPlaceHolder("Password").locator,
      password.trim(),
    );

    await this.clickElement(this.page.getByRole("button", { name: "Login" }));
  }
}
export default LoginPage;
