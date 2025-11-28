import { model, Schema, Document } from "mongoose";
import { User } from "@interfaces/users.interface.js";

const userSchema: Schema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const userModel = model<User & Document>("User", userSchema);

export default userModel;
