import {
  DB_HOST,
  DB_PASSWORD,
  DB_DATABASE,
  REDIS_USERNAME,
  REDIS_PASSWORD,
  REDIS_HOST,
  REDIS_PORT,
} from "@config/config.js";
import { createClient } from "redis";

export const dbConnection = {
  url: `mongodb+srv://${DB_HOST}:${DB_PASSWORD}${DB_DATABASE}`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};

const client = createClient({
  username: REDIS_USERNAME,
  password: REDIS_PASSWORD,
  socket: {
    host: REDIS_HOST,
    port: Number(REDIS_PORT),
  },
});

client.on("error", (err) => console.log("Redis Client Error", err));

export const connectRedis = async () => {
  if (!client.isOpen) {
    await client.connect();
    console.log("Connected to Redis!");
  }
};

export default client;
