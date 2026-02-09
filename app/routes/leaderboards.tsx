/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { Box, Container, Typography, Sheet, Table, Chip } from "@mui/joy";
import { type JSX, useState, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext/ThemeContext";
import { usePageEffect } from "../core/page";
import Trophy2 from "../icons/trophy2";
import { Zap } from "lucide-react";
import { LeaderboardFilters } from "../components/leaderboards-filter";
import { type Category, type Timeframe, type Mode } from "../types/types";
import { useLeaderboardEntries } from "../hooks/useLeaderboardEntries";
import { LeaderboardHeading } from "../components/leaderboard-heading";
import { Pagination } from "../components/pagination";
import { Footer } from "../components/footer";

export const Component = function Leaderboards(): JSX.Element {
  const { theme } = useContext(ThemeContext);
  usePageEffect({ title: "Leaderboards" });
  const [category, setCategory] = useState<Category>("english");
  const [timeframe, setTimeFrame] = useState<Timeframe>("daily");
  const [mode, setMode] = useState<Mode>("words");
  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const { entries, isLoading, totalItems } = useLeaderboardEntries({
    timespan: timeframe,
    testType: category,
    mode: mode,
    page: currentPage,
    pageSize: itemsPerPage,
  });

  // Reset to page 1 when filters change
  const handleCategoryChange = (newCategory: Category) => {
    setCategory(newCategory);
    setCurrentPage(1);
  };

  const handleTimeframeChange = (newTimeframe: Timeframe) => {
    setTimeFrame(newTimeframe);
    setCurrentPage(1);
  };

  const handleModeChange = (newMode: Mode) => {
    setMode(newMode);
    setCurrentPage(1);
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return "#c9a34f";
    if (rank === 2) return "#a6adc8";
    if (rank === 3) return "#fab387";
    return "transparent";
  };

  const getTestypeDisplayName = (testType: string) => {
    return testType?.charAt(0).toUpperCase() + testType?.slice(1) || "Unknown";
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${dayName} ${day} ${month} ${hours}:${minutes}`;
  };

  return (
    <Container
      sx={{
        py: 2,
        minHeight: "calc(100vh - 60px)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <Box sx={{ textAlign: "left", mb: 4 }}>
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 64,
            height: 64,
            borderRadius: "50%",
            bgcolor: theme.vars.palette.primary[300],
            mb: 2,
          }}
        >
          <Zap size={36} color={theme.vars.palette.background.body} />
        </Box>
        <LeaderboardHeading
          timeframe={timeframe}
          category={category}
          mode={mode}
        />
        <Typography
          level="body-md"
          sx={{ color: theme.vars.palette.text.secondary }}
        >
          Top performers ranked by words per minute
        </Typography>
      </Box>

      <LeaderboardFilters
        timeframe={timeframe}
        category={category}
        onChange={({ timeframe, category }) => {
          handleTimeframeChange(timeframe);
          handleCategoryChange(category);
        }}
        mode={mode}
        onModeChange={handleModeChange}
      />

      {/* Leaderboard */}
      <Sheet
        variant="outlined"
        sx={{
          borderRadius: "lg",
          overflow: "hidden",
          border: `1px solid ${theme.vars.palette.neutral[200]}`,
          bgcolor: theme.vars.palette.background.level1,
        }}
      >
        <Table
          sx={{
            "& thead th": {
              bgcolor: theme.vars.palette.background.body,
              color: theme.vars.palette.neutral[500],
              fontWeight: 600,
              padding: "12px 24px",
              borderBottomWidth: "1px",
              borderBottom: `1px solid ${theme.vars.palette.neutral[200]}`,
            },
            "& tbody td": {
              padding: "12px 24px",
              borderBottom: `1px solid ${theme.vars.palette.neutral[200]}`,
            },
            "& tbody tr:last-child td": {
              borderBottom: "none",
            },
            "& tbody tr:hover": {
              bgcolor: theme.vars.palette.background.level3,
            },
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  color: theme.vars.palette.text.secondary,
                  width: "100px",
                  borderBottomWidth: "1px",
                }}
              >
                Rank
              </th>
              <th
                style={{
                  color: theme.vars.palette.text.secondary,
                  borderBottomWidth: "1px",
                }}
              >
                Username
              </th>
              <th
                style={{
                  color: theme.vars.palette.text.secondary,
                  width: "140px",
                  borderBottomWidth: "1px",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  Test Type
                </Box>
              </th>
              <th
                style={{
                  color: theme.vars.palette.text.secondary,
                  width: "140px",
                  borderBottomWidth: "1px",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  WPM
                </Box>
              </th>
              <th
                style={{
                  color: theme.vars.palette.text.secondary,
                  width: "140px",
                  borderBottomWidth: "1px",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  Accuracy
                </Box>
              </th>
              <th
                style={{
                  color: theme.vars.palette.text.secondary,
                  width: "190px",
                  borderBottomWidth: "1px",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  Date
                </Box>
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td
                  colSpan={5}
                  style={{ textAlign: "center", padding: "40px" }}
                >
                  <Typography
                    level="body-md"
                    sx={{ color: theme.vars.palette.neutral[500] }}
                  >
                    Loading...
                  </Typography>
                </td>
              </tr>
            )}
            {!isLoading && (!entries || entries.length === 0) && (
              <tr>
                <td
                  colSpan={5}
                  style={{ textAlign: "center", padding: "40px" }}
                >
                  <Typography
                    level="body-md"
                    sx={{ color: theme.vars.palette.neutral[500] }}
                  >
                    No entries yet. Be the first to set a record!
                  </Typography>
                </td>
              </tr>
            )}
            {!isLoading &&
              entries &&
              entries.map((entry, index) => {
                const rank = index + 1;
                return (
                  <tr key={entry.id}>
                    <td>
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: "md",
                          bgcolor: getRankColor(rank),
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: "bold",
                          color: theme.vars.palette.neutral[400],
                        }}
                      >
                        {rank <= 3 ? (
                          <Trophy2 color={theme.vars.palette.background.body} />
                        ) : (
                          rank
                        )}
                      </Box>
                    </td>
                    <td>
                      <Typography
                        level="body-md"
                        sx={{
                          color: theme.vars.palette.neutral[50],
                          fontWeight: 500,
                        }}
                      >
                        {entry.username}
                      </Typography>
                    </td>
                    <td>
                      <Typography
                        level="body-md"
                        sx={{
                          color: theme.vars.palette.neutral[50],
                          fontWeight: 500,
                        }}
                      >
                        {getTestypeDisplayName(entry.testType)}
                      </Typography>
                    </td>
                    <td>
                      <Chip
                        variant="soft"
                        sx={{
                          bgcolor: theme.vars.palette.background.level3,
                          color: theme.vars.palette.primary[300],
                          fontWeight: "bold",
                        }}
                      >
                        {entry.wpm} wpm
                      </Chip>
                    </td>
                    <td>
                      <Chip
                        variant="soft"
                        sx={{
                          bgcolor: theme.vars.palette.background.level3,
                          color: theme.vars.palette.primary[600],
                          fontWeight: "bold",
                        }}
                      >
                        {entry.accuracy}%
                      </Chip>
                    </td>
                    <td>
                      <Typography
                        level="body-sm"
                        sx={{ color: theme.vars.palette.neutral[800] }}
                      >
                        {formatDate(entry.date)}
                      </Typography>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </Sheet>

      {/* Pagination */}
      {!isLoading && totalItems > 0 && (
        <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
          <Pagination
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        </Box>
      )}
      <Footer />
    </Container>
  );
};
