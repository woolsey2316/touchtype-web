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
import { usePageEffect } from "../core/page";
import { Language, ProgrammingLanguage } from "../types/words.type";
import { MainOptionsBar } from "../components/main-options-bar";
import { LastWPM } from "../components/last-wpm";
import { ColourThemeSettings } from "../components/modal/colour-theme-settings";
import { OpenModalButton } from "../components/open-modal-button";
import { Cursor } from "../components/cursor";
import { WordsToType } from "../components/words-to-type";

export const Component = function Settings(): JSX.Element {
  usePageEffect({ title: "Colour Theme Changer" });
  /* state for typing test page*/
  const [punctuation, setPunctuation] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [programmingLanguage, setProgrammingLanguage] = useState(false);
  const [language, setLanguage] = useState<Language>(Language.ENGLISH);
  const [fixedSentenceSize, setIsFixedSentenceSize] = useState(true);
  const [isTimedTest, setIsTimedTest] = useState(false);
  const [sentenceSize, setSentenceSize] = useState(15);
  const [timeLimit, setTimeLimit] = useState(10);
  const [lastWPM] = useState(0);
  const [isModalOpen, setIsOpen] = useState(true);
  const [timeTestInfo] = useState<{
    started: boolean;
    start: number | null;
    end: number | null;
    ended: boolean;
  }>({ started: false, start: null, end: null, ended: false });
  const { mode } = useColorScheme();
  const [words] = useState<string>("correct incorrect still to type");
  const [colourOfChar] = useState<string[]>([
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "f",
    "f",
    "f",
    "f",
    "f",
    "f",
    "f",
    "f",
    "f",
    "f",
  ]);
  const childInputRef = useRef<HTMLDivElement>(null);
  // Function to focus the typing panel
  const focusChild = () => {
    childInputRef.current && childInputRef.current.focus();
  };
  return (
    <>
      <ColourThemeSettings
        isModalOpen={isModalOpen}
        setIsOpen={setIsOpen}
        mode={mode}
      ></ColourThemeSettings>
      <Container sx={{ py: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{ mb: 2 }} level="h2">
            Display Only
          </Typography>
          <Typography sx={{ mb: 2 }} level="h2" color="primary">
            10 s
          </Typography>
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
                  marginBottom: "1em",
                }}
              >
                {programmingLanguage && ProgrammingLanguage[language]}
              </Typography>
              <Box
                sx={(theme) => ({
                  color: `${theme.vars.palette.primary[100]}`,
                  display: "flex",
                  position: "relative",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: "14.41px",
                  fontFamily: "Courier",
                  fontSize: 24,
                  outline: "none",
                })}
                ref={childInputRef}
                tabIndex={0}
              >
                <Cursor left={"-10px"} top={"0px"} />
                <WordsToType colourOfChar={colourOfChar} words={words} />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
      <OpenModalButton setIsOpen={setIsOpen}></OpenModalButton>
    </>
  );
};
