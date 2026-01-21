import { useState, useCallback, useRef } from "react";
import {
  calcWPM,
  calcAccuracy,
  calcScore,
  testInvalid,
} from "../utils/test-stats";
import { useTestResultMutation } from "../hooks/useTestResultMutation";
import { useLetterSpeedMutation } from "../hooks/useLetterSpeedMutation";
import { Language, LanguageArray } from "../types/words.type";
import { flattenToArrayOfAverageValues } from "../utils/data-processing";
function processLetterSpeedData(
  keyTimeMap: React.RefObject<Record<string, number[]> | undefined>,
) {
  const keyArr = keyTimeMap.current ? Object.keys(keyTimeMap.current) : [];
  const timeArr = flattenToArrayOfAverageValues(keyTimeMap.current ?? {});
  return keyArr.map((letter, j) => ({
    letter,
    avgTimeMs: timeArr[j],
  }));
}

export function useTestResults(
  keyTimeMap: React.RefObject<Record<string, number[]> | undefined>,
  language: Language,
) {
  const mistakes = useRef(0);
  const correctChars = useRef(0);
  const startTime = useRef<number | null>(null);

  const [currentWPM, setCurrentWPM] = useState(0);
  const [previousWPM, setPreviousWPM] = useState<number | undefined>(undefined);
  const [currentAccuracy, setCurrentAccuracy] = useState(0);
  const [previousAccuracy, setPreviousAccuracy] = useState<number | undefined>(
    undefined,
  );
  const [currentScore, setCurrentScore] = useState(0);
  const [previousScore, setPreviousScore] = useState<number | undefined>(
    undefined,
  );
  const [currentTime, setCurrentTime] = useState(0);
  const [isOpen, setIsResultsModalOpen] = useState(false);

  const { trigger: uploadTestResults } = useTestResultMutation();
  const { trigger: uploadLetterSpeedData } = useLetterSpeedMutation();

  const recordTestResultStats = useCallback(
    (endTime: number) => {
      // return the total keys and total time for keys that match the filter
      function getKeyTimeInfo(filter: (key: string) => boolean) {
        return Object.keys(keyTimeMap.current || {})
          .filter(filter)
          .reduce(
            (acc, key) => ({
              keys:
                acc.keys +
                (keyTimeMap.current ? keyTimeMap.current[key].length : 0),
              totalTime:
                acc.totalTime +
                (keyTimeMap.current
                  ? keyTimeMap.current[key].reduce((curr, acc) => acc + curr, 0)
                  : 0),
            }),
            { keys: 0, totalTime: 0 },
          );
      }
      const wpm = calcWPM(correctChars.current, endTime - startTime.current!);
      setCurrentWPM(wpm);
      const accuracy = calcAccuracy(correctChars.current, mistakes.current);
      const score = calcScore(accuracy, endTime - startTime.current!);

      setCurrentAccuracy(accuracy);
      setCurrentScore(score);
      setCurrentTime((endTime - startTime.current!) / 1000);

      const lowercaseChars = getKeyTimeInfo((key) => /^[a-z]$/.test(key));
      const symbolChars = getKeyTimeInfo((key) => /[^a-zA-Z\s]/.test(key));

      const lowercaseWPM = calcWPM(
        lowercaseChars.keys,
        lowercaseChars.totalTime,
      );
      const symbolWPM = calcWPM(symbolChars.keys, symbolChars.totalTime);

      return { wpm, accuracy, score, lowercaseWPM, symbolWPM };
    },
    [keyTimeMap],
  );

  const onEnd = useCallback(() => {
    const endTime = performance.now();

    setPreviousWPM(currentWPM);
    setPreviousAccuracy(currentAccuracy);
    setPreviousScore(currentScore);
    const userId = localStorage.getItem("user_id");
    if (!userId) return;

    const { wpm, accuracy, score, lowercaseWPM, symbolWPM } =
      recordTestResultStats(endTime);

    setIsResultsModalOpen(true);

    if (testInvalid(wpm, accuracy)) return;

    uploadTestResults({
      userId: userId,
      wpm: wpm,
      accuracy: accuracy,
      score: score,
      time: (endTime - startTime.current!) / 1000,
      testType: LanguageArray[language],
      lowercaseWpm: lowercaseWPM,
      symbolWpm: symbolWPM,
    });
    const avgTimelist = processLetterSpeedData(keyTimeMap);
    uploadLetterSpeedData({ userId, summaries: avgTimelist });
  }, [
    recordTestResultStats,
    currentWPM,
    currentAccuracy,
    currentScore,
    keyTimeMap,
    uploadTestResults,
    uploadLetterSpeedData,
    language,
  ]);

  return {
    mistakes,
    correctChars,
    startTime,
    previousScore,
    previousWPM,
    previousAccuracy,
    currentWPM,
    currentAccuracy,
    currentScore,
    currentTime,
    isOpen,
    setIsResultsModalOpen,
    recordTestResultStats,
    onEnd,
  };
}
