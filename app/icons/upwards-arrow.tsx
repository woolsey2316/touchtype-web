import { SvgIcon, SvgIconProps } from "@mui/joy";
export const TrendingUp = (props: SvgIconProps) => {
  return (
    <SvgIcon
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M16 7h6v6"></path>
      <path d="m22 7-8.5 8.5-5-5L2 17"></path>
    </SvgIcon>
  );
};
