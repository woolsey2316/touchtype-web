import { NextFunction, Response } from "express";
import { CreateLetterSpeedDto } from "@dtos/letterSpeed.dto.js";
import { LetterSpeed } from "@interfaces/letterSpeed.interface.js";
import letterSpeedService from "@services/letterSpeed.service.js";
import { RequestWithUser } from "@interfaces/auth.interface.js";
import { HttpException } from "@exceptions/HttpException.js";

class LetterSpeedController {
  public letterSpeedService = new letterSpeedService();

  public getLetterSpeedByCharacter = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const requestedUserId = req.params.userId as string;

      if (!requestedUserId || !req.user.userId) {
        throw new HttpException(
          400,
          "Bad Request: userId parameter is missing",
        );
      }

      // Ensure user can only access their own data
      if (req.user.userId !== requestedUserId) {
        throw new HttpException(
          403,
          "Forbidden: Cannot access other users' data",
        );
      }
      const findAllLetterSpeed: {
        lowercase: LetterSpeed[];
        symbols: LetterSpeed[];
      } = await this.letterSpeedService.getLetterAverages(requestedUserId);
      res.status(200).json({ data: findAllLetterSpeed, message: "findAll" });
    } catch (error) {
      next(error);
    }
  };

  public updateLetterSpeedData = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const letterSpeedData: CreateLetterSpeedDto = req.body;
      const userId = req.body.userId as string;

      // Ensure user can only update their own data
      if (req.user.userId !== userId) {
        throw new HttpException(
          403,
          "Forbidden: Cannot update other users' data",
        );
      }

      const createUserData = await this.letterSpeedService.upsertLetterSpeeds(
        userId,
        letterSpeedData.summaries,
      );

      res.status(201).json({ data: createUserData, message: "created" });
    } catch (error) {
      next(error);
    }
  };
}

export default LetterSpeedController;
