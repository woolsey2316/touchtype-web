/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { Box, Card, CardContent, Container, Typography } from "@mui/joy";
import { useState, useCallback, type JSX, useRef } from "react";
import TypingPanel from "../components/typing-panel";
import { usePageEffect } from "../core/page";
import { Language, ProgrammingLanguage } from "../types/words.type";
import { MainOptionsBar } from "../components/main-options-bar";
import { CurrentWPM } from "../components/current-wpm";
import CountdownTimer from "../components/countdown-timer";

export const Component = function Test(): JSX.Element {
  usePageEffect({ title: "Typing Test" });
  const mistakes = useRef(0);
  const correctChars = useRef(0);
  const [punctuation, setPunctuation] = useState(false);
  const [isOpen, setIsResultsModalOpen] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [programmingLanguage, setProgrammingLanguage] = useState(false);
  const [language, setLanguage] = useState<Language>(Language.ENGLISH);
  const [fixedSentenceSize, setIsFixedSentenceSize] = useState(true);
  const [isTimedTest, setIsTimedTest] = useState(false);
  const [sentenceSize, setSentenceSize] = useState(15);
  const [timeLimit, setTimeLimit] = useState(10);
  const [currentWPM, setCurrentWPM] = useState(0);
  // const [averageWPM, setAverageWPM] = useState(0);
  // const [currentAccuracy, setCurrentAccuracy] = useState(0);
  // const [averageAccuracy, setAverageAccuracy] = useState(0);
  // const [currentScore, setCurrentScore] = useState(0);
  // const [averageScore, setAverageScore] = useState(0);
  const [resetCounter, setResetCounter] = useState(0);
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
      setCurrentWPM(wpm);
      const accuracy = ((correctChars - mistakes) / correctChars) * 100;
      const score = wpm * Math.pow(accuracy / 100, 5);
      console.log(score);
      // setCurrentAccuracy(accuracy);
      // setCurrentScore(score);
    },
    [setCurrentWPM],
  );
  const onEnd = useCallback(() => {
    recordTypingStats(
      Date.now(),
      correctChars.current,
      mistakes.current,
      timeTestInfo.start!,
    );
    setIsResultsModalOpen(true);
  }, [
    correctChars,
    mistakes,
    recordTypingStats,
    timeTestInfo.start,
    setIsResultsModalOpen,
  ]);

  return (
    <Container sx={{ py: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography sx={{ mb: 2 }} level="h2">
          Typing Test
        </Typography>
        <CountdownTimer
          key={isTimedTest.toString() + timeLimit + resetCounter}
          timeTestInfo={timeTestInfo}
          setTimeInfo={setTimeInfo}
          wantTimer={isTimedTest}
          targetDate={Date.now() + timeLimit * 1000}
          timeLimit={timeLimit}
          onEnd={onEnd}
        ></CountdownTimer>
        <CurrentWPM currentWPM={currentWPM}></CurrentWPM>
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
            setTimeInfo={setTimeInfo}
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
                timeLimit +
                currentWPM
              }
              punctuation={punctuation}
              language={language}
              sentenceSize={sentenceSize}
              numbers={numbers}
              isTimedTest={isTimedTest}
              timeTestInfo={timeTestInfo}
              setTimeInfo={setTimeInfo}
              setCurrentWPM={setCurrentWPM}
              currentWPM={currentWPM}
              recordTest={true}
              childInputRef={childInputRef}
              mistakes={mistakes}
              correctChars={correctChars}
              isOpen={isOpen}
              setIsResultsModalOpen={setIsResultsModalOpen}
              setResetCounter={setResetCounter}
            />
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};
