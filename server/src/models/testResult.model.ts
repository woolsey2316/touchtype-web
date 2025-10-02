import mongoose, { Schema } from "mongoose";
import { TestResult } from "@interfaces/testResult.interface";

export const testResultSchema: Schema = new mongoose.Schema<TestResult>(
  {
    email: String,
    testType: String,
    wpm: Number,
    accuracy: Number,
    score: Number,
  },
  { timestamps: true },
);

const TestResultCollection = mongoose.model<TestResult>(
  "TestResult",
  testResultSchema,
);
export default TestResultCollection;
