import useSWR from "swr";

const baseURL = import.meta.env.VITE_API_ORIGIN || "http://localhost:3000";

interface UserData {
  username?: string;
  email: string;
  userId: string;
}

export const useUserData = (userId: string | null) => {
  const fetcher = async (url: string): Promise<UserData | null> => {
    if (!userId) return null;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }
    const data = await response.json();
    return data.data;
  };

  const { data, error, isLoading } = useSWR(
    userId ? `${baseURL}/api/users/${userId}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000, // 1 minute
    },
  );

  return {
    userData: data,
    isLoading,
    error,
  };
};
