import AuthCode from "./AuthCode.d";
import mongoose, { Schema } from "mongoose";

export const authCodeSchema: Schema = new mongoose.Schema<AuthCode>({
  code: { type: String, unique: true },
  clientId: String,
  userId: String,
  userName: String,
  redirectUri: String,
});

const AuthCodeCollection = mongoose.model("AuthCode", authCodeSchema);
export default AuthCodeCollection;
