import { Button } from "@mui/joy";
import { Colorize } from "@mui/icons-material";
interface Props {
  setIsOpen: (open: boolean) => void;
}
export const OpenModalButton = ({ setIsOpen }: Props) => {
  return (
    <Button
      startDecorator={<Colorize />}
      sx={{
        "& .MuiButton-startDecorator": { marginRight: "0px" },
        position: "absolute",
        bottom: 10,
        right: 10,
      }}
      onClick={() => setIsOpen(true)}
    ></Button>
  );
};
