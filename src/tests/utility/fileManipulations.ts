import fs from "fs";
import path from "path";

class FileManipulations {
  private static instance: FileManipulations;

  private constructor() {}

  static getInstance() {
    if (!FileManipulations.instance) {
      FileManipulations.instance = new FileManipulations();
    }
    return FileManipulations.instance;
  }

  writeToEnv(key: string, value: string) {
    const envPath = path.resolve(process.cwd(), ".env");

    let envContent = "";

    if (fs.existsSync(envPath)) {
      envContent = fs.readFileSync(envPath, "utf-8");
    }

    const regex = new RegExp(`^${key}=.*$`, "m");

    if (regex.test(envContent)) {
      envContent = envContent.replace(regex, `${key}=${value}`);
    } else {
      envContent += `\n${key}=${value}`;
    }

    fs.writeFileSync(envPath, envContent.trim() + "\n");
  }
}
export default FileManipulations;
