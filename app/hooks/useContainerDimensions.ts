import { useEffect, useState } from "react";
import { EndCursorX } from "../types/words.type";

export const useContainerDimensions = (
  myRef: React.RefObject<HTMLDivElement | null>,
  words: string,
) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [endCursorX, setEndCursorX] = useState<EndCursorX>([]);
  useEffect(() => {
    const getDimensions = () => ({
      width: myRef.current?.offsetWidth ?? 0,
      height: myRef.current?.offsetHeight ?? 0,
    });

    const getEndCursorX = (
      words: string,
      { width }: { width: number },
    ): number[] => {
      const wordsArr = words.split(" ");
      let endCursorX: EndCursorX = [];
      let endX = 0;
      let endXIndex = 0;
      for (const word of wordsArr) {
        if (word.length * 14.41 + endX <= width) {
          endX += word.length * 14.41;
          endXIndex += word.length;
          if (endX + 14.41 > width) {
            endCursorX = [...endCursorX, endXIndex - 1];
            endX = 0;
            endXIndex = 0;
          } else {
            endX += 14.41; // Adding space width
            endXIndex += 1; // Incrementing for the space
          }
        } else {
          endCursorX = [...endCursorX, endXIndex - 2];
          endX = word.length * 14.41 + 14.41; // Resetting endX to the current word length plus space offsetWidthh
          endXIndex = word.length + 1;
        }
      }
      endCursorX = [...endCursorX, endXIndex - 2];
      return endCursorX;
    };

    const handleResize = () => {
      const dimensions = getDimensions();
      setDimensions(dimensions);
      setEndCursorX(getEndCursorX(words, dimensions));
    };

    if (myRef.current) {
      const dimensions = getDimensions();
      setDimensions(dimensions);
      setEndCursorX(getEndCursorX(words, dimensions));
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [myRef, words]);

  return { width: dimensions.width, endCursorX };
};
