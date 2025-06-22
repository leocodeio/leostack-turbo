import { createThemeAction } from "remix-themes";

import { themeSessionResolver } from "~/server/services/session/sessions.server";

export const action = createThemeAction(themeSessionResolver);
