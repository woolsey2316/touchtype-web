import useSWR from "swr";

export interface LeaderboardEntry {
  id: number;
  username: string;
  wpm: number;
  accuracy: number;
  date: string;
}

interface Props {
  timespan: string;
  testType: string;
}
export const useLeaderboardEntries = ({ timespan, testType }: Props) => {
  const fetcher = (url: string) =>
    fetch(url).then((res) => res.json()) as Promise<LeaderboardEntry[]>;

  const { data, error } = useSWR<LeaderboardEntry[]>(
    `/api/leaderboard/${timespan}/${testType}`,
    fetcher,
    {
      refreshInterval: 60000,
    },
  );

  return {
    entries: data,
    isLoading: !error && !data,
    isError: error,
  };
};
