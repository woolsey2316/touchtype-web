/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { CssBaseline, CssVarsProvider } from "@mui/joy";
import { SnackbarProvider } from "notistack";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { StoreProvider } from "./core/store";
import { theme, ThemeProvider } from "./core/theme";
import { Router } from "./routes";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <StrictMode>
    <CssVarsProvider theme={theme}>
      <ThemeProvider defaultMode="system">
        <SnackbarProvider>
          <CssBaseline />
          <StoreProvider>
            <Router />
          </StoreProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </CssVarsProvider>
  </StrictMode>,
);

if (import.meta.hot) {
  import.meta.hot.dispose(() => root.unmount());
}
