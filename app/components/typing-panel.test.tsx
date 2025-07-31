import * as React from "react";
import { describe, beforeEach, it, vi, expect } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import TypingPanel from "./typing-panel";
import { ThemeContext } from "../context/ThemeContext/ThemeContext";
// Mock WordsGenerator to return a known string
vi.mock("../utils/wordsGenerator", () => ({
  WordsGenerator: () => "abc",
}));

describe("TypingPanel", () => {
  let correctChars: React.RefObject<number>,
    mistakes: React.RefObject<number>,
    setTimeInfo: React.Dispatch<
      React.SetStateAction<{
        started: boolean;
        start: number | null;
        end: number | null;
        ended: boolean;
      }>
    >,
    setIsResultsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setResetCounter: React.Dispatch<React.SetStateAction<number>>,
    childInputRef: React.RefObject<HTMLDivElement | null>,
    setCurrentWPM: React.Dispatch<React.SetStateAction<number>>;

  beforeEach(() => {
    const mockRefObject = { current: 0 };
    vi.mock("react", async (importOriginal) => {
      const actual = (await importOriginal()) as object;
      return {
        ...actual,
        useRef: vi.fn(() => ({ current: 0 })), // Mock useRef to return a specific value
      };
    });
    correctChars = mockRefObject;
    mistakes = mockRefObject;
    setTimeInfo = vi.fn();
    setIsResultsModalOpen = vi.fn();
    setResetCounter = vi.fn();
    setCurrentWPM = vi.fn();
    childInputRef = React.createRef();
  });

  it("changes colourOfChar to green for correct key and red for incorrect key", () => {
    const mockTheme = {
      theme: {
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
      },
    };
    render(
      // @ts-expect-error theme is too big for the mock
      <ThemeContext.Provider value={{ theme: mockTheme, setTheme: vi.fn() }}>
        <TypingPanel
          programmingLanguage={false}
          punctuation={false}
          numbers={false}
          language={0}
          sentenceSize={3}
          timeTestInfo={{
            started: false,
            start: null,
            end: null,
            ended: false,
          }}
          isTimedTest={false}
          setTimeInfo={setTimeInfo}
          childInputRef={childInputRef}
          currentWPM={0}
          setCurrentWPM={setCurrentWPM}
          recordTest={false}
          correctChars={correctChars}
          mistakes={mistakes}
          setIsResultsModalOpen={setIsResultsModalOpen}
          isOpen={false}
          setResetCounter={setResetCounter}
        />
      </ThemeContext.Provider>,
    );

    const panel = screen.getByTestId("typing-panel");
    // Type correct key 'a'
    fireEvent.keyDown(panel, { key: "a" });
    // Type incorrect key 'x'
    fireEvent.keyDown(panel, { key: "x" });

    const chars = panel.querySelectorAll('[data-testid="words-to-type"] p');
    expect((chars[0] as HTMLElement).style.color).toBe(
      mockTheme.theme.vars.palette.success.plainColor,
    );
    expect((chars[1] as HTMLElement).style.color).toBe(
      mockTheme.theme.vars.palette.danger.plainColor,
    );
  });
});
