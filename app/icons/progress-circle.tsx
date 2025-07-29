import { SvgIcon, SvgIconProps, useTheme } from "@mui/joy";

interface CircleProgressProps extends SvgIconProps {
  progress: number;
}

export const ProgressCircleIcon = ({ progress, ...props }: CircleProgressProps) => {
  const theme = useTheme();

  // Calculate the stroke-dashoffset based on progress percentage
  const radius = 80;
  const circumference = 2 * Math.PI * radius; // ≈ 502.65
  const strokeDashoffset = circumference - (circumference * progress) / 100;

  return (
    <SvgIcon {...props} viewBox="0 0 200 200">
      {/* Background circle */}
      <circle
        cx="100"
        cy="100"
        r={radius}
        fill="none"
        stroke={theme.vars.palette.neutral[300]}
        strokeWidth="14"
        opacity="0.3"
      />

      {/* Progress arc */}
      <circle
        cx="100"
        cy="100"
        r={radius}
        fill="none"
        stroke={theme.vars.palette.primary[300]}
        strokeWidth="14"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        transform="rotate(-90 100 100)"
        style={{
          transition: "stroke-dashoffset 0.3s ease-in-out",
        }}
      />

      {/* Progress text */}
      <text
        x="100"
        y="110"
        textAnchor="middle"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="40"
        fontWeight="600"
        fill={theme.vars.palette.primary[300]}
      >
        {Math.round(progress)}%
      </text>
    </SvgIcon>
  );
};
