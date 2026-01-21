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
    // Submit test result to MongoDB
    await fetch(`${baseURL}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(arg),
    });

    // Submit to leaderboard if accuracy >= 90
    if (arg.accuracy >= 90) {
      try {
        const userEmail = localStorage.getItem("user_email") || "";
        const username = userEmail.split("@")[0] || "user-didn't-set-username";

        await fetch(`${baseURL}/api/leaderboards`, {
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
