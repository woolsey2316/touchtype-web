/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { Box, Container, Typography, Sheet, Table, Chip } from "@mui/joy";
import { type JSX, useState, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext/ThemeContext";
import { usePageEffect } from "../core/page";
import Trophy2 from "../icons/trophy2";
export const Component = function Leaderboards(): JSX.Element {
  const { theme } = useContext(ThemeContext);
  usePageEffect({ title: "Leaderboards" });
  const [entries] = useState([
    {
      id: 1,
      name: "Sarah Chen",
      wpm: 127,
      accuracy: 98.5,
      date: "2025-10-28T14:32:00",
    },
    {
      id: 2,
      name: "Alex Rodriguez",
      wpm: 119,
      accuracy: 97.2,
      date: "2025-10-27T09:15:00",
    },
    {
      id: 3,
      name: "Emma Thompson",
      wpm: 115,
      accuracy: 99.1,
      date: "2025-10-28T16:45:00",
    },
    {
      id: 4,
      name: "Marcus Johnson",
      wpm: 108,
      accuracy: 96.8,
      date: "2025-10-26T11:20:00",
    },
    {
      id: 5,
      name: "Priya Patel",
      wpm: 102,
      accuracy: 98.3,
      date: "2025-10-27T13:50:00",
    },
    {
      id: 6,
      name: "Jake Miller",
      wpm: 98,
      accuracy: 95.7,
      date: "2025-10-28T08:30:00",
    },
    {
      id: 7,
      name: "Sofia Martinez",
      wpm: 94,
      accuracy: 97.9,
      date: "2025-10-25T15:10:00",
    },
    {
      id: 8,
      name: "David Kim",
      wpm: 89,
      accuracy: 94.2,
      date: "2025-10-26T17:25:00",
    },
    {
      id: 9,
      name: "Olivia Brown",
      wpm: 85,
      accuracy: 96.5,
      date: "2025-10-27T10:40:00",
    },
    {
      id: 10,
      name: "Ryan Taylor",
      wpm: 81,
      accuracy: 93.8,
      date: "2025-10-28T12:05:00",
    },
  ]);

  const getRankColor = (rank: number) => {
    if (rank === 1) return "#c9a34f";
    if (rank === 2) return "#a6adc8";
    if (rank === 3) return "#fab387";
    return theme.vars.palette.neutral[600];
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
    <Container sx={{ py: 2 }}>
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.body",
          p: 4,
        }}
      >
        <Box sx={{ maxWidth: 1000, mx: "auto" }}>
          {/* Header */}
          <Box sx={{ textAlign: "center", mb: 6 }}>
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
            ></Box>
            <Typography
              level="h1"
              sx={{ color: theme.vars.palette.neutral[50], mb: 1 }}
            >
              Touch Typing Leaderboard
            </Typography>
            <Typography
              level="body-md"
              sx={{ color: theme.vars.palette.neutral[500] }}
            >
              Top performers ranked by words per minute
            </Typography>
          </Box>

          {/* Leaderboard */}
          <Sheet
            variant="outlined"
            sx={{
              borderRadius: "lg",
              overflow: "hidden",
              bgcolor: theme.vars.palette.background.level1,
              border: `1px solid ${theme.vars.palette.background.level3}`,
            }}
          >
            <Table
              sx={{
                "& thead th": {
                  bgcolor: theme.vars.palette.background.body,
                  color: theme.vars.palette.neutral[500],
                  fontWeight: 600,
                  padding: "12px 24px",
                  borderBottom: `1px solid ${theme.vars.palette.background.level3}`,
                },
                "& tbody td": {
                  padding: "12px 24px",
                  borderBottom: `1px solid ${theme.vars.palette.background.level3}`,
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
                  <th style={{ width: "100px" }}>Rank</th>
                  <th>Name</th>
                  <th style={{ width: "120px" }}>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      WPM
                    </Box>
                  </th>
                  <th style={{ width: "120px" }}>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      Accuracy
                    </Box>
                  </th>
                  <th style={{ width: "180px" }}>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      Date
                    </Box>
                  </th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, index) => {
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
                            color: theme.vars.palette.background.body,
                          }}
                        >
                          {rank <= 3 ? (
                            <Trophy2
                              color={theme.vars.palette.background.body}
                            />
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
                          {entry.name}
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
        </Box>
      </Box>
    </Container>
  );
};
