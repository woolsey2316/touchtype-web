export const getAllKeys = (
  data: object,
  prefix: string[] = [],
): string | string[] => {
  if (typeof data !== "object") {
    return prefix.join(".");
  }
  return Object.entries(data).flatMap(([k, v]) =>
    getAllKeys(v, [...prefix, k]),
  );
};

export const deepGet = (
  obj: Record<string, string | Record<string, string>>,
  keys: string[],
): string =>
  keys.reduce(
    (xs: string | Record<string, string | Record<string, string>>, x) =>
      typeof xs !== "string" ? xs?.[x] : xs,
    obj,
  ) as string;

function componentToHex(c: number) {
  const hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

export function rgb_to_hex(rgb: number[]) {
  const [r, g, b] = rgb;
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export function addPlus(value: number): string {
  return value >= 0 ? `+${value}` : `${value}`;
}

export function validCursorIndices(words: string, width: number): number[][] {
  if (!words || words.length === 0) {
    return [];
  }
  const CHAR_WIDTH = Math.round(14.41);
  const maxCursorXInd = Math.floor(width / CHAR_WIDTH);
  let currLineInd = 0;
  const validCursorIndices: number[][] = [];
  let row = 0;
  let col = 0;
  let charIdx = 0;
  let right = 0;

  while (charIdx < words.length) {
    if (words[charIdx] === "\n") {
      validCursorIndices.push([row, col]);
      row++;
      col = 0;
      charIdx++;
      currLineInd = 0;
    } else if (words[charIdx] === "\t") {
      col += 2;
      charIdx++;
      currLineInd += 2;
    } else if (words[charIdx] === " ") {
      if (col + 1 < maxCursorXInd) {
        validCursorIndices.push([row, col]);
        col++;
        currLineInd++;
      } else {
        col = 0;
        row++;
        currLineInd = 0;
      }
      charIdx++;
      currLineInd++;
    } else {
      right = charIdx;
      while (
        words[right] !== " " &&
        words[right] !== "\n" &&
        words[right] != "\t" &&
        right < words.length
      ) {
        right++;
        currLineInd += 1;
      }
      right--;
      currLineInd--;
      if (currLineInd <= maxCursorXInd) {
        for (; charIdx <= right; charIdx++) {
          validCursorIndices.push([row, col]);
          col++;
        }
      } else {
        col = 0;
        row++;
        currLineInd = 0;
        for (; col <= right - charIdx; col++) {
          validCursorIndices.push([row, col]);
        }
      }
      charIdx = right + 1;
    }
  }
  validCursorIndices.push([row, col]);
  return validCursorIndices;
}
