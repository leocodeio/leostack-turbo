export type ThemeColors = "Zinc" | "Rose" | "Blue" | "Green" | "Orange";
export interface ThemeColorStateParams {
  themeColor: ThemeColors;
  setThemeColor: (color: ThemeColors) => void;
}
