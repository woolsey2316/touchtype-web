import { Box, Typography } from "@mui/joy";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  delta?: string | number;
  color?: string;
}

export const StatCard = ({
  icon,
  label,
  value,
  delta,
  color,
}: StatCardProps) => (
  <Box
    sx={{
      bgcolor: (theme) => theme.palette.neutral[700],
      borderRadius: "20px",
      padding: "14px",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "start",
      position: "relative",
    }}
  >
    {icon}
    <Typography level="body-xs" sx={{ fontSize: "18px", mt: 1.5, mb: 0.5 }}>
      {label}
    </Typography>
    <Typography level="h2" sx={{ fontWeight: 700 }}>
      {value}
    </Typography>
    {delta !== undefined && (
      <Typography
        level="body-xs"
        sx={{
          fontSize: "14px",
          color: color,
        }}
      >
        {delta}
      </Typography>
    )}
  </Box>
);
