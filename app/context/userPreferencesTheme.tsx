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
  showSpaceChar: true,
  setShowSpaceChar: (_showSpaceChar: boolean) => {
    console.log(_showSpaceChar);
    return;
  },
});
