import { logger } from "@utils/logger.js";
import type { app as AdminApp, auth as AdminAuth } from "firebase-admin";
import admin from "firebase-admin";

let firebaseAdmin: AdminApp.App | null = null;
let authInstance: AdminAuth.Auth | null = null;
let initializationAttempted = false;

// Initialize Firebase Admin SDK
const initializeFirebaseAdmin = (): AdminApp.App | null => {
  // Only attempt initialization once
  if (initializationAttempted) {
    return firebaseAdmin;
  }

  initializationAttempted = true;

  try {
    // Skip if already initialized
    if (admin.apps.length > 0) {
      firebaseAdmin = admin.apps[0];
      authInstance = firebaseAdmin.auth();
      return firebaseAdmin;
    }

    const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
    const googleCredentials = process.env.GOOGLE_APPLICATION_CREDENTIALS;
    const projectId = process.env.FIREBASE_PROJECT_ID;

    if (serviceAccount) {
      try {
        const serviceAccountObj = JSON.parse(serviceAccount);
        const app = admin.initializeApp({
          credential: admin.credential.cert(serviceAccountObj),
        });
        logger.info("✅ Firebase Admin initialized with service account JSON");
        firebaseAdmin = app;
        authInstance = app.auth();
        return app;
      } catch (error) {
        logger.error("Failed to parse Firebase service account JSON:", error);
        throw error;
      }
    } else if (googleCredentials) {
      const app = admin.initializeApp({
        credential: admin.credential.applicationDefault(),
      });
      logger.info(
        "✅ Firebase Admin initialized with Application Default Credentials",
      );
      firebaseAdmin = app;
      authInstance = app.auth();
      return app;
    } else if (projectId) {
      const app = admin.initializeApp({
        projectId,
      });
      logger.info("✅ Firebase Admin initialized with project ID only");
      firebaseAdmin = app;
      authInstance = app.auth();
      return app;
    } else {
      logger.warn(
        "⚠️  No Firebase credentials found. Authentication will be disabled.",
      );
      logger.warn(
        "   Set FIREBASE_SERVICE_ACCOUNT_JSON, GOOGLE_APPLICATION_CREDENTIALS, or FIREBASE_PROJECT_ID",
      );
      return null;
    }
  } catch (error) {
    logger.error("❌ Failed to initialize Firebase Admin SDK:", error);
    logger.warn("⚠️  Server will start without Firebase authentication");
    return null;
  }
};

// Initialize immediately on module load (synchronous)
firebaseAdmin = initializeFirebaseAdmin();

// Export function to get Firebase admin (returns cached instance)
export const getFirebaseAdmin = (): AdminApp.App | null => {
  return firebaseAdmin;
};

// Export function to get Firebase auth (returns cached instance)
export const getFirebaseAuth = (): AdminAuth.Auth | null => {
  return authInstance;
};

export { firebaseAdmin };
export const auth: AdminAuth.Auth | null = authInstance;
