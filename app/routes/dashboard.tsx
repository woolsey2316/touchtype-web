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
// import WpmBellCurveChart from "../components/bell-curve-chart";
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
          icon={<LowercaseIcon />}
          seriesData={testResultData?.lowercase ?? []}
          id={2}
          color={theme.vars.palette.secondary[400]}
          datakey="WPM lowercase"
        />
        <LineChartWithKPI
          icon={<ZapIcon />}
          seriesData={testResultData?.overall ?? []}
          datakey="WPM Overall"
          id={0}
          color={theme.vars.palette.secondary[200]}
        />
        <LineChartWithKPI
          icon={<HashIcon />}
          seriesData={testResultData?.symbol ?? []}
          color={theme.vars.palette.secondary[300]}
          id={1}
          datakey="WPM Symbols & Numbers"
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
            bgcolor: (theme) => theme.palette.grey[600],
            borderRadius: "10px",
            padding: "0px",
            maxWidth: "900px",
            boxShadow:
              "1px 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
          }}
        >
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Box>
              <Typography
                sx={{
                  p: 2,
                  pb: 0,
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                WPM (Lowercase)
              </Typography>
              <Typography
                sx={{
                  p: 2,
                  pt: 0,
                  fontSize: "14px",
                  color: theme.vars.palette.text.secondary,
                }}
              >
                Average WPM for each individual character.
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                sx={{
                  borderRadius: "9999px",
                  height: "10px",
                  width: "10px",
                  bgcolor: theme.vars.palette.secondary[100],
                }}
              ></Box>
              <Typography
                sx={{
                  py: 2,
                  pr: 2,
                  pl: 1,
                }}
              >
                {"Average WPM: " + Math.round(averageLowercaseTime)}
              </Typography>
            </Box>
          </Box>
          <ChartContainer
            title="lowercase letters"
            colors={[theme.vars.palette.secondary[50]]}
            xAxis={[
              {
                scaleType: "band",
                label: "Lowercase characters",

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
              lineStyle={{
                stroke: theme.vars.palette.secondary[100],
                strokeWidth: 2,
                strokeDasharray: "9 9",
              }}
              labelStyle={{
                backgroundColor: theme.vars.palette.background.level2,
                borderRadius: "25px",
                color: theme.vars.palette.text.primary,
              }}
            />
            <ChartsYAxis />
            <ChartsXAxis />
            <ChartsTooltip
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === "light" ? "#fff" : "#000",
              }}
            />
          </ChartContainer>
        </Box>
        <Box
          sx={{
            bgcolor: (theme) => theme.palette.grey[600],
            borderRadius: "10px",
            padding: "0px",
            maxWidth: "900px",
            boxShadow:
              "1px 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
          }}
        >
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Box>
              <Typography
                sx={{
                  p: 2,
                  pb: 0,
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                WPM (Symbols & Numbers)
              </Typography>
              <Typography
                sx={{
                  p: 2,
                  pt: 0,
                  fontSize: "14px",
                  color: theme.vars.palette.text.secondary,
                }}
              >
                Average WPM for each individual character.
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                sx={{
                  borderRadius: "9999px",
                  height: "10px",
                  width: "10px",
                  bgcolor: theme.vars.palette.secondary[100],
                }}
              ></Box>
              <Typography
                sx={{
                  py: 2,
                  pr: 2,
                  pl: 1,
                }}
              >
                {"Average WPM: " + Math.round(averageSymbolTime)}
              </Typography>
            </Box>
          </Box>
          <ChartContainer
            title="Symbols & Numbers"
            colors={[theme.vars.palette.secondary[50]]}
            xAxis={[
              {
                scaleType: "band",
                label: "Symbol characters",
                valueFormatter: (key: string) => (key === " " ? "Space" : key),
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
              lineStyle={{
                stroke: theme.vars.palette.secondary[100],
                strokeWidth: 2,
                strokeDasharray: "9 9",
              }}
              labelStyle={{
                backgroundColor: theme.vars.palette.background.level2,
                borderRadius: "25px",
                color: "red",
              }}
            />
            <ChartsYAxis />
            <ChartsXAxis />
            <ChartsTooltip
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === "light" ? "#fff" : "#000",
              }}
            />
          </ChartContainer>
        </Box>
        {/*   <Box */}
        {/*     sx={{ */}
        {/*       bgcolor: (theme) => theme.palette.neutral[700], */}
        {/*       borderRadius: "10px", */}
        {/*       border: `1px solid ${theme.vars.palette.grey[500]}`, */}
        {/*       padding: "0px", */}
        {/*       maxWidth: "900px", */}
        {/*     }} */}
        {/*   > */}
        {/*     <WpmBellCurveChart /> */}
        {/*   </Box> */}
      </Box>
    </Container>
  );
};
