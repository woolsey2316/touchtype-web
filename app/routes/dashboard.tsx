/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { Box, Container, Typography } from "@mui/joy";
import { type JSX, useContext } from "react";
import { usePageEffect } from "../core/page";
import LineChartWithKPI from "../components/linechart-with-kpi";
import { Hash, Zap, Clock, Target } from "lucide-react";
import TrophyIcon2 from "../icons/trophy2";
import { Kpi } from "../components/kpi";
import { hoursAndMinutes } from "../utils/util";
import { ThemeContext } from "../context/ThemeContext/ThemeContext";
import {
  ChartContainer,
  BarPlot,
  LinePlot,
  ChartsYAxis,
  ChartsXAxis,
  ChartsTooltip,
  ChartsReferenceLine,
} from "@mui/x-charts";
import BellCurveChart from "../components/bell-curve-chart";

export const Component = function Dashboard(): JSX.Element {
  usePageEffect({ title: "Dashboard" });
  const { theme } = useContext(ThemeContext);
  const seriesData = Array.from({ length: 1000 }, (_, index) => ({
    y: Math.random() * 40 + 30,
    x: index,
    id: index,
  }));
  const seriesData2 = Array.from({ length: 1000 }, (_, index) => ({
    y: Math.random() * 10 + 10,
    x: index,
    id: index,
  }));
  const timeArray = [
    450, 430, 400, 350, 350, 300, 250, 250, 240, 235, 230, 220, 210, 200, 200,
    200, 180, 175, 160, 150, 150, 150, 140, 138, 120, 120,
  ];
  const keyArray = [
    "a",
    "s",
    "d",
    "f",
    "j",
    "k",
    "l",
    "g",
    "h",
    "e",
    "i",
    "n",
    "o",
    "t",
    "r",
    "u",
    "m",
    "w",
    "c",
    "v",
    "p",
    "x",
    "b",
    "y",
    "q",
  ];
  const averageTime =
    timeArray.reduce((acc, curr) => acc + curr, 0) / timeArray.length || 0;
  const ZapIcon: JSX.Element = (
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

  const HashIcon: JSX.Element = (
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

  const LowercaseIcon: JSX.Element = (
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
          backgroundColor: theme.vars.palette.secondary[400],
          opacity: 0.2,
          borderRadius: "10px",
        },
      }}
    >
      <Box color={theme.vars.palette.secondary[400]} fontSize={28}>
        a
      </Box>
    </Box>
  );

  const ClockIcon: JSX.Element = (
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
          backgroundColor: theme.vars.palette.secondary[500],
          opacity: 0.2,
          borderRadius: "10px",
        },
      }}
    >
      <Clock size={30} color={theme.vars.palette.secondary[500]} />
    </Box>
  );

  const TargetIcon: JSX.Element = (
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

  const TrophyIcon: JSX.Element = (
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
          backgroundColor: theme.vars.palette.secondary[700],
          opacity: 0.2,
          borderRadius: "10px",
        },
      }}
    >
      <TrophyIcon2 size={26} color={theme.vars.palette.secondary[700]} />
    </Box>
  );

  return (
    <Container sx={{ py: 2 }}>
      <Typography sx={{ mb: 2 }} level="h2">
        Dashboard
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { sm: "1fr" },
          gap: 2,
        }}
      >
        <LineChartWithKPI
          icon={ZapIcon}
          seriesData={seriesData}
          datakey="WPM Overall"
          id={0}
          color="#60a5fa"
        />
        <LineChartWithKPI
          icon={HashIcon}
          seriesData={seriesData2}
          color="#bb81f6"
          id={1}
          datakey="WPM Symbols & Numbers"
        />
        <LineChartWithKPI
          icon={LowercaseIcon}
          seriesData={seriesData}
          id={2}
          color="#facc15"
          datakey="WPM lowercase"
        />
        <Box
          display="flex"
          gap={2}
          alignItems="center"
          justifyContent="space-between"
          sx={{ width: "900px", padding: "0px", borderRadius: 8 }}
        >
          <Kpi
            icon={ClockIcon}
            value={hoursAndMinutes(117839)}
            datakey="Time Spent"
          />
          <Kpi
            icon={TargetIcon}
            value={(Math.round(0.975642 * 1000) / 10).toString() + "%"}
            datakey="Accuracy"
          />
          <Kpi
            icon={TrophyIcon}
            value={Math.round(800798.87658).toLocaleString()}
            datakey="Total Score"
          />
        </Box>
        <Box
          sx={{
            bgcolor: (theme) => theme.palette.neutral[700],
            borderRadius: "10px",
            border: `1px solid ${theme.vars.palette.grey[500]}`,
            padding: "0px",
            maxWidth: "900px",
          }}
        >
          <ChartContainer
            title="lowercase letters"
            colors={[theme.vars.palette.secondary[50]]}
            xAxis={[
              { scaleType: "band", label: "Keyboard Char", data: keyArray },
            ]}
            yAxis={[{ label: "Average WPM" }]}
            height={300}
            series={[
              {
                type: "bar",
                data: Array.isArray(timeArray) ? timeArray : [],
                valueFormatter: (value: number | null) =>
                  Math.round(value ?? 0) + "ms",
              },
            ]}
          >
            <BarPlot />
            <LinePlot />
            <ChartsReferenceLine
              y={averageTime}
              label={"Avg: " + Math.round(averageTime) + "wpm"}
              lineStyle={{
                stroke: theme.vars.palette.secondary[100],
                strokeDasharray: "5 5",
              }}
              labelStyle={{ marginLeft: "100px" }}
            />
            <ChartsYAxis />
            <ChartsXAxis />
            <ChartsTooltip />
          </ChartContainer>
        </Box>
        <Box
          sx={{
            bgcolor: (theme) => theme.palette.neutral[700],
            borderRadius: "10px",
            border: `1px solid ${theme.vars.palette.grey[500]}`,
            padding: "0px",
            maxWidth: "900px",
          }}
        >
          <ChartContainer
            title="Symbols & Numbers"
            colors={[theme.vars.palette.secondary[50]]}
            xAxis={[
              { scaleType: "band", label: "Keyboard Char", data: keyArray },
            ]}
            yAxis={[{ label: "Average WPM" }]}
            height={300}
            series={[
              {
                type: "bar",
                data: Array.isArray(timeArray) ? timeArray : [],
                valueFormatter: (value: number | null) =>
                  Math.round(value ?? 0) + "ms",
              },
            ]}
          >
            <BarPlot />
            <LinePlot />
            <ChartsReferenceLine
              y={averageTime}
              label={"Avg: " + Math.round(averageTime) + "wpm"}
              lineStyle={{
                stroke: theme.vars.palette.secondary[100],
                strokeDasharray: "5 5",
              }}
              labelStyle={{ marginLeft: "100px" }}
            />
            <ChartsYAxis />
            <ChartsXAxis />
            <ChartsTooltip />
          </ChartContainer>
        </Box>
        <Box
          sx={{
            bgcolor: (theme) => theme.palette.neutral[700],
            borderRadius: "10px",
            border: `1px solid ${theme.vars.palette.grey[500]}`,
            padding: "0px",
            maxWidth: "900px",
          }}
        >
          <BellCurveChart />
        </Box>
      </Box>
    </Container>
  );
};
