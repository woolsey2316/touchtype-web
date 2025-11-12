import { model, Schema, Document } from "mongoose";
import { User } from "@interfaces/users.interface";

const userSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
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
