import { SvgIcon, SvgIconProps } from "@mui/joy";

export const TrendingDown = (props: SvgIconProps) => {
  return (
    <SvgIcon
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      aria-hidden="true"
    >
      <path d="M16 17h6v-6"></path>
      <path d="m22 17-8.5-8.5-5 5L2 7"></path>
    </SvgIcon>
  );
};
