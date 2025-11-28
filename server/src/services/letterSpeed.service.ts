import letterSpeedModel from "@models/letterSpeed.model.js";
import { LetterSummary } from "../types/types.js";

class LetterSpeedService {
  public letterSpeeds = letterSpeedModel;

  public async getLetterAverages(userId: string) {
    const pipeline = [
      { $match: { userId: { $eq: userId } } },
      {
        $group: {
          _id: "$letter",
          totalTime: { $sum: "$totalTimeMs" },
          samples: { $sum: "$samples" },
        },
      },
      {
        $project: {
          _id: 0,
          letter: "$_id",
          samples: 1,
          totalTime: 1,
          avgTimeMs: {
            $cond: [
              { $gt: ["$samples", 0] },
              { $divide: ["$totalTime", "$samples"] },
              null,
            ],
          },
        },
      },
      { $sort: { letter: 1 as 1 | -1 } },
    ];

    const results = await letterSpeedModel.aggregate(pipeline).exec();

    const lowercase = results.filter((r) => /^[a-z]$/.test(r.letter));
    const symbols = results.filter((r) => !/^[a-zA-Z]$/.test(r.letter));

    return { lowercase, symbols };
  }

  public async upsertLetterSpeeds(
    userId: string,
    summaries: LetterSummary[],
    opts?: { emaAlpha?: number },
  ): Promise<{
    ok?: boolean;
    matchedCount: number;
    modifiedCount: number;
    upsertedCount: number;
    raw?: any;
    acknowledged?: boolean;
  }> {
    if (!Array.isArray(summaries) || summaries.length === 0) {
      throw new Error("summaries must be a non-empty array");
    }

    const alpha = typeof opts?.emaAlpha === "number" ? opts.emaAlpha : 0.2;
    if (alpha <= 0 || alpha > 1) {
      throw new Error("emaAlpha must be in (0, 1]");
    }

    const operations: any[] = [];

    for (const raw of summaries) {
      if (!raw || typeof raw.letter !== "string") continue;
      const letter = raw.letter;

      const incomingAvg = Number(raw.avgTimeMs);
      if (!isFinite(incomingAvg) || incomingAvg < 0) {
        continue;
      }

      const incomingSamples = 1;
      const incomingTotalTime = incomingAvg;

      const filter = {
        userId,
        letter,
      };

      // Aggregation-pipeline update. We reference the existing fields ($samples, $totalTimeMs, $emaMs)
      // and add incoming constants directly in the pipeline ops.
      const updatePipeline = [
        {
          $set: {
            docExists: { $ne: ["$userId", null] },
          },
        },
        {
          $set: {
            userId: {
              $cond: ["$docExists", "$userId", userId],
            },
            letter: {
              $cond: ["$docExists", "$letter", letter],
            },
            samples: {
              $add: [
                {
                  $ifNull: [{ $cond: ["$docExists", "$samples", 0] }, 0],
                },
                incomingSamples,
              ],
            },
            totalTimeMs: {
              $add: [
                { $ifNull: [{ $cond: ["$docExists", "$totalTimeMs", 0] }, 0] },
                incomingTotalTime,
              ],
            },
            emaMs: {
              $cond: [
                { $and: ["$docExists", "$emaMs"] },
                {
                  $add: [
                    { $multiply: [alpha, incomingAvg] },
                    { $multiply: [{ $subtract: [1, alpha] }, "$emaMs"] },
                  ],
                },
                incomingAvg,
              ],
            },
            avgTimeMs: {
              $cond: [
                {
                  $gt: [
                    {
                      $add: [
                        { $cond: ["$docExists", "$samples", 0] },
                        incomingSamples,
                      ],
                    },
                    0,
                  ],
                },
                {
                  $divide: [
                    {
                      $add: [
                        { $cond: ["$docExists", "$totalTimeMs", 0] },
                        incomingTotalTime,
                      ],
                    },
                    {
                      $add: [
                        { $cond: ["$docExists", "$samples", 0] },
                        incomingSamples,
                      ],
                    },
                  ],
                },
                incomingAvg,
              ],
            },
            createdAt: {
              $cond: ["$docExists", "$createdAt", "$$NOW"],
            },
          },
        },
      ];

      operations.push({
        updateOne: {
          filter,
          update: updatePipeline,
          upsert: true,
        },
      });
    }

    if (operations.length === 0) {
      return {
        acknowledged: true,
        matchedCount: 0,
        modifiedCount: 0,
        upsertedCount: 0,
      };
    }

    // Execute bulkWrite with ordered=false so independent ops run even if one fails
    const result = await letterSpeedModel.bulkWrite(operations, {
      ordered: false,
    });
    // Normalize a friendly result summary
    const summary = {
      ok: result.ok === 1,
      matchedCount: (result.matchedCount as number) ?? 0,
      modifiedCount: (result.modifiedCount as number) ?? 0,
      upsertedCount: Array.isArray(result.upsertedIds)
        ? result.upsertedIds.length
        : Object.keys(result.upsertedIds || {}).length,
      raw: result,
    };

    return summary;
  }
}

export default LetterSpeedService;
