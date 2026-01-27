/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import {
  GoogleAuthProvider,
  User,
  UserCredential,
  getAuth,
  signInAnonymously,
  signInWithPopup,
} from "firebase/auth";
import { atom, useAtomValue } from "jotai";
import { loadable } from "jotai/utils";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { app, auth } from "./firebase";
import { store } from "./store";

const baseURL = import.meta.env.API_ORIGIN || "http://localhost:3001";

export const currentUser = atom<Promise<User | null> | User | null>(
  new Promise<User | null>(() => {}),
);

currentUser.debugLabel = "currentUser";

const unsubscribe = auth.onAuthStateChanged((user) => {
  store.set(currentUser, user);
});

if (import.meta.hot) {
  import.meta.hot.dispose(() => unsubscribe());
}

export function useCurrentUser() {
  return useAtomValue(currentUser);
}

export const currentUserLoadable = loadable(currentUser);

export function useCurrentUserLoadable() {
  return useAtomValue(currentUserLoadable);
}

async function createOrFindUserInDatabase(userId: string, email: string) {
  try {
    await fetch(`${baseURL}/api/users/find-or-create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        email,
      }),
    });
  } catch (error) {
    console.error("Failed to create/find user in database:", error);
  }
}

export function useSignIn(
  signInMethod: SignInMethod,
): [signIn: () => void, inFlight: boolean] {
  const navigate = useNavigate();
  const [inFlight, setInFlight] = useState(false);

  const signIn = useCallback(() => {
    let p: Promise<UserCredential> | null = null;

    if (signInMethod === "anonymous") {
      const auth = getAuth(app);
      p = signInAnonymously(auth);
    }

    if (signInMethod === "google.com") {
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      provider.addScope("profile");
      provider.addScope("email");
      provider.setCustomParameters({
        // login_hint: ...
        prompt: "consent",
      });
      p = signInWithPopup(auth, provider);
    }

    if (!p) throw new Error(`Not supported: ${signInMethod}`);

    setInFlight(true);
    p.then((value) => {
      value.user.getIdToken().then((token) => {
        const [, payloadEncoded] = token.split(".");
        const payload = JSON.parse(atob(payloadEncoded));

        const userId = payload.user_id;
        const email = payload.email || `anonymous_${userId}@touchtype.local`;

        localStorage.setItem("user_id", userId);
        if (payload.email) {
          localStorage.setItem("user_email", payload.email);
        }

        // Create or find user in MongoDB
        createOrFindUserInDatabase(userId, email);
      });
      navigate("/");
    }).finally(() => setInFlight(false));
  }, [signInMethod, navigate]);

  return [signIn, inFlight] as const;
}

export type SignInMethod = "google.com" | "anonymous";
