import { HttpException } from "@exceptions/HttpException.js";
import userModel from "@models/users.model.js";
import { logger } from "@utils/logger.js";
import type { auth as AdminAuth } from "firebase-admin";
/**
 * Middleware to verify Firebase ID tokens
 * Supports both Authorization header (Bearer token) and cookies
 */
const firebaseAuthMiddleware = (adminAuth: AdminAuth.Auth | null) => {
  return async (req, res, next) => {
    try {
      // Check if Firebase is initialized
      if (!adminAuth) {
        logger.error("Firebase Auth not initialized - authentication disabled");
        return next(
          new HttpException(503, "Authentication service unavailable"),
        );
      }

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
      const decodedToken = await adminAuth.verifyIdToken(idToken);
      const firebaseUid = decodedToken.uid;
      const findUser = await userModel.findOne({ userId: firebaseUid });

      if (!findUser) {
        logger.warn(
          `User with Firebase UID ${firebaseUid} not found in database`,
        );
        return next(new HttpException(404, "User not found"));
      }

      req.user = findUser;
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
};

export default firebaseAuthMiddleware;
