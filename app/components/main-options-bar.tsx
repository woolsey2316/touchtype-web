import { Language } from "../types/words.type";
import { Box, Button, ButtonGroup, Option, Select } from "@mui/joy";
type Props = {
  setPunctuation: React.Dispatch<React.SetStateAction<boolean>>;
  setNumbers: React.Dispatch<React.SetStateAction<boolean>>;
  setProgrammingLanguage: React.Dispatch<React.SetStateAction<boolean>>;
  setLanguage: React.Dispatch<React.SetStateAction<number>>;
  setIsFixedSentenceSize: React.Dispatch<React.SetStateAction<boolean>>;
  setIsTimedTest: React.Dispatch<React.SetStateAction<boolean>>;
  setSentenceSize: React.Dispatch<React.SetStateAction<number>>;
  setTimeLimit: React.Dispatch<React.SetStateAction<number>>;
  setTimeInfo: React.Dispatch<
    React.SetStateAction<{
      started: boolean;
      start: number | null;
      end: number | null;
      ended: boolean;
    }>
  >;
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
  setTimeInfo,
  sentenceSize,
  programmingLanguage,
  punctuation,
  numbers,
  fixedSentenceSize,
  timeLimit,
  isTimedTest,
  language,
}: Props) => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        <Button
          variant="plain"
          sx={(theme) => ({
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
              setTimeInfo((timeInfo) => ({
                ...timeInfo,
                started: false,
              }));
              setPunctuation((punctuation) => !punctuation);
            }
          }}
        >
          punctuation
        </Button>
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
              setTimeInfo((timeInfo) => ({
                ...timeInfo,
                started: false,
              }));

              setNumbers((numbers) => !numbers);
            }
          }}
        >
          numbers
        </Button>
        <Box
          sx={(theme) => ({
            color: theme.palette.neutral[100],
            padding: "5px",
          })}
        >
          |
        </Box>
        <Box>
          <Button
            sx={(theme) => ({
              color: isTimedTest
                ? `${theme.vars.palette.primary.plainColor}`
                : `${theme.vars.palette.neutral[100]}`,
              ":hover": {
                color: isTimedTest
                  ? `${theme.vars.palette.primary.plainColor}`
                  : `${theme.vars.palette.primary.plainHoverColor}`,
              },
            })}
            onClick={() => {
              setTimeInfo((timeInfo) => ({
                ...timeInfo,
                started: false,
              }));
              if (!programmingLanguage) {
                setIsFixedSentenceSize(false);
                setIsTimedTest(true);
              }
            }}
            variant="plain"
          >
            timed test
          </Button>
          {isTimedTest && (
            <ButtonGroup sx={{ justifyContent: "center" }}>
              <Button
                variant="plain"
                sx={(theme) => ({
                  fontSize: "11px",
                  padding: "8px",
                  height: "10px",
                  minHeight: "10px",
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
                  setTimeInfo((timeInfo) => ({
                    ...timeInfo,
                    started: false,
                  }));
                  setTimeLimit(10);
                }}
              >
                10
              </Button>
              <Button
                variant="plain"
                sx={(theme) => ({
                  fontSize: "11px",
                  padding: "8px",
                  height: "10px",
                  minHeight: "10px",
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
                  setTimeInfo((timeInfo) => ({
                    ...timeInfo,
                    started: false,
                  }));
                  setTimeLimit(30);
                }}
              >
                30
              </Button>
              <Button
                variant="plain"
                sx={(theme) => ({
                  fontSize: "11px",
                  padding: "8px",
                  height: "10px",
                  minHeight: "10px",
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
                  setTimeInfo((timeInfo) => ({
                    ...timeInfo,
                    started: false,
                  }));
                  setTimeLimit(60);
                }}
              >
                60
              </Button>
            </ButtonGroup>
          )}
        </Box>
        <Box>
          <Button
            sx={(theme) => ({
              color: fixedSentenceSize
                ? `${theme.vars.palette.primary.plainColor}`
                : `${theme.vars.palette.neutral[100]}`,
              ":hover": {
                color: fixedSentenceSize
                  ? `${theme.vars.palette.primary.plainColor}`
                  : `${theme.vars.palette.primary.plainHoverColor}`,
              },
            })}
            onClick={() => {
              setTimeInfo((timeInfo) => ({
                ...timeInfo,
                started: false,
              }));
              if (!programmingLanguage) {
                setIsFixedSentenceSize(true);
                setIsTimedTest(false);
              }
            }}
            variant="plain"
          >
            word size
          </Button>
          {fixedSentenceSize && (
            <ButtonGroup sx={{ justifyContent: "center" }}>
              <Button
                variant="plain"
                sx={(theme) => ({
                  fontSize: "11px",
                  padding: "8px",
                  height: "10px",
                  minHeight: "10px",
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
                  setTimeInfo((timeInfo) => ({
                    ...timeInfo,
                    started: false,
                  }));
                  setSentenceSize(15);
                }}
              >
                15
              </Button>
              <Button
                variant="plain"
                sx={(theme) => ({
                  fontSize: "11px",
                  padding: "8px",
                  height: "10px",
                  minHeight: "10px",
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
                  setTimeInfo((timeInfo) => ({
                    ...timeInfo,
                    started: false,
                  }));
                  setSentenceSize(25);
                }}
              >
                25
              </Button>
              <Button
                variant="plain"
                sx={(theme) => ({
                  fontSize: "11px",
                  padding: "8px",
                  height: "10px",
                  minHeight: "10px",
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
                  setTimeInfo((timeInfo) => ({
                    ...timeInfo,
                    started: false,
                  }));
                  setSentenceSize(50);
                }}
              >
                50
              </Button>
            </ButtonGroup>
          )}
        </Box>
        <Box
          sx={(theme) => ({
            color: theme.palette.neutral[100],
            padding: "5px",
          })}
        >
          |
        </Box>
        <Button
          variant="plain"
          sx={(theme) => ({
            color: programmingLanguage
              ? `${theme.vars.palette.primary.plainColor}`
              : `${theme.vars.palette.neutral[100]}`,
            ":hover": {
              color: programmingLanguage
                ? `${theme.vars.palette.primary.plainColor}`
                : `${theme.vars.palette.primary.plainHoverColor}`,
            },
          })}
          onClick={() => {
            setTimeInfo((timeInfo) => ({
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
        >
          programming language
        </Button>
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
  );
};
