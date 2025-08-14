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
import { Cursor } from "./cursor";
import { WordsToType } from "./words-to-type";
import { ResultsModal } from "./modal/results-modal";
import { validCursorIndices } from "../utils/util";
import { getNextCharIndex, getPreviousCharIndex } from "../utils/word-position";
import { ThemeContext } from "../context/ThemeContext/ThemeContext";
import { CHAR_WIDTH, ROW_HEIGHT } from "../core/constants";

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
    childInputRef?.current ? childInputRef?.current.focus() : null;
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

  const cursorIndices = useMemo(
    () => (width > 0 ? validCursorIndices(words, width) : []),
    [words, width],
  );

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

  function getCursorLeftPosition() {
    if (cursorIndex >= cursorIndices.length) {
      return "-7px";
    }
    return `${-7 + cursorIndices[cursorIndex][1] * CHAR_WIDTH}px`;
  }

  function getCursorTopPosition() {
    if (cursorIndex >= cursorIndices.length) {
      return "-1px";
    }
    return `${-1 + cursorIndices[cursorIndex][0] * ROW_HEIGHT}px`;
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
    console.log(keyTimeMap.current);
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
    keyTimeMap,
    setIsResultsModalOpen,
    sentenceSize,
    childInputRef,
    punctuation,
    numbers,
    language,
    theme.vars.palette.neutral,
  ]);

  useEffect(() => {
    if (cursorIndex === cursorIndices.length - 1) {
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
    cursorIndices,
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
        const nextIndex = Math.min(cursorIndex + 1, cursorIndices.length - 1);
        if (cursorIndices[nextIndex][0] > cursorIndices[cursorIndex][0]) {
          if (childInputRef?.current)
            childInputRef.current.scrollTop =
              -1 + (cursorIndices[nextIndex][0] - 1) * ROW_HEIGHT;
        }
        return nextIndex;
      });

      setCharIndex((charIndex) => getNextCharIndex(charIndex, words));
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
        const nextIndex = Math.min(cursorIndex + 1, cursorIndices.length - 1);
        if (cursorIndices[nextIndex][0] > cursorIndices[cursorIndex][0]) {
          if (childInputRef?.current)
            childInputRef.current.scrollTop =
              -1 + (cursorIndices[nextIndex][0] - 1) * ROW_HEIGHT;
        }
        return nextIndex;
      });

      setCharIndex((charIndex) => getNextCharIndex(charIndex, words));
      correctChars.current++;
    } else if (e.key === "Backspace") {
      setCursorIndex((cursorIndex) => {
        setColourOfChar((wordsResult) => {
          const newWordsResult = [...wordsResult];
          newWordsResult[getPreviousCharIndex(charIndex, words)] =
            theme.vars.palette.neutral[500];
          return newWordsResult;
        });
        const nextIndex = Math.max(cursorIndex - 1, 0);
        if (cursorIndices[nextIndex][0] < cursorIndices[cursorIndex][0]) {
          if (childInputRef?.current)
            childInputRef.current.scrollTop =
              -1 + (cursorIndices[nextIndex][0] - 1) * ROW_HEIGHT;
        }
        return nextIndex;
      });
      setCharIndex(getPreviousCharIndex(charIndex, words));
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
        const nextIndex = Math.min(cursorIndex + 1, cursorIndices.length - 1);
        if (cursorIndices[nextIndex][0] > cursorIndices[cursorIndex][0]) {
          if (childInputRef?.current)
            childInputRef.current.scrollTop =
              -1 + (cursorIndices[nextIndex][0] - 1) * ROW_HEIGHT;
        }
        return nextIndex;
      });
      setCharIndex(getNextCharIndex(charIndex, words));
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
      {/* Check if width is greater than 0 to avoid rendering issues */}
      {width > 0 && (
        <>
          <Cursor left={getCursorLeftPosition()} top={getCursorTopPosition()} />
          <WordsToType
            validCursorIndices={cursorIndices}
            colourOfChar={colourOfChar}
            words={words}
          />
        </>
      )}
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
