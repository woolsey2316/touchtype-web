import { NextFunction, Request, Response } from "express";
import { CreateTestResultDto } from "@dtos/testResult.dto";
import { TestResult } from "@interfaces/testResult.interface";
import testResultService from "@services/testResult.service";

class TestResultsController {
  public testResultService = new testResultService();

  public getTestResults = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const findAllTestResults: TestResult[] =
        await this.testResultService.findAllTestResults();

      res.status(200).json({ data: findAllTestResults, message: "findAll" });
    } catch (error) {
      next(error);
    }
  };

  public getTestResultByEmail = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const email: string = req.params.email;
      const findTestResults: TestResult[] =
        await this.testResultService.findTestResultByEmail(email);

      res.status(200).json({ data: findTestResults, message: "findOne" });
    } catch (error) {
      next(error);
    }
  };

  public createTestResult = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const testResultData: CreateTestResultDto = req.body;
      const createUserData: TestResult =
        await this.testResultService.createTestResult(testResultData);

      res.status(201).json({ data: createUserData, message: "created" });
    } catch (error) {
      next(error);
    }
  };
}

export default TestResultsController;
