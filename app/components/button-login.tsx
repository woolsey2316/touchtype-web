/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { Button, type ButtonProps } from "@mui/joy";
import type { JSX } from "react";
import { useSignIn, type SignInMethod } from "../core/auth";
import { AnonymousIcon, GoogleIcon } from "../icons";

export function LoginButton(props: LoginButtonProps): JSX.Element {
  const { signInMethod, ...other } = props;
  const [signIn, inFlight] = useSignIn(signInMethod);

  const icon =
    signInMethod === "google.com" ? (
      <GoogleIcon />
    ) : signInMethod === "anonymous" ? (
      <AnonymousIcon />
    ) : null;

  return (
    <Button
      startDecorator={icon}
      variant="outlined"
      onClick={signIn}
      loading={inFlight}
      // biome-ignore lint/correctness/noChildrenProp: <explanation>
      children={
        signInMethod === "google.com"
          ? "Continue via Google"
          : signInMethod === "anonymous"
            ? "Continue as anonymous"
            : "unknown"
      }
      sx={{ color: "text.primary" }}
      {...other}
    />
  );
}

export type LoginButtonProps = Omit<
  ButtonProps<
    "button",
    {
      signInMethod: SignInMethod;
    }
  >,
  "children"
>;
