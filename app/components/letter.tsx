import { Typography } from "@mui/joy";
import { ReturnIcon } from "../icons/return";
import { memo } from "react";

interface LetterProps {
  width: number;
  children: string;
  colourOfChar: string;
  flexBasis?: string;
  fadeOut?: boolean;
  even?: boolean;
  opaque: boolean;
}
export const Letter = memo(function Letter({
  width,
  children: char,
  colourOfChar,
  flexBasis,
  fadeOut = false,
  even = false,
  opaque = false,
}: LetterProps) {
  return (
    <Typography
      level="body-lg"
      sx={{
        display: "inline-block",
        textAlign: "center",
        fontSize: 26,
        fontFamily: "inherit",
        width: `${width}px`,
        paddingBottom: "14px",
        flexBasis: flexBasis,
        opacity: fadeOut ? 0 : opaque ? 0.4 : 1,
        transform: fadeOut
          ? even
            ? "translate(-30px,-15px)"
            : "translate(-30px, 15px)"
          : "none",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}
      style={{ color: colourOfChar }}
    >
      {char === "↵" ? <ReturnIcon /> : char}
    </Typography>
  );
});
