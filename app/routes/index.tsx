/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { createElement, type JSX } from "react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { BaseLayout, MainLayout, RootError } from "../components";

/**
 * Application routes
 * https://reactrouter.com/en/main/routers/create-browser-router
 */
export const router = createBrowserRouter([
  {
    path: "",
    element: <BaseLayout />,
    errorElement: <RootError />,
    children: [
      { path: "login", lazy: () => import("./login") },
      { path: "privacy", lazy: () => import("./privacy") },
      { path: "terms", lazy: () => import("./terms") },
    ],
  },
  {
    path: "",
    element: <MainLayout />,
    errorElement: <RootError />,
    children: [
      { index: true, element: <Navigate to="/test" replace /> },
      { path: "test", lazy: () => import("./test") },
      { path: "dashboard", lazy: () => import("./dashboard") },
      { path: "tasks", lazy: () => import("./tasks") },
      { path: "messages", lazy: () => import("./messages") },
      {
        path: "change-colour-theme",
        lazy: () => import("./colour-theme-changer"),
      },
    ],
  },
]);

export function Router(): JSX.Element {
  return createElement(RouterProvider, { router });
}

// Clean up on module reload (HMR)
// https://vitejs.dev/guide/api-hmr
if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}
