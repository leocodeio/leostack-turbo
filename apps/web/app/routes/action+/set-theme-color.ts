import {
  json,
  LoaderFunctionArgs,
  redirect,
  type ActionFunctionArgs,
} from "@remix-run/node";
import { getThemeColorSession } from "~/server/services/session/sessions.server";

export async function action({ request }: ActionFunctionArgs) {
  try {
    const themeColorSession = await getThemeColorSession(request);
    const requestText = await request.text();
    const form = new URLSearchParams(requestText);
    const themeColor = form.get("themeColor");

    if (
      !themeColor ||
      !["Zinc", "Rose", "Blue", "Green", "Orange"].includes(themeColor)
    ) {
      return json({
        success: false,
        message: "Invalid theme color",
      });
    }

    themeColorSession.setThemeColor(themeColor);
    console.log("themeColor", themeColor);

    return json(
      { success: true },
      {
        headers: {
          "Set-Cookie": await themeColorSession.commitThemeColorSession(),
        },
      }
    );
  } catch (error) {
    console.error("Error setting theme color:", error);
    return json(
      { success: false, message: "Failed to set theme color" },
      { status: 500 }
    );
  }
}

export async function loader({ request }: LoaderFunctionArgs) {
  const previousUrl = request.headers.get("Referer");
  return redirect(previousUrl || "/");
}
