import { Typography } from "@mui/joy";
import { useState, useEffect, JSX } from "react";

interface StringKeyedObject {
  [key: string]: number; // 'key' represents the string key, 'any' is the type of the value
}

const CountdownTimer = ({
  started,
  targetDate,
}: {
  targetDate: number;
  started: boolean;
}) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        m: Math.floor((difference / 1000 / 60) % 60),
        s: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<StringKeyedObject>(
    started ? calculateTimeLeft() : { m: 0, s: 0 },
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(started ? calculateTimeLeft() : { m: 0, a: 0 });
    }, 1000);

    return () => clearTimeout(timer); // Cleanup
  });

  const timerComponents: JSX.Element[] = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }
    timerComponents.push(
      <Typography sx={{ mb: 2 }} level="h2">
        {timeLeft[interval]} {interval}{" "}
      </Typography>,
    );
  });

  return <div>{timerComponents.length ? timerComponents : <span></span>}</div>;
};

export default CountdownTimer;
