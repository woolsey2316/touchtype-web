/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import {
  Box,
  Card,
  CardContent,
  Container,
  Typography,
  useColorScheme,
} from "@mui/joy";
import { useState, useRef, type JSX } from "react";
import TypingPanel from "../components/typing-panel";
import { usePageEffect } from "../core/page";
import { Language, ProgrammingLanguage } from "../types/words.type";
import { MainOptionsBar } from "../components/main-options-bar";
import { LastWPM } from "../components/last-wpm";
import CountdownTimer from "../components/countdown-timer";
import { ColourThemeSettings } from "../components/modal/colour-theme-settings";
export const Component = function Settings(): JSX.Element {
  usePageEffect({ title: "Settings" });
  /* state for typing test page*/
  const [punctuation, setPunctuation] = useState(false);
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
  const { mode } = useColorScheme();
  const childInputRef = useRef<HTMLDivElement>(null);
  // Function to focus the typing panel
  const focusChild = () => {
    childInputRef.current && childInputRef.current.focus();
  };
  /* state for settings page */
  return (
    <>
      <ColourThemeSettings mode={mode}></ColourThemeSettings>
      <Container sx={{ py: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{ mb: 2 }} level="h2">
            Typing Test
          </Typography>
          <CountdownTimer
            setTimeInfo={setTimeInfo}
            started={timeTestInfo.started}
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
              backgroundColor: `${theme.vars.palette.background.level3}`,
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
                  Number(isTimedTest)
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
                recordTest={false}
                childInputRef={childInputRef}
              />
            </CardContent>
          </Card>
        </Box>
      </Container>
    </>
  );
};
