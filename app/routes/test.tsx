/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { Box, Card, CardContent, Container, Typography } from "@mui/joy";
import { useState, type JSX } from "react";
import TypingPanel from "../components/typing-panel";
import { usePageEffect } from "../core/page";
import { Language, ProgrammingLanguage } from "../types/words.type";
import { MainOptionsBar } from "../components/main-options-bar";

export const Component = function Dashboard(): JSX.Element {
  usePageEffect({ title: "TypingTest" });
  const [punctuation, setPunctuation] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [programmingLanguage, setProgrammingLanguage] = useState(false);
  const [language, setLanguage] = useState<Language>(Language.ENGLISH);
  const [fixedSentenceSize, setIsFixedSentenceSize] = useState(true);
  const [time, setTime] = useState(false);
  const [sentenceSize, setSentenceSize] = useState(15);
  const [timeLimit, setTimeLimit] = useState(10);
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
          <MainOptionsBar
            setPunctuation={setPunctuation}
            setNumbers={setNumbers}
            setProgrammingLanguage={setProgrammingLanguage}
            setLanguage={setLanguage}
            setIsFixedSentenceSize={setIsFixedSentenceSize}
            setTime={setTime}
            setSentenceSize={setSentenceSize}
            setTimeLimit={setTimeLimit}
            fixedSentenceSize={fixedSentenceSize}
            programmingLanguage={programmingLanguage}
            time={time}
            timeLimit={timeLimit}
            punctuation={punctuation}
            numbers={numbers}
            sentenceSize={sentenceSize}
            language={language}
          ></MainOptionsBar>
          <CardContent
            sx={{ minHeight: 300, display: "flex", alignItems: "center" }}
          >
            <Typography
              level="h3"
              sx={{
                color: "#0CAADC",
                marginBottom: "1em",
              }}
            >
              {programmingLanguage && ProgrammingLanguage[language]}
            </Typography>
            <TypingPanel
              key={
                Number(punctuation) +
                Number(language) +
                Number(numbers) +
                sentenceSize
              }
              punctuation={punctuation}
              language={language}
              sentenceSize={sentenceSize}
              numbers={numbers}
            />
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};
