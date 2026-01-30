# API Authentication & Authorization

## Overview

The API now implements **Firebase ID Token authentication** to secure all endpoints that handle user data. This prevents unauthorized access, data manipulation, and spam.

## Security Model

### Protected Endpoints

All endpoints that read or write user data now require authentication:

**Test Results:**

- `GET /api/test-results/:userId` - Get user's test results
- `POST /api/test-results` - Create new test result
- `GET /api/test-results/daily-time/:email` - Get time spent today

**Letter Speed:**

- `GET /api/letter-speed/:userId` - Get user's letter speed data
- `PUT /api/letter-speed` - Update letter speed data

**Leaderboards:**

- `PUT /api/leaderboards` - Submit score (GET is public)

### Authorization Rules

1. **User can only access their own data**: The backend verifies that the authenticated user's Firebase UID matches the `userId` in the request
2. **403 Forbidden** if user tries to access another user's data
3. **401 Unauthorized** if no valid Firebase ID token provided

## How It Works

### Backend (Server)

**Firebase Admin SDK** (`/server/src/config/firebase-admin.ts`):

- Initializes Firebase Admin SDK for server-side token verification
- Supports service account credentials via `FIREBASE_SERVICE_ACCOUNT_JSON` env variable

**Auth Middleware** (`/server/src/middlewares/firebase-auth.middleware.ts`):

- Extracts Firebase ID token from `Authorization: Bearer <token>` header or cookie
- Verifies token with Firebase Admin SDK
- Finds user in MongoDB by Firebase UID
- Attaches user to request object
- Returns 401 if token invalid/expired/missing

**Controller Authorization**:

- Each controller method verifies `req.user.userId === requestedUserId`
- Returns 403 if mismatch

### Frontend (App)

**Authenticated Fetch Wrapper** (`/app/core/authenticated-fetch.ts`):

- Automatically gets fresh Firebase ID token from `auth.currentUser`
- Adds `Authorization: Bearer <token>` header to requests
- Throws error if user not authenticated

**Hooks Updated**:

- `useTestResultMutation` - Submits test results with auth
- `useLetterSpeedMutation` - Updates letter speed with auth
- `useDashboardData` - Fetches dashboard data with auth
- `useSlowestKeys` - Fetches slowest keys with auth

## Setup Instructions

### Development

1. **Firebase Admin SDK** will use Application Default Credentials
2. No additional setup needed for local development

### Production

1. **Get Firebase Service Account Key**:

   - Go to Firebase Console → Project Settings → Service Accounts
   - Click "Generate New Private Key"
   - Save the JSON file securely (DO NOT commit to git)

2. **Set Environment Variable**:

   **Option A: JSON String** (recommended for cloud platforms):

   ```bash
   FIREBASE_SERVICE_ACCOUNT_JSON='{"type":"service_account","project_id":"your-project",...}'
   ```

   **Option B: File Path**:

   ```bash
   GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json
   ```

3. **Update .env.production.local**:

   ```bash
   # Either set this:
   FIREBASE_SERVICE_ACCOUNT_JSON='{...json content...}'

   # Or set this (in system environment):
   # GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json
   ```

## Security Benefits

✅ **Prevents fake submissions**: Only authenticated users can submit test results  
✅ **Stops data manipulation**: Users can't modify other users' data  
✅ **Blocks spam**: Can't submit hundreds of fake scores  
✅ **Protects privacy**: Can't read other users' test results  
✅ **Token expiration**: Firebase tokens auto-expire (refresh handled by SDK)  
✅ **Secure verification**: Tokens verified server-side with Firebase Admin SDK

## Token Flow

```
Frontend                          Backend                    Firebase
--------                          -------                    --------
1. User signs in
   ├─> Firebase Auth
   └─> Receives ID token

2. Make API request
   ├─> Get fresh token: currentUser.getIdToken()
   ├─> Add header: Authorization: Bearer <token>
   └─> Send request

                                 3. Receive request
                                    ├─> Extract token
                                    ├─> Verify with Firebase ──> Verify token
                                    ├─> Find user in MongoDB   <── Valid/Invalid
                                    └─> Attach to req.user

                                 4. Check authorization
                                    ├─> req.user.userId === requestedUserId?
                                    ├─> Yes: Process request
                                    └─> No: Return 403 Forbidden
```

## Error Handling

### Frontend Errors

```typescript
try {
  await authenticatedFetch('/api/test-results', { ... });
} catch (error) {
  // Error: User must be authenticated
  // Error: HTTP error! status: 401
  // Error: HTTP error! status: 403
}
```

### Backend Error Responses

**401 Unauthorized**:

```json
{
  "message": "Authentication token missing",
  "status": 401
}
```

```json
{
  "message": "Invalid authentication token",
  "status": 401
}
```

```json
{
  "message": "Token expired",
  "status": 401
}
```

**403 Forbidden**:

```json
{
  "message": "Forbidden: Cannot access other users' data",
  "status": 403
}
```

**404 Not Found**:

```json
{
  "message": "User not found",
  "status": 404
}
```

## Testing

### Test with curl

```bash
# 1. Get ID token from browser console:
# > auth.currentUser.getIdToken().then(console.log)

# 2. Make authenticated request:
curl -H "Authorization: Bearer YOUR_ID_TOKEN" \
     -H "Content-Type: application/json" \
     -X GET \
     http://localhost:3001/api/test-results/YOUR_USER_ID

# 3. Test authorization (should fail with 403):
curl -H "Authorization: Bearer YOUR_ID_TOKEN" \
     -H "Content-Type: application/json" \
     -X GET \
     http://localhost:3001/api/test-results/DIFFERENT_USER_ID
```

### Test token expiration

Firebase ID tokens expire after 1 hour. The frontend automatically refreshes them when calling `getIdToken()`.

## Migration Notes

- **Old localStorage tokens removed**: Switched from custom JWT to Firebase ID tokens
- **No breaking changes for users**: Authentication happens transparently
- **Anonymous users**: Still supported - Firebase provides anonymous UIDs

## Security Best Practices

1. ✅ **Never share service account keys** - Keep JSON file secure
2. ✅ **Use environment variables** - Never commit credentials to git
3. ✅ **HTTPS in production** - Protects tokens in transit
4. ✅ **Token refresh** - Frontend auto-refreshes tokens before expiry
5. ✅ **Server-side verification** - Never trust client-side token validation
6. ✅ **Minimal permissions** - Service account should only have necessary Firebase permissions

## Monitoring

Backend logs include:

- ⚠️ Warnings when users try to access others' data (403)
- ⚠️ Warnings when Firebase UID not found in database (404)
- ❌ Errors for invalid/expired tokens (401)

Monitor these logs to detect:

- Potential security attacks
- Authentication issues
- Integration problems
