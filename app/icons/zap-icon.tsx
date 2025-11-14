import { ThemeContext } from "../context/ThemeContext/ThemeContext";
import { Zap } from "lucide-react";
import { useContext } from "react";
import { Box } from "@mui/joy";

export const ZapIcon = () => {
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
          backgroundColor: theme.vars.palette.secondary[200],
          opacity: 0.2,
          borderRadius: "10px",
        },
      }}
    >
      <Zap size={24} color={theme.vars.palette.secondary[200]} />
    </Box>
  );
};
