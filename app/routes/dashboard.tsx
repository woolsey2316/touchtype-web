/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Container,
  Option,
  Select,
  Typography,
} from "@mui/joy";
import type { JSX } from "react";
import TypingPanel from "../components/typing-panel";
import { usePageEffect } from "../core/page";

export const Component = function Dashboard(): JSX.Element {
  usePageEffect({ title: "Dashboard" });

  return (
    <Container sx={{ py: 2 }}>
      <Typography sx={{ mb: 2 }} level="h2">
        Dashboard
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { sm: "1fr", md: "1fr 1fr" },
          gap: 2,
        }}
      >
        <Card sx={{ gridArea: "1 / 1 / 2 / -1", backgroundColor: "#001021" }}>
          <Box>
            <ButtonGroup
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Button variant="plain">punctuation</Button>
              <Button variant="plain">numbers</Button>
              <Button variant="plain">time</Button>
              <Button variant="plain">custom</Button>
              <Select placeholder="Select programming language">
                <Option value="react">React</Option>
                <Option value="vue">Vue</Option>
                <Option value="javaScript">JavaScript</Option>
                <Option value="java">Java</Option>
                <Option value="c++">C++</Option>
              </Select>
            </ButtonGroup>
          </Box>
          <CardContent
            sx={{ minHeight: 300, display: "flex", alignItems: "center" }}
          >
            <Typography level="h3" sx={{ color: "#0CAADC" }}>
              Test type
            </Typography>
            <TypingPanel words={"This is a typing test"} />
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};
