/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import {
  AssignmentTurnedInRounded,
  ChatRounded,
  Dashboard,
  Keyboard,
  Settings,
} from "@mui/icons-material";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
  type ListProps,
} from "@mui/joy";
import { memo, type JSX, type ReactNode } from "react";
import { Link, useMatch, useLocation } from "react-router-dom";
import { useTheme } from "@mui/joy/styles";

export const Navigation = memo(function Navigation(
  props: NavigationProps,
): JSX.Element {
  const { sx, ...other } = props;

  return (
    <List
      sx={{ "--ListItem-radius": "4px", ...sx }}
      size="sm"
      role="navigation"
      {...other}
    >
      <NavItem
        path="/test"
        label="Typing Test"
        icon={<Keyboard sx={{ color: "inherit" }} />}
      />
      <NavItem
        path="/dashboard"
        label="Dashboard"
        icon={<Dashboard sx={{ color: "inherit" }} />}
      />
      <NavItem
        path="/tasks"
        label="Tasks"
        icon={<AssignmentTurnedInRounded sx={{ color: "inherit" }} />}
      />
      <NavItem
        path="/messages"
        label="Messages"
        icon={<ChatRounded sx={{ color: "inherit" }} />}
      />
      <NavItem
        path="/change-colour-theme"
        label="Colour Theme"
        icon={<Settings sx={{ color: "inherit" }} />}
      />
    </List>
  );
});

function NavItem(props: NavItemProps): JSX.Element {
  const theme = useTheme();
  const location = useLocation();
  return (
    <ListItem>
      <ListItemButton
        component={Link}
        selected={!!useMatch(props.path)}
        sx={{
          "&:hover": {
            color: theme.vars.palette.primary.plainActiveColor,
          },
          color:
            props.path === location.pathname
              ? theme.vars.palette.primary.plainActiveColor
              : "",
        }}
        to={props.path}
        aria-current="page"
      >
        <ListItemDecorator children={props.icon} />
        <ListItemContent>{props.label}</ListItemContent>
      </ListItemButton>
    </ListItem>
  );
}

type NavigationProps = Omit<ListProps, "children">;
type NavItemProps = {
  path: string;
  label: string;
  icon: ReactNode;
};
