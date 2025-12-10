import { Router } from "express";
import AuthController from "@controllers/auth.controller.js";
import { CreateUserDto } from "@dtos/users.dto.js";
import { Routes } from "@interfaces/routes.interface.js";
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
  }
}

export default AuthRoute;
