import { Typography } from "@mui/joy";

export const Letter = ({
  width,
  children: char,
  colourOfChar,
  flexBasis,
  fadeOut = false,
  even = false,
}: {
  width: number;
  children: string;
  colourOfChar: string;
  flexBasis?: string;
  fadeOut?: boolean;
  even?: boolean;
}) => {
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
        color: colourOfChar,
        flexBasis: flexBasis,
        opacity: fadeOut ? 0 : 1,
        transform: fadeOut
          ? even
            ? "translate(-30px,-15px)"
            : "translate(-30px, 15px)"
          : "none",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}
    >
      {char}
    </Typography>
  );
};
