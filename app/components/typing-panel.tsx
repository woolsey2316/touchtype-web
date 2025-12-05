import * as React from "react";
import { Box } from "@mui/joy";
import {
  useState,
  useRef,
  useCallback,
  useContext,
  useMemo,
  type KeyboardEvent,
  useEffect,
} from "react";
import { useContainerDimensions } from "../hooks/useContainerDimensions";
import { WordsGenerator } from "../utils/wordsGenerator";
import { WordsToType } from "./words-to-type";
import { ResultsModal } from "./modal/results-modal";
import { getNextCharIndex, getPreviousCharIndex } from "../utils/word-position";
import { ThemeContext } from "../context/ThemeContext/ThemeContext";
import { Cursor } from "./cursor";
import {
  maybeScrollToNextLine,
  maybeScrollToPreviousLine,
} from "../utils/typing-panel";
export default function TypingPanel({
  programmingLanguage,
  punctuation,
  numbers,
  language,
  sentenceSize,
  testInfo,
  isTimedTest,
  setTimeInfo,
  onEnd,
  startTime,
  childInputRef,
  previousWPM,
  previousAccuracy,
  currentWPM,
  currentAccuracy,
  currentScore,
  currentTime,
  correctChars,
  keyTimeMap,
  mistakes,
  setIsResultsModalOpen,
  isOpen,
  setResetCounter,
}: {
  programmingLanguage: boolean;
  punctuation: boolean;
  numbers: boolean;
  language: number;
  sentenceSize: number;
  childInputRef: React.RefObject<HTMLDivElement | null>;
  isTimedTest: boolean;
  testInfo: {
    started: boolean;
    ended: boolean;
  };
  setTimeInfo: React.Dispatch<
    React.SetStateAction<{
      started: boolean;
      ended: boolean;
    }>
  >;
  onEnd: () => void;
  startTime: React.RefObject<number | null>;
  setCurrentWPM: React.Dispatch<React.SetStateAction<number>>;
  previousWPM: number | undefined;
  previousAccuracy: number | undefined;
  currentAccuracy: number;
  currentScore: number;
  currentWPM: number;
  currentTime: number;
  keyTimeMap: React.RefObject<Record<string, number[]>>;
  recordTest: boolean;
  mistakes: React.RefObject<number>;
  correctChars: React.RefObject<number>;
  isOpen: boolean;
  setIsResultsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setResetCounter: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { theme } = useContext(ThemeContext);
  useEffect(() => {
    if (childInputRef?.current) {
      childInputRef?.current.focus();
    }
  }, [childInputRef]);
  const keyStartTime = useRef<number | null>(null);
  const [cursorIndex, setCursorIndex] = useState(0);
  const generatedWords = useMemo(
    () =>
      WordsGenerator({
        count: sentenceSize,
        punctuation,
        numbers,
        language,
        programmingLanguage,
      }),
    [sentenceSize, punctuation, numbers, language, programmingLanguage],
  );

  const [words, setWords] = useState(generatedWords);
  // ["grey", "grey", "grey", ...]
  const [colourOfChar, setColourOfChar] = useState(
    Array(words.length).fill(theme.vars.palette.neutral[500]),
  );
  const [charIndex, setCharIndex] = useState(0);
  const { width } = useContainerDimensions(childInputRef!, words);

  const resetStatistics = useCallback(() => {
    mistakes.current = 0;
    correctChars.current = 0;
  }, [mistakes, correctChars]);

  const newCollectionOfWords = useCallback(() => {
    setWords(() => {
      const words = WordsGenerator({
        count: sentenceSize,
        punctuation,
        numbers,
        language,
      });
      setColourOfChar(
        Array(words.length).fill(theme.vars.palette.neutral[500]),
      );
      return words;
    });
  }, [
    sentenceSize,
    punctuation,
    theme.vars.palette.neutral,
    numbers,
    language,
  ]);

  const newTestPage = useCallback(() => {
    setCursorIndex(0);
    resetStatistics();
    newCollectionOfWords();
  }, [resetStatistics, newCollectionOfWords]);

  const fetchNewWords = useCallback(() => {
    childInputRef?.current?.scrollTo({ top: 0, left: 0 });
    setCursorIndex(0);
    setCharIndex(0);
    setWords(() => {
      const words = WordsGenerator({
        count: sentenceSize,
        punctuation,
        numbers,
        language,
      });
      setColourOfChar(
        Array(words.length).fill(theme.vars.palette.neutral[500]),
      );
      return words;
    });
  }, [
    childInputRef,
    sentenceSize,
    punctuation,
    numbers,
    language,
    theme.vars.palette.neutral,
  ]);

  const finishTest = useCallback(() => {
    onEnd();
    setIsResultsModalOpen(true);
    childInputRef?.current?.scrollTo({ top: 0, left: 0 });
    setCursorIndex(0);
    setCharIndex(0);
    setWords(() => {
      const words = WordsGenerator({
        count: sentenceSize,
        punctuation,
        numbers,
        language,
      });
      setColourOfChar(
        Array(words.length).fill(theme.vars.palette.neutral[500]),
      );
      return words;
    });
  }, [
    onEnd,
    setIsResultsModalOpen,
    sentenceSize,
    childInputRef,
    punctuation,
    numbers,
    language,
    theme.vars.palette.neutral,
  ]);

  useEffect(() => {
    if (cursorIndex === words.length) {
      if (isTimedTest) {
        fetchNewWords();
      } else {
        setTimeInfo({
          ended: true,
          started: false,
        });
        finishTest();
      }
    }
  }, [
    cursorIndex,
    words,
    isTimedTest,
    fetchNewWords,
    setTimeInfo,
    finishTest,
    theme.vars.palette.neutral,
  ]);

  function updateColourOfChar(index: number, color: string) {
    setColourOfChar((wordsResult) => {
      if (cursorIndex < words.length) {
        const newWordsResult = [...wordsResult];
        newWordsResult[index] = color;
        return newWordsResult;
      } else {
        return wordsResult;
      }
    });
  }

  function addCharacterPressTiming(
    e: KeyboardEvent<HTMLDivElement>,
    keyStartTime: React.RefObject<number | null>,
    keyTimeMap: React.RefObject<Record<string, number[]>>,
  ) {
    if (!keyTimeMap.current[e.key] && keyStartTime.current) {
      keyTimeMap.current[e.key] = [performance.now() - keyStartTime.current];
    } else if (keyStartTime.current) {
      keyTimeMap.current[e.key].push(performance.now() - keyStartTime.current);
    }
  }

  function deductCharacterRecord(cursorIndex: number) {
    if (
      colourOfChar[cursorIndex - 1] === theme.vars.palette.danger.plainColor
    ) {
      mistakes.current = Math.max(mistakes.current - 1, 0);
    } else {
      correctChars.current = Math.max(correctChars.current - 1, 0);
    }
  }

  function deductWordRecord(
    currWord: HTMLCollection,
    mistakes: React.RefObject<number>,
    correctChars: React.RefObject<number>,
  ) {
    let count = 0;
    for (const letter of currWord) {
      if (
        (letter as HTMLElement).style.color !== theme.vars.palette.neutral[500]
      ) {
        if (
          (letter as HTMLElement).style.color ===
          theme.vars.palette.danger.plainColor
        ) {
          mistakes.current = Math.max(mistakes.current - 1, 0);
        } else {
          correctChars.current = Math.max(correctChars.current - 1, 0);
        }
        count++;
      }
    }
    // if we are at the start of the word, delete previous word
    if (count === 0 && cursorIndex > 0) {
      currWord =
        document?.getElementsByClassName("letter")[cursorIndex - 1]?.parentNode
          ?.children ?? ([] as unknown as HTMLCollection);
      for (const letter of currWord) {
        if (
          (letter as HTMLElement).style.color !==
          theme.vars.palette.neutral[500]
        ) {
          if (
            (letter as HTMLElement).style.color ===
            theme.vars.palette.danger.plainColor
          ) {
            mistakes.current = Math.max(mistakes.current - 1, 0);
          } else {
            correctChars.current = Math.max(correctChars.current - 1, 0);
          }
          count++;
        }
      }
    }
    return count;
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    // this stops the result modal from closing when the user presses a key
    if (testInfo.ended) return;
    // if the test has not started, start it
    if (!testInfo.started) {
      setTimeInfo((timeTestInfo) => ({
        ...timeTestInfo,
        started: true,
      }));
      startTime.current = performance.now();
    }
    // prevent scrollling when space is pressed
    if (e.key === " ") {
      e.preventDefault();
    }

    if (e.key === "Tab") {
      e.preventDefault();
    }
    if (
      e.key === "Shift" ||
      e.key === "F12" ||
      e.key === "Control" ||
      e.code === "MetaLeft" ||
      e.code === "MetaRight" ||
      e.altKey
    ) {
      return;
    }
    // when typing blazingly fast you may increment after the test finishes
    if (!words[charIndex]) return;
    if (e.key === "Enter" && words[charIndex] === "↵") {
      setColourOfChar((wordsResult) => {
        const newWordsResult = [...wordsResult];
        newWordsResult[charIndex] = theme.vars.palette.success.plainColor;
        return newWordsResult;
      });
      // Correct key pressed
      setCursorIndex((cursorIndex) => {
        const nextIndex = Math.min(cursorIndex + 1, words.length);
        maybeScrollToNextLine(cursorIndex, childInputRef);
        return nextIndex;
      });

      setCharIndex((charIndex) =>
        getNextCharIndex({ charIndex, words, skipOverTabs: false }),
      );
      correctChars.current++;
    } else if (
      e.key === "Tab" &&
      (words[charIndex] === "\t" || words[charIndex] === "→")
    ) {
      setColourOfChar((wordsResult) => {
        const newWordsResult = [...wordsResult];
        newWordsResult[charIndex] = theme.vars.palette.success.plainColor;
        return newWordsResult;
      });
      // Correct key pressed
      setCursorIndex((cursorIndex) => {
        const nextIndex = Math.min(cursorIndex + 1, words.length);
        maybeScrollToNextLine(cursorIndex, childInputRef);
        return nextIndex;
      });

      setCharIndex((charIndex) =>
        getNextCharIndex({ charIndex, words, skipOverTabs: false }),
      );
      correctChars.current++;
    } else if (e.key === words[charIndex]) {
      addCharacterPressTiming(e, keyStartTime, keyTimeMap);

      setColourOfChar((wordsResult) => {
        const newWordsResult = [...wordsResult];
        newWordsResult[charIndex] = theme.vars.palette.success.plainColor;
        return newWordsResult;
      });
      // Correct key pressed
      setCursorIndex((cursorIndex) => {
        const nextIndex = Math.min(cursorIndex + 1, words.length);
        return nextIndex;
      });

      setCharIndex((charIndex) =>
        getNextCharIndex({ charIndex, words, skipOverTabs: false }),
      );
      correctChars.current++;
    } else if (e.ctrlKey && e.key === "Backspace") {
      const currWord =
        document?.getElementsByClassName("letter")[cursorIndex]?.parentNode
          ?.children ?? ([] as unknown as HTMLCollection);
      const countDeleted = deductWordRecord(currWord, mistakes, correctChars);

      setCursorIndex((cursorIndex) => {
        for (let i = 0; i < countDeleted; i++) {
          updateColourOfChar(
            getPreviousCharIndex({ charIndex, words, skipOverTabs: false }) - i,
            theme.vars.palette.neutral[500],
          );
        }

        const previousIndex = Math.max(cursorIndex - countDeleted, 0);
        maybeScrollToPreviousLine(cursorIndex, childInputRef);
        return previousIndex;
      });
      setCharIndex(
        getPreviousCharIndex({ charIndex, words, skipOverTabs: false }) -
          countDeleted +
          1,
      );
      console.log(countDeleted);
      console.log(
        getPreviousCharIndex({ charIndex, words, skipOverTabs: false }) -
          countDeleted +
          1,
      );
    } else if (e.key === "Backspace") {
      setCursorIndex((cursorIndex) => {
        deductCharacterRecord(cursorIndex);
        updateColourOfChar(
          getPreviousCharIndex({ charIndex, words, skipOverTabs: false }),
          theme.vars.palette.neutral[500],
        );
        const previousIndex = Math.max(cursorIndex - 1, 0);
        maybeScrollToPreviousLine(cursorIndex, childInputRef);
        return previousIndex;
      });
      setCharIndex(
        getPreviousCharIndex({ charIndex, words, skipOverTabs: false }),
      );
    } else {
      mistakes.current++;
      setCursorIndex((cursorIndex) => {
        updateColourOfChar(charIndex, theme.vars.palette.danger.plainColor);
        const nextIndex = Math.min(cursorIndex + 1, words.length);
        maybeScrollToNextLine(cursorIndex, childInputRef);
        return nextIndex;
      });
      setCharIndex(getNextCharIndex({ charIndex, words, skipOverTabs: false }));
    }
    keyStartTime.current = performance.now();
  }
  return (
    <Box
      sx={(theme) => ({
        color: `${theme.vars.palette.primary[100]}`,
        display: "flex",
        position: "relative",
        flexDirection: "row",
        flexWrap: "wrap",
        fontFamily: "Courier",
        fontSize: 24,
        outline: "none",
        minWidth: "100%",
        maxHeight: "300px",
        overflowX: "visible",
        overflowY: "auto",
        msOverflowStyle: "none" /* IE and Edge */,
        scrollbarWidth: "none" /* Firefox */,
        "::WebkitScrollbar": {
          display: "none" /* Chrome, Safari, Opera */,
        },
      })}
      ref={childInputRef}
      data-testid="typing-panel"
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <Cursor
        letters={document.getElementsByClassName("letter")}
        cursorIndex={cursorIndex}
      />
      {/* Check if width is greater than 0 to avoid rendering issues */}
      {width > 0 && <WordsToType colourOfChar={colourOfChar} words={words} />}
      <ResultsModal
        key={isOpen.toString() + currentWPM + mistakes + correctChars}
        isOpen={isOpen}
        setIsResultsModalOpen={setIsResultsModalOpen}
        newTestPage={newTestPage}
        setTimeInfo={setTimeInfo}
        previousWPM={previousWPM}
        previousAccuracy={previousAccuracy}
        currentWPM={currentWPM}
        currentAccuracy={currentAccuracy}
        currentScore={currentScore}
        currentTime={currentTime}
        keyTimeMap={keyTimeMap}
        mistakes={mistakes}
        correctChars={correctChars}
        childInputRef={childInputRef}
        setResetCounter={setResetCounter}
      />
    </Box>
  );
}
