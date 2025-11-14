import { ThemeContext } from "../context/ThemeContext/ThemeContext";
import { Target } from "lucide-react";
import { useContext } from "react";
import { Box } from "@mui/joy";

export const TargetIcon = () => {
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
          backgroundColor: theme.vars.palette.secondary[600],
          opacity: 0.2,
          borderRadius: "10px",
        },
      }}
    >
      <Target size={30} color={theme.vars.palette.secondary[600]} />
    </Box>
  );
};
