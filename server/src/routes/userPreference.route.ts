import { Router } from "express";
import UserPreferencesController from "@controllers/userPreference.controller.js";
import { CreateUserPreferencesDto } from "@dtos/userPreference.dto.js";
import { Routes } from "@interfaces/routes.interface.js";
import validationMiddleware from "@middlewares/validation.middleware.js";

class UserPreferencesRoute implements Routes {
  public path = "/user-preferences";
  public router = Router();
  public userPreferencesController = new UserPreferencesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}/:id`,
      this.userPreferencesController.getUserPreferencesById,
    );
    this.router.post(
      `${this.path}`,
      validationMiddleware(CreateUserPreferencesDto, "body"),
      this.userPreferencesController.createUserPreferences,
    );
    this.router.put(
      `${this.path}/:id`,
      validationMiddleware(CreateUserPreferencesDto, "body", true),
      this.userPreferencesController.updateUserPreferences,
    );
    this.router.delete(
      `${this.path}/:id`,
      this.userPreferencesController.deleteUserPreferences,
    );
  }
}

export default UserPreferencesRoute;
