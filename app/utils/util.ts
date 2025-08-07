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
  const validCursorIndices: number[][] = [];
  let currentLineWidth = 0;
  let row = 0;
  let col = 0;
  let slow = 0;
  let fast = 0;
  while (slow < words.length) {
    if (words[slow] === "↵") {
      validCursorIndices.push([row, col]);
      row++;
      col = 0;
      slow++;
      currentLineWidth = 0;
    } else if (words[slow] === "→") {
      col += 2;
      slow++;
      currentLineWidth += 2;
    } else if (words[slow] === " ") {
      if (currentLineWidth < maxCursorXInd) {
        validCursorIndices.push([row, col]);
        slow++;
        col++;
        currentLineWidth++;
      } else {
        validCursorIndices.push([row, col]);
        col = 0;
        currentLineWidth = 0;
        row++;
        slow++;
      }
    } else {
      fast = slow + 1;
      currentLineWidth++;
      while (
        words[fast] !== " " &&
        words[fast] !== "↵" &&
        words[fast] != "→" &&
        fast < words.length
      ) {
        fast++;
        currentLineWidth++;
      }

      fast--;
      currentLineWidth--;
      if (currentLineWidth < maxCursorXInd) {
        for (; slow <= fast; slow++, col++) {
          validCursorIndices.push([row, col]);
        }
      } else {
        col = 0;
        currentLineWidth = fast - slow;
        row++;
        for (; col <= fast - slow; col++) {
          validCursorIndices.push([row, col]);
        }
      }
      slow = fast + 1;
      currentLineWidth++;
    }
  }
  if (!words.endsWith("↵")) {
    validCursorIndices.push([row, col]);
  }
  return validCursorIndices;
}
