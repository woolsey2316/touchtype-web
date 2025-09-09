import SvgIcon, { SvgIconProps } from "@mui/joy/SvgIcon";
import { useTheme } from "@mui/joy/styles";

export default function CursorRectangleIcon(props: SvgIconProps) {
  const theme = useTheme();
  return (
    <SvgIcon {...props} viewBox="0 0 2 4">
      <g transform="translate(-44.426772,-19.957157)">
        <rect
          width="6"
          height="8"
          x="44.426773"
          y="19.957157"
          style={{
            fill: theme.vars.palette.primary.cursorColor,
            strokeWidth: 0.2,
          }}
        />
      </g>
    </SvgIcon>
  );
}
