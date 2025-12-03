import { useState, useCallback, useRef } from "react";
import { calcWPM, calcAccuracy, calcScore } from "../utils/test-stats";
import { useTestResultMutation } from "../hooks/useTestResultMutation";
import { useLetterSpeedMutation } from "../hooks/useLetterSpeedMutation";
import { Language } from "../types/words.type";
import { flattenToArrayOfAverageValues } from "../utils/data-processing";

export function useTestResults(
  keyTimeMap: React.RefObject<Record<string, number[]> | undefined>,
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
  const [currentTime, setCurrentTime] = useState(0);
  const [isOpen, setIsResultsModalOpen] = useState(false);

  const { trigger: uploadTestResults } = useTestResultMutation();
  const { trigger: uploadLetterSpeedData } = useLetterSpeedMutation();

  const recordTestResultStats = useCallback(
    (
      endTime: number,
      correctCharsVal: number,
      mistakesVal: number,
      startTimeVal: number,
    ) => {
      const wpm = calcWPM(correctCharsVal, endTime - startTimeVal);
      setCurrentWPM(wpm);
      const accuracy = calcAccuracy(correctCharsVal, mistakesVal);
      const score = calcScore(accuracy, endTime - startTimeVal);
      setPreviousWPM(currentWPM);
      setPreviousAccuracy(currentAccuracy);
      setCurrentAccuracy(accuracy);
      setCurrentScore(score);
      setCurrentTime((endTime - startTimeVal) / 1000);

      const lowercaseChars = Object.keys(keyTimeMap.current || {})
        .filter((key) => /^[a-z]$/.test(key))
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

      const symbolChars = Object.keys(keyTimeMap.current || {})
        .filter((key) => /[^a-zA-Z\s]/.test(key))
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
      const lowercaseWPM = calcWPM(
        lowercaseChars.keys,
        lowercaseChars.totalTime,
      );
      const symbolWPM = calcWPM(symbolChars.keys, symbolChars.totalTime);

      const userId = localStorage.getItem("user_id");
      if (!userId) return;
      uploadTestResults({
        userId: userId,
        wpm: wpm,
        accuracy: accuracy,
        score: score,
        time: (endTime - startTimeVal) / 1000,
        testType: Language.ENGLISH ? "English" : "programming",
        lowercaseWpm: lowercaseWPM,
        symbolWpm: symbolWPM,
      });

      const keyArr = keyTimeMap.current ? Object.keys(keyTimeMap.current) : [];
      const timeArr = flattenToArrayOfAverageValues(keyTimeMap.current ?? {});

      const list = [];
      for (let j = 0; j < keyArr.length; j++)
        list.push({ letter: keyArr[j], avgTimeMs: timeArr[j] });
      uploadLetterSpeedData({ userId, summaries: list });
    },
    [keyTimeMap, uploadTestResults],
  );

  const onEnd = useCallback(() => {
    recordTestResultStats(
      performance.now(),
      correctChars.current,
      mistakes.current,
      startTime.current || Date.now(),
    );
    setIsResultsModalOpen(true);
  }, [recordTestResultStats]);

  return {
    mistakes,
    correctChars,
    startTime,
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
