import { Box } from "@mui/joy";
interface CursorProps {
  left: string;
  top: string;
}

export function Cursor({ left, top }: CursorProps): JSX.Element {
  return (
    <Box
      sx={{
        "@keyframes blink": {
          "50%": {
            opacity: "0.0",
          },
        },
        animation: "blink 1s step-start 0s infinite",
      }}
      style={{
        color: "#034748",
        position: "absolute",
        left: left,
        top: top,
      }}
    >
      |
    </Box>
  );
}
