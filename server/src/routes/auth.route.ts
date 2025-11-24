import { Router } from "express";
import AuthController from "@controllers/auth.controller.js";
import { CreateUserDto } from "@dtos/users.dto.js";
import { Routes } from "@interfaces/routes.interface.js";
import authMiddleware from "@middlewares/auth.middleware.js";
import validationMiddleware from "@middlewares/validation.middleware.js";

class AuthRoute implements Routes {
  public path = "/";
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}signup`,
      validationMiddleware(CreateUserDto, "body"),
      this.authController.signUp,
    );
    this.router.post(
      `${this.path}login`,
      validationMiddleware(CreateUserDto, "body"),
      this.authController.logIn,
    );
    this.router.post(
      `${this.path}logout`,
      authMiddleware,
      this.authController.logOut,
    );
  }
}

export default AuthRoute;
