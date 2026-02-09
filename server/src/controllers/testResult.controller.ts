import { NextFunction, Response } from "express";
import { CreateTestResultDto } from "@dtos/testResult.dto.js";
import { TestResult } from "@interfaces/testResult.interface.js";
import testResultService from "@services/testResult.service.js";
import { RequestWithUser } from "@interfaces/auth.interface.js";
import { HttpException } from "@exceptions/HttpException.js";

class TestResultsController {
  public testResultService = new testResultService();

  public getUserDashboardData = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const requestedUserId = req.params.userId as string;

      // Ensure user can only access their own data
      if (req.user.userId !== requestedUserId) {
        throw new HttpException(
          403,
          "Forbidden: Cannot access other users' data",
        );
      }

      const dashboardData =
        await this.testResultService.findAllUsersDashboardData(requestedUserId);

      res.status(200).json({ data: dashboardData, message: "findAll" });
    } catch (error) {
      next(error);
    }
  };

  public getTestResultByEmail = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const email: string = req.params.email;

      // Ensure user can only access their own data
      if (req.user.email !== email) {
        throw new HttpException(
          403,
          "Forbidden: Cannot access other users' data",
        );
      }

      const findTestResults: TestResult[] =
        await this.testResultService.findTestResultByEmail(email);

      res.status(200).json({ data: findTestResults, message: "findOne" });
    } catch (error) {
      next(error);
    }
  };

  public getTimeSpentToday = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const userId: string = req.params.userId;

      // Ensure user can only access their own data
      if (req.user.userId !== userId) {
        throw new HttpException(
          403,
          "Forbidden: Cannot access other users' data",
        );
      }

      const findTimeSpent: number =
        await this.testResultService.getTotalTimeSpentToday(userId);

      res.status(200).json({ data: findTimeSpent, message: "findOne" });
    } catch (error) {
      next(error);
    }
  };

  public createTestResult = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const testResultData: CreateTestResultDto = req.body;

      // Ensure user can only create results for themselves
      if (req.user.userId !== testResultData.userId) {
        throw new HttpException(
          403,
          "Forbidden: Cannot create results for other users",
        );
      }

      const createUserData: TestResult =
        await this.testResultService.createTestResult(testResultData);

      res.status(201).json({ data: createUserData, message: "created" });
    } catch (error) {
      next(error);
    }
  };
}

export default TestResultsController;
