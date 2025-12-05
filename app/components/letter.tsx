import { Typography } from "@mui/joy";
import { ReturnIcon } from "../icons/return";
import ShiftIcon from "../icons/shift";
import { memo, useContext } from "react";
import { UserPreferencesContext } from "../context/userPreferences";

interface LetterProps {
  children: string;
  colourOfChar: string;
  flexBasis?: string;
  fadeOut?: boolean;
  even?: boolean;
  opaque: boolean;
  invisible?: boolean;
  preferedColour?: string;
  additionalClasses?: string;
}
export const Letter = memo(function Letter({
  children: char,
  colourOfChar,
  flexBasis,
  fadeOut = false,
  even = false,
  opaque = false,
  invisible,
  preferedColour,
  additionalClasses,
}: LetterProps) {
  const { skipOverTabs, zipperAnimation } = useContext(UserPreferencesContext);
  let symbol: string | React.ReactNode = char;
  switch (char) {
    case "↵":
      symbol = <ReturnIcon />;
      break;
    case "\t":
    case "→":
      symbol = (
        <ShiftIcon
          sx={{
            visibilty: skipOverTabs ? "invisible" : "visible",
            width: "20px",
            height: "14px",
            marginRight: "4px",
          }}
        />
      );
      break;
    default:
      break;
  }

  return (
    <Typography
      level="body-lg"
      className={`letter ${additionalClasses ? additionalClasses : ""}`}
      sx={{
        display: "inline-block",
        textAlign: "center",
        fontSize: 26,
        fontFamily: "inherit",
        paddingBottom: "14px",
        flexBasis: flexBasis,
        opacity:
          (fadeOut && zipperAnimation) || invisible ? 0 : opaque ? 0.3 : 1,
        transform:
          zipperAnimation && fadeOut
            ? even && zipperAnimation
              ? "translate(-30px,-15px)"
              : "translate(-30px, 15px)"
            : "none",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}
      style={{ color: preferedColour ? preferedColour : colourOfChar }}
    >
      {symbol === " " ? "_" : symbol}
    </Typography>
  );
});
