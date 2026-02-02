import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek.js";
dayjs.extend(isoWeek);
import client from "@/databases/databases.js";
// Helper: build leaderboard keys
function leaderboardKey(scope: string, testType: string) {
  const today = dayjs().format("YYYY-MM-DD");
  const week = `W${dayjs().isoWeek()}`;
  if (scope === "daily") return `leaderboard:daily:${today}:${testType}`;
  if (scope === "weekly") return `leaderboard:weekly:${week}:${testType}`;
  if (scope === "alltime") return `leaderboard:alltime:${testType}`;
}

class LeaderboardsService {
  public async getTopScores(scope: string, testType: string) {
    const key = leaderboardKey(scope, testType);

    const results = await client.zRangeWithScores(key, 0, 9, { REV: true });
    if (!results || results.length === 0) {
      return [];
    }
    const formatted = results.map((entry, idx: number) => {
      const [userId, username, accuracy, date, testType] = (
        entry.value as string
      ).split("|");
      return {
        rank: idx + 1,
        userId,
        username,
        date,
        accuracy: Math.round(parseFloat(accuracy) * 100) / 100,
        wpm: Math.round(Number(entry.score) * 100) / 100,
        testType,
      };
    });
    return formatted;
  }
  public async submitTestResult({
    userId,
    username,
    wpm,
    accuracy,
    date,
    testType,
    mode,
  }: {
    userId: string;
    username: string;
    wpm: number;
    accuracy: number;
    date: string;
    testType: string;
    mode?: string;
  }): Promise<{ status: string }> {
    // Validate parameters
    if (!userId || !username || !wpm || !accuracy || !testType) {
      return { status: "invalid_parameters" };
    }

    // Only count if accuracy >= 90
    if (accuracy < 90) {
      return { status: "accuracy_too_low" };
    }

    const testCateogry =
      testType === "english" ? `english:${mode ?? "timed"}` : "programming";

    // Helper function to update leaderboard with username uniqueness
    const updateLeaderboard = async (scope: string) => {
      const key = leaderboardKey(scope, testCateogry);

      // Find and remove any existing entries for this username
      const allEntries = await client.zRangeWithScores(key, 0, -1);
      for (const entry of allEntries) {
        const [, existingUsername] = (entry.value as string).split("|");
        if (existingUsername === username) {
          await client.zRem(key, entry.value);
        }
      }

      // Add the new entry
      await client.zAdd(key, [
        {
          score: wpm,
          value: `${userId}|${username}|${accuracy}|${date}|${testType}`,
        },
      ]);
    };

    // Update all leaderboards
    await updateLeaderboard("daily");
    await updateLeaderboard("weekly");
    await updateLeaderboard("alltime");

    return { status: "submitted" };
  }
}
export default LeaderboardsService;
