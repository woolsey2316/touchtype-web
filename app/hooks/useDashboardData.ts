import useSWR from "swr";
import { auth } from "../core/firebase";

interface TestResultData {
  data: {
    accuracy: number;
    score: number;
    totalTime: number;
    overall: { x: number; y: number; id: number }[];
    lowercase: { x: number; y: number; id: number }[];
    symbol: { x: number; y: number; id: number }[];
  };
}

interface LetterSpeedData {
  data: {
    lowercase: {
      letter: string;
      samples: number;
      totalTime: number;
      avgTimeMs: number;
      avgWpm: number;
    }[];
    symbols: {
      letter: string;
      samples: number;
      totalTime: number;
      avgTimeMs: number;
      avgWpm: number;
    }[];
  };
}
export const useDashboardData = () => {
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

  const { data: testResultData } = useSWR<TestResultData>(
    userId ? `/api/test-results/${userId}` : null,
    fetcher,
  );
  const { data: letterSpeedData } = useSWR<LetterSpeedData>(
    userId ? `/api/letter-speed/${userId}` : null,
    fetcher,
  );

  const averageLowercaseTime =
    letterSpeedData && letterSpeedData.data.lowercase
      ? letterSpeedData.data.lowercase.reduce(
          (a: number, b) => a + b.avgWpm,
          0,
        ) / letterSpeedData.data.lowercase.length
      : NaN;

  const averageSymbolTime =
    letterSpeedData && letterSpeedData.data.symbols
      ? letterSpeedData.data.symbols.reduce((a: number, b) => a + b.avgWpm, 0) /
        letterSpeedData.data.symbols.length
      : NaN;

  return {
    testResultData: testResultData?.data,
    letterSpeedData: letterSpeedData?.data,
    averageLowercaseTime,
    averageSymbolTime,
  };
};
