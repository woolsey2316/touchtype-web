import { Box } from "@mui/joy";
import type { JSX } from "react";
interface CursorProps {
  left: string;
  top: string;
}

export function Cursor({ left, top }: CursorProps): JSX.Element {
  return (
    <Box
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
        left: left,
        top: top,
      }}
    >
      |
    </Box>
  );
}
