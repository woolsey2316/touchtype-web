import { model, Schema, Document } from "mongoose";
import { UserPreferences } from "@interfaces/userPreference.interface.js";

const userPreferencesSchema: Schema = new Schema({
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
  mode: {
    type: String,
    required: true,
    default: "dark",
  },
  zipperEnabled: {
    type: Boolean,
    required: true,
    default: false,
  },
  spaceChar: {
    type: String,
    required: true,
    default: "·",
  },
  skipOverTabs: {
    type: Boolean,
    required: true,
    default: true,
  },
  cursorChar: {
    type: String,
    required: true,
    default: "|",
  },
  smoothCursor: {
    type: Boolean,
    required: true,
    default: true,
  },
});

const userPreferencesModel = model<UserPreferences & Document>(
  "UserPreferences",
  userPreferencesSchema,
);

export default userPreferencesModel;
