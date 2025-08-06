import { Typography } from "@mui/joy";

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
        color: colourOfChar,
      }}
    >
      {char}
    </Typography>
  );
};
