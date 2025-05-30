import { Box } from "@mui/joy";
import { useRef, useState, type KeyboardEvent, useEffect } from "react";
import { useContainerDimensions } from "../hooks/useContainerDimensions";
import { WordsGenerator } from "../utils/wordsGenerator";
import { Cursor } from "./cursor";
import { WordsToType } from "./words-to-type";

export default function TypingPanel({
  punctuation,
  numbers,
  language,
}: {
  punctuation: boolean;
  numbers: boolean;
  language: number;
}) {
  useEffect(() => {
    panelRef.current ? panelRef.current.focus() : null;
  }, []);
  const [charIndex, setCharIndex] = useState(0);
  const [cursorPos, setCursorPos] = useState({ row: 0, col: 0 });
  const [words, setWords] = useState(
    WordsGenerator({
      count: 15,
      punctuation,
      numbers,
      language,
    }),
  );
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

  function finishTest() {
    setCharIndex(0);
    setCursorPos({ row: 0, col: 0 });
    setWords(() => {
      const words = WordsGenerator({ count: 15, punctuation, numbers });
      setColourOfChar(Array(words.length).fill(""));
      return words;
    });
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Shift" || e.key === "F12" || e.key === "Control") {
      return;
    }
    if (e.key === words[charIndex]) {
      // Correct key pressed
      setCharIndex((charIndex) => {
        if (charIndex + 1 === words.length - 1) finishTest();
        if (charIndex < words.length) {
          return charIndex + 1;
        } else {
          return charIndex;
        }
      });
      if (charIndex < words.length - 1) incrementCursorPosition();
      setColourOfChar((wordsResult) => {
        const newWordsResult = [...wordsResult];
        newWordsResult[charIndex + 1] = "white";
        return newWordsResult;
      });
    } else if (e.key === "Backspace") {
      setCharIndex((charIndex) => {
        setColourOfChar((wordsResult) => {
          const newWordsResult = [...wordsResult];
          newWordsResult[charIndex] = "";
          return newWordsResult;
        });
        if (charIndex > 0) {
          return charIndex - 1;
        }
        return 0;
      });
      if (charIndex > 0) {
        decrementCursorPosition();
      }
    } else {
      setCharIndex((charIndex) => {
        setColourOfChar((wordsResult) => {
          if (charIndex < words.length) {
            const newWordsResult = [...wordsResult];
            newWordsResult[charIndex + 1] = "red";
            return newWordsResult;
          } else {
            return wordsResult;
          }
        });
        return charIndex < words.length - 1 ? charIndex + 1 : charIndex;
      });
      if (charIndex < words.length - 1) incrementCursorPosition();
    }
  }
  return (
    <Box
      sx={{
        color: "#1481BA",
        display: "flex",
        position: "relative",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: "14.41px",
        fontFamily: "Courier",
        fontSize: 24,
        outline: "none",
      }}
      ref={panelRef}
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <Cursor left={getCursorLeftPosition()} top={getCursorTopPosition()} />
      <WordsToType colourOfChar={colourOfChar} words={words} />
    </Box>
  );
}
