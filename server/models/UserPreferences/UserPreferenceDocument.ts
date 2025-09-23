import mongoose from "mongoose";
import UserPreference from "../../../app/types/UserPreference.d";
export default interface UserPreferenceDocument
  extends UserPreference,
    mongoose.Document {}
