import type { Locator, Page } from "@playwright/test";
import BasePage from "./Base.page";

class LoginPage extends BasePage {
  private readonly emailId: Locator;
  private readonly password: Locator;
  private readonly loginBtn: string;
  private readonly warningMsg: Locator;
  private readonly registerlink: Locator;

  //2. page class constructor...
  constructor(page: Page) {
    super(page);
    this.emailId = page.getByRole("textbox", { name: "E-Mail Address" });
    this.password = page.getByRole("textbox", { name: "Password" });
    this.loginBtn = `input[type="submit"][value="Login"]`;
    this.warningMsg = page.locator(".alert.alert-danger.alert-dismissible");
    this.registerlink = page.getByText("Register", { exact: true });
  }
  async goToLoginPage(baseURL: string | undefined) {
    await this.page.goto(baseURL + "?route=account/login");
  }

  /**
   * login to app using username/password
   * @param email
   * @param password
   * @returns
   */
  async doLogin(email: string, password: string): Promise<boolean> {
    await this.emailId.fill(email);
    await this.password.fill( password);
    await this.page.click(this.loginBtn, { force: true, timeout: 5000 });
    return true;
  }

  /**
   * get the warning message in case of invalid login
   * @returns
   */
  async getInvalidLoginMessage(): Promise<string | null> {
    const errorMesg = await this.warningMsg.textContent();
    console.log("invalid login warning message: " + errorMesg);
    return errorMesg;
  }
}
export default LoginPage;
