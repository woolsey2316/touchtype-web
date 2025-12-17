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

    const results = (await client.zRevRangeWithScores(key, 0, 19)) as any[];
    if (!results || results.length === 0) {
      return [];
    }
    const formatted = results.map((entry, idx: number) => {
      const [userId, username, accuracy, date] = entry.value.split("|");
      return {
        rank: idx + 1,
        userId,
        username,
        date,
        accuracy,
        wpm: entry.score,
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

    // Add to leaderboards
    await client.zAdd(
      leaderboardKey("daily", testType),
      [{ score: wpm, value: `${userId}|${username}|${accuracy}|${date}` }],
      { GT: true },
    );
    await client.zAdd(
      leaderboardKey("weekly", testType),
      [{ score: wpm, value: `${userId}|${username}|${accuracy}|${date}` }],
      { GT: true },
    );
    await client.zAdd(
      leaderboardKey("alltime", testType),
      [{ score: wpm, value: `${userId}|${username}|${accuracy}|${date}` }],
      { GT: true },
    );
    return { status: "submitted" };
  }
}
export default LeaderboardsService;
