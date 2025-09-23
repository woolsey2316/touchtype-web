import mongoose, { Schema } from "mongoose";
import UserPreferenceDocument from "./UserPreferenceDocument";

export const UserPreferenceSchema: Schema =
  new mongoose.Schema<UserPreferenceDocument>(
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

const UserPreferenceCollection = mongoose.model(
  "UserPreference",
  UserPreferenceSchema,
);
export default UserPreferenceCollection;
