import SvgIcon, { SvgIconProps } from "@mui/joy/SvgIcon";
import { useTheme } from "@mui/joy/styles";

export const FlagIcon = (props: SvgIconProps) => {
  const theme = useTheme();
  const neutral300 = theme.palette.neutral[300];

  return (
    <SvgIcon {...props} viewBox="0 0 2.9031415 2.3411765">
      <g transform="translate(-127.80,-75.648476)">
        {/* Flag Path */}
        <path
          fill={neutral300}
          d="m 128.23727,75.910786 -0.0902,-0.271091 -0.35147,0.145898 0.58359,1.744201 0.1459,0.451082 0.21238,-0.0928 -0.24666,-1.015966 c 0,0 0.26033,-0.247838 0.6209,-0.248749 0.2982,-7.46e-4 0.41874,0.181931 0.75148,0.233385 0.35951,0.05559 0.83555,-0.01987 0.83555,-0.01987 l -0.25483,-0.871509 c 0,0 -0.4427,0.09574 -0.66299,0.06721 -0.30677,-0.03973 -0.66792,-0.288004 -0.86898,-0.325726 -0.34115,-0.09443 -0.67467,0.203935 -0.67467,0.203935 z"
        />
      </g>
    </SvgIcon>
  );
};
