import useSWRMutation from "swr/mutation";
import { authenticatedFetch } from "../core/authenticated-fetch";

interface CreateUserTestResult {
  accuracy: number;
  lowercaseWpm: number;
  score: number;
  symbolWpm: number;
  testType: string;
  time: number;
  userId: string;
  mode: string;
  wpm: number;
}
const baseURL = import.meta.env.API_ORIGIN || "http://localhost:3000";

export const useTestResultMutation = () => {
  async function postData(url: string, { arg }: { arg: CreateUserTestResult }) {
    // Submit test result to MongoDB with authentication
    await authenticatedFetch(`${baseURL}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(arg),
    });

    // Submit to leaderboard if accuracy >= 90
    if (arg.accuracy >= 90) {
      try {
        // Fetch user data to get username
        let username = "Anonymous";
        try {
          const userResponse = await authenticatedFetch(
            `${baseURL}/api/users/${arg.userId}`,
          );
          if (userResponse.ok) {
            const userData = await userResponse.json();
            username = userData.data?.username || "Anonymous";
          }
        } catch (error) {
          console.warn("Failed to fetch username, using Anonymous:", error);
        }

        await authenticatedFetch(`${baseURL}/api/leaderboards`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: arg.userId,
            username: username,
            wpm: arg.wpm,
            accuracy: arg.accuracy,
            date: new Date().toISOString(),
            testType: arg.testType,
            mode: arg.mode,
          }),
        });
      } catch (error) {
        console.error("Failed to submit to leaderboard:", error);
      }
    }
  }
  const userId = localStorage.getItem("user_id") || "";
  const { trigger, isMutating } = useSWRMutation(
    userId ? "/api/test-results" : null,
    postData,
  );
  return { trigger, isMutating };
};
