import { Button } from "@mui/joy";

interface Props {
  isActive: boolean;
  handleClick: () => void;
  name: string;
}

export const ButtonMainMenu = ({ isActive, handleClick, name }: Props) => {
  return (
    <Button
      variant="plain"
      sx={(theme) => ({
        padding: "13px 16px",
        borderRadius: "50px",
        minHeight: "22px",
        height: "22px",
        boxShadow: isActive
          ? "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)"
          : "none",
        bgcolor: isActive ? theme.vars.palette.grey[50] : "transparent",
        color: isActive
          ? `${theme.vars.palette.primary.plainColor}`
          : `${theme.vars.palette.neutral[100]}`,
        ":hover": {
          color: isActive
            ? `${theme.vars.palette.primary.plainColor}`
            : `${theme.vars.palette.primary.plainHoverColor}`,
          bgcolor: isActive ? theme.vars.palette.grey[50] : "transparent",
        },
      })}
      onClick={handleClick}
    >
      {name}
    </Button>
  );
};
