import useSWR from "swr";
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

  const { data: testResultData } = useSWR(
    `/api/test-result/${userId}`,
    fetcher,
  );
  const { data: letterSpeedData } = useSWR(
    `/api/letter-speed/${userId}`,
    fetcher,
  );

  const averageLowercaseTime =
    letterSpeedData && letterSpeedData.lowercaseArray
      ? letterSpeedData.lowercaseArray.reduce(
          (a: number, b: number) => a + b,
          0,
        ) / letterSpeedData.lowercaseArray.length
      : NaN;

  const averageSymbolTime =
    letterSpeedData && letterSpeedData.symbolArray
      ? letterSpeedData.symbolArray.reduce((a: number, b: number) => a + b, 0) /
        letterSpeedData.symbolArray.length
      : NaN;

  return {
    testResultData,
    letterSpeedData,
    averageLowercaseTime,
    averageSymbolTime,
  };
};
