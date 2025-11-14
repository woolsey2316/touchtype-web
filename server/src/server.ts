import App from "@/app.ts";
import AuthRoute from "@routes/auth.route.ts";
import IndexRoute from "@routes/index.route.ts";
import UsersRoute from "@routes/users.route.ts";
import TestResultRoute from "@routes/testResult.route.ts";
import validateEnv from "@utils/validateEnv.ts";

validateEnv();

const app = new App([
  new IndexRoute(),
  new UsersRoute(),
  new AuthRoute(),
  new TestResultRoute(),
]);

app.listen();
