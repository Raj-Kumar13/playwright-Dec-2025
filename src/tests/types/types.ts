import type { Locator } from "@playwright/test";

export type SelectorWithLocator = {
  selector: string;
  locator: Locator;
};
