export const displayPercentage = (value: string | number) => {
  if (value === "") return "";
  return addPlusIfPositive(Number(value)) + "%";
};

export function addPlusIfPositive(value: number | string): string {
  if (value === "") {
    return value;
  }
  return Number(value) >= 0 ? `+${value}` : `${value}`;
}
