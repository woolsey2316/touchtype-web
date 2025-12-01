import { Router } from "express";
import TestResultController from "@controllers/testResult.controller.js";
import { CreateTestResultDto } from "@dtos/testResult.dto.js";
import { Routes } from "@interfaces/routes.interface.js";
import validationMiddleware from "@middlewares/validation.middleware.js";

class TestResultRoute implements Routes {
  public path = "/test-results";
  public router = Router();
  public testResultController = new TestResultController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}/:userId`,
      this.testResultController.getUserDashboardData,
    );
    this.router.get(
      `${this.path}/daily-time/:email`,
      this.testResultController.getTimeSpentToday,
    );
    this.router.post(
      `${this.path}`,
      validationMiddleware(CreateTestResultDto, "body"),
      this.testResultController.createTestResult,
    );
  }
}

export default TestResultRoute;
