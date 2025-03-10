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
        pt: "60px",
        px: 2,
        borderRight: ({ palette }: { palette: { divider: string } }) =>
          `1px solid ${palette.divider}`,
        overflow: "auto",
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
