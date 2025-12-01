import * as React from "react";
import { describe, beforeEach, afterEach, it, vi, expect } from "vitest";
import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import TypingPanel from "./typing-panel";
import { MockThemeProvider } from "../context/mocks/ThemeContext";

let mockWordsGeneratorImpl = () => "abc";
vi.mock("../utils/wordsGenerator", () => ({
  WordsGenerator: vi.fn(() => mockWordsGeneratorImpl()),
}));

vi.mock("../hooks/useContainerDimensions", () => ({
  useContainerDimensions: () => ({ width: 500 }),
}));

describe("TypingPanel", () => {
  let correctChars: React.RefObject<number>,
    mistakes: React.RefObject<number>,
    startTime: React.RefObject<number>,
    setTimeInfo: React.Dispatch<
      React.SetStateAction<{
        started: boolean;
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
    startTime = mockRefObject;
    setTimeInfo = vi.fn();
    setIsResultsModalOpen = vi.fn();
    setResetCounter = vi.fn();
    setCurrentWPM = vi.fn();
    childInputRef = React.createRef();

    const localStorageMock = (function () {
      let store: Record<string, string> = {};
      return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => {
          store[key] = value.toString();
        },
        removeItem: (key: string) => {
          delete store[key];
        },
        clear: () => {
          store = {};
        },
      };
    })();
    Object.defineProperty(window, "localStorage", {
      value: localStorageMock,
      writable: true,
    });
  });

  it("correct char = green, failed char = red", async () => {
    render(
      <MockThemeProvider>
        <TypingPanel
          programmingLanguage={false}
          punctuation={false}
          numbers={false}
          language={0}
          sentenceSize={3}
          testInfo={{
            started: false,
            ended: false,
          }}
          onEnd={() => {}}
          currentAccuracy={0}
          currentScore={0}
          startTime={startTime}
          currentTime={0}
          keyTimeMap={
            { current: {} } as React.RefObject<Record<string, number[]>>
          }
          isTimedTest={false}
          setTimeInfo={setTimeInfo}
          childInputRef={childInputRef}
          previousWPM={undefined}
          previousAccuracy={undefined}
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
    // Wait for the container to appear
    const wordsToType = await screen.findByTestId("words-to-type");

    const chars = wordsToType.querySelectorAll("p");
    expect((chars[0] as HTMLElement).style.color).toBe("green");
    expect((chars[1] as HTMLElement).style.color).toBe("red");
  });

  it("correctly types abc", async () => {
    render(
      <MockThemeProvider>
        <TypingPanel
          programmingLanguage={false}
          punctuation={false}
          numbers={false}
          language={0}
          sentenceSize={3}
          testInfo={{
            started: false,
            ended: false,
          }}
          onEnd={() => {}}
          previousWPM={undefined}
          previousAccuracy={undefined}
          currentAccuracy={0}
          currentScore={0}
          startTime={startTime}
          currentTime={0}
          keyTimeMap={
            { current: {} } as React.RefObject<Record<string, number[]>>
          }
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
    await vi.waitFor(() => {
      expect(setIsResultsModalOpen).toHaveBeenCalledWith(true);
    });
    expect(setIsResultsModalOpen).toHaveBeenCalledWith(true);
  });

  it("multiline text with tabs", async () => {
    mockWordsGeneratorImpl = () => "a↵→b";
    render(
      <MockThemeProvider>
        <TypingPanel
          programmingLanguage={false}
          punctuation={false}
          numbers={false}
          language={0}
          sentenceSize={3}
          testInfo={{
            started: false,
            ended: false,
          }}
          onEnd={() => {}}
          previousWPM={undefined}
          previousAccuracy={undefined}
          currentAccuracy={0}
          currentScore={0}
          startTime={startTime}
          currentTime={0}
          keyTimeMap={
            { current: {} } as React.RefObject<Record<string, number[]>>
          }
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
    fireEvent.keyDown(panel, { key: "Tab" });

    const chars = panel.querySelectorAll('[data-testid="words-to-type"] p');

    expect((chars[0] as HTMLElement).style.color).toBe("green");
    expect((chars[1] as HTMLElement).style.color).toBe("green");

    fireEvent.keyDown(panel, { key: "b" });
    await vi.waitFor(() => {
      expect(setIsResultsModalOpen).toHaveBeenCalledWith(true);
    });

    expect(setIsResultsModalOpen).toHaveBeenCalledWith(true);
  });
});
