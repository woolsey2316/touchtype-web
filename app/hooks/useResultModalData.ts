import swr from "swr";

interface ResultModalData {
  data: number;
}
export const useResultModalData = (isOpen: boolean) => {
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

  const { data: resultModalData } = swr<ResultModalData>(
    userId && isOpen ? `/api/test-results/daily-time/${userId}` : null,
    fetcher,
  );

  return {
    resultModalData,
  };
};
