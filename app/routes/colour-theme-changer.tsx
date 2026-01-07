/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import {
  Box,
  Card,
  CardContent,
  Container,
  Typography,
  useColorScheme,
  Select,
  Option,
  Switch,
} from "@mui/joy";
import { SettingsButton } from "../components/button-settings";
import { useState, useRef, useEffect, type JSX } from "react";
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
import { addPlusIfPositive } from "../utils/display";
import { ChartContainer } from "@mui/x-charts/ChartContainer";
import { BarPlot } from "@mui/x-charts/BarChart";
import { LinePlot } from "@mui/x-charts/LineChart";
import {
  ChartsXAxis,
  ChartsYAxis,
  ChartsTooltip,
  ChartsReferenceLine,
} from "@mui/x-charts";
import Divider from "@mui/joy/Divider";

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
  const [cursorIndex] = useState(18);
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
    200, 180, 175, 160, 150, 150, 150, 140, 138, 120, 120,
  ];

  const childInputRef = useRef<HTMLDivElement>(null);
  // Function to focus the typing panel
  const focusChild = () => {
    if (childInputRef.current) {
      childInputRef.current.focus();
    }
  };
  // handlers and state for settings page
  const [fontFamily, setFontFamily] = useState<string>(
    () => window.localStorage.getItem("fontFamily") || "0xProtoNerdFont-Bold",
  );
  const [zipperEnabled] = useState<boolean>(() =>
    window.localStorage.getItem("zipperEnabled") === "false" ? false : true,
  );
  const [spaceChar] = useState<string>(
    () => window.localStorage.getItem("spaceChar") ?? " ",
  );
  const [cursorChar] = useState<string>(
    () => window.localStorage.getItem("cursorChar") ?? "|",
  );
  const [smoothCursor] = useState<boolean>(() =>
    window.localStorage.getItem("smoothCursor") === "false" ? false : true,
  );
  // display preview text state
  const [sampleWords] = useState<string>("sample text for preview purposes");
  const [coloursOfChar, setColourOfChar] = useState(
    Array(words.length).fill(""),
  );
  const [cursorsIndex, setCursorsIndex] = useState<number>(0);

  useEffect(() => {
    const myFunction = () => {
      setCursorsIndex((prevIndex) => (prevIndex + 1) % sampleWords.length);
      setColourOfChar((prevColours: string[]) => {
        let newColours = [...prevColours];
        const nextIndex = cursorsIndex;
        if (cursorsIndex === 0) {
          newColours = Array(sampleWords.length).fill("");
        }
        newColours[nextIndex] = theme.vars.palette.success.plainColor;
        return newColours;
      });
    };

    // Set up the interval
    const intervalId = setInterval(myFunction, 800);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [sampleWords, setCursorsIndex, cursorsIndex, theme, setColourOfChar]);

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
          <Typography
            sx={{ mb: 2, fontSize: "36px" }}
            level="h2"
            color="primary"
          >
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
              setTestInfo={() => {}}
              keyTimeMap={{ current: {} }}
              correctChars={{ current: 0 }}
              mistakes={{ current: 0 }}
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
                <Cursor
                  letters={document.getElementsByClassName("letter")}
                  cursorIndex={cursorIndex}
                />
                <WordsToType colourOfChar={colourOfChar} words={words} />
              </Box>
            </CardContent>
          </Card>
        </Box>
        {/* Results Modal UI */}
        <Typography sx={{ mb: 2 }} level="h2">
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
              <WPMIcon
                sx={{
                  width: "60px",
                  height: "38px",
                  marginTop: "16px",
                  marginBottom: "2px",
                }}
              />
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
                {addPlusIfPositive(wpmDelta)}
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
                {addPlusIfPositive(accDelta)}%
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
                {addPlusIfPositive(scoreDelta)}
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
                {Math.round(timeSpent)}m
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
            <ChartContainer
              title="Key Press Times"
              colors={[
                theme.vars.palette.primary[800],
                theme.vars.palette.primary[300],
              ]}
              xAxis={[{ scaleType: "band", label: "Keys", data: keyArray }]}
              yAxis={[{ label: "Average Time (ms)" }]}
              height={300}
              series={[
                {
                  type: "bar",
                  data: Array.isArray(timeArray) ? timeArray : [],
                },
              ]}
            >
              <BarPlot />
              <LinePlot />
              <ChartsReferenceLine
                y={240}
                label={"Average: " + Math.round(240)}
                lineStyle={{
                  stroke: theme.vars.palette.primary[300],
                  strokeDasharray: "5 5",
                }}
                labelStyle={{ marginLeft: "100px" }}
              />
              <ChartsXAxis />
              <ChartsYAxis />
              <ChartsTooltip />
            </ChartContainer>
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
      <Container sx={{ py: 2 }}>
        <Typography sx={{ mb: 2 }} level="h2">
          Typing Settings
        </Typography>
        <Typography sx={{ mb: 2 }} level="body-md">
          Adjust the typing behaviour and visual cues. Settings are saved
          locally
        </Typography>
        <Box
          sx={{
            mb: 2,
            bgcolor: theme.vars.palette.grey[600],
            color: theme.vars.palette.text.secondary,
            borderRadius: "8px",
            p: 2,
          }}
        >
          <Typography component="h3">Preview</Typography>
          <Box
            p={4}
            sx={{
              fontFamily: "Courier",
              fontSize: "24px",
              position: "relative",
            }}
          >
            <Cursor
              letters={document.getElementsByClassName("secondWordBox")}
              cursorIndex={cursorsIndex}
              sx={{ height: "53px" }}
            />
            <WordsToType
              additionalClasses="secondWordBox"
              colourOfChar={coloursOfChar}
              words={sampleWords}
            />
          </Box>
          <Divider
            sx={{ backgroundColor: theme.vars.palette.grey[700], my: 2 }}
          />
          <Typography
            component="label"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 1,
            }}
          >
            <span style={{ fontWeight: "bold" }}>Font Family</span>
          </Typography>
          <Select
            onChange={(
              _event:
                | React.MouseEvent<Element, MouseEvent>
                | React.KeyboardEvent
                | React.FocusEvent<Element, Element>
                | null,
              value,
            ) => {
              setFontFamily(value ?? "0xProtoNerdFont-Bold");
            }}
            defaultValue={"0xProtoNerdFont-Bold"}
            placeholder="Select a font"
            renderValue={(selected) => {
              return <Box>{selected?.label ?? "Select a language"}</Box>;
            }}
            value={fontFamily}
            sx={{
              marginLeft: "10px",
              marginTop: "10px",
              width: "300px",
              border: "none",
              borderRadius: "50px",
            }}
          >
            <Option value={"0xProtoNerdFont-Bold"}>0xProtoNerdFont-Bold</Option>
          </Select>
          <Divider
            sx={{ backgroundColor: theme.vars.palette.grey[700], my: 2 }}
          />
          <Typography
            component="label"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: 1,
            }}
          >
            <span style={{ fontWeight: "bold" }}>Zipper Animation</span>
            <span>
              When successfully typing a character it fades out with an
              animation
            </span>
          </Typography>
          <Switch
            sx={{ alignSelf: "start", mt: 2, ml: 2 }}
            checked={zipperEnabled}
          />
          <Divider
            sx={{ backgroundColor: theme.vars.palette.grey[700], my: 2 }}
          />
          <Typography
            component="label"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 1,
            }}
          >
            <span style={{ fontWeight: "bold" }}>Cursor Animation</span>
            <span>Cursor smoothly slides to the right between characters</span>
          </Typography>
          <Switch
            sx={{ alignSelf: "flex-start", ml: 2, mt: 2 }}
            checked={smoothCursor}
          />

          <Divider
            sx={{ backgroundColor: theme.vars.palette.grey[700], my: 2 }}
          />
          <Box>
            <Typography
              component="label"
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 1,
              }}
            >
              <span style={{ fontWeight: "bold" }}>Space Character</span>
              <span>displays a visible character for space</span>
            </Typography>
            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
              <SettingsButton
                selectedValue={spaceChar}
                handleClick={() => {}}
                value="·"
              >
                ·
              </SettingsButton>
              <SettingsButton
                handleClick={() => {}}
                selectedValue={spaceChar}
                value="␣"
              >
                ␣
              </SettingsButton>
              <SettingsButton
                handleClick={() => {}}
                selectedValue={spaceChar}
                value=" "
              >
                empty
              </SettingsButton>
            </Box>
          </Box>
          <Divider
            sx={{ backgroundColor: theme.vars.palette.grey[700], my: 2 }}
          />
          <Box>
            <Typography
              component="label"
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 1,
              }}
            >
              <span style={{ fontWeight: "bold" }}>Cursor Character</span>
              <span>Change the cursor style</span>
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", gap: 2, mt: 2 }}>
              <SettingsButton
                selectedValue={cursorChar}
                handleClick={() => {}}
                value="|"
              >
                |
              </SettingsButton>
              <SettingsButton
                handleClick={() => {}}
                selectedValue={cursorChar}
                value="_"
              >
                _
              </SettingsButton>
              <SettingsButton
                handleClick={() => {}}
                selectedValue={cursorChar}
                value="▊"
              >
                ▊
              </SettingsButton>
              <SettingsButton
                handleClick={() => {}}
                selectedValue={cursorChar}
                value="▯"
              >
                ▯
              </SettingsButton>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};
