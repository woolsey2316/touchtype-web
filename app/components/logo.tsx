/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */
import { KeyflowIcon } from "../icons/logo";
import { Box, IconButton, type BoxProps } from "@mui/joy";
import type { JSX } from "react";
import { Link } from "react-router-dom";

export function Logo(props: LogoProps): JSX.Element {
  const { sx, ...other } = props;

  return (
    <Box
      sx={{
        display: "flex",
        width: "260px",
        height: "90px",
        alignItems: "center",
        gap: 1,
        ...sx,
      }}
      {...other}
    >
      <Box sx={{ p: 2, position: "fixed" }}>
        <IconButton
          sx={{ width: "100%" }}
          component={Link}
          to="/"
          color="primary"
          variant="soft"
        >
          <KeyflowIcon sx={{ width: "210px", height: "82px" }} />
        </IconButton>
      </Box>
    </Box>
  );
}

export type LogoProps = Omit<BoxProps, "children">;
