import { Typography } from "@mui/joy";

export const CurrentWPM = ({ currentWPM }: { currentWPM: number }) => {
  return (
    <Typography sx={{ mb: 2, fontSize: "30px", fontWeight: 700 }} level="h2">
      {Math.round(currentWPM * 10) / 10} WPM
    </Typography>
  );
};
