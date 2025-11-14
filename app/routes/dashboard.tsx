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
    letterSpeedData.lowercaseArray.reduce((a: number, b: number) => a + b, 0) /
    letterSpeedData.lowercaseArray.length;
  const averageSymbolTime =
    letterSpeedData.symbolArray.reduce((a: number, b: number) => a + b, 0) /
    letterSpeedData.symbolArray.length;
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
          seriesData={data.overallWpm}
          datakey="WPM Overall"
          id={0}
          color="#60a5fa"
        />
        <LineChartWithKPI
          icon={HashIcon}
          seriesData={data.symbolWPm}
          color="#bb81f6"
          id={1}
          datakey="WPM Symbols & Numbers"
        />
        <LineChartWithKPI
          icon={LowercaseIcon}
          seriesData={data.lowercaseWpm}
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
              {
                scaleType: "band",
                label: "Keyboard Char",
                data: letterSpeedData.keyArray,
              },
            ]}
            yAxis={[{ label: "Average WPM" }]}
            height={300}
            series={[
              {
                type: "bar",
                data: Array.isArray(letterSpeedData.timeArray)
                  ? letterSpeedData.timeArray
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
                data: letterSpeedData.symbolKeyArray,
              },
            ]}
            yAxis={[{ label: "Average WPM" }]}
            height={300}
            series={[
              {
                type: "bar",
                data: Array.isArray(letterSpeedData) ? letterSpeedData : [],
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
          <BellCurveChart />
        </Box>
      </Box>
    </Container>
  );
};
