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
import { Language, ProgrammingLanguage } from "../types/words.type";

export const Component = function Dashboard(): JSX.Element {
  usePageEffect({ title: "Dashboard" });
  const [punctuation, setPunctuation] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [programmingLanguage, setProgrammingLanguage] = useState(false);
  const [language, setLanguage] = useState<Language>(Language.ENGLISH);
  return (
    <Container sx={{ py: 2 }}>
      <Typography sx={{ mb: 2 }} level="h2">
        Typing Test
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { sm: "1fr", md: "1fr 1fr" },
          gap: 2,
        }}
      >
        <Card
          sx={(theme) => ({
            gridArea: "1 / 1 / 2 / -1",
            color: `${theme.vars.palette.primary[50]}`,
            backgroundColor: `${theme.vars.palette.background.level3}`,
          })}
        >
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
                sx={(theme) => ({
                  color: punctuation
                    ? `${theme.vars.palette.primary[50]}`
                    : `${theme.vars.palette.neutral[100]}`,
                  ":hover": {
                    color: punctuation
                      ? `${theme.vars.palette.primary[50]}`
                      : `${theme.vars.palette.neutral[100]}`,
                  },
                })}
                onClick={() => setPunctuation((punctuation) => !punctuation)}
              >
                punctuation
              </Button>
              <Button
                variant="plain"
                sx={(theme) => ({
                  color: numbers
                    ? `${theme.vars.palette.primary[50]}`
                    : `${theme.vars.palette.neutral[100]}`,
                  ":hover": {
                    color: numbers
                      ? `${theme.vars.palette.primary[50]}`
                      : `${theme.vars.palette.neutral[100]}`,
                  },
                })}
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
                sx={(theme) => ({
                  color: programmingLanguage
                    ? `${theme.vars.palette.primary[50]}`
                    : `${theme.vars.palette.neutral[100]}`,
                  ":hover": {
                    color: programmingLanguage
                      ? `${theme.vars.palette.primary[50]}`
                      : `${theme.vars.palette.neutral[100]}`,
                  },
                })}
                onClick={() =>
                  setProgrammingLanguage((programming) => !programming)
                }
              >
                programming language
              </Button>
              {programmingLanguage && (
                <Select
                  onChange={(
                    _event:
                      | React.MouseEvent<Element, MouseEvent>
                      | React.KeyboardEvent
                      | React.FocusEvent<Element, Element>
                      | null,
                    value,
                  ) => {
                    setLanguage(Number(value));
                  }}
                  placeholder="Select programming language"
                  value={ProgrammingLanguage[language]}
                >
                  <Option value={Language.REACT.toString()}>React</Option>
                  <Option value={Language.ANGULAR.toString()}>Angular</Option>
                  <Option value={Language.CPLUSPLUS.toString()}>C++</Option>
                  <Option value={Language.JAVASCRIPT.toString()}>
                    JavaScript
                  </Option>
                  <Option value={Language.JAVA.toString()}>Java</Option>
                  <Option value={Language.C.toString()}>C</Option>
                </Select>
              )}
            </ButtonGroup>
          </Box>
          <CardContent
            sx={{ minHeight: 300, display: "flex", alignItems: "center" }}
          >
            <Typography level="h3" sx={{ color: "#0CAADC" }}>
              {programmingLanguage && ProgrammingLanguage[language]}
            </Typography>
            <TypingPanel
              key={Number(punctuation) + Number(language) + Number(numbers)}
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
