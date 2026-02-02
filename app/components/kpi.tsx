import { Box, Typography } from "@mui/joy";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext/ThemeContext";
export const Kpi = ({
  icon,
  value,
  datakey,
}: {
  icon: React.ReactNode;
  value: number | string;
  datakey: string;
}) => {
  const { theme } = useContext(ThemeContext);
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        width: "300px",
        height: "200px",
        borderRadius: "12px",
        backgroundColor: theme.vars.palette.grey[600],
        boxShadow:
          "1px 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      }}
    >
      {icon}
      <Typography
        sx={{ margin: "16px 0px 8px 0px", color: "text.secondary" }}
        level="h2"
      >
        {value}
      </Typography>
      <Typography level="body-sm" sx={{ mb: 1 }}>
        {datakey}
      </Typography>
    </Box>
  );
};
