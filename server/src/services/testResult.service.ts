import { CreateTestResultDto } from "@dtos/testResult.dto";
import { HttpException } from "@exceptions/HttpException";
import { TestResult } from "@interfaces/testResult.interface";
import testResultModel from "@models/testResult.model";
import { isEmpty } from "@utils/util";

class TestResultService {
  public testResults = testResultModel;

  public async findAllTestResults(): Promise<TestResult[]> {
    const testResults: TestResult[] = await this.testResults.find();
    return testResults;
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
