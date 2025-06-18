import { Language, ProgrammingLanguage } from "../types/words.type";
import { Box, Button, ButtonGroup, Option, Select } from "@mui/joy";
type Props = {
  setPunctuation: React.Dispatch<React.SetStateAction<boolean>>;
  setNumbers: React.Dispatch<React.SetStateAction<boolean>>;
  setProgrammingLanguage: React.Dispatch<React.SetStateAction<boolean>>;
  setLanguage: React.Dispatch<React.SetStateAction<number>>;
  setIsFixedSentenceSize: React.Dispatch<React.SetStateAction<boolean>>;
  setTime: React.Dispatch<React.SetStateAction<boolean>>;
  setSentenceSize: React.Dispatch<React.SetStateAction<number>>;
  setTimeLimit: React.Dispatch<React.SetStateAction<number>>;
  punctuation: boolean;
  programmingLanguage: boolean;
  numbers: boolean;
  sentenceSize: number;
  fixedSentenceSize: boolean;
  timeLimit: number;
  time: boolean;
  language: Language;
};
export const MainOptionsBar = ({
  setPunctuation,
  setNumbers,
  setProgrammingLanguage,
  setLanguage,
  setIsFixedSentenceSize,
  setTime,
  setSentenceSize,
  setTimeLimit,
  sentenceSize,
  programmingLanguage,
  punctuation,
  numbers,
  fixedSentenceSize,
  timeLimit,
  time,
  language,
}: Props) => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Button
          variant="plain"
          sx={(theme) => ({
            color: punctuation
              ? `${theme.vars.palette.primary[50]}`
              : `${theme.vars.palette.neutral[100]}`,
            ":hover": {
              color: punctuation
                ? `${theme.vars.palette.primary[50]}`
                : `${theme.vars.palette.neutral[100]}`,
            },
          })}
          onClick={() => setPunctuation((punctuation) => !punctuation)}
        >
          punctuation
        </Button>
        <Button
          variant="plain"
          sx={(theme) => ({
            color: numbers
              ? `${theme.vars.palette.primary[50]}`
              : `${theme.vars.palette.neutral[100]}`,
            ":hover": {
              color: numbers
                ? `${theme.vars.palette.primary[50]}`
                : `${theme.vars.palette.neutral[100]}`,
            },
          })}
          onClick={() => {
            setNumbers((numbers) => !numbers);
          }}
        >
          numbers
        </Button>
        <Button
          sx={(theme) => ({
            color: time
              ? `${theme.vars.palette.primary[50]}`
              : `${theme.vars.palette.neutral[100]}`,
            ":hover": {
              color: time
                ? `${theme.vars.palette.primary[50]}`
                : `${theme.vars.palette.neutral[100]}`,
            },
          })}
          onClick={() => {
            setIsFixedSentenceSize((fixedSentenceSize) => !fixedSentenceSize);
            setTime((time) => !time);
          }}
          variant="plain"
        >
          time
        </Button>
        <Button
          sx={(theme) => ({
            color: fixedSentenceSize
              ? `${theme.vars.palette.primary[50]}`
              : `${theme.vars.palette.neutral[100]}`,
            ":hover": {
              color: fixedSentenceSize
                ? `${theme.vars.palette.primary[50]}`
                : `${theme.vars.palette.neutral[100]}`,
            },
          })}
          onClick={() => {
            setIsFixedSentenceSize((fixedSentenceSize) => !fixedSentenceSize);
            setTime((time) => !time);
          }}
          variant="plain"
        >
          fixed sentence size
        </Button>
        {fixedSentenceSize && (
          <ButtonGroup>
            <Button
              variant="plain"
              sx={(theme) => ({
                color:
                  sentenceSize === 10
                    ? `${theme.vars.palette.primary[50]}`
                    : `${theme.vars.palette.neutral[100]}`,
                ":hover": {
                  color:
                    sentenceSize === 10
                      ? `${theme.vars.palette.primary[50]}`
                      : `${theme.vars.palette.neutral[100]}`,
                },
              })}
              onClick={() => setSentenceSize(10)}
            >
              10
            </Button>
            <Button
              variant="plain"
              sx={(theme) => ({
                color:
                  sentenceSize === 25
                    ? `${theme.vars.palette.primary[50]}`
                    : `${theme.vars.palette.neutral[100]}`,
                ":hover": {
                  color:
                    sentenceSize === 25
                      ? `${theme.vars.palette.primary[50]}`
                      : `${theme.vars.palette.neutral[100]}`,
                },
              })}
              onClick={() => setSentenceSize(25)}
            >
              25
            </Button>
            <Button
              variant="plain"
              sx={(theme) => ({
                color:
                  sentenceSize === 50
                    ? `${theme.vars.palette.primary[50]}`
                    : `${theme.vars.palette.neutral[100]}`,
                ":hover": {
                  color:
                    sentenceSize === 50
                      ? `${theme.vars.palette.primary[50]}`
                      : `${theme.vars.palette.neutral[100]}`,
                },
              })}
              onClick={() => setSentenceSize(50)}
            >
              50
            </Button>
          </ButtonGroup>
        )}
        {time && (
          <ButtonGroup>
            <Button
              variant="plain"
              sx={(theme) => ({
                color:
                  timeLimit === 10
                    ? `${theme.vars.palette.primary[50]}`
                    : `${theme.vars.palette.neutral[100]}`,
                ":hover": {
                  color:
                    timeLimit === 10
                      ? `${theme.vars.palette.primary[50]}`
                      : `${theme.vars.palette.neutral[100]}`,
                },
              })}
              onClick={() => setTimeLimit(10)}
            >
              10
            </Button>
            <Button
              variant="plain"
              sx={(theme) => ({
                color:
                  timeLimit === 30
                    ? `${theme.vars.palette.primary[50]}`
                    : `${theme.vars.palette.neutral[100]}`,
                ":hover": {
                  color:
                    timeLimit === 30
                      ? `${theme.vars.palette.primary[50]}`
                      : `${theme.vars.palette.neutral[100]}`,
                },
              })}
              onClick={() => setTimeLimit(30)}
            >
              30
            </Button>
            <Button
              variant="plain"
              sx={(theme) => ({
                color:
                  timeLimit === 60
                    ? `${theme.vars.palette.primary[50]}`
                    : `${theme.vars.palette.neutral[100]}`,
                ":hover": {
                  color:
                    timeLimit === 60
                      ? `${theme.vars.palette.primary[50]}`
                      : `${theme.vars.palette.neutral[100]}`,
                },
              })}
              onClick={() => setTimeLimit(60)}
            >
              60
            </Button>
          </ButtonGroup>
        )}
        <Button
          variant="plain"
          sx={(theme) => ({
            color: programmingLanguage
              ? `${theme.vars.palette.primary[50]}`
              : `${theme.vars.palette.neutral[100]}`,
            ":hover": {
              color: programmingLanguage
                ? `${theme.vars.palette.primary[50]}`
                : `${theme.vars.palette.neutral[100]}`,
            },
          })}
          onClick={() => setProgrammingLanguage((programming) => !programming)}
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
