import { Typography } from "@mui/joy";

export const LastWPM = ({ lastWPM }: { lastWPM: number }) => {
  return (
    <Typography sx={{ mb: 2 }} level="h2">
      {Math.round(lastWPM * 10) / 10} WPM
    </Typography>
  );
};
