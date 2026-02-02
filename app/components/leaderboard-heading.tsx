import { Typography } from "@mui/material";
interface Props {
  category: string;
  timeframe: string;
  mode: string;
}
export const LeaderboardHeading = ({ category, timeframe, mode }: Props) => {
  return (
    <Typography
      variant="h1"
      sx={{
        fontWeight: "bold",
        marginBottom: "16px",
      }}
    >
      {"Leaderboard - "}
      {category.charAt(0).toUpperCase() + category.slice(1)}{" "}
      {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}{" "}
      {mode === "words"
        ? " - Words Mode 25"
        : mode === "timed"
          ? " - Timed Mode 30s"
          : ""}{" "}
    </Typography>
  );
};
