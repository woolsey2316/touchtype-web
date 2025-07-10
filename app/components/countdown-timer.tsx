import { Typography } from "@mui/joy";
import { useState, useEffect, useCallback, JSX } from "react";

interface StringKeyedObject {
  [key: string]: number; // 'key' represents the string key, 'any' is the type of the value
}

const CountdownTimer = ({
  timeTestInfo,
  setTimeInfo,
  wantTimer,
  targetDate,
  timeLimit,
  onEnd,
}: {
  targetDate: number;
  setTimeInfo: React.Dispatch<
    React.SetStateAction<{
      started: boolean;
      start: number | null;
      end: number | null;
      ended: boolean;
    }>
  >;
  wantTimer: boolean;
  timeTestInfo: {
    started: boolean;
    start: number | null;
    end: number | null;
    ended: boolean;
  };
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
      setTimeInfo((timeTestInfo) => ({
        ...timeTestInfo,
        started: false,
        ended: true,
        end: Date.now(),
      }));
      onEnd();
    }
    console.log("timeLeft: ", timeLeft);
    return timeLeft;
  }, [setTimeInfo, targetDate, onEnd]);

  const [timeLeft, setTimeLeft] = useState<StringKeyedObject>(
    wantTimer ? { m: 0, s: timeLimit } : {},
  );

  useEffect(() => {
    console.log("CountdownTimer useEffect", wantTimer, timeTestInfo);
    const timer = setTimeout(() => {
      wantTimer &&
        timeTestInfo.started &&
        !timeTestInfo.ended &&
        setTimeLeft(calculateTimeLeft());
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
