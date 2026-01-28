import { Box, Card, CardContent, Container, Typography } from "@mui/joy";
import { useState, type JSX, useRef } from "react";
import TypingPanel from "../components/typing-panel";
import { usePageEffect } from "../core/page";
import { Language } from "../types/words.type";
import { MainOptionsBar } from "../components/main-options-bar";
import { CurrentWPM } from "../components/current-wpm";
import CountdownTimer from "../components/countdown-timer";
import { useTestResults } from "../hooks/useTestResults";
import { useSlowestKeys } from "../hooks/useSlowestKeys";
export const Component = function Test(): JSX.Element {
  usePageEffect({ title: "Typing Test" });

  const [punctuation, setPunctuation] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [programmingLanguage, setProgrammingLanguage] = useState(false);
  const [language, setLanguage] = useState<Language>(Language.ENGLISH);
  const [fixedSentenceSize, setIsFixedSentenceSize] = useState(true);
  const [isTrainingWeakestChars, setIsTrainingWeakestChars] = useState(false);
  const [isTurboPace, setIsTurboPace] = useState(false);
  const [idealWPM, setIdealWPM] = useState(100);
  const [isTimedTest, setIsTimedTest] = useState(false);
  const [sentenceSize, setSentenceSize] = useState(15);
  const [timeLimit, setTimeLimit] = useState(15);
  const [resetCounter, setResetCounter] = useState(0);
  const [testInfo, setTestInfo] = useState<{
    started: boolean;
    ended: boolean;
  }>({ started: false, ended: false });
  const childInputRef = useRef<HTMLDivElement>(null);
  const keyTimeMap = useRef<Record<string, number[]>>({});
  const { slowestKeys } = useSlowestKeys();

  const {
    mistakes,
    correctChars,
    startTime,
    previousScore,
    previousWPM,
    previousAccuracy,
    currentWPM,
    currentAccuracy,
    currentScore,
    currentTime,
    isOpen,
    setIsResultsModalOpen,
    onEnd,
  } = useTestResults(keyTimeMap, language);

  // Function to focus the typing panel
  const focusChild = () => {
    if (childInputRef.current) {
      childInputRef.current.focus();
    }
  };

  return (
    <Container sx={{ py: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography sx={{ mb: 2 }} level="h2">
          Typing Test
        </Typography>
        <CountdownTimer
          key={isTimedTest.toString() + timeLimit + resetCounter}
          testInfo={testInfo}
          setTestInfo={setTestInfo}
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
            setIsTrainingWeakestChars={setIsTrainingWeakestChars}
            setIsTurboPace={setIsTurboPace}
            setIsTimedTest={setIsTimedTest}
            setSentenceSize={setSentenceSize}
            setTimeLimit={setTimeLimit}
            setTestInfo={setTestInfo}
            keyTimeMap={keyTimeMap}
            correctChars={correctChars}
            mistakes={mistakes}
            fixedSentenceSize={fixedSentenceSize}
            programmingLanguage={programmingLanguage}
            isTimedTest={isTimedTest}
            isTrainingWeakestChars={isTrainingWeakestChars}
            isTurboPace={isTurboPace}
            timeLimit={timeLimit}
            punctuation={punctuation}
            numbers={numbers}
            sentenceSize={sentenceSize}
            slowestKeys={slowestKeys}
            language={language}
            idealWPM={idealWPM}
            setIdealWPM={setIdealWPM}
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
                currentWPM +
                Number(isTrainingWeakestChars) +
                Number(isTurboPace) +
                idealWPM
              }
              programmingLanguage={programmingLanguage}
              punctuation={punctuation}
              language={language}
              sentenceSize={sentenceSize}
              numbers={numbers}
              isTimedTest={isTimedTest}
              testInfo={testInfo}
              startTime={startTime}
              setTestInfo={setTestInfo}
              setCurrentWPM={() => {}} // handled in hook
              isTrainingWeakestChars={isTrainingWeakestChars}
              isTurboPace={isTurboPace}
              previousScore={previousScore}
              previousWPM={previousWPM}
              previousAccuracy={previousAccuracy}
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
              slowestKeys={slowestKeys}
              setIsResultsModalOpen={setIsResultsModalOpen}
              setResetCounter={setResetCounter}
              idealWPM={idealWPM}
            />
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};
