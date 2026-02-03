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
import { getFirebaseAuth } from "@config/firebase-admin.js";

validateEnv();

const auth = getFirebaseAuth();

const app = new App([
  new IndexRoute(),
  new UsersRoute(),
  new AuthRoute(),
  new TestResultRoute(auth),
  new LetterSpeedRoute(auth),
  new LeaderboardsRoute(auth),
  new UsernameRoute(auth),
]);

app.listen();
