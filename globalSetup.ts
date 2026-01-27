import { chromium } from "@playwright/test";
import { StarterProject } from "./src/tests/pages/StarterProject.page";
import  FileManipulations  from "./src/tests/utility/fileManipulations";

export default async function globalSetup() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    { waitUntil: "domcontentloaded", timeout: 60000 },
  );


  
  const starterProject = new StarterProject(page);
  const credentials = await starterProject.extractCredentials();
  const files = FileManipulations.getInstance()
  files.writeToEnv("USERNAME", credentials.username);
  files.writeToEnv("PASSWORD", credentials.password);

  await browser.close();
}
