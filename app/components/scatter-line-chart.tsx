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
  const binSize = Math.ceil((data?.length || 20) / 20);
  const binnedPoints: { x: number; y: number }[] = [
    { x: series[0]?.x || 0, y: series[0]?.y || 0 },
  ];
  for (let i = 0; i + binSize <= series.length; i += binSize) {
    const bin = series.slice(i, i + binSize);
    const avgX = bin.reduce((acc, item) => acc + item.x, 0) / bin.length;
    const avgY = bin.reduce((acc, item) => acc + item.y, 0) / bin.length;
    binnedPoints.push({ x: avgX, y: avgY });
  }
  // Add remaining points as a final bin
  if (series.length % binSize !== 0) {
    const bin = series.slice(series.length - (series.length % binSize));
    const avgX = bin.reduce((acc, item) => acc + item.x, 0) / bin.length;
    const avgY = bin.reduce((acc, item) => acc + item.y, 0) / bin.length;
    binnedPoints.push({ x: avgX, y: avgY });
  }

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
            data: binnedPoints.map((pt) => pt.x),
            valueFormatter: (value: number) => `${value}`,
            stroke: lineColor || "#bb81f6",
            fill: lineColor || "#bb81f6",
          },
        ]}
        yAxis={[{ id: "axis1" }]}
        series={[
          {
            type: "scatter",
            data,
            markerSize: 3,
            color: theme.vars.palette.grey[400],
          },
          {
            type: "line",
            curve: "bumpX",
            data: binnedPoints.map((pt) => pt.y),
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
        <ChartsTooltip
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light" ? "#fff" : "#000",
          }}
        />
        <ChartsClipPath id={clipPathId} />
      </ChartContainer>
    </Box>
  );
}
