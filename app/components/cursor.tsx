import { Box } from "@mui/joy";
import type { JSX } from "react";
import { useContext } from "react";
import { UserPreferencesContext } from "../context/userPreferences";
import CursorRectangleIcon from "../icons/cursor-rectangle";
import CursorStickIcon from "../icons/cursor-stick";
import CursorBlockIcon from "../icons/cursor-block";
import CursorUnderlineIcon from "../icons/cursor-underline";

interface CursorProps {
  cursorIndex: number;
  sx?: Record<string, unknown>;
}

export function Cursor({ cursorIndex, sx }: CursorProps): JSX.Element {
  const { cursorType, smoothCursor } = useContext(UserPreferencesContext);
  // cursor position logic
  function getCursorLeftPosition() {
    const letters = document?.getElementsByClassName("letter");
    if (letters.length === 0 || letters[cursorIndex] === undefined) {
      return "0px";
    }
    return (letters[cursorIndex] as HTMLElement).offsetLeft + "px";
  }

  function getCursorTopPosition() {
    const letters = document?.getElementsByClassName("letter");
    if (letters.length === 0 || letters[cursorIndex] === undefined) {
      return "0px";
    }
    return (letters[cursorIndex] as HTMLElement).offsetTop + "px";
  }

  function getWidth() {
    const letters = document?.getElementsByClassName("letter");
    if (letters.length === 0 || letters[cursorIndex] === undefined) {
      return "14px";
    }
    return (letters[cursorIndex] as HTMLElement).clientWidth + "px";
  }

  function getHeight() {
    const letters = document?.getElementsByClassName("letter");
    if (letters.length === 0 || letters[cursorIndex] === undefined) {
      return "39px";
    }
    return (letters[cursorIndex] as HTMLElement).clientHeight + "px";
  }

  let cursorChar: React.ReactNode;
  switch (cursorType) {
    case "▯":
      cursorChar = <CursorBlockIcon sx={{ height: "42px", width: "100%" }} />;
      break;
    case "_":
      cursorChar = (
        <CursorUnderlineIcon sx={{ marginTop: "24px", width: "100%" }} />
      );
      break;
    case "│":
      cursorChar = <CursorStickIcon sx={{ width: "2px", marginTop: "7px" }} />;
      break;
    case "▊":
      cursorChar = (
        <CursorRectangleIcon
          sx={{ marginTop: "5px", height: "30px", width: "100%" }}
        />
      );
      break;
    default:
      cursorChar = <CursorStickIcon sx={{ width: "2px", marginTop: "7px" }} />;
      break;
  }
  return (
    <Box
      id="cursor"
      sx={(theme) => ({
        "@keyframes blink": {
          "50%": {
            opacity: "0",
          },
        },
        animation: "blink 1s step-start 0s infinite",
        transition: smoothCursor ? "left 0.2s linear" : "none",
        color: `${theme.vars.palette.primary[50]}`,
        ...sx,
      })}
      style={{
        position: "absolute",
        left: getCursorLeftPosition(),
        top: getCursorTopPosition(),
        width: getWidth(),
        height: getHeight(),
      }}
    >
      {cursorChar}
    </Box>
  );
}
