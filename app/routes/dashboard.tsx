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
import { useState, type JSX } from "react";
import TypingPanel from "../components/typing-panel";
import { usePageEffect } from "../core/page";

export const Component = function Dashboard(): JSX.Element {
  usePageEffect({ title: "Dashboard" });
  const [punctuation, setPunctuation] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [programmingLanguage, setProgrammingLanguage] = useState(false);
  const [language, setLanguage] = useState("English");
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
              <Button
                variant="plain"
                onClick={() => setPunctuation((punctuation) => !punctuation)}
              >
                punctuation
              </Button>
              <Button
                variant="plain"
                onClick={() => {
                  setNumbers((numbers) => !numbers);
                }}
              >
                numbers
              </Button>
              <Button variant="plain">time</Button>
              <Button variant="plain">custom</Button>
              <Button
                variant="plain"
                onClick={() =>
                  setProgrammingLanguage((programming) => !programming)
                }
              >
                programming language
              </Button>
              {programmingLanguage && (
                <Select
                  onChange={(
                    event:
                      | React.MouseEvent<Element, MouseEvent>
                      | React.KeyboardEvent
                      | React.FocusEvent<Element, Element>
                      | null,
                  ) => {
                    setLanguage((event?.target as HTMLSelectElement)?.value);
                  }}
                  placeholder="Select programming language"
                  value={language}
                >
                  <Option value="React">React</Option>
                  <Option value="Angular">Angular</Option>
                  <Option value="Vue">Vue</Option>
                  <Option value="JavaScript">JavaScript</Option>
                  <Option value="Java">Java</Option>
                  <Option value="C++">C++</Option>
                </Select>
              )}
            </ButtonGroup>
          </Box>
          <CardContent
            sx={{ minHeight: 300, display: "flex", alignItems: "center" }}
          >
            <Typography level="h3" sx={{ color: "#0CAADC" }}>
              {programmingLanguage && language}
            </Typography>
            <TypingPanel
              punctuation={punctuation}
              language={language}
              numbers={numbers}
            />
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};
