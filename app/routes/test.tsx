/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { Box, Card, CardContent, Container, Typography } from "@mui/joy";
import { useState, useCallback, type JSX, useRef } from "react";
import TypingPanel from "../components/typing-panel";
import { usePageEffect } from "../core/page";
import { Language, ProgrammingLanguage } from "../types/words.type";
import { MainOptionsBar } from "../components/main-options-bar";
import { LastWPM } from "../components/last-wpm";
import CountdownTimer from "../components/countdown-timer";

export const Component = function Test(): JSX.Element {
  usePageEffect({ title: "TypingTest" });
  const mistakes = useRef(0);
  const correctChars = useRef(0);
  const [punctuation, setPunctuation] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [programmingLanguage, setProgrammingLanguage] = useState(false);
  const [language, setLanguage] = useState<Language>(Language.ENGLISH);
  const [fixedSentenceSize, setIsFixedSentenceSize] = useState(true);
  const [isTimedTest, setIsTimedTest] = useState(false);
  const [sentenceSize, setSentenceSize] = useState(15);
  const [timeLimit, setTimeLimit] = useState(10);
  const [lastWPM, setLastWPM] = useState(0);
  const [timeTestInfo, setTimeInfo] = useState<{
    started: boolean;
    start: number | null;
    end: number | null;
    ended: boolean;
  }>({ started: false, start: null, end: null, ended: false });
  const childInputRef = useRef<HTMLDivElement>(null);
  // Function to focus the typing panel
  const focusChild = () => {
    childInputRef.current && childInputRef.current.focus();
  };
  const recordTypingStats = useCallback(
    (
      endTime: number,
      correctChars: number,
      mistakes: number,
      startTime: number,
    ) => {
      const wpm =
        ((((correctChars - mistakes) / (endTime - startTime)) * 1000) / 5) * 60;
      setLastWPM(wpm);
      console.log("wpm: ", wpm);
      console.log("correctChars: ", correctChars);
      console.log("mistakes: ", mistakes);
      console.log("startTime: ", startTime);
      console.log("endTime: ", endTime);
    },
    [setLastWPM],
  );
  const onEnd = useCallback(() => {
    recordTypingStats(
      Date.now(),
      correctChars.current,
      mistakes.current,
      timeTestInfo.start!,
    );
    setIsOpen(true);
  }, [
    correctChars,
    mistakes,
    recordTypingStats,
    timeTestInfo.start,
    setIsOpen,
  ]);

  return (
    <Container sx={{ py: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography sx={{ mb: 2 }} level="h2">
          Typing Test
        </Typography>
        <CountdownTimer
          key={isTimedTest.toString() + timeLimit}
          timeTestInfo={timeTestInfo}
          setTimeInfo={setTimeInfo}
          wantTimer={isTimedTest}
          targetDate={Date.now() + timeLimit * 1000}
          timeLimit={timeLimit}
          onEnd={onEnd}
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
            started={timeTestInfo.started}
            timeLimit={timeLimit}
            punctuation={punctuation}
            numbers={numbers}
            sentenceSize={sentenceSize}
            language={language}
          ></MainOptionsBar>
          <CardContent
            sx={{ minHeight: 300, display: "flex", alignItems: "center" }}
            onClick={focusChild}
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
                Number(isTimedTest) +
                lastWPM
              }
              punctuation={punctuation}
              language={language}
              sentenceSize={sentenceSize}
              numbers={numbers}
              isTimedTest={isTimedTest}
              timeTestInfo={timeTestInfo}
              setTimeInfo={setTimeInfo}
              setLastWPM={setLastWPM}
              lastWPM={lastWPM}
              recordTest={true}
              childInputRef={childInputRef}
              mistakes={mistakes}
              correctChars={correctChars}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};
