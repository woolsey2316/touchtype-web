import { Language, ProgrammingLanguage } from "../types/words.type";
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
  punctuation: boolean;
  programmingLanguage: boolean;
  numbers: boolean;
  sentenceSize: number;
  fixedSentenceSize: boolean;
  started: boolean;
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
  sentenceSize,
  programmingLanguage,
  punctuation,
  numbers,
  fixedSentenceSize,
  started,
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
            transition: "color 0.3s ease",
            color: punctuation
              ? `${theme.vars.palette.primary.plainColor}`
              : `${theme.vars.palette.neutral[100]}`,
            ":hover": {
              color: punctuation
                ? `${theme.vars.palette.primary.plainColor}`
                : `${theme.vars.palette.primary.plainHoverColor}`,
            },
          })}
          onClick={() =>
            !started && setPunctuation((punctuation) => !punctuation)
          }
        >
          punctuation
        </Button>
        <Button
          variant="plain"
          sx={(theme) => ({
            transition: "color 0.3s ease",
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
            !started && setNumbers((numbers) => !numbers);
          }}
        >
          numbers
        </Button>
        <Box sx={{ color: "#fff", padding: "5px" }}>|</Box>
        <Box>
          <Button
            sx={(theme) => ({
              transition: "color 0.3s ease",
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
              if (!started) {
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
                  transition: "color 0.3s ease",
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
                onClick={() => !started && setTimeLimit(10)}
              >
                10
              </Button>
              <Button
                variant="plain"
                sx={(theme) => ({
                  transition: "color 0.3s ease",
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
                onClick={() => !started && setTimeLimit(30)}
              >
                30
              </Button>
              <Button
                variant="plain"
                sx={(theme) => ({
                  transition: "color 0.3s ease",
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
                onClick={() => !started && setTimeLimit(60)}
              >
                60
              </Button>
            </ButtonGroup>
          )}
        </Box>
        <Box>
          <Button
            sx={(theme) => ({
              transition: "color 0.3s ease",
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
              if (!started) {
                setIsFixedSentenceSize(true);
                setIsTimedTest(false);
              }
            }}
            variant="plain"
          >
            sentence size
          </Button>
          {fixedSentenceSize && (
            <ButtonGroup sx={{ justifyContent: "center" }}>
              <Button
                variant="plain"
                sx={(theme) => ({
                  fontSize: "11px",
                  transition: "color 0.3s ease",
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
                onClick={() => !started && setSentenceSize(15)}
              >
                15
              </Button>
              <Button
                variant="plain"
                sx={(theme) => ({
                  fontSize: "11px",
                  transition: "color 0.3s ease",
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
                onClick={() => !started && setSentenceSize(25)}
              >
                25
              </Button>
              <Button
                variant="plain"
                sx={(theme) => ({
                  fontSize: "11px",
                  transition: "color 0.3s ease",
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
                onClick={() => !started && setSentenceSize(50)}
              >
                50
              </Button>
            </ButtonGroup>
          )}
        </Box>
        <Box sx={{ color: "#fff", padding: "5px" }}>|</Box>
        <Button
          variant="plain"
          sx={(theme) => ({
            transition: "color 0.3s ease",
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
            if (!started) {
              if (programmingLanguage) setLanguage(0);
              setProgrammingLanguage((programming) => !programming);
            }
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
            placeholder="Select programming language"
            value={ProgrammingLanguage[language]}
            sx={{ marginLeft: "10px" }}
          >
            <Option value={Language.ENGLISH.toString()}>English</Option>
            <Option value={Language.REACT.toString()}>React</Option>
            <Option value={Language.ANGULAR.toString()}>Angular</Option>
            <Option value={Language.CPLUSPLUS.toString()}>C++</Option>
            <Option value={Language.JAVASCRIPT.toString()}>JavaScript</Option>
            <Option value={Language.JAVA.toString()}>Java</Option>
            <Option value={Language.C.toString()}>C</Option>
          </Select>
        )}
      </Box>
    </Box>
  );
};
