import mongoose, { Document } from "mongoose";
import User from "../../../app/types/User.d";
export default interface UserDocument extends User, Document {
  name: string;
  email: string;
  username: string;
  provider: string;
  hashed_password: string;
  _password: string;
  authToken: string;
  password: string;
}

export type ComparePasswordFunction = (
  candidatePassword: string,
  cb: (err: mongoose.Error, isMatch: boolean) => void,
) => void;
