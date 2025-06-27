/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { ThemeProvider as Provider, extendTheme } from "@mui/joy/styles";
import { createElement, type JSX, type ReactNode } from "react";

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
const latteTheme = {
  danger: {
    plainColor: "#d20f39",
  },
  success: {
    plainColor: "#dc8a78",
  },
  background: {
    body: "#dce0e8",
    level1: "#e6e9ef",
    level2: "#eff1f5",
    level3: "#ccd0da",
  },
  primary: {
    50: "#dc8a78",
    100: "#d8f1a0",
    200: "#8839ef",
    300: "#ea76cb",
    400: "#d20f39",
    500: "#e64553",
    600: "#fe640b",
    700: "#df8e1d",
    800: "#179299",
    900: "#7287fd",
    softBg: "#9ca0b0",
    softHoverBg: "#8c8fa1",
    plainHoverColor: "#000000",
  },
  neutral: {
    50: "#4c4f69",
    100: "#5c5f77",
    200: "#6c6f85",
    300: "#7c7f93",
    400: "#bcc0cc",
    500: "#acb0be",
    600: "#9ca0b0",
    700: "#8c8fa1",
    800: "#7c7f93",
    900: "#6c6f85",
    plainActiveBg: "#ccd0da",
    plainHoverBg: "#eff1f5",
  },
};

let customDarkTheme = {
  danger: {
    plainColor: "#d20f39",
  },
  success: {
    plainColor: "#40a02b",
  },
  background: {
    body: "#232634",
    level1: "#292c3c",
    level2: "#303446",
    level3: "#414559",
  },
  primary: {
    50: "#f2d5cf",
    100: "#eebebe",
    200: "#f4b8e4",
    300: "#ca9ee6",
    400: "#e78284",
    500: "#ea999c",
    600: "#ef9f76",
    700: "#e5c890",
    800: "#a6d189",
    900: "#99d1db",
    plainColor: "#8caaee",
    plainHoverColor: "#85c1dc",
    plainHoverBg: "transparent",
    plainActiveBg: "transparent",
    softBg: "#ca9ee6",
    softHoverBg: "#f4b8e4",
    plainActiveColor: "#232634",
  },
  neutral: {
    50: "#dce0e8",
    100: "#e6e9ef",
    200: "#eff1f5",
    300: "#ccd0da",
    400: "#bcc0cc",
    500: "#acb0be",
    600: "#9ca0b0",
    700: "#8c8fa1",
    800: "#7c7f93",
    900: "#6c6f85",
    plainActiveBg: "#ca9ee6",
    plainHoverBg: "#99d1db",
    plainHoverColor: "#232634",
    plainActiveColor: "#232634",
  },
};

export function setCustomDarkTheme(newTheme: typeof customDarkTheme) {
  customDarkTheme = { ...newTheme };
}

export function getCustomTheme() {
  return customDarkTheme;
}

const customLightTheme = latteTheme;

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

export { theme };

export function ThemeProvider(props: ThemeProviderProps): JSX.Element {
  return createElement(Provider, { theme, ...props });
}

export type ThemeProviderProps = {
  children: ReactNode;
  defaultMode: string;
};
