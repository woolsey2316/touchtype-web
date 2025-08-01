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

  let lineWidth = 0;
  const validCursorIndices: number[][] = [];
  let row = 0;
  let col = 0;

  for (const line of words.split("\n")) {
    for (const char of line.split("")) {
      if (14.41 + lineWidth < width) {
        if (char === "\t") {
          col += 2; // Assuming tab is 2 spaces
          lineWidth += 2 * 14.41;
          continue;
        }
        validCursorIndices.push([row, col++]);
        lineWidth += 14.41;
      } else {
        row++;
        col = 0; // Reset column for the new line
        if (char === "\t") {
          col += 2; // Assuming tab is 2 spaces
          lineWidth += 2 * 14.41;
          continue;
        }
        validCursorIndices.push([row, col]);
        col++;
        lineWidth = 14.41; // Reset endX for the new line
      }
    }
    validCursorIndices.push([row, col]);
    col = 0; // Reset column for the next line
    lineWidth = 0; // Reset endX for the next line
    row++; // Move to the next row
  }

  console.log(validCursorIndices);
  return validCursorIndices;
}
