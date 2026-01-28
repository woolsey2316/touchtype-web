import * as React from "react";
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import ToggleButtonGroup from "@mui/joy/ToggleButtonGroup";
import Sheet from "@mui/joy/Sheet";
import { type Category, type Timeframe } from "../types/types";

export interface LeaderboardFiltersProps {
  timeframe: Timeframe;
  category: Category;
  onChange: (next: { timeframe: Timeframe; category: Category }) => void;
}

export const LeaderboardFilters: React.FC<LeaderboardFiltersProps> = ({
  timeframe,
  category,
  onChange,
}) => {
  const handleTimeframe = (
    _event: React.SyntheticEvent<Element, Event>,
    next: string | null,
  ) => {
    if (!next) return;
    onChange({ timeframe: next as Timeframe, category });
  };

  const handleCategory = (
    _event: React.SyntheticEvent<Element, Event>,
    next: string | null,
  ) => {
    if (!next) return;
    onChange({ timeframe, category: next as Category });
  };

  return (
    <Box
      component="section"
      aria-label="Leaderboard filters"
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        py: 2.5,
        px: 3,
        boxSizing: "border-box",
      }}
    >
      <Sheet
        variant="outlined"
        sx={{
          width: { xs: "100%", md: 820 },
          display: "flex",
          gap: 3,
          alignItems: "center",
          justifyContent: "space-between",
          bgcolor: "transparent",
          p: { xs: 2, md: 2.25 },
          border: "none",
          borderRadius: 2,
        }}
      >
        {/* Timeframe group */}
        <Stack spacing={1} alignItems="center">
          <Typography
            level="body-sm"
            sx={{
              color: (theme) => theme.vars.palette.text.primary,
              fontSize: 13,
            }}
          >
            Timeframe
          </Typography>

          <ToggleButtonGroup
            value={timeframe}
            onChange={handleTimeframe}
            aria-label="Timeframe"
            size="sm"
            sx={{
              borderRadius: 99,
              gap: 0.5,
              bgcolor: "transparent",
              // keep the control visually subtle to match the UI
              "& .MuiToggleButton-root": {
                borderRadius: 99,
                px: 2.5,
                py: 0.6,
                textTransform: "none",
                fontWeight: 600,
                minWidth: 92,
                color: (theme) => theme.vars.palette.text.primary,
                background: "transparent",
              },
              "& .MuiButton-root": {
                color: (theme) => theme.vars.palette.text.primary,
              },
              // Active state custom: re-use lavender accent from your palette
              "& .MuiButton-root[aria-pressed='true'], & .MuiButton-root.Mui-selected":
                {
                  background:
                    "linear-gradient(180deg, rgba(216,214,255,1) 0%, rgba(207,199,255,1) 100%)",
                  color: (theme) => theme.vars.palette.neutral[600],
                },
            }}
          >
            <Button value="daily" aria-label="Daily">
              Daily
            </Button>
            <Button value="alltime" aria-label="All time">
              All‑Time
            </Button>
          </ToggleButtonGroup>
        </Stack>

        {/* Category group */}
        <Stack spacing={1} alignItems="center">
          <Typography
            level="body-sm"
            sx={{
              color: (theme) => theme.vars.palette.text.primary,
              fontSize: 13,
            }}
          >
            Category
          </Typography>

          <ToggleButtonGroup
            value={category}
            onChange={handleCategory}
            aria-label="Category"
            size="sm"
            sx={{
              borderRadius: 99,
              gap: 0.5,
              bgcolor: "transparent",
              // keep the control visually subtle to match the UI
              "& .MuiToggleButton-root": {
                borderRadius: 99,
                px: 2.5,
                py: 0.6,
                textTransform: "none",
                fontWeight: 600,
                minWidth: 92,
                color: (theme) => theme.vars.palette.text.primary,
                background: "transparent",
              },
              "& .MuiButton-root": {
                color: (theme) => theme.vars.palette.text.primary,
              },
              // Active state custom: re-use lavender accent from your palette
              "& .MuiButton-root[aria-pressed='true'], & .MuiButton-root.Mui-selected":
                {
                  background:
                    "linear-gradient(180deg, rgba(216,214,255,1) 0%, rgba(207,199,255,1) 100%)",
                  color: (theme) => theme.vars.palette.neutral[600],
                },
            }}
          >
            <Button value="english" aria-label="English">
              English
            </Button>
            <Button value="programming" aria-label="Programming">
              Programming
            </Button>
          </ToggleButtonGroup>
        </Stack>
      </Sheet>
    </Box>
  );
};

export default LeaderboardFilters;
