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
  const wordsArr = words.split(" ");
  let endX = 0;
  const validCursorIndices: number[][] = [];
  let index = 0;
  let row = 0;
  let col = 0;

  for (const word of wordsArr) {
    if (word.length * 14.41 + endX < width) {
      for (let i = 0; i < word.length; i++) {
        if (words[index + i] === "\t") {
          col += 2; // Assuming tab is 2 spaces
          i++;
          continue;
        }
        // Add entire word to current row becuase it fits on it
        validCursorIndices.push([row, col + i]);
      }
      index += word.length;
      col += word.length;
      endX += word.length * 14.41;

      // Check if space character can fit on current row
      if (endX + 14.41 > width) {
        endX = 0;
        col = 0;
        row++;
        index++;
        words[index] !== "\t" && validCursorIndices.push([row, col]);
      } else {
        words[index] !== "\t" && validCursorIndices.push([row, col]);

        endX += 14.41; // Adding space width
        index += 1; // Incrementing for the space
        col++; // Incrementing column for the space
      }
    } else {
      // reset state
      endX = word.length * 14.41 + 14.41;
      index = word.length + 1;
      row++;
      col = word.length + 1; // +1 for the space character
      for (let i = 0; i < col; i++) {
        if (words[index + i] === "\t") {
          col += 2; // Assuming tab is 2 spaces
          i++;
          continue;
        }
        // Add entire word to current row becuase it fits on it
        validCursorIndices.push([row, i]);
      }
    }
  }

  return validCursorIndices;
}
