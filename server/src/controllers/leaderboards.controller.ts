import { NextFunction, Request, Response } from "express";
import { CreateLeaderboardEntryDto } from "@dtos/leaderboard.dto.js";
import { LeaderboardEntry } from "@interfaces/leaderboardEntry.interface.js";
import leaderboardsService from "@services/leaderboards.service.js";

class LeaderboardsController {
  public leaderboardsService = new leaderboardsService();

  public getTopScores = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const topScores: LeaderboardEntry[] =
        await this.leaderboardsService.getTopScores(
          req.params.scope as string,
          req.params.testType as string,
        );

      res.status(200).json({ data: topScores, message: "findAll" });
    } catch (error) {
      next(error);
    }
  };
  public submitScore = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const leaderboardData: CreateLeaderboardEntryDto = req.body;
      const createLeaderboardEntry = this.leaderboardsService.submitTestResult({
        ...leaderboardData,
      });

      res
        .status(201)
        .json({ data: createLeaderboardEntry, message: "created" });
    } catch (error) {
      next(error);
    }
  };
}
export default LeaderboardsController;
