import useSWRMutation from "swr/mutation";
interface CreateLetterSpeedResult {
  userId: string;
  summaries: {
    letter: string;
    avgTimeMs: number;
  }[];
}
const baseURL = import.meta.env.API_ORIGIN || "http://localhost:3001";

export const useLetterSpeedMutation = () => {
  async function postData(
    url: string,
    { arg }: { arg: CreateLetterSpeedResult },
  ) {
    await fetch(`${baseURL}${url}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(arg),
    });
  }

  const { trigger, isMutating } = useSWRMutation("/api/letter-speed", postData);
  return { trigger, isMutating };
};
