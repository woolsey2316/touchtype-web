import { config } from "dotenv";
config({ path: `.env.${process.env.NODE_ENV || "development"}` });

export const CREDENTIALS = process.env.CREDENTIALS === "true";
export const {
  NODE_ENV,
  PORT,
  DB_HOST,
  DB_PASSWORD,
  DB_DATABASE,
  SECRET_KEY,
  LOG_FORMAT,
  LOG_DIR,
  ORIGIN,
  REDIS_USERNAME,
  REDIS_PASSWORD,
  REDIS_HOST,
  REDIS_PORT,
  MONGO_URI,
} = process.env;
