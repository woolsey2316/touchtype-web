import { model, Schema, Document } from "mongoose";
import { WpmDistribution } from "@interfaces/wpmDistribution.interface.js";

const wpmDistributionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  binSize: { type: Number, default: 5 }, // increment size, e.g., 5 WPM
  frequencies: [
    {
      wpmRangeStart: { type: Number, required: true }, // e.g., 0, 5, 10, ...
      count: { type: Number, required: true, default: 0 },
    },
  ],
  updatedAt: { type: Date, default: Date.now },
});

const wpmDistributionModel = model<WpmDistribution & Document>(
  "WpmDistribution",
  wpmDistributionSchema,
);

export default wpmDistributionModel;
