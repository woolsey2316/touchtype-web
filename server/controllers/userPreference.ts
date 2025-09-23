import { RequestHandler, Request, Response, NextFunction } from "express";
import { validationErrorResponse } from "./utils";
import { validationResult } from "express-validator";
import UserPreferenceCollection from "../models/UserPreferences/UserPreferenceCollection";
import UserPreferenceDocument from "../models/UserPreferences/UserPreferenceDocument";
import UserDocument from "../models/User/UserDocument";
export const read: RequestHandler = (req: Request, res: Response) => {
  const invalid: Response | false = validationErrorResponse(
    res,
    validationResult(req),
  );
  if (invalid) {
    return invalid;
  }
  const email: string = req.params.email;
  const preferences = UserPreferenceCollection.findOne({ email });
  return res.status(200).json(preferences);
};

export const add: RequestHandler = async (
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
  try {
    const { email, testType, score, wpm, accuracy } = req.body;
    const newUserPreference = await UserPreferenceCollection.create({
      email,
      testType,
      score,
      wpm,
      accuracy,
    });
    return res.status(201).json(newUserPreference);
  } catch (error) {
    return next(error);
  }
};

export const update: RequestHandler = (
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

  UserPreferenceCollection.findById(req.body._id)
    .exec()
    .then((preferences) => {
      if (!preferences) {
        return Promise.reject(
          res.status(404).json({ message: "toast.preferences.not_found" }),
        );
      }
      const user: UserDocument = req.user as UserDocument;
      if (preferences.author !== user._id.toString()) {
        return Promise.reject(
          res.status(401).json({ message: "toast.user.attack_alert" }),
        );
      }
      const update: Partial<UserPreferenceDocument> = {};
      // Only update fields that were actually passed in the request body.
      if (req.body.zipperAnimation !== undefined)
        update.zipperAnimation = req.body.zipperAnimation;
      if (req.body.cursorCharacter !== undefined)
        update.cursorCharacter = req.body.cursorCharacter;
      if (req.body.smoothCursor !== undefined)
        update.smoothCursor = req.body.smoothCursor;
      if (req.body.mode !== undefined) update.mode = req.body.mode;
      if (req.body.fontFamily !== undefined)
        update.fontFamily = req.body.fontFamily;
      if (req.body.spaceCharacter !== undefined)
        update.spaceCharacter = req.body.spaceCharacter;

      return UserPreferenceCollection.findByIdAndUpdate(
        req.body._id,
        update,
      ).exec();
    })
    .then((updated) => {
      if (!updated) {
        return Promise.reject(
          res.status(404).json({ message: "toast.preferences.not_found" }),
        );
      }
      return res.status(200).json(updated);
    })
    .catch((error: Response) => {
      return next(error);
    });
};
