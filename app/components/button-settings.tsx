import { Button } from "@mui/joy";
import { useTheme } from "@mui/joy/styles";
interface Props {
  children: React.ReactNode;
  handleClick: () => void;
  value: string;
  selectedValue: string;
}

export const SettingsButton = ({
  children,
  handleClick,
  value,
  selectedValue,
}: Props) => {
  const theme = useTheme();
  return (
    <Button
      color="neutral"
      sx={{
        ...(value === selectedValue && {
          "&:hover": {
            bgcolor: theme.vars.palette.neutral.solidActiveBg,
          },
          bgcolor: theme.vars.palette.neutral.solidActiveBg,
        }),
      }}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
};
