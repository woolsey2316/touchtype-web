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

  const newTestPage = useCallback(() => {
    setCursorIndex(0);
    resetStatistics();
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
    language,
    punctuation,
    numbers,
    resetStatistics,
    sentenceSize,
    theme.vars.palette.neutral,
  ]);

  function maybeScrollToNextLine() {
    const letters = document?.getElementsByClassName("letter");
    if (letters.length !== 0) {
      if (
        (letters[cursorIndex + 1] as HTMLElement).offsetTop >
        (letters[cursorIndex] as HTMLElement).offsetTop
      ) {
        if (childInputRef?.current)
          childInputRef.current.scrollTop = (
            letters[cursorIndex + 1] as HTMLElement
          ).offsetTop;
      }
    }
  }

  function maybeScrollToPreviousLine() {
    const letters = document?.getElementsByClassName("letter");
    if (letters[cursorIndex - 1] === undefined) return;
    if (letters.length !== 0) {
      if (
        (letters[cursorIndex - 1] as HTMLElement).offsetTop <
        (letters[cursorIndex] as HTMLElement).offsetTop
      ) {
        if (childInputRef?.current)
          childInputRef.current.scrollTop = (
            letters[cursorIndex - 1] as HTMLElement
          ).offsetTop;
      }
    }
  }

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

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    // this stops the result modal from closing when the user presses a key
    if (testInfo.ended) return;
    // if the test has not started, start it
    if (!testInfo.started) {
      setTimeInfo((timeTestInfo) => ({
        ...timeTestInfo,
        started: true,
      }));
      startTime.current = Date.now();
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
        maybeScrollToNextLine();
        return nextIndex;
      });

      setCharIndex((charIndex) => getNextCharIndex(charIndex, words, false));
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
        maybeScrollToNextLine();
        return nextIndex;
      });

      setCharIndex((charIndex) => getNextCharIndex(charIndex, words, false));
      correctChars.current++;
    } else if (e.key === words[charIndex]) {
      if (!keyTimeMap.current[e.key] && keyStartTime.current) {
        keyTimeMap.current[e.key] = [Date.now() - keyStartTime.current];
      } else if (keyStartTime.current) {
        keyTimeMap.current[e.key].push(Date.now() - keyStartTime.current);
      }

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

      setCharIndex((charIndex) => getNextCharIndex(charIndex, words, false));
      correctChars.current++;
    } else if (e.ctrlKey && e.key === "Backspace") {
      let count = 0;
      let currWord =
        document?.getElementsByClassName("letter")[cursorIndex]?.parentNode
          ?.children ?? [];
      for (const letter of currWord) {
        if (
          (letter as HTMLElement).style.color !==
          theme.vars.palette.neutral[500]
        ) {
          count++;
        }
      }
      // if we are at the start of the word, delete previous word
      if (count === 0 && cursorIndex > 0) {
        currWord =
          document?.getElementsByClassName("letter")[cursorIndex - 1]
            ?.parentNode?.children ?? [];
        for (const letter of currWord) {
          if (
            (letter as HTMLElement).style.color !==
            theme.vars.palette.neutral[500]
          ) {
            count++;
          }
        }
      }
      setCursorIndex((cursorIndex) => {
        setColourOfChar((wordsResult) => {
          const newWordsResult = [...wordsResult];
          for (let i = 0; i < count; i++) {
            newWordsResult[getPreviousCharIndex(charIndex, words, false) - i] =
              theme.vars.palette.neutral[500];
          }
          return newWordsResult;
        });
        const previousIndex = Math.max(cursorIndex - count, 0);
        maybeScrollToPreviousLine();
        return previousIndex;
      });
      setCharIndex(getPreviousCharIndex(charIndex, words, false) - count + 1);
    } else if (e.key === "Backspace") {
      setCursorIndex((cursorIndex) => {
        setColourOfChar((wordsResult) => {
          const newWordsResult = [...wordsResult];
          newWordsResult[getPreviousCharIndex(charIndex, words, false)] =
            theme.vars.palette.neutral[500];
          return newWordsResult;
        });
        const previousIndex = Math.max(cursorIndex - 1, 0);
        maybeScrollToPreviousLine();
        return previousIndex;
      });
      setCharIndex(getPreviousCharIndex(charIndex, words, false));
    } else {
      mistakes.current++;
      setCursorIndex((cursorIndex) => {
        setColourOfChar((wordsResult) => {
          if (cursorIndex < words.length) {
            const newWordsResult = [...wordsResult];
            newWordsResult[charIndex] = theme.vars.palette.danger.plainColor;
            return newWordsResult;
          } else {
            return wordsResult;
          }
        });
        const nextIndex = Math.min(cursorIndex + 1, words.length);
        maybeScrollToNextLine();
        return nextIndex;
      });
      setCharIndex(getNextCharIndex(charIndex, words, false));
    }
    keyStartTime.current = Date.now();
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
        maxHeight: "350px",
        overflowY: "auto",
        overflowX: "hidden",
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
      <Cursor cursorIndex={cursorIndex} />
      {/* Check if width is greater than 0 to avoid rendering issues */}
      {width > 0 && <WordsToType colourOfChar={colourOfChar} words={words} />}
      <ResultsModal
        key={isOpen.toString() + currentWPM + mistakes + correctChars}
        isOpen={isOpen}
        setIsResultsModalOpen={setIsResultsModalOpen}
        newTestPage={newTestPage}
        setTimeInfo={setTimeInfo}
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
