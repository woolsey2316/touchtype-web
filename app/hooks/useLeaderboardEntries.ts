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
  totalItems: number;
  currentPage: number;
  pageSize: number;
  message: string;
}

interface Props {
  timespan: string;
  testType: string;
  mode: string;
  page?: number;
  pageSize?: number;
}

export const useLeaderboardEntries = ({
  timespan,
  testType,
  mode,
  page = 1,
  pageSize = 20,
}: Props) => {
  const baseURL = import.meta.env.API_ORIGIN || "http://localhost:3001";

  const fetcher = (url: string) =>
    fetch(`${baseURL}${url}`, {
      credentials: "include",
    }).then((res) => res.json()) as Promise<LeaderboardResponse>;

  // programming tests do not have modes (timed/words)
  const url =
    testType !== "programming"
      ? `/api/leaderboards/${timespan}/${testType}:${mode}?page=${page}&pageSize=${pageSize}`
      : `/api/leaderboards/${timespan}/programming?page=${page}&pageSize=${pageSize}`;

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
    totalItems: data?.totalItems || 0,
    currentPage: data?.currentPage || page,
    pageSize: data?.pageSize || pageSize,
  };
};
