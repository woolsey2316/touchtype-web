import { Router } from "express";
import * as controllers from "../controllers/user";
import { check } from "express-validator";
import { PASSWORD_MIN_LENGTH } from "../../app/shared/constants";
const user: Router = Router();

user.route("/signup").post(
  [
    check("email", "toast.user.email").isEmail(),
    check("password", "toast.user.password_too_short").isLength({
      min: PASSWORD_MIN_LENGTH,
    }),
    check("confirmPassword", "toast.user.confirm_password")
      .exists()
      .custom((value, { req }) => value === req.body.password),
    check("name", "toast.user.name").not().isEmpty(),
  ],
  controllers.signUp,
);
user
  .route("/login")
  .post(
    [
      check("email", "toast.user.email").isEmail(),
      check("password", "toast.user.password_empty").not().isEmpty(),
    ],
    controllers.logIn,
  );
