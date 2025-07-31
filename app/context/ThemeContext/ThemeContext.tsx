import { theme as defaultTheme } from "../../core/theme";
import { createContext } from "react";

export const ThemeContext = createContext({
  theme: defaultTheme,
  setTheme: (_theme: typeof defaultTheme) => {
    console.log(_theme);
    return;
  },
});
