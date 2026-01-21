import { Router } from "express";
import LeaderboardsController from "@controllers/leaderboards.controller.js";
import { CreateLeaderboardEntryDto } from "@dtos/leaderboard.dto.js";
import { Routes } from "@interfaces/routes.interface.js";
import validationMiddleware from "@middlewares/validation.middleware.js";

export default class LeaderboardsRoute implements Routes {
  public path = "/leaderboards";
  public router = Router();
  public leaderboardsController = new LeaderboardsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}/:scope/:testType`,
      this.leaderboardsController.getTopScores,
    );
    this.router.put(
      `${this.path}`,
      validationMiddleware(CreateLeaderboardEntryDto, "body"),
      this.leaderboardsController.submitScore,
    );
  }
}
