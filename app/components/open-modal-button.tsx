import { Button } from "@mui/joy";
import { Colorize } from "@mui/icons-material";
interface Props {
  setIsResultsModalOpen: (open: boolean) => void;
}
export const OpenModalButton = ({ setIsResultsModalOpen }: Props) => {
  return (
    <Button
      startDecorator={<Colorize />}
      sx={{
        "& .MuiButton-startDecorator": { marginRight: "0px" },
        position: "sticky",
        bottom: 10,
        right: 10,
      }}
      onClick={() => setIsResultsModalOpen(true)}
    ></Button>
  );
};
