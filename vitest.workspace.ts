/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { defineWorkspace } from "vitest/config";
import { workspaces } from "./package.json";

/**
 * Inline Vitest configuration for all workspaces.
 *
 * @see https://vitest.dev/guide/workspace
 */
export default defineWorkspace(
  workspaces
    .filter((name) => !["scripts", "db", "server"].includes(name))
    .map((name) => ({
      extends: `./${name}/vite.config.ts`,
      test: {
        name,
        root: `./${name}`,
      },
    })),
);
