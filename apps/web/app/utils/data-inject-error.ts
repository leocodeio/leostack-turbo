import { Theme } from "remix-themes";
import { ThemeColors } from "../types/theme-types";

export class ValidationError extends Response {
  constructor(
    message: string,
    fields: Record<string, string>,
    language: string,
    theme: Theme,
    themeColor: ThemeColors,
    status: number
  ) {
    // Create a response body that includes both the message and your custom data
    const body = JSON.stringify({
      message,
      fields,
      language,
      theme,
      themeColor,
    });

    super(body, {
      status,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
