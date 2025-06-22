// This is called a "splat route" and as it's in the root `/app/routes/`
// directory, it's a catchall. If no other routes match, this one will and we
// can know that the user is hitting a URL that doesn't exist. By throwing a
// 404 from the loader, we can force the error boundary to render which will
// ensure the user gets the right status code and we can display a nicer error
// message for them than the Remix and/or browser default.

import { GeneralErrorBoundary } from "../components/error-boundary";

// Import error components
import NotFoundError from "../components/errors/404";
import ServerError from "../components/errors/500";
import ForbiddenError from "../components/errors/403";
import UnauthorizedError from "../components/errors/401";
import MaintenanceError from "../components/errors/503";

import {
  getI18nSession,
  getThemeColorSession,
  themeSessionResolver,
} from "../server/services/session/sessions.server";
import { ValidationError } from "../utils/data-inject-error";
import { Theme } from "remix-themes";
import { ThemeColors } from "../types/theme-types";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { getTheme } = await themeSessionResolver(request);
  const { getThemeColor } = await getThemeColorSession(request);
  const i18nSession = await getI18nSession(request);
  const locale = i18nSession.getLocale();
  const theme = getTheme();
  const themeColor = getThemeColor();
  // console.log(theme, themeColor);
  if (!theme || !themeColor) {
    throw new ValidationError(
      "Not found",
      {},
      locale,
      theme as Theme,
      themeColor as ThemeColors,
      404
    );
  }
  throw new ValidationError(
    "Not found",
    {},
    locale,
    theme as Theme,
    themeColor as ThemeColors,
    401
  );
};

export const action = async () => {
  return null;
};

export default function NotFound() {
  // due to the loader, this component will never be rendered, but we'll return
  // the error boundary just in case.
  return <ErrorBoundary />;
}

export function ErrorBoundary() {
  return (
    <GeneralErrorBoundary
      statusHandlers={{
        401: () => <UnauthorizedError />,
        403: () => <ForbiddenError />,
        404: () => <NotFoundError />,
        500: () => <ServerError />,
        503: () => <MaintenanceError />,
      }}
    />
  );
}
