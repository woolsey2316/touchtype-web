import { RequestHandler, Request, Response, NextFunction } from "express";
import { validationErrorResponse } from "./utils";
import { validationResult } from "express-validator";
import testResultCollection from "../models/TestResult/TestResultCollection";

export const readAll: RequestHandler = (req: Request, res: Response) => {
  const invalid: Response | false = validationErrorResponse(
    res,
    validationResult(req),
  );
  if (invalid) {
    return invalid;
  }
  const email: string = req.params.email;
  const allTests = testResultCollection.find({ email });
  return res.status(200).json(allTests);
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
    const newTestResult = await testResultCollection.create({
      email,
      testType,
      score,
      wpm,
      accuracy,
    });
    return res.status(201).json(newTestResult);
  } catch (error) {
    return next(error);
  }
};
