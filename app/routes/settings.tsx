import { Container, Typography, Switch } from "@mui/joy";
import { type JSX, useState } from "react";
import { usePageEffect } from "../core/page";

export const Component = function Settings(): JSX.Element {
  usePageEffect({ title: "Settings" });

  const [zipperEnabled, setZipperEnabled] = useState<boolean>(
    () => window.localStorage.getItem("zipperEnabled") === "true",
  );

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setZipperEnabled(event.target.checked);
    window.localStorage.setItem("zipperEnabled", String(event.target.checked));
  };

  return (
    <Container sx={{ py: 2 }}>
      <Typography sx={{ mb: 2 }} level="h2">
        Settings
      </Typography>
      <Typography
        component="label"
        sx={{ display: "flex", alignItems: "center", gap: 1 }}
      >
        <span style={{ fontWeight: "bold" }}>Zipper Animation -</span>
        <span>
          When successfully typing a character it fades out with an animation
        </span>
        <Switch checked={zipperEnabled} onChange={handleToggle} />
      </Typography>
    </Container>
  );
};
