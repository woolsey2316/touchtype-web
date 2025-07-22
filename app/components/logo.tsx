/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */
import { LogoIcon } from "../icons/logo";
import { Box, IconButton, type BoxProps } from "@mui/joy";
import type { JSX } from "react";
import { Link } from "react-router-dom";

export function Logo(props: LogoProps): JSX.Element {
  const { sx, ...other } = props;

  return (
    <Box
      sx={{
        py: 2,
        px: 2,
        display: "flex",
        alignItems: "center",
        gap: 1,
        ...sx,
      }}
      {...other}
    >
      <IconButton
        sx={{ width: "100%" }}
        component={Link}
        to="/"
        color="primary"
        variant="soft"
      >
        <LogoIcon />
      </IconButton>
    </Box>
  );
}

export type LogoProps = Omit<BoxProps, "children">;
