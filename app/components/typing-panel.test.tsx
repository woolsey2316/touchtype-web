import * as React from "react";
import { describe, beforeEach, afterEach, it, vi, expect } from "vitest";
import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import TypingPanel from "./typing-panel";
import { MockThemeProvider } from "../context/mocks/ThemeContext";
import { WordsGenerator } from "../utils/wordsGenerator";

let mockWordsGeneratorImpl = () => "abc";
vi.mock("../utils/wordsGenerator", () => ({
  WordsGenerator: vi.fn(() => mockWordsGeneratorImpl()),
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

  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  beforeEach(() => {
    const mockRefObject = { current: 0 };
    vi.mock("react", async (importOriginal) => {
      const actual = (await importOriginal()) as object;
      return {
        ...actual,
        useRef: vi.fn(() => ({ current: 0 })), // Mock useRef to return a specific value
      };
    });
    mockWordsGeneratorImpl = () => "abc";

    correctChars = mockRefObject;
    mistakes = mockRefObject;
    setTimeInfo = vi.fn();
    setIsResultsModalOpen = vi.fn();
    setResetCounter = vi.fn();
    setCurrentWPM = vi.fn();
    childInputRef = React.createRef();
  });

  it("correct char = green, failed char = red", () => {
    render(
      <MockThemeProvider>
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
      </MockThemeProvider>,
    );

    const panel = screen.getByTestId("typing-panel");
    // Type correct key 'a'
    fireEvent.keyDown(panel, { key: "a" });
    // Type incorrect key 'x'
    fireEvent.keyDown(panel, { key: "x" });

    const chars = panel.querySelectorAll('[data-testid="words-to-type"] p');
    expect((chars[0] as HTMLElement).style.color).toBe("green");
    expect((chars[1] as HTMLElement).style.color).toBe("red");
  });

  it("correctly types abc", () => {
    render(
      <MockThemeProvider>
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
      </MockThemeProvider>,
    );

    const panel = screen.getByTestId("typing-panel");
    const chars = panel.querySelectorAll('[data-testid="words-to-type"] p');

    fireEvent.keyDown(panel, { key: "a" });
    fireEvent.keyDown(panel, { key: "b" });

    expect((chars[0] as HTMLElement).style.color).toBe("green");
    expect((chars[1] as HTMLElement).style.color).toBe("green");

    fireEvent.keyDown(panel, { key: "c" });

    expect(setIsResultsModalOpen).toHaveBeenCalledWith(true);
  });

  it("multiline text with tabs", () => {
    mockWordsGeneratorImpl = () => "a\n\tb";

    render(
      <MockThemeProvider>
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
      </MockThemeProvider>,
    );

    const panel = screen.getByTestId("typing-panel");
    fireEvent.keyDown(panel, { key: "a" });
    fireEvent.keyDown(panel, { key: "Enter" });

    const chars = panel.querySelectorAll('[data-testid="words-to-type"] p');

    expect((chars[0] as HTMLElement).style.color).toBe("green");
    expect((chars[1] as HTMLElement).style.color).toBe("");

    fireEvent.keyDown(panel, { key: "b" });

    expect(setIsResultsModalOpen).toHaveBeenCalledWith(true);
  });
});
