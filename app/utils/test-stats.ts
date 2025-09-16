export const calcWPM = (correctChars: number, duration: number) => {
  return (((correctChars / duration) * 1000) / 5) * 60;
};

export const calcAccuracy = (correctChars: number, mistakes: number) => {
  return Math.max((correctChars / (correctChars + mistakes)) * 100, 0);
};

export const calcScore = (wpm: number, accuracy: number, duration: number) => {
  let score = Math.max(
    (wpm * Math.pow(accuracy / 100, 5) * duration) / 1000,
    0,
  );
  score = Math.min(score, 9999);
  return score;
};
