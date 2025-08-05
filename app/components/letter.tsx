import { Typography } from "@mui/joy";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext/ThemeContext";

export const Letter = ({
  width,
  children: char,
  colourOfChar,
  flexBasis,
}: {
  width: number;
  children: string;
  colourOfChar: string;
  flexBasis?: string;
}) => {
  const { theme } = useContext(ThemeContext);
  return (
    <Typography
      level="body-lg"
      sx={{
        textAlign: "center",
        fontSize: 26,
        fontFamily: "inherit",
        width: `${width}px`,
        paddingBottom: "14px",
        flexBasis: flexBasis,
      }}
      style={{
        color:
          colourOfChar === "s"
            ? theme.vars.palette.success.plainColor
            : colourOfChar === "f"
              ? theme.vars.palette.danger.plainColor
              : theme.vars.palette.neutral[500],
      }}
    >
      {char}
    </Typography>
  );
};
