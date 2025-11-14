import { ThemeContext } from "../context/ThemeContext/ThemeContext";
import { useContext } from "react";
import { Box } from "@mui/joy";

export const LowercaseIcon = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width={48}
      height={48}
      sx={{
        "&::before": {
          content: '""', // Required for ::before to render
          height: "48px",
          width: "48px",
          position: "absolute",
          backgroundColor: theme.vars.palette.secondary[400],
          opacity: 0.2,
          borderRadius: "10px",
        },
      }}
    >
      <Box color={theme.vars.palette.secondary[400]} fontSize={28}>
        a
      </Box>
    </Box>
  );
};
