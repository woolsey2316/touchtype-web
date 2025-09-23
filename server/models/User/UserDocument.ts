import { Document } from "mongoose";
import User from "../../../app/types/User.d";
export default interface UserDocument extends User, Document<string> {
  name: string;
  email: string;
  username: string;
  provider: string;
  hashed_password: string;
  _password: string;
  authToken: string;
  password: string;
}
