import { Router } from "express";
import TestResultController from "@controllers/testResult.controller";
import { CreateTestResultDto } from "@dtos/testResult.dto";
import { Routes } from "@interfaces/routes.interface";
import validationMiddleware from "@middlewares/validation.middleware";

class TestResultRoute implements Routes {
  public path = "/test-results";
  public router = Router();
  public testResultController = new TestResultController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}/:id`,
      this.testResultController.getUserDashboardData,
    );
    this.router.post(
      `${this.path}`,
      validationMiddleware(CreateTestResultDto, "body"),
      this.testResultController.createTestResult,
    );
  }
}

export default TestResultRoute;
