import { Box } from "@mui/joy";
import { useRef, useState, type KeyboardEvent } from "react";
import { useContainerDimensions } from "../hooks/useContainerDimensions";
import { WordsGenerator } from "../utils/wordsGenerator";
import { Cursor } from "./cursor";
import { WordsToType } from "./words-to-type";

export default function TypingPanel({
  punctuation,
  numbers,
}: {
  punctuation: boolean;
  numbers: boolean;
  language: string;
}) {
  const [charIndex, setCharIndex] = useState(0);
  const [words, setWords] = useState(
    WordsGenerator({
      count: 15,
      punctuation,
      numbers,
    }),
  );
  const [colourOfChar, setColourOfChar] = useState(
    Array(words.length).fill(""),
  );
  const componentRef = useRef<HTMLDivElement>(null);
  const { width } = useContainerDimensions(componentRef);

  function getCursorLeftPosition() {
    return `${-7 + ((charIndex * 14.45) % width)}px`;
  }

  function getCursorTopPosition() {
    return `${-2 + Math.floor((charIndex * 14.45) / width) * (36 + 14.45)}px`;
  }

  function finishTest() {
    setCharIndex(0);
    setWords(() => {
      const words = WordsGenerator({ count: 15, punctuation, numbers });
      setColourOfChar(Array(words.length).fill(""));
      return words;
    });
  }

  return (
    <Box
      sx={{
        color: "#1481BA",
        display: "flex",
        position: "relative",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: "14.45px",
        fontFamily: "monospace",
        fontSize: 24,
      }}
      ref={componentRef}
      autoFocus
      tabIndex={0}
      onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Shift") {
          return;
        }
        if (e.key === words[charIndex]) {
          setCharIndex((charIndex) => {
            setColourOfChar((wordsResult) => {
              const newWordsResult = [...wordsResult];
              newWordsResult[charIndex + 1] = "white";
              return newWordsResult;
            });
            if (charIndex + 1 === words.length - 1) finishTest();
            return charIndex < words.length ? charIndex + 1 : charIndex;
          });
        } else if (e.key === "Backspace") {
          setCharIndex((charIndex) => {
            setColourOfChar((wordsResult) => {
              const newWordsResult = [...wordsResult];
              newWordsResult[charIndex] = "";
              return newWordsResult;
            });
            return charIndex > 0 ? charIndex - 1 : 0;
          });
        } else if (e.key === "F12") {
          // inspecting console
        } else {
          setCharIndex((charIndex) => {
            setColourOfChar((wordsResult) => {
              const newWordsResult = [...wordsResult];
              newWordsResult[charIndex + 1] = "red";
              return newWordsResult;
            });
            return charIndex < words.length ? charIndex + 1 : charIndex;
          });
        }
      }}
    >
      <Cursor left={getCursorLeftPosition()} top={getCursorTopPosition()} />
      <WordsToType colourOfChar={colourOfChar} words={words} />
    </Box>
  );
}
