import { Box, Typography } from "@mui/joy";
import { TrendingUp } from "../icons/upwards-arrow";
import { TrendingDown } from "../icons/downwards-arrow";
import { useTheme } from "@mui/joy/styles";
interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  delta?: string | number;
  deltaValue?: number | "";
}

export const StatCard = ({
  icon,
  label,
  value,
  delta,
  deltaValue,
}: StatCardProps) => {
  const theme = useTheme();
  const determineColor = (value: number | "") => {
    return value !== "" && value >= 0
      ? theme.vars.palette.success.plainColor
      : theme.vars.palette.danger.plainColor;
  };
  return (
    <Box
      sx={{
        bgcolor: (theme) => theme.palette.neutral[700],
        borderRadius: "20px",
        padding: "22px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "start",
        position: "relative",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Box sx={{ textAlign: "center", mr: 1 }}>
          <Typography
            level="body-xs"
            sx={{ fontSize: "18px", mb: 0.5, textAlign: "left" }}
          >
            {label}
          </Typography>
          <Typography
            level="h2"
            sx={{ fontWeight: 700, textAlign: "left", fontSize: "34px" }}
          >
            {value}
          </Typography>
          {!(delta == undefined || delta == "") && (
            <Box
              sx={{ display: "flex", alignItems: "center", mt: 0.5, gap: 0.5 }}
            >
              {Number(deltaValue) >= 0 ? (
                <TrendingUp
                  sx={{
                    width: "16px",
                    height: "16px",
                    fill: "none",
                    stroke: determineColor(deltaValue ?? 0),
                  }}
                ></TrendingUp>
              ) : (
                <TrendingDown
                  sx={{
                    width: "16px",
                    height: "16px",
                    fill: "none",
                    stroke: determineColor(deltaValue ?? 0),
                  }}
                ></TrendingDown>
              )}
              <Typography
                level="body-xs"
                sx={{
                  fontSize: "14px",
                  color: determineColor(deltaValue ?? 0),
                }}
              >
                {delta}
              </Typography>
            </Box>
          )}
        </Box>
        {icon}
      </Box>
    </Box>
  );
};
