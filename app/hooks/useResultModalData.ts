import swr from "swr";
import { authenticatedFetch } from "../core/authenticated-fetch";

interface ResultModalData {
  data: number;
}
export const useResultModalData = (isOpen: boolean) => {
  const baseURL = import.meta.env.VITE_API_ORIGIN || "http://localhost:3000";

  const token = localStorage.getItem("authToken") || "";
  const userId = localStorage.getItem("user_id") || "";
  const fetcher = (path: string) =>
    authenticatedFetch(`${baseURL}${path}`, {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
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
