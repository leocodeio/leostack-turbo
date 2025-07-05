import { getI18nSession } from "../session/sessions.server";
import { getThemeColorSession } from "../session/sessions.server";
import { themeSessionResolver } from "../session/sessions.server";
import { ValidationError } from "../../../utils/data-inject-error";
import { Theme } from "remix-themes";
import { ThemeColors } from "../../../types/theme-types";

const getData = async (request: Request) => {
  const { getTheme } = await themeSessionResolver(request);
  const { getThemeColor } = await getThemeColorSession(request);
  const i18nSession = await getI18nSession(request);
  const locale = i18nSession.getLocale() ?? "en";
  const theme = getTheme() ? getTheme() : "light";
  const themeColor = getThemeColor() ? getThemeColor() : "light";
  return { locale, theme, themeColor };
};
// 401
export const throw401Error = async (request: Request) => {
  const { locale, theme, themeColor } = await getData(request);
  // console.log(theme, themeColor);
  if (!theme || !themeColor) {
    throw new ValidationError(
      "Unauthorized",
      {},
      locale,
      theme as Theme,
      themeColor as ThemeColors,
      401
    );
  }
  throw new ValidationError(
    "Unauthorized",
    {},
    locale,
    theme as Theme,
    themeColor as ThemeColors,
    401
  );
};
// 403
export const throw403Error = async (request: Request) => {
  const { locale, theme, themeColor } = await getData(request);
  throw new ValidationError(
    "Forbidden",
    {},
    locale,
    theme as Theme,
    themeColor as ThemeColors,
    403
  );
};
// 404
export const throw404Error = async (request: Request) => {
  const { locale, theme, themeColor } = await getData(request);
  throw new ValidationError(
    "Resource not found",
    {},
    locale,
    theme as Theme,
    themeColor as ThemeColors,
    404
  );
};
// 500
export const throw500Error = async (request: Request) => {
  const { locale, theme, themeColor } = await getData(request);
  throw new ValidationError(
    "Internal server error",
    {},
    locale,
    theme as Theme,
    themeColor as ThemeColors,
    500
  );
};
// 503
export const throw503Error = async (request: Request) => {
  const { locale, theme, themeColor } = await getData(request);
  throw new ValidationError(
    "Service unavailable",
    {},
    locale,
    theme as Theme,
    themeColor as ThemeColors,
    503
  );
};
