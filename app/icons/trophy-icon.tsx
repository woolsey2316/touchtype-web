import { ThemeContext } from "../context/ThemeContext/ThemeContext";
import TrophyIcon2 from "../icons/trophy2";
import { useContext } from "react";
import Box from "@mui/joy/Box";

export const TrophyIcon = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width={60}
      height={60}
      sx={{
        "&::before": {
          content: '""', // Required for ::before to render
          height: "48px",
          width: "48px",
          position: "absolute",
          backgroundColor: theme.vars.palette.secondary[700],
          opacity: 0.2,
          borderRadius: "10px",
        },
      }}
    >
      <TrophyIcon2 size={26} color={theme.vars.palette.secondary[700]} />
    </Box>
  );
};
