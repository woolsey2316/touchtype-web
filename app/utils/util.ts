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

export function hoursAndMinutes(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const hours = Math.floor(totalSeconds / 3600) % 24;
  const days = Math.floor(totalSeconds / 86400);
  if (days > 0) {
    return `${days}d ${hours}h ${minutes}m`;
  }
  return `${hours}h ${minutes}m`;
}
// This code converts a string path (possibly using bracket notation) into an array of property keys, suitable for deep object access.
// **Example:**
// colors[main][shade] → ["colors", "main", "shade"]
export function parseKey(key: string): string[] {
  return (
    key
      // colors[main][shade]"` → `"colors.main.shade.
      .replace(/\[([^[\]]*)\]/g, ".$1.")
      // "colors.main.shade."` → `["colors", "main", "shade", ""]
      .split(".")
      .filter((t: unknown) => t !== "")
  );
}

export const getHexColor = function (
  customTheme: Record<string, string | Record<string, string>>,
  key: string,
) {
  return key.includes("mainChannel")
    ? rgb_to_hex(deepGet(customTheme, parseKey(key)).split(" ").map(Number))
    : deepGet(customTheme, parseKey(key));
};
