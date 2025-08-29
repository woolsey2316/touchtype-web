/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */
import "./index.css";
import { useState, StrictMode } from "react";
import { CssBaseline, CssVarsProvider } from "@mui/joy";
import { SnackbarProvider } from "notistack";
import { createRoot } from "react-dom/client";
import { StoreProvider } from "./core/store";
import { theme as defaultTheme } from "./core/theme";
import { ThemeContext } from "./context/ThemeContext/ThemeContext";
import { UserPreferencesContext } from "./context/userPreferencesTheme";
import { Router } from "./routes";

const container = document.getElementById("root");
const root = createRoot(container!);

const Root = () => {
  const [theme, setTheme] = useState(defaultTheme);
  const [fontFamily, setFontFamily] = useState(
    "'0xProtoNerdFont-Bold', Courier, monospace",
  );
  const [skipOverTabs, setSkipOverTabs] = useState(false);
  const [showSpaceChar, setShowSpaceChar] = useState(true);
  return (
    <StrictMode>
      <CssVarsProvider theme={theme}>
        <UserPreferencesContext.Provider
          value={{
            fontFamily,
            setTheme: setFontFamily,
            skipOverTabs,
            setSkipOverTabs,
            showSpaceChar,
            setShowSpaceChar,
          }}
        >
          <ThemeContext.Provider value={{ theme, setTheme }}>
            <SnackbarProvider>
              <CssBaseline />
              <StoreProvider>
                <Router />
              </StoreProvider>
            </SnackbarProvider>
          </ThemeContext.Provider>
        </UserPreferencesContext.Provider>
      </CssVarsProvider>
    </StrictMode>
  );
};

root.render(<Root />);

if (import.meta.hot) {
  import.meta.hot.dispose(() => root.unmount());
}
