import clsx from "clsx";

import {
  getThemeColorSession,
  themeSessionResolver,
  getI18nSession,
} from "./server/services/session/sessions.server";

import {
  Meta,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { Links } from "@remix-run/react";
import { Outlet } from "@remix-run/react";
import { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";

// styles
// import { styles } from "@./shadcn";
import "./tailwind.css";

// themes
import {
  PreventFlashOnWrongTheme,
  Theme,
  ThemeProvider,
  useTheme,
} from "remix-themes";
import { ThemeDataProvider } from "./context/theme-data-provider";
import { ThemeColors } from "./types/theme-types";

// errors
import { GeneralErrorBoundary } from "./components/error-boundary";
import MaintenanceError from "./components/errors/503";
import NotFoundError from "./components/errors/404";
import ForbiddenError from "./components/errors/403";
import UnauthorizedError from "./components/errors/401";
import ServerError from "./components/errors/500";

// i18n
import { useChangeLanguage } from "remix-i18next/react";
import { useTranslation } from "react-i18next";
import { Toaster } from "./components/ui/toaster";
export let handle = {
  // In the handle export, we can add a i18n key with namespaces our route
  // will need to load. This key can be a single string or an array of strings.
  // TIP: In most cases, you should set this to your defaultNS from your i18n config
  // or if you did not set one, set it to the i18next default namespace "translation"
  i18n: "common",
};

// loader
export async function loader({ request }: LoaderFunctionArgs) {
  //-------------------------- i18n---------------------------------------
  const i18nSession = await getI18nSession(request);
  let locale = i18nSession.getLocale();
  //-------------------------- theme---------------------------------------
  const { getTheme } = await themeSessionResolver(request);
  const { getThemeColor } = await getThemeColorSession(request);
  const ENV = {
    NODE_ENV: process.env.NODE_ENV || "development",
    apiUrl: process.env.APP_BASE_URL || "http://localhost:5173",
  };
  return {
    theme: getTheme(),
    themeColor: getThemeColor(),
    locale,
    ENV,
  };
}

// links
export const links: LinksFunction = () => [
  // { rel: "stylesheet", href: styles },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

// app
export default function AppWithProviders() {
  const data = useLoaderData<typeof loader>();
  return (
    <ThemeProvider specifiedTheme={data.theme} themeAction="/action/set-theme">
      <ThemeDataProvider initialThemeColor={data.themeColor as ThemeColors}>
        <App />
      </ThemeDataProvider>
    </ThemeProvider>
  );
}

export function App() {
  const data = useLoaderData<typeof loader>();
  useChangeLanguage(data.locale);
  let { i18n } = useTranslation();
  const [theme] = useTheme();
  return (
    <html className={clsx(theme)} lang={data.locale} dir={i18n.dir()}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
        <Links />
      </head>
      <body>
        <Toaster />
        <Outlet />
        <ScrollRestoration />
        {/* metrics */}
        {/* <script async src="https://scripts.simpleanalyticscdn.com/latest.js" /> */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
          }}
        />
        <Scripts />
      </body>
    </html>
  );
}

// error boundary
export function ErrorBoundary() {
  const errorData = useRouteError();
  // @ts-ignore
  const injectedData = errorData.data;
  return (
    <ThemeProvider
      specifiedTheme={injectedData ? injectedData.theme : ("light" as Theme)}
      themeAction="/action/set-theme"
    >
      <ThemeDataProvider
        initialThemeColor={
          injectedData ? (injectedData.themeColor as ThemeColors) : "Zinc"
        }
      >
        <ErrorBoundarySkeleton
          locale={injectedData ? injectedData.locale : "en"}
          theme={injectedData ? injectedData.theme : ("light" as Theme)}
        />
      </ThemeDataProvider>
    </ThemeProvider>
  );
}

export function ErrorBoundarySkeleton({
  locale,
  theme,
}: {
  locale: string;
  theme: Theme;
}) {
  let { i18n } = useTranslation();
  useChangeLanguage(locale);
  console.log(theme);

  return (
    <html className={clsx(theme)} lang={locale} dir={i18n.dir()}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(theme)} />
        <Links />
      </head>
      <body>
        <GeneralErrorBoundary
          statusHandlers={{
            401: () => <UnauthorizedError />,
            403: () => <ForbiddenError />,
            404: () => <NotFoundError />,
            500: () => <ServerError />,
            503: () => <MaintenanceError />,
          }}
        />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
