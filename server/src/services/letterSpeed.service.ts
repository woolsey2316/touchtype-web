import letterSpeedModel from "@models/letterSpeed.model.js";
import { Types } from "mongoose";
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

    return letterSpeedModel.aggregate(pipeline).exec();
  }

  public async upsertLetterSpeeds(
    userId: string | null,
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
      const letter = raw.letter.trim().toLowerCase();

      const incomingAvg = Number(raw.avgTimeMs);
      if (!isFinite(incomingAvg) || incomingAvg < 0) {
        continue;
      }

      const incomingSamples = 1;
      const incomingTotalTime = incomingAvg;

      const filter = {
        userId: userId ? new Types.ObjectId(userId) : null,
        letter,
      };

      // Aggregation-pipeline update. We reference the existing fields ($samples, $totalTimeMs, $emaMs)
      // and add incoming constants directly in the pipeline ops.
      const updatePipeline = [
        // Ensure fields exist (if document missing, upsert will create later using $setFields below)
        {
          $set: {
            samples: { $ifNull: ["$samples", 0] },
            totalTimeMs: { $ifNull: ["$totalTimeMs", 0] },
            emaMs: { $ifNull: ["$emaMs", null] },
          },
        },
        // Add incoming batch
        {
          $set: {
            samples: { $add: ["$samples", incomingSamples] },
            totalTimeMs: { $add: ["$totalTimeMs", incomingTotalTime] },
          },
        },
        // Recompute avgTimeMs and update emaMs and lastSeen
        {
          $set: {
            avgTimeMs: {
              $cond: [
                { $gt: ["$samples", 0] },
                { $divide: ["$totalTimeMs", "$samples"] },
                null,
              ],
            },
            emaMs: {
              $cond: [
                { $ifNull: ["$emaMs", false] },
                {
                  $add: [
                    { $multiply: [alpha, incomingAvg] },
                    { $multiply: [{ $subtract: [1, alpha] }, "$emaMs"] },
                  ],
                },
                incomingAvg,
              ],
            },
            lastSeen: "$$NOW",
          },
        },
        // On upsert (new doc), set userId, letter and createdAt via $setOnInsert
        {
          $setOnInsert: {
            userId: filter.userId,
            letter,
            createdAt: "$$NOW",
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
