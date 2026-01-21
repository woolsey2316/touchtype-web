import useSWR from "swr";

export interface LeaderboardEntry {
  rank?: number;
  id: number;
  userId?: string;
  username: string;
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
}

export const useLeaderboardEntries = ({ timespan, testType }: Props) => {
  const baseURL = import.meta.env.API_ORIGIN || "http://localhost:3001";

  const fetcher = (url: string) =>
    fetch(`${baseURL}${url}`, {
      credentials: "include",
    }).then((res) => res.json()) as Promise<LeaderboardResponse>;

  const { data, error } = useSWR<LeaderboardResponse>(
    `/api/leaderboards/${timespan}/${testType}`,
    fetcher,
    {
      refreshInterval: 60000,
    },
  );

  return {
    entries: data?.data?.map((entry, index) => ({
      ...entry,
      id: entry.id || index,
    })),
    isLoading: !error && !data,
    isError: error,
  };
};
