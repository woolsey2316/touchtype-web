import express, { Application } from "express";

class MinimalApp {
  public app: Application;

  constructor() {
    this.app = express();
    this.app.use(express.json());
  }

  public getServer() {
    return this.app;
  }
}

export default MinimalApp;
