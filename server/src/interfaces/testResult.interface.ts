export interface TestResult {
  _id: string;
  testType: string;
  wpm: number;
  time: number;
  accuracy: number;
  score: number;
  symbolWpm?: number;
  lowercaseWpm?: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
