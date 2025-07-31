import { vi } from "vitest";
import * as React from "react";

// Create a mock context object with mock functions
export const mockContextValue = {
  value: "Mocked Value",
  updateValue: vi.fn(), // Mock the updateValue function
};

// Create a mock provider component
export const ThemeContextProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  return <div data-testid="mock-provider">{children}</div>;
};
