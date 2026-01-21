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
      const [userId, username, accuracy, date] = (entry.value as string).split(
        "|",
      );
      return {
        rank: idx + 1,
        userId,
        username,
        date,
        accuracy: Math.round(parseFloat(accuracy) * 100) / 100,
        wpm: Math.round(Number(entry.score) * 100) / 100,
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
  }: {
    userId: string;
    username: string;
    wpm: number;
    accuracy: number;
    date: string;
    testType: string;
  }): Promise<{ status: string }> {
    // Validate parameters
    if (!userId || !username || !wpm || !accuracy || !testType) {
      return { status: "invalid_parameters" };
    }

    // Only count if accuracy >= 90
    if (accuracy < 90) {
      return { status: "accuracy_too_low" };
    }

    const testCateogry = testType === "english" ? "english" : "programming";
    // Add to leaderboards
    await client.zAdd(
      leaderboardKey("daily", testCateogry),
      [
        {
          score: wpm,
          value: `${userId}|${username}|${accuracy}|${date}|${testType}`,
        },
      ],
      { GT: true },
    );
    await client.zAdd(
      leaderboardKey("weekly", testCateogry),
      [
        {
          score: wpm,
          value: `${userId}|${username}|${accuracy}|${date}|${testType}`,
        },
      ],
      { GT: true },
    );
    await client.zAdd(
      leaderboardKey("alltime", testCateogry),
      [
        {
          score: wpm,
          value: `${userId}|${username}|${accuracy}|${date}|${testType}`,
        },
      ],
      { GT: true },
    );
    return { status: "submitted" };
  }
}
export default LeaderboardsService;
