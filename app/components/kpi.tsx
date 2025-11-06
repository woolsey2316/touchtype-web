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
        border: `1px solid ${theme.vars.palette.grey[500]}`,
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
