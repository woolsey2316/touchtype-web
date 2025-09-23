import mongoose from "mongoose";
import TestResult from "../../../app/types/TestResult.d";
export default interface TestResultDocument
  extends TestResult,
    mongoose.Document {}
