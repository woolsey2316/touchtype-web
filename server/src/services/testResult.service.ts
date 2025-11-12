import { CreateTestResultDto } from "@dtos/testResult.dto";
import { HttpException } from "@exceptions/HttpException";
import { TestResult } from "@interfaces/testResult.interface";
import testResultModel from "@models/testResult.model";
import { isEmpty } from "@utils/util";

class TestResultService {
  public testResults = testResultModel;

  public async findAllUsersDashboardData(userId: string): Promise<{
    overall: number[];
    lowercase: number[];
    symbol: number[];
    accuracy: number;
    score: number;
    totalTime: number;
  }> {
    const testResults: TestResult[] = await this.testResults
      .find({ userId })
      .sort({ createdAt: 1 });

    const wpm = testResults.map((tr) => tr.wpm);
    const lowercaseWpm = testResults
      .map((tr) => tr.lowercaseWpm)
      .filter((v) => v !== undefined && v !== null);
    const symbolWpm = testResults
      .map((tr) => tr.symbolWpm)
      .filter((v) => v !== undefined && v !== null);

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
