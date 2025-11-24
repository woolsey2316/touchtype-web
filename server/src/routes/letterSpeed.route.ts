import { Router } from "express";
import LetterSpeedController from "@controllers/letterSpeed.controller.js";
import { CreateLetterSpeedDto } from "@dtos/letterSpeed.dto.js";
import { Routes } from "@interfaces/routes.interface.js";
import validationMiddleware from "@middlewares/validation.middleware.js";

class LetterSpeedRoute implements Routes {
  public path = "/letter-speed";
  public router = Router();
  public letterSpeedController = new LetterSpeedController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}/:id`,
      this.letterSpeedController.getLetterSpeedByCharacter,
    );
    this.router.put(
      `${this.path}/:id`,
      validationMiddleware(CreateLetterSpeedDto, "body"),
      this.letterSpeedController.updateLetterSpeedData,
    );
  }
}

export default LetterSpeedRoute;
