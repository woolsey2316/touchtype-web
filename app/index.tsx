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
import { UserPreferencesContext } from "./context/userPreferences";
import { Router } from "./routes";
import { HelmetProvider } from "react-helmet-async";

const container = document.getElementById("root");
const root = createRoot(container!);

const Root = () => {
  const [theme, setTheme] = useState(defaultTheme);
  const [font, setFont] = useState({
    family:
      window.localStorage.getItem("fontFamily") ||
      "'0xProtoNerdFont-Bold', Courier, monospace",
    weight: window.localStorage.getItem("fontWeight") || "700",
  });
  const [skipOverTabs, setSkipOverTabs] = useState(
    window.localStorage.getItem("skipOverTabs") === "true" ? true : false,
  );
  const [spaceChar, setSpaceChar] = useState(
    window.localStorage.getItem("spaceChar") ?? " ",
  );
  const [cursorType, setCursorType] = useState(
    window.localStorage.getItem("cursorChar") ?? "|",
  );
  const [zipperAnimation, setZipperAnimation] = useState(
    window.localStorage.getItem("zipperEnabled") === "false" ? false : true,
  );
  const [smoothCursor, setSmoothCursor] = useState(
    window.localStorage.getItem("smoothCursor") === "false" ? false : true,
  );
  return (
    <StrictMode>
      <CssVarsProvider theme={theme}>
        <UserPreferencesContext.Provider
          value={{
            font,
            setFont,
            skipOverTabs,
            setSkipOverTabs,
            spaceChar,
            setSpaceChar,
            cursorType,
            setCursorType,
            zipperAnimation,
            setZipperAnimation,
            smoothCursor,
            setSmoothCursor,
          }}
        >
          <ThemeContext.Provider value={{ theme, setTheme }}>
            <HelmetProvider>
              <SnackbarProvider>
                <CssBaseline />
                <StoreProvider>
                  <Router />
                </StoreProvider>
              </SnackbarProvider>
            </HelmetProvider>
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
