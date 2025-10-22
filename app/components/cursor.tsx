import { Box } from "@mui/joy";
import type { JSX } from "react";
import { useContext, useState, useEffect } from "react";
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
  const [width, setWidth] = useState("16px");
  const [height, setHeight] = useState("53px");
  const [left, setLeft] = useState("1px");
  const [top, setTop] = useState("0px");
  // on component mount, set width and height when letters have been added to DOM
  useEffect(() => {
    function getWidth() {
      const letters = document?.getElementsByClassName("letter");
      if (letters.length === 0 || letters[cursorIndex] === undefined) {
        return "16px";
      }
      return (letters[cursorIndex] as HTMLElement).clientWidth + "px";
    }

    function getHeight() {
      const letters = document?.getElementsByClassName("letter");
      if (letters.length === 0 || letters[cursorIndex] === undefined) {
        return "53px";
      }
      return (letters[cursorIndex] as HTMLElement).clientHeight + "px";
    }
    // cursor position logic
    function getCursorLeftPosition() {
      const letters = document?.getElementsByClassName("letter");
      if (letters.length === 0 || letters[cursorIndex] === undefined) {
        return "1px";
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
    setWidth(getWidth());
    setHeight(getHeight());
    setLeft(getCursorLeftPosition());
    setTop(getCursorTopPosition());
  }, [cursorIndex]);

  const { cursorType, smoothCursor } = useContext(UserPreferencesContext);

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
      cursorChar = (
        <CursorStickIcon
          sx={{ marginLeft: "-1px", width: "2px", marginTop: "7px" }}
        />
      );
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
        overflow: "visible",
        animation: "blink 1s step-start 0s infinite",
        transition: smoothCursor ? "left 0.2s linear" : "none",
        color: `${theme.vars.palette.primary[50]}`,
        ...sx,
      })}
      style={{
        position: "absolute",
        left: left,
        top: top,
        width: width,
        height: height,
      }}
    >
      {cursorChar}
    </Box>
  );
}
