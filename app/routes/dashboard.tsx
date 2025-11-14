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
import useSWR from "swr";
const baseURL = import.meta.env.VITE_API_BASE_URL || "";

export const Component = function Dashboard(): JSX.Element {
  usePageEffect({ title: "Dashboard" });
  const token = localStorage.getItem("authToken");
  const { theme } = useContext(ThemeContext);
  const fetcher = (path: string) =>
    fetch(`${baseURL}${path}`, {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`, // Assuming Bearer token authentication
        "Content-Type": "application/json", // Example of another header
      },
    }).then((res) => res.json());
  const { data } = useSWR(`/api/test-result`, fetcher);
  const { data: letterSpeedData } = useSWR(`/api/letter-speed`, fetcher);
  console.log(letterSpeedData);
  const averageTime =
    letterSpeedData && letterSpeedData.lowercaseArray
      ? letterSpeedData.lowercaseArray.reduce(
          (a: number, b: number) => a + b,
          0,
        ) / letterSpeedData.lowercaseArray.length
      : NaN;
  const averageSymbolTime =
    letterSpeedData && letterSpeedData.symbolArray
      ? letterSpeedData.symbolArray.reduce((a: number, b: number) => a + b, 0) /
        letterSpeedData.symbolArray.length
      : NaN;

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
          seriesData={data?.overallWpm}
          datakey="WPM Overall"
          id={0}
          color="#60a5fa"
        />
        <LineChartWithKPI
          icon={<HashIcon />}
          seriesData={data?.symbolWpm}
          color="#bb81f6"
          id={1}
          datakey="WPM Symbols & Numbers"
        />
        <LineChartWithKPI
          icon={<LowercaseIcon />}
          seriesData={data?.lowercaseWpm}
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
            value={hoursAndMinutes(data?.totalTime ?? 0)}
            datakey="Time Spent"
          />
          <Kpi
            icon={<TargetIcon />}
            value={(Math.round(data?.accuracy * 1000) / 10).toString() + "%"}
            datakey="Accuracy"
          />
          <Kpi
            icon={<TrophyIcon />}
            value={Math.round(data?.score).toLocaleString()}
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
                data: letterSpeedData?.lowercase?.keyArray
                  ? letterSpeedData.lowercase?.keyArray
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
                data: Array.isArray(letterSpeedData?.lowercase.timeArray)
                  ? letterSpeedData.lowercase.timeArray
                  : [],
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
              {
                scaleType: "band",
                label: "Keyboard Char",
                data: letterSpeedData?.symbol?.KeyArray
                  ? letterSpeedData.symbol.keyArray
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
                data: Array.isArray(letterSpeedData?.symbols?.timeArray)
                  ? letterSpeedData.sybols.timeArray
                  : [],
                valueFormatter: (value: number | null) =>
                  Math.round(value ?? 0) + "ms",
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
