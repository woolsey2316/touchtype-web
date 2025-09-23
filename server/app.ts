import express, {
  json,
  urlencoded,
  Application,
  Response,
  Request,
  NextFunction,
} from "express";
import cors from "cors";
import compression from "compression";
import session from "express-session";
import { xframe, xssProtection } from "lusca";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import passport from "passport";
import errorHandler from "errorhandler";

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI as string); // Example using Mongoose

// Create the MongoStore instance
const sessionStore = MongoStore.create({
  mongoUrl: process.env.MONGODB_URI, // Your MongoDB connection string
  collectionName: "keyflow", // Optional: Name of the collection to store sessions
  ttl: 14 * 24 * 60 * 60, // Optional: Session TTL in seconds (e.g., 14 days)
  autoRemove: "interval", // Optional: How expired sessions are removed
  autoRemoveInterval: 10, // Optional: Interval in minutes for auto removal
});

const CORS_WHITELIST: string[] = [process.env.APP_ORIGIN as string];

// Express configuration
const app: Application = express();
app.set("server_port", process.env.SERVER_PORT);
app.set("origin_uri", process.env.ORIGIN_URI);
app.use(compression());
app.use(
  cors({
    origin: (
      requestOrigin: string | undefined,
      callback: (err: Error | null, allow?: boolean) => void,
    ): void => {
      // allow requests with no origin
      if (requestOrigin && CORS_WHITELIST.indexOf(requestOrigin) === -1) {
        const message: string =
          "The CORS policy for this origin doesn't allow access from the particular origin.";
        return callback(new Error(message), false);
      } else {
        // tslint:disable-next-line:no-null-keyword
        return callback(null, true);
      }
    },
    credentials: true,
  }),
);
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET as string,
    store: sessionStore,
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(xframe("SAMEORIGIN"));
app.use(xssProtection(true));
app.use(function (req: Request, res: Response, next: NextFunction) {
  console.log(
    `[${req.method} ${req.originalUrl}] is called, body is ${JSON.stringify(req.body)}`,
  );
  next();
});
app.use((req: Request, res: Response, next: NextFunction) => {
  res.locals.user = req.user;
  next();
});
if (process.env.NODE_ENV === "development") {
  app.use(errorHandler());
}

// Primary app routes.
export default app;
