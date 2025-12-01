/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { Box, Container, Typography } from "@mui/joy";
import { type JSX, useContext } from "react";
import { usePageEffect } from "../core/page";
import LineChartWithKPI from "../components/linechart-with-kpi";
import { ClockIcon } from "../icons/clock-icon";
import { TrophyIcon } from "../icons/trophy-icon";
import { TargetIcon } from "../icons/target-icon";
import { ZapIcon } from "../icons/zap-icon";
import { HashIcon } from "../icons/hash-icon";
import { LowercaseIcon } from "../icons/lowercase-icon";
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
import WpmBellCurveChart from "../components/bell-curve-chart";
import { useDashboardData } from "../hooks/useDashboardData";

export const Component = function Dashboard(): JSX.Element {
  usePageEffect({ title: "Dashboard" });
  const { theme } = useContext(ThemeContext);
  const {
    testResultData,
    letterSpeedData,
    averageLowercaseTime,
    averageSymbolTime,
  } = useDashboardData();
  const lowercaseLetterAverageTime = letterSpeedData?.lowercase.map(
    (elem) => elem.avgWpm,
  );
  const lowercaseLetterSpeedKeys = letterSpeedData?.lowercase.map(
    (elem) => elem.letter,
  );
  const symbolLetterSpeedData = letterSpeedData?.symbols.map(
    (elem) => elem.avgWpm,
  );
  const symbolLetterSpeedKeys = letterSpeedData?.symbols.map(
    (elem) => elem.letter,
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
          icon={<ZapIcon />}
          seriesData={testResultData?.overall ?? []}
          datakey="WPM Overall"
          id={0}
          color="#60a5fa"
        />
        <LineChartWithKPI
          icon={<HashIcon />}
          seriesData={testResultData?.symbol ?? []}
          color="#bb81f6"
          id={1}
          datakey="WPM Symbols & Numbers"
        />
        <LineChartWithKPI
          icon={<LowercaseIcon />}
          seriesData={testResultData?.lowercase ?? []}
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
            icon={<ClockIcon />}
            value={hoursAndMinutes(testResultData?.totalTime ?? 0)}
            datakey="Time Spent"
          />
          <Kpi
            icon={<TargetIcon />}
            value={
              testResultData?.accuracy === undefined
                ? "-"
                : (Math.round(testResultData?.accuracy * 10) / 10).toString() +
                  "%"
            }
            datakey="Accuracy"
          />
          <Kpi
            icon={<TrophyIcon />}
            value={
              testResultData?.accuracy === undefined
                ? "-"
                : Math.round(testResultData?.score).toLocaleString()
            }
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
              {
                scaleType: "band",
                label: "Keyboard Char",
                data: lowercaseLetterSpeedKeys
                  ? lowercaseLetterSpeedKeys
                  : [
                      "a",
                      "b",
                      "c",
                      "d",
                      "e",
                      "f",
                      "g",
                      "h",
                      "i",
                      "j",
                      "k",
                      "l",
                      "m",
                      "n",
                      "o",
                      "p",
                      "q",
                      "r",
                      "s",
                      "t",
                      "u",
                      "v",
                      "w",
                      "x",
                      "y",
                      "z",
                    ],
              },
            ]}
            yAxis={[{ label: "Average WPM" }]}
            height={300}
            series={[
              {
                type: "bar",
                data: Array.isArray(lowercaseLetterAverageTime)
                  ? lowercaseLetterAverageTime
                  : [],
                valueFormatter: (value: number | null) =>
                  Math.round(value ?? 0) + " wpm",
              },
            ]}
          >
            <BarPlot />
            <LinePlot />
            <ChartsReferenceLine
              y={averageLowercaseTime}
              label={"Avg: " + Math.round(averageLowercaseTime) + "wpm"}
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
              {
                scaleType: "band",
                label: "Keyboard Char",
                data: symbolLetterSpeedKeys
                  ? symbolLetterSpeedKeys
                  : [
                      "!",
                      "@",
                      "#",
                      "$",
                      "%",
                      "^",
                      "&",
                      "*",
                      "(",
                      ")",
                      "-",
                      "=",
                      "_",
                      "+",
                      "[",
                      "]",
                      "{",
                      "}",
                      ";",
                      ":",
                      "'",
                      '"',
                      ",",
                      ".",
                      "<",
                      ">",
                      "/",
                      "?",
                      "`",
                      "~",
                      "0",
                      "1",
                      "2",
                      "3",
                      "4",
                      "5",
                      "6",
                      "7",
                      "8",
                      "9",
                    ],
              },
            ]}
            yAxis={[{ label: "Average WPM" }]}
            height={300}
            series={[
              {
                type: "bar",
                data: Array.isArray(symbolLetterSpeedData)
                  ? symbolLetterSpeedData
                  : [],
                valueFormatter: (value: number | null) =>
                  Math.round(value ?? 0) + " wpm",
              },
            ]}
          >
            <BarPlot />
            <LinePlot />
            <ChartsReferenceLine
              y={averageSymbolTime}
              label={"Avg: " + Math.round(averageSymbolTime) + "wpm"}
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
          <WpmBellCurveChart />
        </Box>
      </Box>
    </Container>
  );
};
