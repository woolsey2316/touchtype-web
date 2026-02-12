import { Router } from "express";
import UsernameController from "@controllers/username.controller.js";
import { UpdateUsernameDto } from "@dtos/users.dto.js";
import { Routes } from "@interfaces/routes.interface.js";
import validationMiddleware from "@middlewares/validation.middleware.js";
import type { auth as AdminAuth } from "firebase-admin";
import firebaseAuthMiddleware from "@middlewares/firebase-auth.middleware.js";
import {
  moderateRateLimit,
  generousRateLimit,
} from "@middlewares/rate-limit.middleware.js";
class UsernameRoute implements Routes {
  public path = "/username";
  public router = Router();
  public usernameController = new UsernameController();
  public auth: AdminAuth.Auth = null;

  constructor(auth: AdminAuth.Auth) {
    this.auth = auth;
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.put(
      `${this.path}/:id`,
      moderateRateLimit,
      firebaseAuthMiddleware(this.auth),
      validationMiddleware(UpdateUsernameDto, "body"),
      this.usernameController.updateUsername,
    );
    this.router.get(
      `${this.path}/check`,
      generousRateLimit,
      this.usernameController.checkUsernameAvailability,
    );
  }
}

export default UsernameRoute;
