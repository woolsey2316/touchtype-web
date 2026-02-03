import { auth } from "./firebase";

// Token cache - stores token and expiry time
let cachedToken: string | null = null;
let tokenExpiry: number = 0;

/**
 * Get Firebase ID token with caching
 * Tokens are cached for 55 minutes (Firebase tokens expire after 1 hour)
 * This prevents slow getIdToken() calls on every request
 */
async function getIdToken(): Promise<string> {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error("User must be authenticated");
  }

  const now = Date.now();

  // Return cached token if still valid (with 5 minute buffer before expiry)
  if (cachedToken && tokenExpiry > now) {
    return cachedToken;
  }

  // Get fresh token (this can be slow - 3-9 seconds on first call)
  const token = await currentUser.getIdToken();

  // Cache for 55 minutes
  cachedToken = token;
  tokenExpiry = now + 55 * 60 * 1000;

  return token;
}

/**
 * Authenticated fetch wrapper that automatically includes Firebase ID token
 * Uses cached tokens to avoid slow getIdToken() calls
 */
export async function authenticatedFetch(
  url: string,
  options: RequestInit = {},
): Promise<Response> {
  // Use cached token to avoid delay
  const idToken = await getIdToken();

  // Add Authorization header
  const headers = new Headers(options.headers);
  headers.set("Authorization", `Bearer ${idToken}`);

  return fetch(url, {
    ...options,
    headers,
  });
}

/**
 * Clear the token cache (call on logout or when token is invalid)
 */
export function clearTokenCache() {
  cachedToken = null;
  tokenExpiry = 0;
}
