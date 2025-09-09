import SvgIcon, { SvgIconProps } from "@mui/joy/SvgIcon";
import { useTheme } from "@mui/joy/styles";

export default function CursorStickIcon(props: SvgIconProps) {
  const theme = useTheme();
  return (
    <SvgIcon {...props} viewBox="0 0 0.67404234 6.3264651">
      <g transform="translate(-38.10114,-19.268293)">
        <rect
          width="17"
          height="0.5"
          x="-25.853518"
          y="37.992271"
          transform="rotate(-90.461187)"
          ry="0.26408714"
          style={{
            fill: theme.vars.palette.primary.cursorColor,
            stroke: theme.vars.palette.primary.cursorColor,
            strokeWidth: 0.9,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeDasharray: "none",
            strokeOpacity: 1,
          }}
        />
      </g>
    </SvgIcon>
  );
}
