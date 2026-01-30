import { auth } from "./firebase";

/**
 * Authenticated fetch wrapper that automatically includes Firebase ID token
 */
export async function authenticatedFetch(
  url: string,
  options: RequestInit = {},
): Promise<Response> {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error("User must be authenticated");
  }

  // Get fresh ID token
  const idToken = await currentUser.getIdToken();

  // Add Authorization header
  const headers = new Headers(options.headers);
  headers.set("Authorization", `Bearer ${idToken}`);

  return fetch(url, {
    ...options,
    headers,
  });
}

/**
 * Optional authenticated fetch - doesn't fail if user not logged in
 */
export async function optionalAuthenticatedFetch(
  url: string,
  options: RequestInit = {},
): Promise<Response> {
  const currentUser = auth.currentUser;

  // If no user, just make regular fetch
  if (!currentUser) {
    return fetch(url, options);
  }

  // Otherwise, include token
  try {
    const idToken = await currentUser.getIdToken();
    const headers = new Headers(options.headers);
    headers.set("Authorization", `Bearer ${idToken}`);

    return fetch(url, {
      ...options,
      headers,
    });
  } catch (error) {
    console.warn(
      "Failed to get ID token, making unauthenticated request:",
      error,
    );
    return fetch(url, options);
  }
}
