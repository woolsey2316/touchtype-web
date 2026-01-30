import { Router } from "express";
import TestResultController from "@controllers/testResult.controller.js";
import { CreateTestResultDto } from "@dtos/testResult.dto.js";
import { Routes } from "@interfaces/routes.interface.js";
import validationMiddleware from "@middlewares/validation.middleware.js";
import firebaseAuthMiddleware from "@middlewares/firebase-auth.middleware.js";

class TestResultRoute implements Routes {
  public path = "/test-results";
  public router = Router();
  public testResultController = new TestResultController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // Protected: Get user's own dashboard data
    this.router.get(
      `${this.path}/:userId`,
      firebaseAuthMiddleware,
      this.testResultController.getUserDashboardData,
    );

    // Protected: Get user's own time spent today
    this.router.get(
      `${this.path}/daily-time/:email`,
      firebaseAuthMiddleware,
      this.testResultController.getTimeSpentToday,
    );

    // Protected: Create test result (only authenticated users)
    this.router.post(
      `${this.path}`,
      firebaseAuthMiddleware,
      validationMiddleware(CreateTestResultDto, "body"),
      this.testResultController.createTestResult,
    );
  }
}

export default TestResultRoute;
