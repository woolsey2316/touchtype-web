import { vi } from "vitest";
import { ThemeContext } from "../ThemeContext/ThemeContext";
import * as React from "react";
// Create a mock context object with mock functions
export const mockContextValue = {
  value: "Mocked Value",
  updateValue: vi.fn(), // Mock the updateValue function
};

export const MockThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const mockTheme = {
    vars: {
      palette: {
        success: {
          plainColor: "green",
        },
        danger: {
          plainColor: "red",
        },
        neutral: {
          500: "grey",
        },
      },
    },
  };
  return (
    // @ts-expect-error theme is too big for the mock
    <ThemeContext.Provider value={{ theme: mockTheme, setTheme: vi.fn() }}>
      {children}
    </ThemeContext.Provider>
  );
};
