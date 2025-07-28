import { Typography } from "@mui/joy";

export const CurrentWPM = ({ currentWPM }: { currentWPM: number }) => {
  return (
    <Typography sx={{ mb: 2 }} level="h2">
      {Math.round(currentWPM * 10) / 10} WPM
    </Typography>
  );
};
