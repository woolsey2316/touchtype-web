/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { ThemeProvider as Provider, extendTheme, Theme } from "@mui/joy/styles";
import { createElement, type JSX, type ReactNode } from "react";
import { THEME_COLLECTION } from "../data/themes/colour-themes";
// extend MUI joy UI theme with custom properties
interface PaletteColor {
  [key: number]: string;
}

declare module "@mui/joy/styles" {
  interface Palette {
    primary: PaletteColor & {
      plainHoverColor: string;
      plainColor: string;
      plainActiveColor: string;
    };
  }
}

/**
 * Customized Joy UI theme.
 * @see https://mui.com/joy-ui/customization/approaches/
 */

let customDarkTheme = THEME_COLLECTION["dark"].MOCHA;

const customLightTheme = THEME_COLLECTION["light"].LATTE;

export function setCustomDarkTheme(newTheme: typeof customDarkTheme) {
  customDarkTheme = { ...newTheme };
}

export function getCustomTheme({
  mode,
  name,
}: {
  mode: "dark" | "light" | "default";
  name:
    | keyof (typeof THEME_COLLECTION)["dark"]
    | keyof (typeof THEME_COLLECTION)["light"]
    | keyof (typeof THEME_COLLECTION)["default"];
}): typeof customDarkTheme {
  return THEME_COLLECTION[mode][name];
}

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        ...customLightTheme,
      },
    },
    dark: {
      palette: {
        ...customDarkTheme,
      },
    },
  },
});

export { theme, customDarkTheme };

export function ThemeProvider(props: ThemeProviderProps): JSX.Element {
  return createElement(Provider, { ...props });
}

export type ThemeProviderProps = {
  children: ReactNode;
  theme: Theme;
  defaultMode: string;
};
