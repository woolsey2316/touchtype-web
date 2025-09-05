import SvgIcon, { SvgIconProps } from "@mui/joy/SvgIcon";
import { useTheme } from "@mui/joy/styles";

export default function CursorBlockIcon(props: SvgIconProps) {
  const theme = useTheme();
  return (
    <SvgIcon {...props} viewBox="0 0 2 4">
      <g transform="translate(0,0)">
        <rect
          width="2"
          height="4"
          x="0"
          y="0"
          style={{
            fill: "none",
            stroke: theme.vars.palette.text.primary,
            strokeWidth: 0.2,
            strokeOpacity: 1,
          }}
        />
      </g>
    </SvgIcon>
  );
}
