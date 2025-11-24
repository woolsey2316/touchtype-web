import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "@config/config.js";
import { HttpException } from "@exceptions/HttpException.js";
import {
  DataStoredInToken,
  RequestWithUser,
} from "@interfaces/auth.interface.js";
import userModel from "@models/users.model.js";

const authMiddleware = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) => {
  try {
    const Authorization =
      req.cookies["Authorization"] ||
      (req.header("Authorization")
        ? req.header("Authorization").split("Bearer ")[1]
        : null);

    if (Authorization) {
      const secretKey: string = SECRET_KEY;
      const verificationResponse = jwt.verify(
        Authorization,
        secretKey,
      ) as DataStoredInToken;
      const userId = verificationResponse._id;
      const findUser = await userModel.findById(userId);

      if (findUser) {
        req.user = findUser;
        next();
      } else {
        next(new HttpException(401, "Wrong authentication token"));
      }
    } else {
      next(new HttpException(404, "Authentication token missing"));
    }
  } catch (error) {
    next(new HttpException(401, "Wrong authentication token"));
  }
};

export default authMiddleware;
