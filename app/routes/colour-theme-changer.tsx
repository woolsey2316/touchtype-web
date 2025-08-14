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
import { useTheme } from "@mui/joy/styles";
import { Language, ProgrammingLanguage } from "../types/words.type";
import { MainOptionsBar } from "../components/main-options-bar";
import { CurrentWPM } from "../components/current-wpm";
import { ColourThemeSettings } from "../components/modal/colour-theme-settings";
import { OpenModalButton } from "../components/open-modal-button";
import { Cursor } from "../components/cursor";
import { WordsToType } from "../components/words-to-type";
import { ProgressCircleIcon } from "../icons/progress-circle";
import WPMIcon from "../icons/wpm";
import BullseyeIcon from "../icons/bullseye";
import ScoreIcon from "../icons/score";
import { addPlus } from "../utils/util";
import { BarChart } from "@mui/x-charts";

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
  const [currentWPM] = useState(55.1);
  const [isModalOpen, setIsResultsModalOpen] = useState(true);
  const { mode } = useColorScheme();
  const [words] = useState<string>("correct incorrect still to type");
  const theme = useTheme();
  const colourOfChar = [
    `${theme.vars.palette.success.plainColor}`,
    `${theme.vars.palette.success.plainColor}`,
    `${theme.vars.palette.success.plainColor}`,
    `${theme.vars.palette.success.plainColor}`,
    `${theme.vars.palette.success.plainColor}`,
    `${theme.vars.palette.success.plainColor}`,
    `${theme.vars.palette.success.plainColor}`,
    `${theme.vars.palette.success.plainColor}`,
    `${theme.vars.palette.danger.plainColor}`,
    `${theme.vars.palette.danger.plainColor}`,
    `${theme.vars.palette.danger.plainColor}`,
    `${theme.vars.palette.danger.plainColor}`,
    `${theme.vars.palette.danger.plainColor}`,
    `${theme.vars.palette.danger.plainColor}`,
    `${theme.vars.palette.danger.plainColor}`,
    `${theme.vars.palette.danger.plainColor}`,
    `${theme.vars.palette.danger.plainColor}`,
    `${theme.vars.palette.danger.plainColor}`,
    `${theme.vars.palette.neutral[500]}`,
    `${theme.vars.palette.neutral[500]}`,
    `${theme.vars.palette.neutral[500]}`,
    `${theme.vars.palette.neutral[500]}`,
    `${theme.vars.palette.neutral[500]}`,
    `${theme.vars.palette.neutral[500]}`,
    `${theme.vars.palette.neutral[500]}`,
    `${theme.vars.palette.neutral[500]}`,
    `${theme.vars.palette.neutral[500]}`,
    `${theme.vars.palette.neutral[500]}`,
    `${theme.vars.palette.neutral[500]}`,
    `${theme.vars.palette.neutral[500]}`,
    `${theme.vars.palette.neutral[500]}`,
    `${theme.vars.palette.neutral[500]}`,
    `${theme.vars.palette.neutral[500]}`,
    `${theme.vars.palette.neutral[500]}`,
    `${theme.vars.palette.neutral[500]}`,
    `${theme.vars.palette.neutral[500]}`,
  ];
  const currentAccuracy = 90;
  const currentScore = 2025;
  const timeSpent = 5.2;
  const wpmDelta = +2.7;
  const accDelta = +1.8;
  const scoreDelta = -1920;
  const keyArray = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  const timeArray = [
    450, 430, 400, 350, 350, 300, 250, 250, 240, 235, 230, 220, 210, 200, 200,
    200, 180, 175, 160, 150, 150, 150, 140, 138, 120, 120, 100, 100,
  ];

  const childInputRef = useRef<HTMLDivElement>(null);
  // Function to focus the typing panel
  const focusChild = () => {
    childInputRef.current && childInputRef.current.focus();
  };
  const cursorIndices = [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [0, 5],
    [0, 6],
    [0, 7],
    [1, 0],
    [1, 1],
    [1, 2],
    [1, 3],
    [1, 4],
    [1, 5],
    [1, 6],
    [1, 7],
    [1, 8],
    [1, 9],
    [1, 10],
    [1, 11],
    [1, 12],
    [1, 13],
    [1, 14],
    [1, 15],
    [1, 16],
    [1, 17],
    [1, 18],
    [1, 19],
    [1, 20],
    [1, 21],
    [1, 22],
    [1, 23],
    [1, 24],
    [1, 25],
    [1, 26],
    [1, 27],
  ];
  return (
    <>
      <ColourThemeSettings
        isModalOpen={isModalOpen}
        setIsResultsModalOpen={setIsResultsModalOpen}
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
              setTimeInfo={() => {}}
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
                  gap: "14px",
                  fontFamily: "Courier",
                  fontSize: 24,
                  outline: "none",
                  width: "600px",
                })}
                ref={childInputRef}
                tabIndex={0}
              >
                <Cursor left={"-10px"} top={"0px"} />
                <WordsToType
                  validCursorIndices={cursorIndices}
                  colourOfChar={colourOfChar}
                  words={words}
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
        {/* Results Modal UI */}
        <Typography level="h2" sx={{ mb: 2, mt: 4 }}>
          Results Modal
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "22px",
            justifyContent: "space-between",
            width: "796px",
            backgroundColor: (theme) => theme.palette.neutral[900],
            p: 4,
            borderRadius: "8px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "22px",
              justifyContent: "space-between",
            }}
          >
            {/* WPM */}
            <Box
              sx={{
                bgcolor: (theme) => theme.palette.neutral[700],
                borderRadius: "20px",
                padding: "14px",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "start",
                position: "relative",
              }}
            >
              <WPMIcon />
              <Typography
                level="body-xs"
                sx={{ fontSize: "18px", mt: 1.5, mb: 0.5 }}
              >
                WPM
              </Typography>
              <Typography level="h2" sx={{ fontWeight: 700 }}>
                {Math.round(currentWPM * 10) / 10}
              </Typography>
              <Typography
                level="body-xs"
                sx={{
                  fontSize: "14px",
                  color:
                    wpmDelta >= 0
                      ? theme.vars.palette.success.plainColor
                      : theme.vars.palette.danger.plainColor,
                }}
              >
                {addPlus(wpmDelta)}
              </Typography>
            </Box>
            {/* Accuracy */}
            <Box
              sx={{
                bgcolor: (theme) => theme.palette.neutral[700],
                borderRadius: "20px",
                padding: "14px",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "start",
                position: "relative",
              }}
            >
              <BullseyeIcon />
              <Typography level="body-xs" sx={{ fontSize: "18px", my: 0.5 }}>
                Accuracy
              </Typography>
              <Typography level="h2" sx={{ fontWeight: 700 }}>
                {Math.round(currentAccuracy * 10) / 10}%
              </Typography>
              <Typography
                level="body-xs"
                sx={{
                  fontSize: "14px",
                  color:
                    accDelta >= 0
                      ? theme.vars.palette.success.plainColor
                      : theme.vars.palette.danger.plainColor,
                }}
              >
                {addPlus(accDelta)}%
              </Typography>
            </Box>
            {/* Score */}
            <Box
              sx={{
                bgcolor: (theme) => theme.palette.neutral[700],
                borderRadius: "20px",
                padding: "14px",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "start",
                position: "relative",
              }}
            >
              <ScoreIcon />
              <Typography
                level="body-xs"
                sx={{ fontSize: "18px", mt: 0, mb: 0.25 }}
              >
                Score
              </Typography>
              <Typography level="h2" sx={{ fontWeight: 700 }}>
                {Math.round(currentScore)}
              </Typography>
              <Typography
                level="body-xs"
                sx={{
                  fontSize: "14px",
                  color:
                    scoreDelta >= 0
                      ? theme.vars.palette.success.plainColor
                      : theme.vars.palette.danger.plainColor,
                }}
              >
                {addPlus(scoreDelta)}
              </Typography>
            </Box>
            {/* Time Spent */}
            <Box
              sx={{
                bgcolor: (theme) => theme.palette.neutral[700],
                borderRadius: "20px",
                padding: "14px",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "start",
              }}
            >
              <ProgressCircleIcon
                progress={(timeSpent / 15) * 100}
                sx={{
                  width: "70px",
                  height: "70px",
                }}
              />
              <Typography
                level="body-xs"
                sx={{ fontSize: "18px", mt: 0.5, mb: 0.3 }}
              >
                Daily Time
              </Typography>
              <Typography level="h2" sx={{ fontWeight: 700 }}>
                {Math.round(currentScore)}m
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              bgcolor: (theme) => theme.palette.neutral[700],
              borderRadius: "20px",
              padding: "10px",
            }}
          >
            <BarChart
              title="Key Press Times"
              colors={[theme.vars.palette.primary[800]]}
              xAxis={[{ label: "Keys", data: keyArray }]}
              yAxis={[{ label: "Average Time (ms)" }]}
              series={[{ data: timeArray }]}
              height={300}
            ></BarChart>
          </Box>
        </Box>
      </Container>
      <Box
        sx={{
          position: "fixed",
          right: 10,
          bottom: 10,
          zIndex: 1000,
        }}
      >
        <OpenModalButton
          setIsResultsModalOpen={setIsResultsModalOpen}
        ></OpenModalButton>
      </Box>
    </>
  );
};
