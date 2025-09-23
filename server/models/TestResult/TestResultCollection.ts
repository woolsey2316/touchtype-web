import mongoose, { Schema } from "mongoose";
import TestResultDocument from "./TestResultDocument";

export const testResultSchema: Schema = new mongoose.Schema<TestResultDocument>(
  {
    email: String,
    testType: String,
    wpm: Number,
    accuracy: Number,
    score: Number,
  },
  { timestamps: true },
);

const TestResultCollection = mongoose.model<TestResultDocument>(
  "TestResult",
  testResultSchema,
);
export default TestResultCollection;
