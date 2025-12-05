import { model, Schema, Document } from "mongoose";
import { User } from "@interfaces/users.interface.js";

const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  allTimeBestTestId: {
    type: Schema.Types.ObjectId,
    ref: "TestResult",
    default: null,
  },
  dailyBestTestId: {
    type: Schema.Types.ObjectId,
    ref: "TestResult",
    default: null,
  },
});

const userModel = model<User & Document>("User", userSchema);

export default userModel;
