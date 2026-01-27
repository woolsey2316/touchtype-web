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
  username: {
    type: String,
    unique: true,
    sparse: true, // allows multiple null values but unique non-null values
    trim: true,
    minlength: 3,
    maxlength: 20,
    match: /^[a-zA-Z0-9_-]+$/, // alphanumeric, underscore, hyphen only
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
