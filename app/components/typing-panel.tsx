import * as React from "react";
import { Box } from "@mui/joy";
import {
  useState,
  useRef,
  useCallback,
  useContext,
  useMemo,
  type KeyboardEvent,
  useEffect,
} from "react";
import { useContainerDimensions } from "../hooks/useContainerDimensions";
import { WordsGenerator } from "../utils/wordsGenerator";
import { WordsToType } from "./words-to-type";
import { ResultsModal } from "./modal/results-modal";
import { getNextCharIndex, getPreviousCharIndex } from "../utils/word-position";
import { ThemeContext } from "../context/ThemeContext/ThemeContext";
import { UserPreferencesContext } from "../context/userPreferences";
import { Cursor } from "./cursor";
import {
  maybeScrollToNextLine,
  maybeScrollToPreviousLine,
} from "../utils/typing-panel";
import { useSlowestKeys } from "../hooks/useSlowestKeys";

export default function TypingPanel({
  programmingLanguage,
  punctuation,
  numbers,
  language,
  sentenceSize,
  testInfo,
  isTimedTest,
  isTrainingWeakestChars,
  isTurboPace,
  setTestInfo,
  onEnd,
  startTime,
  childInputRef,
  previousScore,
  previousWPM,
  previousAccuracy,
  currentWPM,
  currentAccuracy,
  currentScore,
  currentTime,
  correctChars,
  keyTimeMap,
  mistakes,
  setIsResultsModalOpen,
  isOpen,
  setResetCounter,
}: {
  programmingLanguage: boolean;
  punctuation: boolean;
  numbers: boolean;
  language: number;
  sentenceSize: number;
  childInputRef: React.RefObject<HTMLDivElement | null>;
  isTimedTest: boolean;
  isTrainingWeakestChars: boolean;
  isTurboPace: boolean;
  testInfo: {
    started: boolean;
    ended: boolean;
  };
  setTestInfo: React.Dispatch<
    React.SetStateAction<{
      started: boolean;
      ended: boolean;
    }>
  >;
  onEnd: () => void;
  startTime: React.RefObject<number | null>;
  setCurrentWPM: React.Dispatch<React.SetStateAction<number>>;
  previousScore: number | undefined;
  previousWPM: number | undefined;
  previousAccuracy: number | undefined;
  currentAccuracy: number;
  currentScore: number;
  currentWPM: number;
  currentTime: number;
  keyTimeMap: React.RefObject<Record<string, number[]>>;
  recordTest: boolean;
  mistakes: React.RefObject<number>;
  correctChars: React.RefObject<number>;
  isOpen: boolean;
  setIsResultsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setResetCounter: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { theme } = useContext(ThemeContext);
  const { skipOverTabs } = useContext(UserPreferencesContext);
  useEffect(() => {
    if (childInputRef?.current) {
      childInputRef?.current.focus();
    }
  }, [childInputRef]);
  const keyStartTime = useRef<number | null>(null);
  const [cursorIndex, setCursorIndex] = useState(0);
  const { slowestKeys } = useSlowestKeys();
  const generatedWords = useMemo(
    () =>
      WordsGenerator({
        count: sentenceSize,
        punctuation,
        numbers,
        language,
        programmingLanguage,
        isTrainingWeakestChars,
        weakestSymbols: slowestKeys?.symbols.map((item) => item.letter),
        weakestLowercaseChars: slowestKeys?.lowercase.map(
          (item) => item.letter,
        ),
        weakestNumbers: slowestKeys?.numbers.map((item) => item.letter),
      }),
    [
      sentenceSize,
      punctuation,
      numbers,
      language,
      programmingLanguage,
      isTrainingWeakestChars,
      slowestKeys,
    ],
  );

  const [words, setWords] = useState(generatedWords);
  // ["grey", "grey", "grey", ...]
  const [colourOfChar, setColourOfChar] = useState(
    Array(words.length).fill(theme.vars.palette.neutral[500]),
  );
  const [charIndex, setCharIndex] = useState(0);
  const { width } = useContainerDimensions(childInputRef!, words);

  const resetStatistics = useCallback(() => {
    mistakes.current = 0;
    correctChars.current = 0;
  }, [mistakes, correctChars]);

  const newCollectionOfWords = useCallback(() => {
    setWords(() => {
      const words = WordsGenerator({
        count: sentenceSize,
        punctuation,
        numbers,
        language,
        isTrainingWeakestChars,
        weakestSymbols: slowestKeys?.symbols.map((item) => item.letter),
        weakestLowercaseChars: slowestKeys?.lowercase.map(
          (item) => item.letter,
        ),
        weakestNumbers: slowestKeys?.numbers.map((item) => item.letter),
      });
      setColourOfChar(
        Array(words.length).fill(theme.vars.palette.neutral[500]),
      );
      return words;
    });
  }, [
    sentenceSize,
    punctuation,
    theme.vars.palette.neutral,
    numbers,
    language,
    isTrainingWeakestChars,
    slowestKeys,
  ]);

  const newTestPage = useCallback(() => {
    setCursorIndex(0);
    resetStatistics();
    newCollectionOfWords();
  }, [resetStatistics, newCollectionOfWords]);

  const fetchNewWords = useCallback(() => {
    childInputRef?.current?.scrollTo({ top: 0, left: 0 });
    setCursorIndex(0);
    setCharIndex(0);
    setWords(() => {
      const words = WordsGenerator({
        count: sentenceSize,
        punctuation,
        numbers,
        language,
      });
      setColourOfChar(
        Array(words.length).fill(theme.vars.palette.neutral[500]),
      );
      return words;
    });
  }, [
    childInputRef,
    sentenceSize,
    punctuation,
    numbers,
    language,
    theme.vars.palette.neutral,
  ]);

  const finishTest = useCallback(() => {
    onEnd();
    setIsResultsModalOpen(true);
    childInputRef?.current?.scrollTo({ top: 0, left: 0 });
    setCursorIndex(0);
    setCharIndex(0);
    setWords(() => {
      const words = WordsGenerator({
        count: sentenceSize,
        punctuation,
        numbers,
        language,
      });
      setColourOfChar(
        Array(words.length).fill(theme.vars.palette.neutral[500]),
      );
      return words;
    });
  }, [
    onEnd,
    setIsResultsModalOpen,
    sentenceSize,
    childInputRef,
    punctuation,
    numbers,
    language,
    theme.vars.palette.neutral,
  ]);

  useEffect(() => {
    if (cursorIndex === words.length) {
      if (isTimedTest) {
        fetchNewWords();
      } else {
        setTestInfo({
          ended: true,
          started: false,
        });
        finishTest();
      }
    }
  }, [
    cursorIndex,
    words,
    isTimedTest,
    fetchNewWords,
    setTestInfo,
    finishTest,
    theme.vars.palette.neutral,
  ]);

  function updateColourOfChar(index: number, color: string) {
    setColourOfChar((wordsResult) => {
      if (cursorIndex < words.length) {
        const newWordsResult = [...wordsResult];
        newWordsResult[index] = color;
        return newWordsResult;
      } else {
        return wordsResult;
      }
    });
  }

  function addCharacterPressTiming(
    e: KeyboardEvent<HTMLDivElement>,
    keyStartTime: React.RefObject<number | null>,
    keyTimeMap: React.RefObject<Record<string, number[]>>,
  ) {
    if (!keyTimeMap.current[e.key] && keyStartTime.current) {
      keyTimeMap.current[e.key] = [performance.now() - keyStartTime.current];
    } else if (keyStartTime.current) {
      keyTimeMap.current[e.key].push(performance.now() - keyStartTime.current);
    }
  }

  function removeCharacterFromState(cursorIndex: number) {
    if (
      colourOfChar[cursorIndex - 1] === theme.vars.palette.danger.plainColor
    ) {
      mistakes.current = Math.max(mistakes.current - 1, 0);
    } else {
      correctChars.current = Math.max(correctChars.current - 1, 0);
    }
  }

  function alreadyTyped(letter: Element) {
    return (
      (letter as HTMLElement).style.color !== theme.vars.palette.neutral[500]
    );
  }

  function removeWordFromState(currWord: HTMLCollection) {
    let letterCount = 0;

    for (const letter of currWord) {
      if (alreadyTyped(letter)) {
        letterCount++;
        if (
          (letter as HTMLElement).style.color ===
          theme.vars.palette.danger.plainColor
        ) {
          mistakes.current = Math.max(mistakes.current - 1, 0);
        } else {
          correctChars.current = Math.max(correctChars.current - 1, 0);
        }
      }
    }
    // if we are at the start of the word, delete space bar before the word
    if (letterCount === 0 && cursorIndex > 1) {
      const spaceChar =
        document?.getElementsByClassName("letter")[cursorIndex - 1];
      letterCount++;
      if (
        (spaceChar as HTMLElement).style.color ===
        theme.vars.palette.danger.plainColor
      ) {
        mistakes.current = Math.max(mistakes.current - 1, 0);
      } else {
        correctChars.current = Math.max(correctChars.current - 1, 0);
      }
    }
    return letterCount;
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    // this stops the result modal from closing when the user presses a key
    if (testInfo.ended) return;
    // if the test has not started, start it
    if (!testInfo.started) {
      setTestInfo((timeTestInfo) => ({
        ...timeTestInfo,
        started: true,
      }));
      startTime.current = performance.now();
    }
    // prevent scrollling when space is pressed
    if (e.key === " ") {
      e.preventDefault();
    }

    if (e.key === "Tab") {
      e.preventDefault();
    }
    if (
      e.key === "Shift" ||
      e.key === "F12" ||
      e.key === "Control" ||
      e.code === "MetaLeft" ||
      e.code === "MetaRight" ||
      e.altKey
    ) {
      return;
    }
    // when typing blazingly fast you may increment after the test finishes
    if (!words[charIndex]) return;
    if (e.key === "Enter" && words[charIndex] === "↵") {
      setColourOfChar((wordsResult) => {
        const newWordsResult = [...wordsResult];
        newWordsResult[charIndex] = !isTurboPace
          ? theme.vars.palette.success.plainColor
          : "transparent";
        return newWordsResult;
      });
      // Correct key pressed
      setCursorIndex((cursorIndex) => {
        const nextIndex = getNextCharIndex({
          charIndex: cursorIndex,
          words,
          skipOverTabs,
        });
        maybeScrollToNextLine(cursorIndex, childInputRef);
        return nextIndex;
      });

      setCharIndex((charIndex) =>
        getNextCharIndex({ charIndex, words, skipOverTabs }),
      );
      correctChars.current++;
    } else if (
      e.key === "Tab" &&
      (words[charIndex] === "\t" || words[charIndex] === "→")
    ) {
      setColourOfChar((wordsResult) => {
        const newWordsResult = [...wordsResult];
        newWordsResult[charIndex] = !isTurboPace
          ? theme.vars.palette.success.plainColor
          : "transparent";
        return newWordsResult;
      });
      // Correct key pressed
      setCursorIndex((cursorIndex) => {
        const nextIndex = getNextCharIndex({
          charIndex: cursorIndex,
          words,
          skipOverTabs,
        });
        maybeScrollToNextLine(cursorIndex, childInputRef);
        return nextIndex;
      });

      setCharIndex((charIndex) =>
        getNextCharIndex({ charIndex, words, skipOverTabs }),
      );
      correctChars.current++;
    } else if (e.key === words[charIndex]) {
      addCharacterPressTiming(e, keyStartTime, keyTimeMap);

      setColourOfChar((wordsResult) => {
        const newWordsResult = [...wordsResult];
        newWordsResult[charIndex] = !isTurboPace
          ? theme.vars.palette.success.plainColor
          : "transparent";
        return newWordsResult;
      });
      // Correct key pressed
      setCursorIndex((cursorIndex) => {
        const nextIndex = Math.min(cursorIndex + 1, words.length);
        return nextIndex;
      });

      setCharIndex((charIndex) =>
        getNextCharIndex({ charIndex, words, skipOverTabs }),
      );
      correctChars.current++;
    } else if (e.ctrlKey && e.key === "Backspace") {
      const currWord =
        document?.getElementsByClassName("letter")[cursorIndex]?.parentNode
          ?.children ?? ([] as unknown as HTMLCollection);
      const countDeleted = removeWordFromState(currWord);

      setCursorIndex((cursorIndex) => {
        for (let i = 0; i < countDeleted; i++) {
          updateColourOfChar(
            getPreviousCharIndex({ charIndex, words, skipOverTabs }) - i,
            theme.vars.palette.neutral[500],
          );
        }

        const previousIndex = Math.max(cursorIndex - countDeleted, 0);
        maybeScrollToPreviousLine(cursorIndex, childInputRef);
        return previousIndex;
      });
      setCharIndex((charIndex) => charIndex - countDeleted);
    } else if (e.key === "Backspace") {
      setCursorIndex((cursorIndex) => {
        removeCharacterFromState(cursorIndex);
        updateColourOfChar(
          getPreviousCharIndex({ charIndex, words, skipOverTabs }),
          theme.vars.palette.neutral[500],
        );
        const previousIndex = getPreviousCharIndex({
          charIndex: cursorIndex,
          words,
          skipOverTabs,
        });
        maybeScrollToPreviousLine(cursorIndex, childInputRef);
        return previousIndex;
      });
      setCharIndex(getPreviousCharIndex({ charIndex, words, skipOverTabs }));
    } else {
      mistakes.current++;
      setCursorIndex((cursorIndex) => {
        updateColourOfChar(
          charIndex,
          !isTurboPace ? theme.vars.palette.danger.plainColor : "transparent",
        );
        const nextIndex = getNextCharIndex({
          charIndex: cursorIndex,
          words,
          skipOverTabs,
        });
        maybeScrollToNextLine(cursorIndex, childInputRef);
        return nextIndex;
      });
      setCharIndex(getNextCharIndex({ charIndex, words, skipOverTabs }));
    }
    keyStartTime.current = performance.now();
  }
  return (
    <Box
      sx={(theme) => ({
        color: `${theme.vars.palette.primary[100]}`,
        display: "flex",
        position: "relative",
        flexDirection: "row",
        flexWrap: "wrap",
        fontFamily: "Courier",
        fontSize: 24,
        outline: "none",
        minWidth: "100%",
        maxHeight: "300px",
        overflowX: "visible",
        overflowY: "auto",
        msOverflowStyle: "none" /* IE and Edge */,
        scrollbarWidth: "none" /* Firefox */,
        "::WebkitScrollbar": {
          display: "none" /* Chrome, Safari, Opera */,
        },
      })}
      ref={childInputRef}
      data-testid="typing-panel"
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <Cursor
        letters={document.getElementsByClassName("letter")}
        cursorIndex={cursorIndex}
      />
      {/* Check if width is greater than 0 to avoid rendering issues */}
      {width > 0 && <WordsToType colourOfChar={colourOfChar} words={words} />}
      {isOpen && (
        <ResultsModal
          key={isOpen.toString() + currentWPM + mistakes + correctChars}
          isOpen={isOpen}
          setIsResultsModalOpen={setIsResultsModalOpen}
          newTestPage={newTestPage}
          setTestInfo={setTestInfo}
          previousScore={previousScore}
          previousWPM={previousWPM}
          previousAccuracy={previousAccuracy}
          currentWPM={currentWPM}
          currentAccuracy={currentAccuracy}
          currentScore={currentScore}
          currentTime={currentTime}
          keyTimeMap={keyTimeMap}
          mistakes={mistakes}
          correctChars={correctChars}
          childInputRef={childInputRef}
          setResetCounter={setResetCounter}
        />
      )}
    </Box>
  );
}
