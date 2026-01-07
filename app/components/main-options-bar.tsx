import { Language } from "../types/words.type";
import { Box, Button, Option, Select } from "@mui/joy";
import { ButtonMainMenu } from "./button-main-menu";
type Props = {
  setPunctuation: React.Dispatch<React.SetStateAction<boolean>>;
  setNumbers: React.Dispatch<React.SetStateAction<boolean>>;
  setProgrammingLanguage: React.Dispatch<React.SetStateAction<boolean>>;
  setLanguage: React.Dispatch<React.SetStateAction<number>>;
  setIsFixedSentenceSize: React.Dispatch<React.SetStateAction<boolean>>;
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
};
export const MainOptionsBar = ({
  setPunctuation,
  setNumbers,
  setProgrammingLanguage,
  setLanguage,
  setIsFixedSentenceSize,
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
  language,
}: Props) => {
  function resetTestStats() {
    keyTimeMap.current = {};
    correctChars.current = 0;
    mistakes.current = 0;
  }
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
              marginY: "10px",
              marginX: "8px",
              height: "12px",
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
          punctuation
        </Button>
        <Box
          sx={(theme) => ({
            borderRight: `1px solid ${theme.palette.neutral[400]}`,
            marginY: "12px",
            height: "14px",
          })}
        ></Box>

        {isTimedTest && (
          <Box sx={{ marginLeft: "10px" }}>
            <Button
              variant="plain"
              sx={(theme) => ({
                fontSize: "16px",
                padding: "6px",
                height: "18px",
                minheight: "18px",
                color:
                  timeLimit === 10
                    ? `${theme.vars.palette.primary.plainColor}`
                    : `${theme.vars.palette.neutral[100]}`,
                ":hover": {
                  color:
                    timeLimit === 10
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
                  setTimeLimit(10);
                }
              }}
            >
              10
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
        )}
        {fixedSentenceSize && (
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
        )}
      </Box>
    </Box>
  );
};
