import Box from "@mui/material/Box";
import useId from "@mui/utils/useId";

import { ChartContainer } from "@mui/x-charts/ChartContainer";
import { ScatterPlot } from "@mui/x-charts/ScatterChart";
import {
  LinePlot,
  MarkPlot,
  lineElementClasses,
  markElementClasses,
} from "@mui/x-charts/LineChart";
import { ChartsClipPath } from "@mui/x-charts/ChartsClipPath";
import { ChartsYAxis } from "@mui/x-charts/ChartsYAxis";
import { ChartsGrid } from "@mui/x-charts/ChartsGrid";
import { ChartsTooltip } from "@mui/x-charts/ChartsTooltip";
import { ThemeContext } from "../context/ThemeContext/ThemeContext";
import { useContext } from "react";

export default function ScatterLineChart({
  data,
  color,
  lineColor,
}: {
  data?: { x: number; y: number; id: number }[];
  color: string;
  lineColor?: string;
}) {
  const { theme } = useContext(ThemeContext);

  const series = data ?? [];
  let sum = 0;
  const compressedData = series.reduce((acc, curr, currId) => {
    if (currId % 20 === 0 && currId !== 0) {
      acc.push(Math.round((sum / 20) * 10) / 10);
      sum = 0;
    } else {
      sum += curr.y;
    }
    return acc;
  }, [] as number[]);
  compressedData.push(sum / (series.length % 20 || 20));

  compressedData.push(sum / (series.length % 20 || 20));
  const id = useId();
  const clipPathId = `${id}-clip-path`;

  return (
    <Box sx={{ width: "100%", maxWidth: 900 }}>
      <ChartContainer
        sx={{
          [`& .${lineElementClasses.root}`]: {
            strokeWidth: 3,
          },
          [`& .${markElementClasses.root}`]: {
            r: 0, // Modify the circle radius
            strokeWidth: 2,
          },
        }}
        xAxis={[
          {
            id: "axis1",
            data: series.map((d) => d.x),
          },
          {
            id: "axis2",
            data: compressedData.map((_, index) => index),
            valueFormatter: (value: number) => `${"Test Group #" + value}`,
            stroke: lineColor || "#bb81f6",
            fill: lineColor || "#bb81f6",
          },
        ]}
        yAxis={[{ id: "axis1" }]}
        series={[
          {
            type: "scatter",
            data,
            markerSize: 2,
            color: theme.vars.palette.grey[400],
          },
          {
            type: "line",
            curve: "bumpX",
            data: compressedData,
            xAxisId: "axis2",
            color: color || "#bb81f6",
          },
        ]}
        height={162}
      >
        <ChartsGrid vertical horizontal />
        <g clipPath={`url(#${clipPathId})`}>
          <ScatterPlot />
          <LinePlot />
        </g>
        <ChartsYAxis />
        <MarkPlot />
        <ChartsTooltip />
        <ChartsClipPath id={clipPathId} />
      </ChartContainer>
    </Box>
  );
}
