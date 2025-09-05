import SvgIcon, { SvgIconProps } from "@mui/joy/SvgIcon";
import { useTheme } from "@mui/joy/styles";

export default function CursorUnderlineIcon(props: SvgIconProps) {
  const theme = useTheme();
  return (
    <SvgIcon {...props} viewBox="0 0 6.3499999 0.5291667">
      <g transform="translate(-35.263158,-22.105266)">
        <rect
          width="6"
          height="1.0"
          x="35.263157"
          y="22.105265"
          style={{
            fill: theme.vars.palette.text.primary,
            strokeWidth: 0.1,
          }}
        />
      </g>
    </SvgIcon>
  );
}
