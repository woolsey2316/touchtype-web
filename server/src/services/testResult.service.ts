import { CreateTestResultDto } from "@dtos/testResult.dto.js";
import { HttpException } from "@exceptions/HttpException.js";
import { TestResult } from "@interfaces/testResult.interface.js";
import testResultModel from "@models/testResult.model.js";
import { isEmpty } from "@utils/util.js";

class TestResultService {
  public testResults = testResultModel;

  public async findAllUsersDashboardData(userId: string): Promise<{
    overall: { x: number; y: number }[];
    lowercase: { x: number; y: number }[];
    symbol: { x: number; y: number }[];
    accuracy: number;
    score: number;
    totalTime: number;
  }> {
    const testResults: TestResult[] = await this.testResults
      .find({ userId })
      .sort({ createdAt: 1 });

    const wpm = testResults.map((tr, index) => ({
      x: index,
      y: tr.wpm,
      id: index,
    }));
    const lowercaseWpm = testResults
      .map((tr) => tr.lowercaseWpm)
      .filter((v) => v !== undefined && v !== null)
      .map((tr, index) => ({ x: index, y: tr, id: index }));
    const symbolWpm = testResults
      .map((tr) => tr.symbolWpm)
      .filter((v) => v !== undefined && v !== null)
      .map((tr, index) => ({ x: index, y: tr, id: index }));
    const accuracy =
      testResults.reduce((acc, tr) => tr.accuracy + acc, 0) /
      testResults.length;
    const score = testResults.reduce((acc, tr) => tr.score + acc, 0);
    const totalTime = testResults.reduce((acc, tr) => acc + tr.time, 0);

    return {
      overall: wpm,
      lowercase: lowercaseWpm,
      symbol: symbolWpm,
      accuracy,
      score,
      totalTime,
    };
  }

  public async findTestResultByEmail(email: string): Promise<TestResult[]> {
    if (isEmpty(email)) throw new HttpException(400, "Email is empty");

    const findTestResult: TestResult[] = await this.testResults.find({
      email: email,
    });
    if (!findTestResult)
      throw new HttpException(409, "Test Result doesn't exist");

    return findTestResult;
  }

  public async createTestResult(
    testResultData: CreateTestResultDto,
  ): Promise<TestResult> {
    if (isEmpty(testResultData))
      throw new HttpException(400, "TestResultData is empty");
    const createUserData: TestResult = await this.testResults.create({
      ...testResultData,
    });

    return createUserData;
  }
}

export default TestResultService;
