/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { ThemeProvider as Provider, extendTheme } from "@mui/joy/styles";
import { createElement, type JSX, type ReactNode } from "react";

/**
 * Customized Joy UI theme.
 * @see https://mui.com/joy-ui/customization/approaches/
 */
export const theme = extendTheme({
  colorSchemes: {
    light: {},
    dark: {
      palette: {
        background: {
          body: "#362c28",
          level1: "#2f2623",
          level2: "#231d1a",
          level3: "#171311",
        },
        primary: {
          50: "#034748",
          100: "#1481BA",
          200: "#59baee",
        },
      },
    },
  },
  shadow: {},
  typography: {},
  components: {},
});

export function ThemeProvider(props: ThemeProviderProps): JSX.Element {
  return createElement(Provider, { theme, ...props });
}

export type ThemeProviderProps = {
  children: ReactNode;
};
