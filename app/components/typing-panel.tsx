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
import { validCursorIndices } from "../utils/util";
import { getNextCharIndex, getPreviousCharIndex } from "../utils/word-position";

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

  const [charIndex, setCharIndex] = useState(0);
  const [cursorPos, setCursorPos] = useState({ row: 0, col: 0 });
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
  const { width } = useContainerDimensions(childInputRef!, words);

  const cursorIndices = useMemo(
    () => validCursorIndices(words, width),
    [words, width],
  );
  console.log("cursorIndices", cursorIndices);
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

  function incrementCursorPosition(index: number) {
    setCursorPos({
      col: cursorIndices[index + 1][1],
      row: cursorIndices[index + 1][0],
    });
  }

  function decrementCursorPosition(index: number) {
    setCursorPos({
      col: cursorIndices[index - 1][1],
      row: cursorIndices[index - 1][0],
    });
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

  function finishTest() {
    setTimeInfo((timeInfo) => ({
      ...timeInfo,
      end: Date.now(),
      ended: true,
      started: false,
    }));
    setIsResultsModalOpen(true);
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
    if (e.key === "Enter" && words[charIndex].charCodeAt(0) === 10) {
      incrementCursorPosition(charIndex);
      setCharIndex((charIndex) => {
        if (charIndex + 1 === words.length - 1) {
          if (isTimedTest) {
            fetchNewWords();
          } else {
            finishTest();
          }
        }
        const nextCharIndex = getNextCharIndex(charIndex, words);
        return nextCharIndex - 1 < words.length ? nextCharIndex : charIndex;
      });
      setColourOfChar((wordsResult) => {
        const newWordsResult = [...wordsResult];
        // stands for "success"
        newWordsResult[charIndex] = "s";
        return newWordsResult;
      });
      correctChars.current++;
      return;
    }
    if (e.key === words[charIndex]) {
      // Correct key pressed
      setCharIndex((charIndex) => {
        if (charIndex + 1 === words.length - 1) {
          if (isTimedTest) {
            fetchNewWords();
          } else {
            finishTest();
          }
        }

        const nextCharIndex = getNextCharIndex(charIndex, words);
        return nextCharIndex < words.length ? nextCharIndex : charIndex;
      });
      if (charIndex < words.length - 1) incrementCursorPosition(charIndex);
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
        const previousIndex = getPreviousCharIndex(charIndex, words);
        return previousIndex > 0 ? previousIndex : 0;
      });
      if (charIndex > 0) {
        decrementCursorPosition(charIndex);
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
        const nextCharIndex = getNextCharIndex(charIndex, words);

        return charIndex < words.length - 1 ? nextCharIndex : charIndex;
      });
      if (charIndex < words.length - 1) incrementCursorPosition(charIndex);
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
