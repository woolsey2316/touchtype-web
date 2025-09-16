/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { Box, Card, CardContent, Container, Typography } from "@mui/joy";
import { useState, useCallback, type JSX, useRef } from "react";
import TypingPanel from "../components/typing-panel";
import { usePageEffect } from "../core/page";
import { Language } from "../types/words.type";
import { MainOptionsBar } from "../components/main-options-bar";
import { CurrentWPM } from "../components/current-wpm";
import CountdownTimer from "../components/countdown-timer";
import { calcWPM, calcAccuracy, calcScore } from "../utils/test-stats";

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
  const [currentAccuracy, setCurrentAccuracy] = useState(0);
  // const [averageAccuracy, setAverageAccuracy] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  // const [averageScore, setAverageScore] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [resetCounter, setResetCounter] = useState(0);
  const [testInfo, setTimeInfo] = useState<{
    started: boolean;
    ended: boolean;
  }>({ started: false, ended: false });
  const childInputRef = useRef<HTMLDivElement>(null);
  const startTime = useRef<number | null>(null);
  // Function to focus the typing panel
  const focusChild = () => {
    if (childInputRef.current) {
      childInputRef.current.focus();
    }
  };
  const keyTimeMap = useRef<Record<string, number[]>>({});

  const recordTypingStats = useCallback(
    (
      endTime: number,
      correctChars: number,
      mistakes: number,
      startTime: number,
    ) => {
      const wpm = calcWPM(correctChars, endTime - startTime);
      setCurrentWPM(wpm);
      const accuracy = calcAccuracy(correctChars, mistakes);
      const score = calcScore(wpm, accuracy, endTime - startTime);
      setCurrentAccuracy(accuracy);
      setCurrentScore(score);
      setCurrentTime((endTime - startTime) / 1000);
    },
    [setCurrentWPM],
  );
  const onEnd = useCallback(() => {
    setTimeInfo({
      started: false,
      ended: true,
    });
    recordTypingStats(
      Date.now(),
      correctChars.current,
      mistakes.current,
      startTime.current || 0,
    );
    setIsResultsModalOpen(true);
  }, [
    correctChars,
    mistakes,
    recordTypingStats,
    startTime,
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
          testInfo={testInfo}
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
            keyTimeMap={keyTimeMap}
            correctChars={correctChars}
            mistakes={mistakes}
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
            sx={{
              minHeight: 300,
              display: "flex",
              alignItems: "center",
              paddingTop: "2em",
              overflowX: "visible",
            }}
            onClick={focusChild}
          >
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
              programmingLanguage={programmingLanguage}
              punctuation={punctuation}
              language={language}
              sentenceSize={sentenceSize}
              numbers={numbers}
              isTimedTest={isTimedTest}
              testInfo={testInfo}
              startTime={startTime}
              setTimeInfo={setTimeInfo}
              setCurrentWPM={setCurrentWPM}
              currentAccuracy={currentAccuracy}
              currentScore={currentScore}
              currentTime={currentTime}
              keyTimeMap={keyTimeMap}
              onEnd={onEnd}
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
