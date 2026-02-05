import useSWRMutation from "swr/mutation";
import { authenticatedFetch } from "../core/authenticated-fetch";

interface CreateLetterSpeedResult {
  userId: string;
  summaries: {
    letter: string;
    avgTimeMs: number;
  }[];
}
const baseURL = import.meta.env.API_ORIGIN || "http://localhost:3000";

export const useLetterSpeedMutation = () => {
  async function postData(
    url: string,
    { arg }: { arg: CreateLetterSpeedResult },
  ) {
    await authenticatedFetch(`${baseURL}${url}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(arg),
    });
  }

  const userId = localStorage.getItem("user_id") || "";
  const { trigger, isMutating } = useSWRMutation(
    userId ? "/api/letter-speed" : null,
    postData,
  );
  return { trigger, isMutating };
};
