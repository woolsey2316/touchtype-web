/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { useState, createContext, StrictMode } from "react";
import { CssBaseline, CssVarsProvider } from "@mui/joy";
import { SnackbarProvider } from "notistack";
import { createRoot } from "react-dom/client";
import { StoreProvider } from "./core/store";
import { theme as defaultTheme } from "./core/theme";
import { Router } from "./routes";

const container = document.getElementById("root");
const root = createRoot(container!);

export const ThemeContext = createContext({
  theme: defaultTheme,
  setTheme: (_theme: typeof defaultTheme) => {
    console.log(_theme);
    return;
  },
});

const Root = () => {
  const [theme, setTheme] = useState(defaultTheme);
  return (
    <StrictMode>
      <CssVarsProvider theme={theme}>
        <ThemeContext.Provider value={{ theme, setTheme }}>
          <SnackbarProvider>
            <CssBaseline />
            <StoreProvider>
              <Router />
            </StoreProvider>
          </SnackbarProvider>
        </ThemeContext.Provider>
      </CssVarsProvider>
    </StrictMode>
  );
};

root.render(<Root />);

if (import.meta.hot) {
  import.meta.hot.dispose(() => root.unmount());
}
