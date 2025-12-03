import { useState, useEffect } from "react";
import { convertMapToArrays } from "../utils/data-processing";

export const useKeyTimeArrays = (
  keyTimeMap: React.RefObject<Record<string, number[]> | undefined>,
) => {
  const [keyArray, setKeyArray] = useState<string[]>([]);
  const [timeArray, setTimeArray] = useState<number[]>([]);
  useEffect(() => {
    const { keyArr, timeArr } = convertMapToArrays({
      map: keyTimeMap?.current ?? {},
      sorted: true,
    });

    setKeyArray(keyArr);
    setTimeArray(timeArr);
  }, [keyTimeMap]);
  return { keyArray, timeArray };
};
