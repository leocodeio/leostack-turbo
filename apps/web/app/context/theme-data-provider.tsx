// app/context/theme-data-provider.tsx
import setGlobalColorTheme from "@/lib/theme-colors";
import { useTheme } from "remix-themes";
import { createContext, useContext, useEffect, useState, ReactNode } from "react"; // Added ReactNode
import { useSubmit } from "@remix-run/react";
import { ThemeColors, ThemeColorStateParams } from "@/types/theme-types"; // Make sure ThemeColors is correctly defined

const ThemeContext = createContext<ThemeColorStateParams>({
  themeColor: "Zinc", // Default value, ensure 'Zinc' is a valid ThemeColors type
  setThemeColor: () => {},
});

const ThemeDataProvider = ({
  children,
  initialThemeColor = "Zinc", // Ensure 'Zinc' is a valid ThemeColors type
}: {
  children: ReactNode;
  initialThemeColor?: ThemeColors;
}) => {
  const [themeColor, setThemeColorState] =
    useState<ThemeColors>(initialThemeColor);
  const [theme] = useTheme(); // From remix-themes (light/dark)
  const submit = useSubmit();

  // Define the function that will be passed to the context
  const setThemeColor = (color: ThemeColors) => {
    console.log("Applying theme color:", color);
    setThemeColorState(color);
    // setGlobalColorTheme will be called by useEffect
    submit(
      { themeColor: color },
      { method: "post", action: "/action/set-theme-color" } // Changed action path
    );
  };

  useEffect(() => {
    // This effect runs on the client after mount and when theme or themeColor changes
    console.log("ThemeDataProvider useEffect: Applying global theme styles for", theme, themeColor);
    if (theme) { // theme might be null initially if remix-themes hasn't resolved it
      setGlobalColorTheme(theme as "light" | "dark", themeColor);
    }
  }, [theme, themeColor]); // React to changes in light/dark theme AND color theme

  // No longer returning null. The component will render its children on the initial client render,
  // matching the server render. useEffect will handle client-side specific updates.
  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

function useThemeContext() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useThemeContext must be used within a ThemeDataProvider");
  }
  return context;
}

export { ThemeDataProvider, useThemeContext };  