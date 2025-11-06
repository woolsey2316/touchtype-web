/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { Sheet, type SheetProps } from "@mui/joy";
import type { JSX } from "react";
import { Navigation } from "./navigation";

const width = 260;

export function Sidebar(props: SidebarProps): JSX.Element {
  const { sx, ...other } = props;

  return (
    <Sheet
      sx={{
        pt: "85px",
        px: 2,
        backgroundColor: (theme) => theme.vars.palette.background.level1,
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        width,
        ...sx,
      }}
      aria-label="Sidebar"
      {...other}
    >
      <Navigation />
    </Sheet>
  );
}

export type SidebarProps = Omit<SheetProps, "children">;
