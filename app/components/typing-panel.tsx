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
import { WordsToType } from "./words-to-type";
import { ResultsModal } from "./modal/results-modal";
export default function TypingPanel({
  punctuation,
  numbers,
  language,
  sentenceSize,
  timeTestInfo,
  setTimeInfo,
  childInputRef,
  lastWPM,
  correctChars,
  mistakes,
  setIsOpen,
  isOpen,
  setResetCounter,
}: {
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
  setLastWPM: React.Dispatch<React.SetStateAction<number>>;
  lastWPM: number;
  recordTest: boolean;
  mistakes: React.RefObject<number>;
  correctChars: React.RefObject<number>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setResetCounter: React.Dispatch<React.SetStateAction<number>>;
}) {
  useEffect(() => {
    childInputRef?.current ? childInputRef?.current.focus() : null;
  }, [childInputRef]);

  const [charIndex, setCharIndex] = useState(0);
  const [cursorPos, setCursorPos] = useState({ row: 0, col: 0 });
  const generatedWords = useMemo(
    () =>
      WordsGenerator({ count: sentenceSize, punctuation, numbers, language }),
    [sentenceSize, punctuation, numbers, language],
  );

  const [words, setWords] = useState(generatedWords);
  const [colourOfChar, setColourOfChar] = useState(
    Array(words.length).fill(""),
  );
  const { width, endCursorX } = useContainerDimensions(childInputRef!, words);

  const resetStatistics = useCallback(() => {
    mistakes.current = 0;
    correctChars.current = 0;
  }, [mistakes, correctChars]);

  const newTestPage = useCallback(() => {
    setCharIndex(0);
    resetStatistics();
    setCursorPos({ row: 0, col: 0 });
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

  function incrementCursorPosition() {
    if (cursorPos.col > endCursorX[cursorPos.row]) {
      setCursorPos((cursorPos) => ({
        row: cursorPos.row + 1,
        col: 0,
      }));
    } else {
      setCursorPos((cursorPos) => ({
        ...cursorPos,
        col: cursorPos.col + 1,
      }));
    }
  }

  function decrementCursorPosition() {
    if (cursorPos.col > 0) {
      setCursorPos((cursorPos) => ({
        ...cursorPos,
        col: cursorPos.col - 1,
      }));
    } else {
      setCursorPos((cursorPos) => ({
        col: endCursorX[cursorPos.row - 1] + 1,
        row: cursorPos.row - 1,
      }));
    }
  }
  function getCursorLeftPosition() {
    return `${-7 + ((cursorPos.col * 14.41) % width)}px`;
  }

  function getCursorTopPosition() {
    return `${-1 + cursorPos.row * (39 + 14.41)}px`;
  }

  function fetchNewWords() {
    setCharIndex(0);
    setCursorPos({ row: 0, col: 0 });
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
    if (e.key === words[charIndex]) {
      // Correct key pressed
      setCharIndex((charIndex) => {
        if (charIndex + 1 === words.length - 1) {
          fetchNewWords();
        }
        return charIndex < words.length ? charIndex + 1 : charIndex;
      });
      if (charIndex < words.length - 1) incrementCursorPosition();
      setColourOfChar((wordsResult) => {
        const newWordsResult = [...wordsResult];
        // stands for "success"
        newWordsResult[charIndex] = "s";
        return newWordsResult;
      });
      correctChars.current++;
    } else if (e.key === "Backspace") {
      setCharIndex((charIndex) => {
        setColourOfChar((wordsResult) => {
          const newWordsResult = [...wordsResult];
          newWordsResult[charIndex - 1] = "";
          return newWordsResult;
        });
        return charIndex > 0 ? charIndex - 1 : 0;
      });
      if (charIndex > 0) {
        decrementCursorPosition();
      }
    } else {
      mistakes.current++;
      setCharIndex((charIndex) => {
        setColourOfChar((wordsResult) => {
          if (charIndex < words.length) {
            const newWordsResult = [...wordsResult];
            // stands for "failure"
            newWordsResult[charIndex] = "f";
            return newWordsResult;
          } else {
            return wordsResult;
          }
        });
        return charIndex < words.length - 1 ? charIndex + 1 : charIndex;
      });
      if (charIndex < words.length - 1) incrementCursorPosition();
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
        gap: "14.41px",
        fontFamily: "Courier",
        fontSize: 24,
        outline: "none",
      })}
      ref={childInputRef}
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <Cursor left={getCursorLeftPosition()} top={getCursorTopPosition()} />
      <WordsToType colourOfChar={colourOfChar} words={words} />
      <ResultsModal
        key={isOpen.toString() + lastWPM + mistakes + correctChars}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        newTestPage={newTestPage}
        setTimeInfo={setTimeInfo}
        lastWPM={lastWPM}
        mistakes={mistakes}
        correctChars={correctChars}
        childInputRef={childInputRef}
        setResetCounter={setResetCounter}
      />
    </Box>
  );
}
