import { auth } from "./firebase";

// Token cache - stores token and expiry time
let cachedToken: string | null = null;
let tokenExpiry: number = 0;

// Track ongoing token refresh to prevent multiple simultaneous refreshes
let refreshPromise: Promise<string> | null = null;

/**
 * Get Firebase ID token with caching
 * Tokens are cached for 55 minutes (Firebase tokens expire after 1 hour)
 * This prevents slow getIdToken() calls on every request
 */
async function getIdToken(forceRefresh = false): Promise<string> {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error("User must be authenticated");
  }

  const now = Date.now();

  // Return cached token if still valid (with 5 minute buffer before expiry) and not forcing refresh
  if (!forceRefresh && cachedToken && tokenExpiry > now) {
    return cachedToken;
  }

  // If a refresh is already in progress, wait for it
  if (refreshPromise) {
    return refreshPromise;
  }

  // Start a new token refresh
  refreshPromise = (async () => {
    try {
      // Force refresh to get a new token from Firebase
      const token = await currentUser.getIdToken(forceRefresh);

      // Cache for 55 minutes
      cachedToken = token;
      tokenExpiry = now + 55 * 60 * 1000;

      return token;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

/**
 * Authenticated fetch wrapper that automatically includes Firebase ID token
 * Uses cached tokens to avoid slow getIdToken() calls
 * Automatically handles token refresh on 401 errors
 */
export async function authenticatedFetch(
  url: string,
  options: RequestInit = {},
): Promise<Response> {
  // Use cached token to avoid delay
  let idToken = await getIdToken();

  // Add Authorization header
  let headers = new Headers(options.headers);
  headers.set("Authorization", `Bearer ${idToken}`);

  // Make the initial request
  let response = await fetch(url, {
    ...options,
    headers,
  });

  // If we get a 401, try to refresh the token and retry once
  if (response.status === 401) {
    try {
      // Force refresh the token
      idToken = await getIdToken(true);

      // Retry the request with the new token
      headers = new Headers(options.headers);
      headers.set("Authorization", `Bearer ${idToken}`);

      response = await fetch(url, {
        ...options,
        headers,
      });

      // If still 401 after refresh, the refresh token is invalid
      if (response.status === 401) {
        // Clear tokens and redirect to login
        clearTokenCache();
        await auth.signOut();
        window.location.href = "/";
        throw new Error("Authentication failed. Please log in again.");
      }
    } catch (error) {
      // If token refresh fails, clear everything and redirect
      clearTokenCache();
      await auth.signOut();
      window.location.href = "/";
      throw error;
    }
  }

  return response;
}

/**
 * Clear the token cache (call on logout or when token is invalid)
 */
export function clearTokenCache() {
  cachedToken = null;
  tokenExpiry = 0;
}
