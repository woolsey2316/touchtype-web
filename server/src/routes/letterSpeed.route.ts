import { Router } from "express";
import LetterSpeedController from "@controllers/letterSpeed.controller.js";
import { CreateLetterSpeedDto } from "@dtos/letterSpeed.dto.js";
import { Routes } from "@interfaces/routes.interface.js";
import validationMiddleware from "@middlewares/validation.middleware.js";
import firebaseAuthMiddleware from "@middlewares/firebase-auth.middleware.js";
import type { auth as AdminAuth } from "firebase-admin";
class LetterSpeedRoute implements Routes {
  public path = "/letter-speed";
  public router = Router();
  public letterSpeedController = new LetterSpeedController();
  auth = null;

  constructor(auth: AdminAuth.Auth | null) {
    this.auth = auth;
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // Protected: Get user's own letter speed data
    this.router.get(
      `${this.path}/:userId`,
      firebaseAuthMiddleware(this.auth),
      this.letterSpeedController.getLetterSpeedByCharacter,
    );

    // Protected: Update user's own letter speed data
    this.router.put(
      `${this.path}`,
      firebaseAuthMiddleware(this.auth),
      validationMiddleware(CreateLetterSpeedDto, "body"),
      this.letterSpeedController.updateLetterSpeedData,
    );
  }
}

export default LetterSpeedRoute;
