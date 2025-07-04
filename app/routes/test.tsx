/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { Box, Card, CardContent, Container, Typography } from "@mui/joy";
import { useState, type JSX } from "react";
import TypingPanel from "../components/typing-panel";
import { usePageEffect } from "../core/page";
import { Language, ProgrammingLanguage } from "../types/words.type";
import { MainOptionsBar } from "../components/main-options-bar";
import { LastWPM } from "../components/last-wpm";
import CountdownTimer from "../components/countdown-timer";

export const Component = function Dashboard(): JSX.Element {
  usePageEffect({ title: "TypingTest" });
  const [punctuation, setPunctuation] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [programmingLanguage, setProgrammingLanguage] = useState(false);
  const [language, setLanguage] = useState<Language>(Language.ENGLISH);
  const [fixedSentenceSize, setIsFixedSentenceSize] = useState(true);
  const [isTimedTest, setIsTimedTest] = useState(false);
  const [sentenceSize, setSentenceSize] = useState(15);
  const [timeLimit, setTimeLimit] = useState(10);
  const [lastWPM, setLastWPM] = useState(0);
  const [timeInfo, setTimeInfo] = useState<{
    started: boolean;
    start: number | null;
    end: number | null;
  }>({ started: false, start: null, end: null });
  return (
    <Container sx={{ py: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography sx={{ mb: 2 }} level="h2">
          Typing Test
        </Typography>
        <CountdownTimer
          started={timeInfo.started}
          wantTimer={isTimedTest}
          targetDate={Date.now() + timeLimit * 1000}
          timeLimit={timeLimit}
        ></CountdownTimer>
        <LastWPM lastWPM={lastWPM}></LastWPM>
      </Box>

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
            backgroundColor: "transparent",
            border: "none",
          })}
        >
          <MainOptionsBar
            setPunctuation={setPunctuation}
            setNumbers={setNumbers}
            setProgrammingLanguage={setProgrammingLanguage}
            setLanguage={setLanguage}
            setIsFixedSentenceSize={setIsFixedSentenceSize}
            setIsTimedTest={setIsTimedTest}
            setSentenceSize={setSentenceSize}
            setTimeLimit={setTimeLimit}
            fixedSentenceSize={fixedSentenceSize}
            programmingLanguage={programmingLanguage}
            isTimedTest={isTimedTest}
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
                sentenceSize +
                Number(isTimedTest)
              }
              punctuation={punctuation}
              language={language}
              sentenceSize={sentenceSize}
              numbers={numbers}
              isTimedTest={isTimedTest}
              timeInfo={timeInfo}
              setTimeInfo={setTimeInfo}
              setLastWPM={setLastWPM}
              recordTest={true}
            />
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};
