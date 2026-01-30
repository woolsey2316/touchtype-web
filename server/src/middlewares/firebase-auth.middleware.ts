import { NextFunction, Response } from "express";
import { getFirebaseAdmin } from "@/config/firebase-admin.js";
import { HttpException } from "@exceptions/HttpException.js";
import { RequestWithUser } from "@interfaces/auth.interface.js";
import userModel from "@models/users.model.js";
import { logger } from "@utils/logger.js";

/**
 * Middleware to verify Firebase ID tokens
 * Supports both Authorization header (Bearer token) and cookies
 */
const firebaseAuthMiddleware = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Ensure Firebase is initialized (await the promise)
    const admin = await getFirebaseAdmin();

    // Check if Firebase is initialized
    if (!admin) {
      logger.error("Firebase Auth not initialized - authentication disabled");
      return next(new HttpException(503, "Authentication service unavailable"));
    }

    // Get the auth instance from the initialized admin app
    const auth = admin.auth();

    // Get token from Authorization header or cookie
    let idToken: string | null = null;

    // Check Authorization header first (Bearer token)
    const authHeader = req.header("Authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      idToken = authHeader.split("Bearer ")[1];
    }

    // Fallback to cookie
    if (!idToken && req.cookies["idToken"]) {
      idToken = req.cookies["idToken"];
    }

    if (!idToken) {
      return next(new HttpException(401, "Authentication token missing"));
    }

    // Verify the Firebase ID token
    const decodedToken = await auth.verifyIdToken(idToken);
    const firebaseUid = decodedToken.uid;

    // Find user in MongoDB by Firebase UID
    const findUser = await userModel.findOne({ userId: firebaseUid });

    if (!findUser) {
      logger.warn(
        `User with Firebase UID ${firebaseUid} not found in database`,
      );
      return next(new HttpException(404, "User not found"));
    }

    // Attach user to request object
    req.user = findUser;

    // Also attach the Firebase UID for convenience
    req.firebaseUid = firebaseUid;

    next();
  } catch (error) {
    logger.error("Firebase auth error:", error);

    if (error.code === "auth/id-token-expired") {
      return next(new HttpException(401, "Token expired"));
    }

    if (error.code === "auth/argument-error") {
      return next(new HttpException(401, "Invalid token format"));
    }

    return next(new HttpException(401, "Invalid authentication token"));
  }
};

/**
 * Optional Firebase auth middleware - doesn't fail if no token present
 * Useful for endpoints that work differently for authenticated vs anonymous users
 */
export const optionalFirebaseAuth = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Ensure Firebase is initialized (await the promise)
    const admin = await getFirebaseAdmin();

    // Check if Firebase is initialized
    if (!admin) {
      logger.warn("Firebase Auth not initialized - skipping authentication");
      return next();
    }

    // Get the auth instance
    const auth = admin.auth();

    // Get token from Authorization header or cookie
    let idToken: string | null = null;

    const authHeader = req.header("Authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      idToken = authHeader.split("Bearer ")[1];
    }

    if (!idToken && req.cookies["idToken"]) {
      idToken = req.cookies["idToken"];
    }

    // If no token, just continue without attaching user
    if (!idToken) {
      return next();
    }

    // Verify and attach user if token exists
    const decodedToken = await auth.verifyIdToken(idToken);
    const firebaseUid = decodedToken.uid;
    const findUser = await userModel.findOne({ userId: firebaseUid });

    if (findUser) {
      req.user = findUser;
      req.firebaseUid = firebaseUid;
    }

    next();
  } catch (error) {
    // On error, just continue without user (don't block the request)
    logger.warn("Optional Firebase auth failed:", error);
    next();
  }
};

export default firebaseAuthMiddleware;
