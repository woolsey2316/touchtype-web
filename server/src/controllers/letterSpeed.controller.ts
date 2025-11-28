import { NextFunction, Request, Response } from "express";
import { CreateLetterSpeedDto } from "@dtos/letterSpeed.dto.js";
import { LetterSpeed } from "@interfaces/letterSpeed.interface.js";
import letterSpeedService from "@services/letterSpeed.service.js";

class LetterSpeedController {
  public letterSpeedService = new letterSpeedService();

  public getLetterSpeedByCharacter = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const findAllLetterSpeed: {
        lowercase: LetterSpeed[];
        symbols: LetterSpeed[];
      } = await this.letterSpeedService.getLetterAverages(
        req.params.userId as string,
      );

      res.status(200).json({ data: findAllLetterSpeed, message: "findAll" });
    } catch (error) {
      next(error);
    }
  };

  public updateLetterSpeedData = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const letterSpeedData: CreateLetterSpeedDto = req.body;
      const userId = req.body.userId as string;
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
