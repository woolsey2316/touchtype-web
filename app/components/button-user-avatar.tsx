/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { LogoutRounded, SettingsRounded } from "@mui/icons-material";
import {
  Avatar,
  Dropdown,
  IconButton,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
  Menu,
  MenuButton,
  MenuItem,
  type IconButtonProps,
} from "@mui/joy";
import { getAuth, signOut } from "firebase/auth";
import type { JSX } from "react";
import { useCurrentUser } from "../core/auth";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/joy/styles";

export function UserAvatarButton(props: UserAvatarButtonProps): JSX.Element {
  const { sx, ...other } = props;
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  const user = useCurrentUser()!;
  const theme = useTheme();
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{
          root: {
            sx: { borderRadius: "50%", p: "2px", ...sx },
            ...other,
          },
        }}
      >
        <Avatar sx={{ width: 36, height: 36 }} src={user.photoURL ?? undefined}>
          {user.displayName}
        </Avatar>
      </MenuButton>

      <Menu size="sm">
        <MenuItem>
          <ListItemButton
            component={Link}
            sx={{
              "&:hover": {
                color: theme.vars.palette.primary.plainActiveColor,
              },
              fontWeight: 500,
              padding: 0,
            }}
            to="/settings"
            aria-current="page"
          >
            <ListItemDecorator sx={{ ml: 0.5 }}>
              <SettingsRounded sx={{ color: "inherit" }} />
            </ListItemDecorator>
            <ListItemContent sx={{ mr: 2 }}>Settings</ListItemContent>
          </ListItemButton>
        </MenuItem>
        <MenuItem onClick={() => signOut(getAuth())}>
          <ListItemDecorator sx={{ ml: 0.5 }}>
            <LogoutRounded sx={{ color: "inherit" }} />
          </ListItemDecorator>
          <ListItemContent sx={{ mr: 2 }}>Logout</ListItemContent>
        </MenuItem>
      </Menu>
    </Dropdown>
  );
}

export type UserAvatarButtonProps = Omit<IconButtonProps, "children">;
