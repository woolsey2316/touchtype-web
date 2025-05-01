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
import { Language } from "../types/words.type";

export const Component = function Dashboard(): JSX.Element {
  usePageEffect({ title: "Dashboard" });
  const [punctuation, setPunctuation] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [programmingLanguage, setProgrammingLanguage] = useState(false);
  const [language, setLanguage] = useState<Language>(0);
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
                    setLanguage(
                      Number((event?.target as HTMLSelectElement)?.value),
                    );
                  }}
                  placeholder="Select programming language"
                  value={language}
                >
                  <Option value={1}>React</Option>
                  <Option value={2}>Angular</Option>
                  <Option value={3}>Vue</Option>
                  <Option value={4}>JavaScript</Option>
                  <Option value={5}>Java</Option>
                  <Option value={6}></Option>
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
