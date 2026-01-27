import "reflect-metadata";
import App from "@/app.js";
import AuthRoute from "@routes/auth.route.js";
import IndexRoute from "@routes/index.route.js";
import LetterSpeedRoute from "@routes/letterSpeed.route.js";
import LeaderboardsRoute from "@routes/leaderboards.route.js";
import TestResultRoute from "@routes/testResult.route.js";
import UsersRoute from "@routes/users.route.js";
import UsernameRoute from "@routes/username.route.js";
import validateEnv from "@utils/validateEnv.js";

validateEnv();

const app = new App([
  new IndexRoute(),
  new UsersRoute(),
  new AuthRoute(),
  new TestResultRoute(),
  new LetterSpeedRoute(),
  new LeaderboardsRoute(),
  new UsernameRoute(),
]);

app.listen();
