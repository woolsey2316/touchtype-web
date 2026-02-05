import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { type Application } from "express";
import helmet from "helmet";
import hpp from "hpp";
import morgan from "morgan";
import { connect, set, disconnect } from "mongoose";
import swaggerJSDoc from "swagger-jsdoc";
import { serve, setup } from "swagger-ui-express";
import {
  NODE_ENV,
  PORT,
  LOG_FORMAT,
  ORIGIN,
  CREDENTIALS,
} from "@config/config.js";
import { dbConnection, connectRedis } from "@databases/databases.js";
import { Routes } from "@interfaces/routes.interface.js";
import errorMiddleware from "@middlewares/error.middleware.js";
import { logger, stream } from "@utils/logger.js";

class App {
  public app: Application;
  public env: string;
  public port: string | number;
  private server?: import("http").Server;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || "development";
    this.port = PORT || 3000;

    if (this.env !== "test") {
      this.connectToDatabase();
      this.initializeSwagger();
    }
    this.initializeMiddlewares();
    this.initializeHealthCheck();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  public listen() {
    this.server = this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public async close(): Promise<void> {
    if (this.server) {
      await new Promise<void>((resolve, reject) => {
        this.server.close((err) => (err ? reject(err) : resolve()));
      });
    }
  }

  public async closeDatabaseConnection(): Promise<void> {
    try {
      await disconnect();
      console.log("Disconnected from MongoDB");
    } catch (error) {
      console.error("Error closing database connection:", error);
    }
  }

  public getServer() {
    return this.app;
  }

  private async connectToDatabase() {
    if (this.env !== "production") {
      set("debug", true);
    }
    // MongoDB Connection
    try {
      await connect(dbConnection.url);
      console.log("Connected to MongoDB!");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    }
    // Redis Conection
    try {
      await connectRedis();
    } catch (error) {
      console.error("Error connecting to Redis:", error);
    }
  }

  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT, { stream }));

    // Strict CORS configuration with whitelist validation
    const allowedOrigins = ORIGIN
      ? ORIGIN.split(",").map((origin) => origin.trim())
      : [];

    this.app.use(
      cors({
        origin: (origin, callback) => {
          // Allow requests with no origin (mobile apps, curl, etc.)
          if (!origin) {
            return callback(null, true);
          }

          // Check if origin is in the whitelist
          if (allowedOrigins.includes(origin)) {
            return callback(null, true);
          }

          // Reject unauthorized origins
          logger.warn(
            `Blocked CORS request from unauthorized origin: ${origin}`,
          );
          return callback(new Error("Not allowed by CORS"));
        },
        credentials: CREDENTIALS,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
        exposedHeaders: ["Content-Range", "X-Content-Range"],
        maxAge: 600, // 10 minutes cache for preflight requests
      }),
    );

    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  // Add health check endpoint
  private initializeHealthCheck() {
    this.app.get("/health", (req, res) => {
      res
        .status(200)
        .json({ status: "OK", timestamp: new Date().toISOString() });
    });
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use("/api", route.router);
    });
  }

  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: "REST API",
          version: "1.0.0",
          description: "Example docs",
        },
      },
      apis: ["swagger.yaml"],
    };

    const specs = swaggerJSDoc(options);
    this.app.use("/api-docs", serve, setup(specs));
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
