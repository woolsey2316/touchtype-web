import mongoose, { Schema } from "mongoose";
import { LetterSpeed } from "@interfaces/letterSpeed.interface";

export interface LetterSpeedDocument extends LetterSpeed, mongoose.Document {}

export interface LetterSpeedModel extends mongoose.Model<LetterSpeedDocument> {
  getLetterAverages(includeGlobal?: boolean): Promise<
    {
      letter: string;
      samples: number;
      totalTime: number;
      avgTimeMs: number | null;
    }[]
  >;
}

export const letterSpeedSchema: Schema =
  new mongoose.Schema<LetterSpeedDocument>(
    {
      userId: {
        type: String,
        ref: "User",
        default: null,
        index: true,
      },
      letter: {
        type: String,
        required: true,
        lowercase: true,
        match: /^[a-z]$/i,
      },
      samples: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
      },
      totalTimeMs: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
      },
      avgTimeMs: {
        type: Number,
        default: null,
        min: 0,
      },
      emaMs: {
        type: Number,
        default: null,
        min: 0,
      },
      lastSeen: {
        type: Date,
        default: Date.now,
      },
    },
    { timestamps: true },
  );

// Ensure unique per (userId, letter) so upserts work reliably
letterSpeedSchema.index({ userId: 1, letter: 1 }, { unique: true });

const LetterSpeedCollection = mongoose.model<
  LetterSpeedDocument,
  LetterSpeedModel
>("LetterSpeed", letterSpeedSchema);

export default LetterSpeedCollection;
