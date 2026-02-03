import { useDashboardData } from "./useDashboardData";

interface LetterSpeedItem {
  letter: string;
  samples: number;
  totalTime: number;
  avgTimeMs: number;
  avgWpm: number;
}

export interface SlowestKeysResult {
  lowercase: LetterSpeedItem[];
  numbers: LetterSpeedItem[];
  symbols: LetterSpeedItem[];
}

/**
 * Hook to get slowest keys from letter speed data
 * Reuses data from useDashboardData to avoid duplicate API calls
 */
export const useSlowestKeys = () => {
  // Reuse the letter speed data from dashboard hook - no duplicate request!
  const { letterSpeedData } = useDashboardData();

  const getSlowestKeys = (): SlowestKeysResult | null => {
    if (!letterSpeedData) {
      return null;
    }

    const { lowercase, symbols } = letterSpeedData;

    // Separate lowercase letters, numbers, and symbols
    const lowercaseLetters = lowercase.filter((item) =>
      /^[a-z]$/.test(item.letter),
    );

    const numbers = symbols.filter((item) => /^[0-9]$/.test(item.letter));

    const symbolsOnly = symbols.filter(
      (item) => !/^[a-zA-Z0-9]$/.test(item.letter),
    );

    // Sort by avgTimeMs descending (slowest first)
    const sortBySlowiest = (items: LetterSpeedItem[]) =>
      [...items].sort((a, b) => b.avgTimeMs - a.avgTimeMs);

    return {
      lowercase: sortBySlowiest(lowercaseLetters).slice(0, 2),
      numbers: sortBySlowiest(numbers).slice(0, 5),
      symbols: sortBySlowiest(symbolsOnly).slice(0, 5),
    };
  };

  return {
    slowestKeys: getSlowestKeys(),
    isLoading: !letterSpeedData,
    error: undefined,
  };
};
