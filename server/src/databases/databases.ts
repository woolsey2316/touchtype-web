import { DB_HOST, DB_PASSWORD, DB_DATABASE } from "@config/config.js";

export const dbConnection = {
  url: `mongodb+srv://${DB_HOST}:${DB_PASSWORD}${DB_DATABASE}`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
