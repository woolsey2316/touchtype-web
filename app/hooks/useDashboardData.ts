import useSWR from "swr";
import { authenticatedFetch } from "../core/authenticated-fetch";
import { useState, useEffect } from "react";
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
const baseURL = import.meta.env.API_ORIGIN || "http://localhost:3001";

// Global stable fetcher for SWR deduplication
const fetcher = async (path: string) => {
  const response = await authenticatedFetch(`${baseURL}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const useDashboardData = () => {
  const [authReady, setAuthReady] = useState(false);
  const [userId, setUserId] = useState<string>("");

  // Wait for Firebase auth to be ready before making API calls
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const storedUserId = localStorage.getItem("user_id") || "";
        setUserId(storedUserId);
        setAuthReady(true);
      } else {
        setAuthReady(false);
        setUserId("");
      }
    });

    return () => unsubscribe();
  }, []);

  // Only fetch when auth is ready AND userId exists
  const shouldFetch = authReady && userId;

  const { data: testResultData } = useSWR<TestResultData>(
    shouldFetch ? `/api/test-results/${userId}` : null,
    fetcher,
  );
  const { data: letterSpeedData } = useSWR<LetterSpeedData>(
    shouldFetch ? `/api/letter-speed/${userId}` : null,
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
