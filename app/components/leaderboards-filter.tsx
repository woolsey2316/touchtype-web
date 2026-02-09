import * as React from "react";
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import ToggleButtonGroup from "@mui/joy/ToggleButtonGroup";
import Sheet from "@mui/joy/Sheet";
import { type Category, type Timeframe, type Mode } from "../types/types";
import type { Theme } from "@mui/joy/styles";

export interface LeaderboardFiltersProps {
  timeframe: Timeframe;
  category: Category;
  onChange: (next: { timeframe: Timeframe; category: Category }) => void;
  mode?: Mode;
  onModeChange?: (mode: Mode) => void;
}
export const LeaderboardFilters: React.FC<LeaderboardFiltersProps> = ({
  timeframe,
  category,
  onChange,
  mode,
  onModeChange,
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
    if (next === "programming") {
      // If switching to programming, reset mode to undefined
      if (onModeChange) onModeChange("quotes" as Mode);
    }
    if (next === "english") {
      // If switching to english, reset mode to "words"
      if (onModeChange) onModeChange("words" as Mode);
    }
  };
  const handleMode = (
    _event: React.SyntheticEvent<Element, Event>,
    next: string | null,
  ) => {
    if (!next || !onModeChange) return;
    onModeChange(next as Mode);
  };
  const buttonGroupSx = {
    borderRadius: 99,
    gap: 0.5,
    bgcolor: "transparent",
    "& .MuiToggleButton-root": {
      borderRadius: 99,
      px: 2.5,
      py: 0.6,
      textTransform: "none",
      fontWeight: 600,
      minWidth: 92,
      color: (theme: Theme) => theme.vars.palette.text.primary,
      background: "transparent",
      "&:hover": {
        background: "transparent",
      },
    },
    "& .MuiButton-root": {
      color: (theme: Theme) => theme.vars.palette.text.primary,
      "&:hover": {
        background: "transparent",
      },
    },
    "& .MuiButton-root[aria-pressed='true'], & .MuiButton-root.Mui-selected": {
      background:
        "linear-gradient(180deg, rgba(216,214,255,1) 0%, rgba(207,199,255,1) 100%)",
      color: (theme: Theme) => theme.vars.palette.neutral[600],
    },
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
            sx={buttonGroupSx}
          >
            <Button value="daily" aria-label="Daily">
              Daily
            </Button>
            <Button value="weekly" aria-label="Weekly">
              Weekly
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
            sx={buttonGroupSx}
          >
            <Button value="english" aria-label="English">
              English
            </Button>
            <Button value="programming" aria-label="Programming">
              Programming
            </Button>
          </ToggleButtonGroup>
        </Stack>
        {/* Mode group */}
        <Box
          sx={{
            height: 80,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {category !== "programming" ? (
            <Stack spacing={1} alignItems="center">
              <Typography
                level="body-sm"
                sx={{
                  color: (theme) => theme.vars.palette.text.primary,
                  fontSize: 13,
                }}
              >
                Mode
              </Typography>
              <ToggleButtonGroup
                value={mode}
                onChange={handleMode}
                aria-label="Mode"
                size="sm"
                sx={buttonGroupSx}
              >
                <Button value="timed" aria-label="Time">
                  Time
                </Button>
                <Button value="words" aria-label="Words">
                  Words
                </Button>
              </ToggleButtonGroup>
            </Stack>
          ) : (
            <Box sx={{ visibility: "hidden" }}>
              <Stack spacing={1} alignItems="center">
                <Typography level="body-sm" sx={{ fontSize: 13 }}>
                  Mode
                </Typography>
                <ToggleButtonGroup size="sm" sx={buttonGroupSx}>
                  <Button value="time" aria-label="Time">
                    Time
                  </Button>
                  <Button value="words" aria-label="Words">
                    Words
                  </Button>
                </ToggleButtonGroup>
              </Stack>
            </Box>
          )}
        </Box>
      </Sheet>
    </Box>
  );
};
export default LeaderboardFilters;
