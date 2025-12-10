import useSWRMutation from "swr/mutation";
interface CreateUserTestResult {
  accuracy: number;
  lowercaseWpm: number;
  score: number;
  symbolWpm: number;
  testType: string;
  time: number;
  userId: string;
  wpm: number;
}
const baseURL = import.meta.env.API_ORIGIN || "http://localhost:3001";

export const useTestResultMutation = () => {
  async function postData(url: string, { arg }: { arg: CreateUserTestResult }) {
    await fetch(`${baseURL}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(arg),
    });
  }
  const userId = localStorage.getItem("user_id") || "";
  const { trigger, isMutating } = useSWRMutation(
    userId ? "/api/test-results" : null,
    postData,
  );
  return { trigger, isMutating };
};
