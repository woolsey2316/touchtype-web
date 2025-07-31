import { useEffect, useState } from "react";

export const useContainerDimensions = (
  myRef: React.RefObject<HTMLDivElement | null>,
  words: string,
) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const getDimensions = () => ({
      width: myRef.current?.offsetWidth ?? 0,
      height: myRef.current?.offsetHeight ?? 0,
    });

    const handleResize = () => {
      const dimensions = getDimensions();
      setDimensions(dimensions);
    };

    if (myRef.current) {
      const dimensions = getDimensions();
      setDimensions(dimensions);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [myRef, words]);

  return { width: dimensions.width };
};
