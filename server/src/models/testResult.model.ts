import mongoose, { Schema } from "mongoose";
import { TestResult } from "@interfaces/testResult.interface.js";

export const testResultSchema: Schema = new mongoose.Schema<TestResult>(
  {
    userId: String,
    testType: String,
    wpm: Number,
    accuracy: Number,
    score: Number,
    time: Number,
    lowercaseWpm: Number,
    symbolWpm: Number,
  },
  { timestamps: true },
);

const TestResultCollection = mongoose.model<TestResult>(
  "TestResult",
  testResultSchema,
);
export default TestResultCollection;
