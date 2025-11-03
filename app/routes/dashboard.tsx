/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { Box, Container, Typography } from "@mui/joy";
import { type JSX } from "react";
import { usePageEffect } from "../core/page";
import LineChartWithKPI from "../components/linechart-with-kpi";
import { Hash, Zap } from "lucide-react";

export const Component = function Dashboard(): JSX.Element {
  usePageEffect({ title: "Dashboard" });
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
          datakey="WPM"
          id={0}
          color="#60a5fa"
        />
        <LineChartWithKPI
          icon={HashIcon}
          seriesData={seriesData2}
          color="#bb81f6"
          id={1}
          datakey="WPM (Symbols & Numbers)"
        />

        <LineChartWithKPI
          icon={LowercaseIcon}
          seriesData={seriesData}
          id={2}
          color="#facc15"
          datakey="WPM (lowercase)"
        />
      </Box>
    </Container>
  );
};

const ZapIcon: JSX.Element = (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="center"
    width={48}
    height={48}
    bgcolor="#60a5fa22"
    borderRadius="10px"
  >
    <Zap size={24} color="#60a5fa" />
  </Box>
);

const HashIcon: JSX.Element = (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="center"
    width={48}
    height={48}
    bgcolor="#bb81f622"
    borderRadius="10px"
  >
    <Hash size={24} color="#bb81f6" />
  </Box>
);

const LowercaseIcon: JSX.Element = (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="center"
    width={48}
    height={48}
    bgcolor="#facc1522"
    borderRadius="10px"
  >
    <Box color="#facc15" fontSize={28}>
      a
    </Box>
  </Box>
);
