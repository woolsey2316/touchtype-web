import { RequestHandler, Request, Response, NextFunction } from "express";
import passport from "passport";
import UserCollection from "../models/User/UserCollection";
import UserDocument from "../models/User/UserDocument";
import { validationErrorResponse } from "./utils";
import { validationResult } from "express-validator";
import _ from "lodash";

export const signUp: RequestHandler[] = [
  (req: Request, res: Response, next: NextFunction) => {
    const invalid: Response | false = validationErrorResponse(
      res,
      validationResult(req),
    );
    if (invalid) {
      return invalid;
    }
    const user: UserDocument = new UserCollection({
      email: req.body.email,
      password: req.body.password,
      gender: req.body.gender,
      name: req.body.name,
      address: req.body.address,
      avatarUrl: req.body.avatarUrl,
      preferences: req.body.preferences,
      invitationCode: req.body.invitationCode,
    });
    UserCollection.findOne({ email: _.toLower(req.body.email) })
      .exec()
      .then((existingUser: UserDocument | null) => {
        if (existingUser) {
          return Promise.reject(
            res
              .status(409)
              .json({ message: "toast.user.upload_exist_account" }),
          );
        }
        return user.save();
      })
      .then((user: UserDocument) => {
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
          return res.redirect(302, "/test"); // Get access token
        });
      })
      .catch((error: Response) => {
        return next(error);
      });
  },
];

/**
 * Sign in using email and password.
 */
export const logIn: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const invalid: Response | false = validationErrorResponse(
    res,
    validationResult(req),
  );
  if (invalid) {
    return invalid;
  }

  passport.authenticate("local", (err: Error, user: UserDocument) => {
    if (err) {
      return res.status(401).json({ message: err.message });
    }
    if (!user) {
      return res.status(401).json({ message: "toast.user.sign_in_failed" });
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(401).json({ message: "toast.user.sign_in_failed" });
      }
      res.redirect(302, "/test"); // Get access token
    });
  })(req, res, next);
};
