/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { ThemeProvider as Provider, extendTheme, Theme } from "@mui/joy/styles";
import { createElement, type JSX, type ReactNode } from "react";
import { latteTheme, mochaTheme } from "../data/themes/colour-themes";
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

let customDarkTheme = mochaTheme;

export function setCustomDarkTheme(newTheme: typeof customDarkTheme) {
  customDarkTheme = { ...newTheme };
}

export function getCustomTheme() {
  return customDarkTheme;
}

const customLightTheme = latteTheme;

const theme = extendTheme({
  components: {
    JoyButton: {
      styleOverrides: {
        root: {
          borderRadius: "4px",
        },
      },
    },
  },
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
