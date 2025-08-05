import { Box } from "@mui/joy";
import {
  useState,
  useCallback,
  useMemo,
  type KeyboardEvent,
  useEffect,
} from "react";
import { useContainerDimensions } from "../hooks/useContainerDimensions";
import { WordsGenerator } from "../utils/wordsGenerator";
import { Cursor } from "./cursor";
import { WordsToType } from "./words-to-type2";
import { ResultsModal } from "./modal/results-modal";
import { validCursorIndices } from "../utils/util";
import {
  getNextCharIndex,
  getPreviousCharIndex,
  maybeIncrement,
  maybeDecrement,
} from "../utils/word-position";

export default function TypingPanel({
  programmingLanguage,
  punctuation,
  numbers,
  language,
  sentenceSize,
  timeTestInfo,
  isTimedTest,
  setTimeInfo,
  childInputRef,
  currentWPM,
  correctChars,
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
  timeTestInfo: {
    started: boolean;
    start: number | null;
    end: number | null;
    ended: boolean;
  };
  setTimeInfo: React.Dispatch<
    React.SetStateAction<{
      started: boolean;
      start: number | null;
      end: number | null;
      ended: boolean;
    }>
  >;
  setCurrentWPM: React.Dispatch<React.SetStateAction<number>>;
  currentWPM: number;
  recordTest: boolean;
  mistakes: React.RefObject<number>;
  correctChars: React.RefObject<number>;
  isOpen: boolean;
  setIsResultsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setResetCounter: React.Dispatch<React.SetStateAction<number>>;
}) {
  useEffect(() => {
    childInputRef?.current ? childInputRef?.current.focus() : null;
  }, [childInputRef]);

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
  const [colourOfChar, setColourOfChar] = useState(
    Array(words.length).fill(""),
  );
  const [charIndex, setCharIndex] = useState(0);
  const { width } = useContainerDimensions(childInputRef!, words);

  const cursorIndices = useMemo(
    () => validCursorIndices(words, width),
    [words, width],
  );
  console.log(cursorIndex);
  console.log(cursorIndices.length);
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
      setColourOfChar(Array(words.length).fill(""));
      return words;
    });
  }, [language, punctuation, numbers, resetStatistics, sentenceSize]);

  function getCursorLeftPosition() {
    return `${-7 + cursorIndices[cursorIndex][1] * 14}px`;
  }

  function getCursorTopPosition() {
    return `${-1 + cursorIndices[cursorIndex][0] * (39 + 14)}px`;
  }

  function fetchNewWords() {
    setCursorIndex(0);
    setWords(() => {
      const words = WordsGenerator({
        count: sentenceSize,
        punctuation,
        numbers,
        language,
      });
      setColourOfChar(Array(words.length).fill(""));
      return words;
    });
  }

  function finishTest() {
    setTimeInfo((timeInfo) => ({
      ...timeInfo,
      end: Date.now(),
      ended: true,
      started: false,
    }));
    setIsResultsModalOpen(true);
    setCursorIndex(0);
    setWords(() => {
      const words = WordsGenerator({
        count: sentenceSize,
        punctuation,
        numbers,
        language,
      });
      setColourOfChar(Array(words.length).fill(""));
      return words;
    });
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    // this stops the result modal from closing when the user presses a key
    if (timeTestInfo.ended) return;
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
    if (e.key === "Enter" && words[charIndex].charCodeAt(0) === 10) {
      setColourOfChar((wordsResult) => {
        const newWordsResult = [...wordsResult];
        // stands for "success"
        newWordsResult[cursorIndex] = "s";
        return newWordsResult;
      });
      setCursorIndex((cursorIndex) => {
        if (cursorIndex + 1 === words.length) {
          if (isTimedTest) {
            fetchNewWords();
          } else {
            finishTest();
          }
        }
        return maybeIncrement(cursorIndex, cursorIndices);
      });
      setCharIndex(getNextCharIndex(charIndex, words));
      correctChars.current++;
      return;
    }
    if (e.key === words[charIndex]) {
      setColourOfChar((wordsResult) => {
        const newWordsResult = [...wordsResult];
        // stands for "success"
        newWordsResult[cursorIndex] = "s";
        return newWordsResult;
      });
      // Correct key pressed
      setCursorIndex((cursorIndex) => {
        if (cursorIndex + 1 === words.length) {
          if (isTimedTest) {
            fetchNewWords();
          } else {
            finishTest();
          }
        }

        return maybeIncrement(cursorIndex, cursorIndices);
      });
      setCharIndex(getNextCharIndex(charIndex, words));
      correctChars.current++;
    } else if (e.key === "Backspace") {
      setCursorIndex((cursorIndex) => {
        setColourOfChar((wordsResult) => {
          const newWordsResult = [...wordsResult];
          newWordsResult[cursorIndex - 1] = "";
          return newWordsResult;
        });
        return maybeDecrement(cursorIndex);
      });
      setCharIndex(getPreviousCharIndex(charIndex, words));
    } else {
      mistakes.current++;
      setCursorIndex((cursorIndex) => {
        setColourOfChar((wordsResult) => {
          if (cursorIndex < words.length) {
            const newWordsResult = [...wordsResult];
            // stands for "failure"
            newWordsResult[cursorIndex] = "f";
            return newWordsResult;
          } else {
            return wordsResult;
          }
        });
        return maybeIncrement(cursorIndex, cursorIndices);
      });
      setCharIndex(getNextCharIndex(charIndex, words));
    }
    if (!timeTestInfo.started) {
      setTimeInfo({
        started: true,
        start: Date.now(),
        end: null,
        ended: false,
      });
    }
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
      })}
      ref={childInputRef}
      data-testid="typing-panel"
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <Cursor left={getCursorLeftPosition()} top={getCursorTopPosition()} />
      <WordsToType
        validCursorIndices={cursorIndices}
        colourOfChar={colourOfChar}
        words={words}
      />
      <ResultsModal
        key={isOpen.toString() + currentWPM + mistakes + correctChars}
        isOpen={isOpen}
        setIsResultsModalOpen={setIsResultsModalOpen}
        newTestPage={newTestPage}
        setTimeInfo={setTimeInfo}
        currentWPM={currentWPM}
        mistakes={mistakes}
        correctChars={correctChars}
        childInputRef={childInputRef}
        setResetCounter={setResetCounter}
      />
    </Box>
  );
}
