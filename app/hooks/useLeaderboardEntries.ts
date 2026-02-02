import useSWR from "swr";

export interface LeaderboardEntry {
  rank?: number;
  id: number;
  userId?: string;
  username: string;
  testType: string;
  wpm: number;
  accuracy: number;
  date: string;
}

interface LeaderboardResponse {
  data: LeaderboardEntry[];
  message: string;
}

interface Props {
  timespan: string;
  testType: string;
  mode: string;
}

export const useLeaderboardEntries = ({ timespan, testType, mode }: Props) => {
  const baseURL = import.meta.env.API_ORIGIN || "http://localhost:3001";

  const fetcher = (url: string) =>
    fetch(`${baseURL}${url}`, {
      credentials: "include",
    }).then((res) => res.json()) as Promise<LeaderboardResponse>;
  // programming tests do not have modes (timed/words)
  const url =
    testType !== "programming"
      ? `/api/leaderboards/${timespan}/${testType}:${mode}`
      : `/api/leaderboards/${timespan}/programming`;

  const { data, error } = useSWR<LeaderboardResponse>(url, fetcher, {
    refreshInterval: 60000,
  });

  return {
    entries: data?.data?.map((entry, index) => ({
      ...entry,
      id: entry.id || index,
    })),
    isLoading: !error && !data,
    isError: error,
  };
};
