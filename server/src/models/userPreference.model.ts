import mongoose, { Schema, Document } from "mongoose";
import { UserPreference } from "@interfaces/userPreference.interface";

export const userPreferenceSchema: Schema = new mongoose.Schema(
  {
    email: String,
    mode: String,
    spaceCharacter: String,
    zipperAnimation: Boolean,
    cursorCharacter: String,
    smoothCursor: Boolean,
    fontFamily: String,
  },
  { timestamps: true },
);

const UserPreferenceCollection = mongoose.model<UserPreference & Document>(
  "UserPreference",
  userPreferenceSchema,
);
export default UserPreferenceCollection;
