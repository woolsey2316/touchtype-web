import { ReactNode, useContext } from "react";
import { Box, Typography } from "@mui/joy";
import CustomScatterChart from "./scatter-line-chart";
import { ThemeContext } from "../context/ThemeContext/ThemeContext";

export default function LineChartWithKPI({
  icon,
  datakey,
  color,
  seriesData,
}: {
  icon: ReactNode;
  datakey: string;
  seriesData: { x: number; y: number; id: number }[];
  color: string;
  id: number;
}) {
  const average = seriesData
    ? seriesData.reduce((a, b) => a + b.y, 0) / seriesData.length
    : NaN;
  const roundedAverage = Number.isInteger(average)
    ? average
    : average.toFixed(2);
  const { theme } = useContext(ThemeContext);
  return (
    <Box
      sx={{
        maxWidth: 900,
        p: "36px",
        border: `1px solid ${theme.vars.palette.grey[500]}`,
        borderRadius: 9,
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { sm: "1fr", md: "110px 1fr" },
          gap: 2,
        }}
      >
        <Box>
          {icon}
          <Typography
            sx={{ margin: "16px 0px 8px 0px", color: "text.secondary" }}
            level="h2"
          >
            {isNaN(Number(roundedAverage)) ? "-" : roundedAverage}
          </Typography>
          <Typography level="body-md" sx={{ mb: 1, fontWeight: 600 }}>
            {datakey}
          </Typography>
        </Box>

        <Box>
          <CustomScatterChart data={seriesData} color={color} />
        </Box>
      </Box>
    </Box>
  );
}
