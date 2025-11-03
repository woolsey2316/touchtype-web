import { ReactNode } from "react";
import { Box, Typography } from "@mui/joy";
import CustomScatterChart from "./scatter-line-chart";
export default function LineChartWithKPI({
  icon,
  datakey,
  seriesData,
}: {
  icon: ReactNode;
  datakey: string;
  seriesData: { x: number; y: number; id: number }[];
  color: string;
  id: number;
}) {
  const average = seriesData.reduce((a, b) => a + b.y, 0) / seriesData.length;
  const roundedAverage = Number.isInteger(average)
    ? average
    : average.toFixed(2);

  return (
    <Box
      sx={{
        maxWidth: 800,
        p: "36px",
        border: "1px solid #1e2836",
        borderRadius: 9,
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { sm: "1fr", md: "80px 1fr" },
          gap: 2,
        }}
      >
        <Box>
          {icon}
          <Typography
            sx={{ margin: "16px 0px 8px 0px", color: "text.secondary" }}
            level="h2"
          >
            {roundedAverage}
          </Typography>
          <Typography level="body-sm" sx={{ mb: 1 }}>
            {datakey}
          </Typography>
        </Box>

        <Box>
          <CustomScatterChart data={seriesData} />
        </Box>
      </Box>
    </Box>
  );
}
