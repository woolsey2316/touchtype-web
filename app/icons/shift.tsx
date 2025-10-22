import SvgIcon, { SvgIconProps } from "@mui/joy/SvgIcon";
import { useTheme } from "@mui/joy/styles";

export default function ShiftIcon(props: SvgIconProps) {
  const theme = useTheme();
  return (
    <SvgIcon {...props} viewBox="0 0 4.6698575 2.3899576">
      <g transform="translate(-6.4588784,-0.74775056)">
        <path
          style={{
            fill: theme.vars.palette.neutral[300],
            fillRule: "nonzero",
          }}
          d="m 6.6553194,1.6879102 2.7176663,0.015732 -0.008,-0.80454994 c -0.006,-0.58588999 1.7587593,0.69392844 1.7637503,1.04530994 6.1e-4,0.3663151 -1.7396103,1.64091 -1.7446203,1.03021 l -0.006,-0.731 c -0.89541,-0.025 -2.6901903,0.007 -2.6901903,0.007 0,0 -0.2301765,-0.051286 -0.2290431,-0.2865393 0.00113,-0.2352533 0.1964371,-0.2761626 0.1964371,-0.2761627 z"
        />
      </g>
    </SvgIcon>
  );
}
