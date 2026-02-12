import { Router } from "express";
import UsersController from "@controllers/users.controller.js";
import { CreateUserDto } from "@dtos/users.dto.js";
import { Routes } from "@interfaces/routes.interface.js";
import validationMiddleware from "@middlewares/validation.middleware.js";
import {
  moderateRateLimit,
  generousRateLimit,
} from "@middlewares/rate-limit.middleware.js";

class UsersRoute implements Routes {
  public path = "/users";
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}`,
      generousRateLimit,
      this.usersController.getUsers,
    );
    this.router.get(
      `${this.path}/:id`,
      generousRateLimit,
      this.usersController.getUserById,
    );
    this.router.post(
      `${this.path}/find-or-create`,
      moderateRateLimit,
      this.usersController.findOrCreateUser,
    );
    this.router.post(
      `${this.path}`,
      moderateRateLimit,
      validationMiddleware(CreateUserDto, "body"),
      this.usersController.createUser,
    );
    this.router.put(
      `${this.path}/:id`,
      moderateRateLimit,
      validationMiddleware(CreateUserDto, "body", true),
      this.usersController.updateUser,
    );
  }
}

export default UsersRoute;
