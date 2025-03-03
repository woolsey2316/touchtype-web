import Box from "@mui/joy/Box";
import { useState } from "react";
import { Cursor } from "./cursor";
import { WordsToType } from "./words-to-type";

export default function TypingPanel() {
  const [charIndex, setCharIndex] = useState(0);
  const words = "this is a typing test";
  return (
    <Box
      sx={{
        color: "#1481BA",
        display: "flex",
        position: "relative",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 1.5,
        fontFamily: "monospace",
        fontSize: 24,
      }}
      onKeyDown={(e) => {
        if (e.key === words[charIndex]) {
          setCharIndex((charIndex) => charIndex + 1);
        }
      }}
    >
      <Cursor left="-5px" top="-2px" />
      <WordsToType words={words} />
    </Box>
  );
}
