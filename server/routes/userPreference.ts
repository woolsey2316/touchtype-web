import { Router } from "express";
import * as controllers from "../controllers/userPreference";
import passport from "passport";

const userPreference: Router = Router();

userPreference.route("/").get(controllers.read);
userPreference.route("/create").post(controllers.add);
userPreference
  .route("/edit")
  .post(
    passport.authenticate("bearer", { session: false }),
    controllers.update,
  );
export default userPreference;
