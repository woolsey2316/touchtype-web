import { Box } from "@mui/joy";
import {
  useRef,
  useState,
  useMemo,
  type KeyboardEvent,
  useEffect,
} from "react";
import { useContainerDimensions } from "../hooks/useContainerDimensions";
import { WordsGenerator } from "../utils/wordsGenerator";
import { Cursor } from "./cursor";
import { WordsToType } from "./words-to-type";

export default function TypingPanel({
  punctuation,
  numbers,
  language,
  sentenceSize,
  isTimedTest,
  timeInfo,
  setTimeInfo,
  setLastWPM,
  recordTest,
}: {
  punctuation: boolean;
  numbers: boolean;
  language: number;
  sentenceSize: number;
  isTimedTest: boolean;
  timeInfo: { started: boolean; start: number | null; end: number | null };
  setTimeInfo: React.Dispatch<
    React.SetStateAction<{
      started: boolean;
      start: number | null;
      end: number | null;
    }>
  >;
  setLastWPM: React.Dispatch<React.SetStateAction<number>>;
  recordTest: boolean;
}) {
  useEffect(() => {
    panelRef.current ? panelRef.current.focus() : null;
  }, []);
  const [mistakes, setMistakes] = useState(0);
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
  const panelRef = useRef<HTMLDivElement>(null);
  const { width, endCursorX } = useContainerDimensions(panelRef, words);

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
    return `${-2 + cursorPos.row * (36 + 14.41)}px`;
  }

  function stopTimer(endTime: number) {
    setTimeInfo((timeInfo) => ({ ...timeInfo, started: false, end: endTime }));
  }

  function recordTypingStats(endTime: number) {
    const wpm =
      ((((words.length - mistakes) / (endTime - (timeInfo.start as number))) *
        1000) /
        5) *
      60;
    setLastWPM(wpm);
    console.log(wpm);
    console.log("mistakes", mistakes);
    console.log("words.length", words.length);
  }

  function resetStatistics() {
    setTimeInfo((timeInfo) => ({ ...timeInfo, started: false }));
    setMistakes(0);
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
    const endTime = Date.now();
    stopTimer(endTime);
    recordTest && recordTypingStats(endTime);
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
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
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
          isTimedTest ? fetchNewWords() : finishTest();
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
      setMistakes((mistakes) => ++mistakes);
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
    if (!timeInfo.started) {
      setTimeInfo({ started: true, start: Date.now(), end: null });
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
      ref={panelRef}
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <Cursor left={getCursorLeftPosition()} top={getCursorTopPosition()} />
      <WordsToType colourOfChar={colourOfChar} words={words} />
    </Box>
  );
}
