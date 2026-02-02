import { logger } from "@utils/logger.js";
import type { app as AdminApp, auth as AdminAuth } from "firebase-admin";
import admin from "firebase-admin";

let firebaseAdmin: AdminApp.App | null = null;
let authInstance: AdminAuth.Auth | null = null;
let initializationAttempted = false;

// Initialize Firebase Admin SDK
const initializeFirebaseAdmin = async (): Promise<AdminApp.App | null> => {
  // Only attempt initialization once
  if (initializationAttempted) {
    return firebaseAdmin;
  }
  initializationAttempted = true;

  try {
    // Skip if already initialized
    if (admin.apps.length > 0) {
      return admin.apps[0];
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
      return app;
    } else if (projectId) {
      // Initialize with just project ID (limited functionality)
      const app = admin.initializeApp({
        projectId,
      });
      logger.info("✅ Firebase Admin initialized with project ID only");
      return app;
    } else {
      // No credentials available
      logger.warn(
        "⚠️  No Firebase credentials found. Authentication will be disabled.",
      );
      logger.warn(
        "   Set FIREBASE_SERVICE_ACCOUNT_JSON, GOOGLE_APPLICATION_CREDENTIALS, or FIREBASE_PROJECT_ID",
      );
      logger.warn("   Or set DISABLE_FIREBASE=true to suppress this warning");
      return null;
    }
  } catch (error) {
    logger.error("❌ Failed to initialize Firebase Admin SDK:", error);
    logger.warn("⚠️  Server will start without Firebase authentication");
    return null;
  }
};
// Initialize Firebase asynchronously on first use
let initPromise: Promise<AdminApp.App | null> | null = null;
export const getFirebaseAdmin = async () => {
  if (!initPromise) {
    initPromise = initializeFirebaseAdmin();
    const app = await initPromise;
    firebaseAdmin = app;
    if (app) {
      authInstance = app.auth();
    }
  }
  return initPromise;
};
// Initialize on module load (async)
getFirebaseAdmin().catch((err) => {
  logger.error("Fatal error initializing Firebase:", err);
});
export { firebaseAdmin };
export const auth: AdminAuth.Auth | null = authInstance;
