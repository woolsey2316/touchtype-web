import AccessToken from "./AccessToken.d";
import mongoose, { Schema } from "mongoose";

export const accessTokenSchema: Schema = new mongoose.Schema<AccessToken>({
  token: { type: String, unique: true },
  clientId: String,
  userId: String,
});

const AccessTokenCollection = mongoose.model("AccessToken", accessTokenSchema);
export default AccessTokenCollection;
