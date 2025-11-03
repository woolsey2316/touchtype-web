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
export default function ScatterLineChart({
  data,
}: {
  data?: { x: number; y: number; id: number }[];
}) {
  const series = data ?? [];
  let sum = 0;
  const compressedData = series.reduce((acc, curr, currId) => {
    if (currId % 20 === 0 && currId !== 0) {
      acc.push(sum / 20);
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
    <Box sx={{ width: "100%", maxWidth: 800 }}>
      <ChartContainer
        sx={{
          [`& .${lineElementClasses.root}`]: {
            stroke: "#bb81f6",
            strokeWidth: 2,
          },
          [`& .${markElementClasses.root}`]: {
            stroke: "#bb81f6",
            r: 0, // Modify the circle radius
            fill: "#bb81f6",
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
            valueFormatter: (value: number) => `${"Test #" + value}`,
          },
        ]}
        yAxis={[{ id: "axis1" }, { id: "axis2", position: "right" }]}
        series={[
          { type: "scatter", data, markerSize: 4 },
          {
            type: "line",
            curve: "bumpX",
            data: compressedData,
            xAxisId: "axis2",
            label: "WPM",
          },
        ]}
        height={175}
      >
        <ChartsGrid vertical horizontal />
        <g clipPath={`url(#${clipPathId})`}>
          <ScatterPlot />
          <LinePlot stroke="#bb81f6" />
        </g>
        <ChartsYAxis />
        <MarkPlot />
        <ChartsTooltip />
        <ChartsClipPath id={clipPathId} />
      </ChartContainer>
    </Box>
  );
}
