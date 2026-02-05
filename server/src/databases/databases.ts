import {
  MONGO_URI,
  REDIS_USERNAME,
  REDIS_PASSWORD,
  REDIS_HOST,
  REDIS_PORT,
} from "@config/config.js";
import { createClient } from "redis";

// Use MONGO_URI if available (for Docker), otherwise use MongoDB Atlas format
export const dbConnection = {
  url: MONGO_URI,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};

// Only create Redis client if configured (check for non-empty strings)
const isRedisConfigured =
  REDIS_HOST &&
  REDIS_HOST.trim() !== "" &&
  REDIS_PORT &&
  !isNaN(Number(REDIS_PORT));

const client = isRedisConfigured
  ? createClient({
      username: REDIS_USERNAME,
      password: REDIS_PASSWORD,
      socket: {
        host: REDIS_HOST,
        port: Number(REDIS_PORT),
      },
    })
  : null;

if (client) {
  client.on("error", (err) => console.log("Redis Client Error", err));
}

export const connectRedis = async () => {
  if (!client) {
    console.log("Redis not configured, skipping connection");
    return;
  }
  if (!client.isOpen) {
    await client.connect();
    console.log("Connected to Redis!");
  }
};

export default client;
