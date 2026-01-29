import { Box } from "@mui/joy";
import type { JSX } from "react";
import { useState, useEffect } from "react";
import CursorStickIcon from "../icons/cursor-stick";

interface GhostCursorProps {
  letters: HTMLCollectionOf<Element>;
  idealWPM: number | "";
  testStarted: boolean;
  startTime: React.RefObject<number | null>;
}

export function GhostCursor({
  letters,
  idealWPM,
  testStarted,
  startTime,
}: GhostCursorProps): JSX.Element {
  const [ghostIndex, setGhostIndex] = useState(0);
  const [left, setLeft] = useState("1px");
  const [top, setTop] = useState("0px");
  const [width, setWidth] = useState("16px");
  const [height, setHeight] = useState("53px");

  // Calculate ghost cursor position based on ideal WPM
  useEffect(() => {
    if (
      !testStarted ||
      !startTime.current ||
      (typeof idealWPM === "number" && idealWPM <= 0)
    ) {
      setGhostIndex(0);
      return;
    }

    const interval = setInterval(() => {
      const elapsed = (performance.now() - (startTime.current ?? 0)) / 1000;
      // WPM = (chars / 5) / (time in minutes)
      // chars = WPM * 5 * (time in minutes)
      const expectedChars = Math.floor(
        (idealWPM as number) * 5 * (elapsed / 60),
      );
      setGhostIndex(Math.min(expectedChars, letters.length - 1));
    }, 100);

    return () => clearInterval(interval);
  }, [testStarted, startTime, idealWPM, letters.length]);

  // Update position based on ghost index
  useEffect(() => {
    function getWidth() {
      if (letters.length === 0 || letters[ghostIndex] === undefined) {
        return "16px";
      }
      return (letters[ghostIndex] as HTMLElement).clientWidth + "px";
    }

    function getHeight() {
      if (letters.length === 0 || letters[ghostIndex] === undefined) {
        return "53px";
      }
      return (letters[ghostIndex] as HTMLElement).clientHeight + "px";
    }

    function getCursorLeftPosition() {
      if (letters.length === 0 || letters[ghostIndex] === undefined) {
        return "1px";
      }
      return (letters[ghostIndex] as HTMLElement).offsetLeft + "px";
    }

    function getCursorTopPosition() {
      if (letters.length === 0 || letters[ghostIndex] === undefined) {
        return "0px";
      }
      return (letters[ghostIndex] as HTMLElement).offsetTop + "px";
    }

    setWidth(getWidth());
    setHeight(getHeight());
    setLeft(getCursorLeftPosition());
    setTop(getCursorTopPosition());
  }, [ghostIndex, letters]);

  if (!testStarted || (idealWPM as number) <= 0) {
    return <></>;
  }

  return (
    <Box
      id="ghost-cursor"
      sx={(theme) => ({
        overflow: "visible",
        transition: "left 0.1s linear",
        color: theme.vars.palette.primary[200],
        opacity: 0.6,
      })}
      style={{
        position: "absolute",
        left: left,
        top: top,
        width: width,
        height: height,
      }}
    >
      <CursorStickIcon sx={{ width: "2px", marginTop: "7px" }} />
    </Box>
  );
}
