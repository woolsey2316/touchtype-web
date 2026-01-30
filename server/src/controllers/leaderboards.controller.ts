import { NextFunction, Response } from "express";
import { CreateLeaderboardEntryDto } from "@dtos/leaderboard.dto.js";
import { LeaderboardEntry } from "@interfaces/leaderboardEntry.interface.js";
import leaderboardsService from "@services/leaderboards.service.js";
import { RequestWithUser } from "@interfaces/auth.interface.js";
import { HttpException } from "@exceptions/HttpException.js";
import { Request } from "express";

class LeaderboardsController {
  public leaderboardsService = new leaderboardsService();

  // Public endpoint - anyone can view leaderboards
  public getTopScores = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const scope = req.params.scope || "daily";
      const testType = req.params.testType || "ENGLISH";
      const topScores: LeaderboardEntry[] =
        await this.leaderboardsService.getTopScores(scope, testType);

      res.status(200).json({ data: topScores, message: "findAll" });
    } catch (error) {
      next(error);
    }
  };

  // Protected endpoint - only authenticated users can submit
  public submitScore = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const leaderboardData: CreateLeaderboardEntryDto = req.body;

      // Ensure user can only submit scores for themselves
      if (req.user.userId !== leaderboardData.userId) {
        throw new HttpException(
          403,
          "Forbidden: Cannot submit scores for other users",
        );
      }

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
