import SvgIcon, { SvgIconProps } from "@mui/joy/SvgIcon";
import { useTheme } from "@mui/joy/styles";

export const ReturnIcon = (props: SvgIconProps) => {
  const theme = useTheme();
  return (
    <SvgIcon
      {...props}
      viewBox="0 0 5.0800352 3.575242"
      sx={{ width: "20px", height: "14px" }}
    >
      <g transform="translate(-165.0151,-126.36872)">
        <path
          d="m 170.09514,126.36871 -0.67851,0.005 0.0347,1.65361 -0.001,0.49355 -2.67947,0.003 0.008,-0.80455 c 0.006,-0.58589 -1.76326,0.88974 -1.76375,1.04531 -6.1e-4,0.19076 1.73961,1.64091 1.74462,1.03021 l 0.006,-0.731 c 0.89541,-0.025 2.69019,0.007 2.69019,0.007 0,0 0.39734,0.006 0.5312,-0.13369 0.12241,-0.1277 0.10587,-0.41815 0.10587,-0.41815 -0.006,-0.71672 -0.005,-1.43337 0.002,-2.15005 z"
          style={{
            fill: theme.vars.palette.neutral[300],
            fillRule: "nonzero",
          }}
        />
      </g>
    </SvgIcon>
  );
};
