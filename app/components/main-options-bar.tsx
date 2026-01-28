import { Language } from "../types/words.type";
import { Box, Button, Option, Select, Typography, Input } from "@mui/joy";
import { ButtonMainMenu } from "./button-main-menu";
import DumbellIcon from "../icons/dumbell";
import { useTheme } from "@mui/joy/styles";
import Tooltip from "@mui/joy/Tooltip";
import TimerIcon from "../icons/timer";
import { SlowestKeysResult } from "../hooks/useSlowestKeys";

type Props = {
  setPunctuation: React.Dispatch<React.SetStateAction<boolean>>;
  setNumbers: React.Dispatch<React.SetStateAction<boolean>>;
  setProgrammingLanguage: React.Dispatch<React.SetStateAction<boolean>>;
  setLanguage: React.Dispatch<React.SetStateAction<number>>;
  setIsFixedSentenceSize: React.Dispatch<React.SetStateAction<boolean>>;
  isTrainingWeakestChars: boolean;
  setIsTrainingWeakestChars: React.Dispatch<React.SetStateAction<boolean>>;
  setIsTurboPace: React.Dispatch<React.SetStateAction<boolean>>;
  isTurboPace: boolean;
  setIsTimedTest: React.Dispatch<React.SetStateAction<boolean>>;
  setSentenceSize: React.Dispatch<React.SetStateAction<number>>;
  setTimeLimit: React.Dispatch<React.SetStateAction<number>>;
  setTestInfo: React.Dispatch<
    React.SetStateAction<{
      started: boolean;
      ended: boolean;
    }>
  >;
  keyTimeMap: React.RefObject<Record<string, number[]>>;
  correctChars: React.RefObject<number>;
  mistakes: React.RefObject<number>;
  punctuation: boolean;
  programmingLanguage: boolean;
  numbers: boolean;
  sentenceSize: number;
  fixedSentenceSize: boolean;
  timeLimit: number;
  isTimedTest: boolean;
  language: Language;
  slowestKeys: SlowestKeysResult | null;
  idealWPM: number;
  setIdealWPM: React.Dispatch<React.SetStateAction<number>>;
};
export const MainOptionsBar = ({
  setPunctuation,
  setNumbers,
  setProgrammingLanguage,
  setLanguage,
  setIsFixedSentenceSize,
  setIsTrainingWeakestChars,
  setIsTurboPace,
  isTurboPace,
  setIsTimedTest,
  setSentenceSize,
  setTimeLimit,
  setTestInfo,
  keyTimeMap,
  correctChars,
  mistakes,
  sentenceSize,
  programmingLanguage,
  punctuation,
  numbers,
  fixedSentenceSize,
  timeLimit,
  isTimedTest,
  isTrainingWeakestChars,
  slowestKeys,
  language,
  idealWPM,
  setIdealWPM,
}: Props) => {
  function resetTestStats() {
    keyTimeMap.current = {};
    correctChars.current = 0;
    mistakes.current = 0;
  }
  const theme = useTheme();
  const determineFillColor = (isActive: boolean) => {
    return isActive ? theme.palette.primary[400] : theme.palette.text.icon;
  };
  const displaySlowestKeys = (
    punctuation: boolean,
    numbers: boolean,
    programmingLanguage: boolean,
    slowestKeys: SlowestKeysResult | null,
  ) => {
    if (!slowestKeys) {
      return "No data";
    }
    if (programmingLanguage) {
      return slowestKeys.symbols
        .map((item) => item.letter)
        .slice(0, 5)
        .join(" ");
    }
    if (punctuation && numbers) {
      return slowestKeys.symbols
        .concat(slowestKeys.numbers)
        .map((item) => item.letter)
        .slice(0, 10)
        .join(" ");
    }
    if (punctuation) {
      return slowestKeys.symbols
        .map((item) => item.letter)
        .slice(0, 5)
        .join(" ");
    }
    if (numbers) {
      return slowestKeys.numbers
        .map((item) => item.letter)
        .slice(0, 5)
        .join(" ");
    }
    return slowestKeys.lowercase
      .map((item) => item.letter)
      .slice(0, 5)
      .join(" ");
  };
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50px",
            backgroundColor: (theme) => theme.vars.palette.background.level3,
          }}
        >
          <Button
            variant="plain"
            sx={(theme) => ({
              color: numbers
                ? `${theme.vars.palette.primary.plainColor}`
                : `${theme.vars.palette.neutral[100]}`,
              ":hover": {
                color: numbers
                  ? `${theme.vars.palette.primary.plainColor}`
                  : `${theme.vars.palette.primary.plainHoverColor}`,
              },
            })}
            onClick={() => {
              if (!programmingLanguage) {
                setTestInfo((timeInfo) => ({
                  ...timeInfo,
                  started: false,
                }));

                resetTestStats();
                setNumbers((numbers) => !numbers);
              }
            }}
          >
            # numbers
          </Button>
          <Box
            sx={(theme) => ({
              borderRight: `1px solid ${theme.palette.neutral[400]}`,
              marginY: "12px",
              height: "14px",
            })}
          ></Box>
          <Button
            variant="plain"
            sx={(theme) => ({
              borderRadius: punctuation ? "8px" : "0px",
              color: punctuation
                ? `${theme.vars.palette.primary.plainColor}`
                : `${theme.vars.palette.neutral[100]}`,
              ":hover": {
                color: punctuation
                  ? `${theme.vars.palette.primary.plainColor}`
                  : `${theme.vars.palette.primary.plainHoverColor}`,
              },
            })}
            onClick={() => {
              if (!programmingLanguage) {
                setTestInfo((timeInfo) => ({
                  ...timeInfo,
                  started: false,
                }));
                resetTestStats();
                setPunctuation((punctuation) => !punctuation);
              }
            }}
          >
            <svg
              style={{ marginRight: "4px" }}
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              data-component-name="Type"
            >
              <path d="M12 4v16"></path>
              <path d="M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2"></path>
              <path d="M9 20h6"></path>
            </svg>
            punctuation & symbols
          </Button>
          <Box
            sx={(theme) => ({
              borderRight: `1px solid ${theme.palette.neutral[400]}`,
              marginY: "12px",
              height: "14px",
            })}
          ></Box>
          <ButtonMainMenu
            isActive={isTimedTest}
            handleClick={() => {
              if (!programmingLanguage) {
                resetTestStats();
                setTestInfo((timeInfo) => ({
                  ...timeInfo,
                  started: false,
                }));

                setIsFixedSentenceSize(false);
                setIsTimedTest(true);
                setSentenceSize(25);
              }
            }}
            name="timed test"
          ></ButtonMainMenu>
          <ButtonMainMenu
            isActive={fixedSentenceSize}
            handleClick={() => {
              if (!programmingLanguage) {
                setTestInfo((timeInfo) => ({
                  ...timeInfo,
                  started: false,
                }));
                resetTestStats();
                setIsFixedSentenceSize(true);
                setIsTimedTest(false);
              }
            }}
            name="words"
          ></ButtonMainMenu>
          <Box
            sx={(theme) => ({
              borderRight: `1px solid ${theme.palette.neutral[400]}`,
              marginY: "12px",
              height: "14px",
            })}
          ></Box>
          <ButtonMainMenu
            isActive={programmingLanguage}
            name="programming language"
            handleClick={() => {
              resetTestStats();
              setTestInfo((timeInfo) => ({
                ...timeInfo,
                started: false,
              }));
              if (!programmingLanguage) {
                setIsFixedSentenceSize(false);
                setIsTimedTest(false);
                setLanguage(Language.REACT);
                setSentenceSize(1);
              }
              if (programmingLanguage) {
                setLanguage(Language.ENGLISH);
                setSentenceSize(15);
              }
              setProgrammingLanguage((programming) => !programming);
            }}
          ></ButtonMainMenu>
          {programmingLanguage && (
            <Select
              onChange={(
                _event:
                  | React.MouseEvent<Element, MouseEvent>
                  | React.KeyboardEvent
                  | React.FocusEvent<Element, Element>
                  | null,
                value,
              ) => {
                setLanguage(Number(value));
              }}
              defaultValue={Language.REACT}
              placeholder="Select a programming language"
              renderValue={(selected) => {
                return <Box>{selected?.label ?? "Select a language"}</Box>;
              }}
              value={language}
              sx={{ marginLeft: "10px", minWidth: "150px" }}
            >
              <Option value={Language.REACT}>React</Option>
              <Option value={Language.ANGULAR}>Angular</Option>
              <Option value={Language.CPLUSPLUS}>C++</Option>
              <Option value={Language.JAVASCRIPT}>JavaScript</Option>
              <Option value={Language.TYPESCRIPT}>TypeScript</Option>
              <Option value={Language.JAVA}>Java</Option>
              <Option value={Language.C}>C</Option>
              <Option value={Language.PYTHON}>Python</Option>
              <Option value={Language.RUBY}>Ruby</Option>
              <Option value={Language.GO}>Go</Option>
              <Option value={Language.RUST}>Rust</Option>
              <Option value={Language.SWIFT}>Swift</Option>
            </Select>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          marginTop: "16px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Tooltip
          enterDelay={500}
          title="Focus on typing speed to the detriment of accuracy"
        >
          <Button
            onClick={() => setIsTurboPace((isTurboPace) => !isTurboPace)}
            variant="plain"
          >
            <TimerIcon
              sx={{
                height: "24px",
                width: "24px",
                fill: determineFillColor(isTurboPace),
              }}
            />
          </Button>
        </Tooltip>
        {isTurboPace && (
          <Input
            type="number"
            value={idealWPM}
            onChange={(e) => setIdealWPM(Number(e.target.value))}
            placeholder="WPM"
            sx={{
              marginLeft: "10px",
              marginRight: "10px",
              width: "125px",
              fontSize: "14px",
              backgroundColor: "transparent",
              color: theme.palette.text.primary,
            }}
            endDecorator={
              <Typography sx={{ fontSize: "14px" }}>WPM</Typography>
            }
            slotProps={{
              input: {
                min: 10,
                max: 300,
              },
            }}
          />
        )}
        <Box
          sx={(theme) => ({
            borderRight: `1px solid ${theme.palette.neutral[400]}`,
            marginY: "12px",
            height: "14px",
          })}
        ></Box>
        <Tooltip enterDelay={500} title="Train Weakest Characters">
          <Button
            onClick={() =>
              setIsTrainingWeakestChars(
                (isTrainingWeakestChars) => !isTrainingWeakestChars,
              )
            }
            variant="plain"
          >
            <DumbellIcon
              sx={{ fill: determineFillColor(isTrainingWeakestChars) }}
            />
          </Button>
        </Tooltip>

        {isTimedTest && (
          <>
            <Box
              sx={(theme) => ({
                borderRight: `1px solid ${theme.palette.neutral[400]}`,
                marginY: "12px",
                height: "14px",
              })}
            ></Box>
            <Box sx={{ marginLeft: "10px" }}>
              <Button
                variant="plain"
                sx={(theme) => ({
                  fontSize: "16px",
                  padding: "6px",
                  height: "18px",
                  minheight: "18px",
                  color:
                    timeLimit === 15
                      ? `${theme.vars.palette.primary.plainColor}`
                      : `${theme.vars.palette.neutral[100]}`,
                  ":hover": {
                    color:
                      timeLimit === 15
                        ? `${theme.vars.palette.primary.plainColor}`
                        : `${theme.vars.palette.primary.plainHoverColor}`,
                    backgroundColor: "transparent",
                  },
                })}
                onClick={() => {
                  if (!programmingLanguage) {
                    resetTestStats();
                    setTestInfo((timeInfo) => ({
                      ...timeInfo,
                      started: false,
                    }));
                    setTimeLimit(15);
                  }
                }}
              >
                15
              </Button>
              <Button
                variant="plain"
                sx={(theme) => ({
                  fontSize: "16px",
                  padding: "6px",
                  height: "18px",
                  minheight: "18px",
                  color:
                    timeLimit === 30
                      ? `${theme.vars.palette.primary.plainColor}`
                      : `${theme.vars.palette.neutral[100]}`,
                  ":hover": {
                    color:
                      timeLimit === 30
                        ? `${theme.vars.palette.primary.plainColor}`
                        : `${theme.vars.palette.primary.plainHoverColor}`,
                    backgroundColor: "transparent",
                  },
                })}
                onClick={() => {
                  if (!programmingLanguage) {
                    resetTestStats();
                    setTestInfo((timeInfo) => ({
                      ...timeInfo,
                      started: false,
                    }));
                    setTimeLimit(30);
                  }
                }}
              >
                30
              </Button>
              <Button
                variant="plain"
                sx={(theme) => ({
                  fontSize: "16px",
                  padding: "6px",
                  height: "18px",
                  minheight: "18px",
                  color:
                    timeLimit === 60
                      ? `${theme.vars.palette.primary.plainColor}`
                      : `${theme.vars.palette.neutral[100]}`,
                  ":hover": {
                    color:
                      timeLimit === 60
                        ? `${theme.vars.palette.primary.plainColor}`
                        : `${theme.vars.palette.primary.plainHoverColor}`,
                    backgroundColor: "transparent",
                  },
                })}
                onClick={() => {
                  if (!programmingLanguage) {
                    resetTestStats();
                    setTestInfo((timeInfo) => ({
                      ...timeInfo,
                      started: false,
                    }));
                    setTimeLimit(60);
                  }
                }}
              >
                60
              </Button>
            </Box>
          </>
        )}
        {fixedSentenceSize && (
          <>
            <Box
              sx={(theme) => ({
                borderRight: `1px solid ${theme.palette.neutral[400]}`,
                marginY: "12px",
                height: "14px",
              })}
            ></Box>
            <Box sx={{ marginLeft: "10px" }}>
              <Button
                variant="plain"
                sx={(theme) => ({
                  fontSize: "16px",
                  padding: "6px",
                  height: "18px",
                  minheight: "18px",
                  color:
                    sentenceSize === 15
                      ? `${theme.vars.palette.primary.plainColor}`
                      : `${theme.vars.palette.neutral[100]}`,
                  ":hover": {
                    color:
                      sentenceSize === 15
                        ? `${theme.vars.palette.primary.plainColor}`
                        : `${theme.vars.palette.primary.plainHoverColor}`,
                    backgroundColor: "transparent",
                  },
                })}
                onClick={() => {
                  if (!programmingLanguage) {
                    resetTestStats();
                    setTestInfo((timeInfo) => ({
                      ...timeInfo,
                      started: false,
                    }));
                    setSentenceSize(15);
                  }
                }}
              >
                15
              </Button>
              <Button
                variant="plain"
                sx={(theme) => ({
                  fontSize: "16px",
                  padding: "6px",
                  height: "18px",
                  minheight: "18px",
                  color:
                    sentenceSize === 25
                      ? `${theme.vars.palette.primary.plainColor}`
                      : `${theme.vars.palette.neutral[100]}`,
                  ":hover": {
                    color:
                      sentenceSize === 25
                        ? `${theme.vars.palette.primary.plainColor}`
                        : `${theme.vars.palette.primary.plainHoverColor}`,
                    backgroundColor: "transparent",
                  },
                })}
                onClick={() => {
                  if (!programmingLanguage) {
                    resetTestStats();
                    setTestInfo((timeInfo) => ({
                      ...timeInfo,
                      started: false,
                    }));
                    setSentenceSize(25);
                  }
                }}
              >
                25
              </Button>
              <Button
                variant="plain"
                sx={(theme) => ({
                  fontSize: "16px",
                  padding: "6px",
                  height: "18px",
                  minheight: "18px",
                  color:
                    sentenceSize === 50
                      ? `${theme.vars.palette.primary.plainColor}`
                      : `${theme.vars.palette.neutral[100]}`,
                  ":hover": {
                    color:
                      sentenceSize === 50
                        ? `${theme.vars.palette.primary.plainColor}`
                        : `${theme.vars.palette.primary.plainHoverColor}`,
                    backgroundColor: "transparent",
                  },
                })}
                onClick={() => {
                  if (!programmingLanguage) {
                    resetTestStats();
                    setTestInfo((timeInfo) => ({
                      ...timeInfo,
                      started: false,
                    }));
                    setSentenceSize(50);
                  }
                }}
              >
                50
              </Button>
            </Box>
          </>
        )}
      </Box>
      {isTrainingWeakestChars && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "12px",
          }}
        >
          <Typography sx={{ color: theme.palette.primary[400] }}>
            Weakest Characters -{" "}
          </Typography>
          <Typography sx={{ color: theme.palette.primary[400] }}>
            &nbsp;
            {displaySlowestKeys(
              punctuation,
              numbers,
              programmingLanguage,
              slowestKeys,
            )}
          </Typography>
        </Box>
      )}
    </Box>
  );
};
