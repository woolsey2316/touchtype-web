import { Box } from "@mui/joy";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext/ThemeContext";
import { Hash } from "lucide-react";

export const HashIcon = () => {
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
          backgroundColor: theme.vars.palette.secondary[300],
          opacity: 0.2,
          borderRadius: "10px",
        },
      }}
    >
      <Hash size={24} color={theme.vars.palette.secondary[300]} />
    </Box>
  );
};
