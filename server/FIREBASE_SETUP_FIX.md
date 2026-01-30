# Firebase Authentication Setup Fix

## Problem

The server was crashing on startup with:

```
TypeError: Cannot read properties of undefined (reading 'prototype')
    at Object.<anonymous> (/node_modules/buffer-equal-constant-time/index.js:37:35)
```

This was caused by:

1. **Node.js v25 compatibility issue** with `firebase-admin` dependencies
2. **Eager loading** of firebase-admin even when disabled via `DISABLE_FIREBASE=true`

## Solution

Implemented **dynamic imports** for Firebase Admin SDK:

### Changes Made

**`/server/src/config/firebase-admin.ts`:**

- Changed from `import admin from "firebase-admin"` (eager load)
- To `await import("firebase-admin")` (lazy load)
- Firebase only loads when `DISABLE_FIREBASE !== 'true'`
- Uses type-only imports for TypeScript types

### How It Works

```typescript
// Type-only import - doesn't load the module
import type { app as AdminApp } from "firebase-admin";

// Dynamic import - only loads when needed
const adminModule = await import("firebase-admin");
```

## Current Configuration

**Development** (`.env.development.local`):

```bash
DISABLE_FIREBASE=true  # Server runs without Firebase auth
```

**Production** (when ready):

```bash
# Remove DISABLE_FIREBASE and add one of:
FIREBASE_SERVICE_ACCOUNT_JSON='{"type":"service_account",...}'
# OR
GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json
# OR
FIREBASE_PROJECT_ID=your-project-id
```

## Status

✅ **Server now starts successfully**  
✅ **Connects to MongoDB**  
✅ **Connects to Redis**  
⚠️ **Firebase authentication disabled** (development mode)

## Testing

The server is working - you should see in your `yarn dev` terminal:

```
Connected to MongoDB
Connected to Redis
⚠️  Firebase Admin SDK is disabled via DISABLE_FIREBASE env variable
🚀 App listening on port 3001
```

## Next Steps

### To Enable Firebase Auth (When Ready):

1. **Get Firebase Service Account**:

   - Go to [Firebase Console](https://console.firebase.google.com)
   - Your Project → Settings → Service Accounts
   - Click "Generate New Private Key"
   - Save the JSON file

2. **Add to Environment**:

   ```bash
   # Edit server/.env.development.local
   # Remove or comment out this line:
   # DISABLE_FIREBASE=true

   # Add this line (paste your JSON as a string):
   FIREBASE_SERVICE_ACCOUNT_JSON='{"type":"service_account","project_id":"your-project","private_key_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n","client_email":"...","client_id":"...","auth_uri":"...","token_uri":"...","auth_provider_x509_cert_url":"...","client_x509_cert_url":"..."}'
   ```

3. **Restart Server**:

   ```bash
   # Stop current yarn dev (Ctrl+C)
   cd server
   yarn dev
   ```

4. **Verify**:
   You should see:
   ```
   ✅ Firebase Admin initialized with service account JSON
   ```

## Current Behavior

### With `DISABLE_FIREBASE=true`:

**Protected Endpoints** (return 503):

- POST `/api/test-results`
- PUT `/api/letter-speed`
- PUT `/api/leaderboards`
- GET `/api/test-results/:userId`
- GET `/api/letter-speed/:userId`

**Public Endpoints** (still work):

- GET `/api/leaderboards/:scope/:testType`
- POST `/api/users/find-or-create`

### With Firebase Enabled:

All endpoints require valid Firebase ID tokens from authenticated users.

## Files Modified

1. `/server/src/config/firebase-admin.ts` - Dynamic import implementation
2. `/server/.env.development.local` - Added `DISABLE_FIREBASE=true`
3. `/server/src/middlewares/firebase-auth.middleware.ts` - Added Firebase availability check

## Troubleshooting

**If server still won't start:**

1. Check `yarn dev` terminal for specific error
2. Ensure `.env.development.local` has `DISABLE_FIREBASE=true`
3. Try: `cd server && yarn build && yarn dev`

**If you get 503 errors on API calls:**

- Expected behavior when Firebase is disabled
- Frontend authentication will fail
- Enable Firebase to fix (see "Next Steps" above)
