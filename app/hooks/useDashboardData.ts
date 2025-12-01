import useSWR from "swr";
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

  const token = localStorage.getItem("authToken") || "";
  const userId = localStorage.getItem("user_id") || "";
  const fetcher = (path: string) =>
    fetch(`${baseURL}${path}`, {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`, // Assuming Bearer token authentication
        "Content-Type": "application/json", // Example of another header
      },
    }).then((res) => res.json());

  const { data: testResultData } = useSWR<TestResultData>(
    `/api/test-results/${userId}`,
    fetcher,
  );
  const { data: letterSpeedData } = useSWR<LetterSpeedData>(
    `/api/letter-speed/${userId}`,
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
