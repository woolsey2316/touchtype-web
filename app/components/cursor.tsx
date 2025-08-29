import { Box } from "@mui/joy";
import type { JSX } from "react";

interface CursorProps {
  cursorIndex: number;
}

export function Cursor({ cursorIndex }: CursorProps): JSX.Element {
  // cursor position logic
  function getCursorLeftPosition() {
    const letters = document?.getElementsByClassName("letter");
    if (letters.length === 0 || letters[cursorIndex] === undefined) {
      return "-7px";
    }
    const cursorWidth = document?.getElementById("cursor")?.clientWidth ?? 14;
    return (
      (letters[cursorIndex] as HTMLElement).offsetLeft - cursorWidth / 2 + "px"
    );
  }

  function getCursorTopPosition() {
    const letters = document?.getElementsByClassName("letter");
    if (letters.length === 0 || letters[cursorIndex] === undefined) {
      return "0px";
    }
    return (letters[cursorIndex] as HTMLElement).offsetTop + "px";
  }

  return (
    <Box
      id="cursor"
      sx={(theme) => ({
        "@keyframes blink": {
          "50%": {
            opacity: "0.0",
          },
        },
        animation: "blink 1s step-start 0s infinite",
        transition: "left 0.1s linear",
        color: `${theme.vars.palette.primary[50]}`,
      })}
      style={{
        position: "absolute",
        left: getCursorLeftPosition(),
        top: getCursorTopPosition(),
      }}
    >
      |
    </Box>
  );
}
