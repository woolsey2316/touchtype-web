import { Box } from "@mui/joy";
import { useState, type KeyboardEvent } from "react";
import { WordsGenerator } from "../utils/wordsGenerator";
import { Cursor } from "./cursor";
import { WordsToType } from "./words-to-type";

export default function TypingPanel() {
  const [charIndex, setCharIndex] = useState(0);
  const [words, setWords] = useState(WordsGenerator({ count: 50 }));
  const [colourOfChar, setColourOfChar] = useState(
    Array(words.length).fill(""),
  );
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
            return charIndex < words.length ? charIndex + 1 : charIndex;
          });
          if (charIndex === words.length - 1) {
            setCharIndex(0);
            setWords(() => {
              const words = WordsGenerator({ count: 50 });
              setColourOfChar(Array(words.length).fill(""));
              return words;
            });
          }
        } else if (e.key === "Backspace") {
          setCharIndex((charIndex) => {
            setColourOfChar((wordsResult) => {
              const newWordsResult = [...wordsResult];
              newWordsResult[charIndex] = "";
              return newWordsResult;
            });
            return charIndex > 0 ? charIndex - 1 : 0;
          });
        } else {
          setCharIndex((charIndex) => {
            setColourOfChar((wordsResult) => {
              const newWordsResult = [...wordsResult];
              newWordsResult[charIndex] = "red";
              return newWordsResult;
            });
            return charIndex < words.length ? charIndex + 1 : charIndex;
          });
        }
      }}
    >
      <Cursor left={`${-7 + charIndex * 14}px`} top="-2px" />
      <WordsToType colourOfChar={colourOfChar} words={words} />
    </Box>
  );
}
