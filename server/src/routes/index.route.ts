import { Router } from "express";
import IndexController from "@controllers/index.controller.js";
import { Routes } from "@interfaces/routes.interface.js";
import { generousRateLimit } from "@middlewares/rate-limit.middleware.js";

class IndexRoute implements Routes {
  public path = "/";
  public router = Router();
  public indexController = new IndexController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}`,
      generousRateLimit,
      this.indexController.index,
    );
    this.router.get(
      `${this.path}health`,
      generousRateLimit,
      this.indexController.index,
    );
  }
}

export default IndexRoute;
