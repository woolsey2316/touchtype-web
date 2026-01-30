import useSWR from "swr";
import { auth } from "../core/firebase";

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

export interface SlowestKeysResult {
  lowercase: LetterSpeedItem[];
  numbers: LetterSpeedItem[];
  symbols: LetterSpeedItem[];
}

export const useSlowestKeys = () => {
  const baseURL = import.meta.env.API_ORIGIN || "http://localhost:3001";

  const userId = localStorage.getItem("user_id") || "";

  // Authenticated fetcher with Firebase ID token
  const fetcher = async (path: string) => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error("User must be authenticated");
    }

    const idToken = await currentUser.getIdToken();
    const response = await fetch(`${baseURL}${path}`, {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${idToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  };

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
    isLoading,
    error,
  };
};
