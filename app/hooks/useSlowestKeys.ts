import useSWR from "swr";

interface LetterSpeedItem {
  letter: string;
  samples: number;
  totalTime: number;
  avgTimeMs: number;
  avgWpm: number;
}

interface LetterSpeedData {
  data: {
    lowercase: LetterSpeedItem[];
    symbols: LetterSpeedItem[];
  };
}

interface SlowestKeysResult {
  lowercase: LetterSpeedItem[];
  numbers: LetterSpeedItem[];
  symbols: LetterSpeedItem[];
}

export const useSlowestKeys = () => {
  const baseURL = import.meta.env.API_ORIGIN || "http://localhost:3001";

  const token = localStorage.getItem("authToken") || "";
  const userId = localStorage.getItem("user_id") || "";

  const fetcher = (path: string) =>
    fetch(`${baseURL}${path}`, {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());

  const {
    data: letterSpeedData,
    error,
    isLoading,
  } = useSWR<LetterSpeedData>(
    userId ? `/api/letter-speed/${userId}` : null,
    fetcher,
  );

  const getSlowestKeys = (): SlowestKeysResult | null => {
    if (!letterSpeedData?.data) {
      return null;
    }

    const { lowercase, symbols } = letterSpeedData.data;

    // Separate lowercase letters, numbers, and symbols
    const lowercaseLetters = lowercase.filter((item) =>
      /^[a-z]$/.test(item.letter),
    );

    const numbers = symbols.filter((item) => /^[0-9]$/.test(item.letter));

    const symbolsOnly = symbols.filter(
      (item) => !/^[a-zA-Z0-9]$/.test(item.letter),
    );

    // Sort by avgTimeMs descending (slowest first) and take top 5
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
    isLoading,
    error,
  };
};
