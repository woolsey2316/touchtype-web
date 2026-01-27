import { Router } from "express";
import UsernameController from "@controllers/username.controller.js";
import { UpdateUsernameDto } from "@dtos/users.dto.js";
import { Routes } from "@interfaces/routes.interface.js";
import validationMiddleware from "@middlewares/validation.middleware.js";

class UsernameRoute implements Routes {
  public path = "/username";
  public router = Router();
  public usernameController = new UsernameController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.put(
      `${this.path}/:id`,
      validationMiddleware(UpdateUsernameDto, "body"),
      this.usernameController.updateUsername,
    );
    this.router.get(
      `${this.path}/check`,
      this.usernameController.checkUsernameAvailability,
    );
  }
}

export default UsernameRoute;
