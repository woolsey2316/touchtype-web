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
    dark: {},
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
