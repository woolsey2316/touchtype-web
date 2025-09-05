import { createContext } from "react";

export const UserPreferencesContext = createContext({
  fontFamily: "'AdwaitaMonoNerdFontMono-Regular', Courier, monospace",
  setTheme: (_theme: string) => {
    console.log(_theme);
    return;
  },
  skipOverTabs: false,
  setSkipOverTabs: (_skipOverTabs: boolean) => {
    console.log(_skipOverTabs);
    return;
  },
  spaceChar: "␣",
  setSpaceChar: (_showSpaceChar: string) => {
    console.log(_showSpaceChar);
    return;
  },
  cursorType: "_",
  setCursorType: (_cursorType: string) => {
    console.log(_cursorType);
    return;
  },
  zipperAnimation: true,
  setZipperAnimation: (_zipperAnimation: boolean) => {
    console.log(_zipperAnimation);
    return;
  },
  smoothCursor: true,
  setSmoothCursor: (_smoothCursor: boolean) => {
    console.log(_smoothCursor);
    return;
  },
});
