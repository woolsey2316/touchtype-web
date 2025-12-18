import { Typography } from "@mui/joy";
import { useState, useEffect, useCallback, JSX } from "react";

interface StringKeyedObject {
  [key: string]: number; // 'key' represents the string key, 'any' is the type of the value
}

const CountdownTimer = ({
  testInfo,
  setTestInfo,
  wantTimer,
  targetDate,
  timeLimit,
  onEnd,
}: {
  targetDate: number;
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
  wantTimer: boolean;
  timeLimit: number;
  onEnd: () => void;
}) => {
  const calculateTimeLeft = useCallback(() => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        m: Math.floor((difference / 1000 / 60) % 60),
        s: Math.floor((difference / 1000) % 60),
      };
    } else {
      setTestInfo({
        ended: true,
        started: false,
      });
      onEnd();
    }
    return timeLeft;
  }, [targetDate, onEnd, setTestInfo]);

  const [timeLeft, setTimeLeft] = useState<StringKeyedObject>(
    wantTimer ? { m: 0, s: timeLimit } : {},
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      if (wantTimer && testInfo.started && !testInfo.ended) {
        setTimeLeft(calculateTimeLeft());
      }
    }, 1000);

    return () => clearTimeout(timer); // Cleanup
  });

  const timerComponents: JSX.Element[] = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }
    timerComponents.push(
      <Typography key={interval} sx={{ mb: 2 }} level="h2" color="primary">
        {timeLeft[interval]} {interval}{" "}
      </Typography>,
    );
  });

  return <div>{timerComponents.length ? timerComponents : <span></span>}</div>;
};

export default CountdownTimer;
