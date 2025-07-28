import { Modal, ModalClose, ModalDialog, Typography } from "@mui/joy";
import { useRef } from "react";

interface Props {
  setTimeInfo: React.Dispatch<
    React.SetStateAction<{
      started: boolean;
      start: number | null;
      end: number | null;
      ended: boolean;
    }>
  >;
  currentWPM: number;
  isOpen: boolean;
  newTestPage: () => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mistakes: React.RefObject<number>;
  correctChars: React.RefObject<number>;
  childInputRef: React.RefObject<HTMLDivElement | null>;
  setResetCounter: React.Dispatch<React.SetStateAction<number>>;
}
export const ResultsModal = ({
  currentWPM,
  mistakes,
  correctChars,
  setTimeInfo,
  isOpen,
  newTestPage,
  setIsOpen,
  childInputRef,
  setResetCounter,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Modal
      ref={ref}
      open={isOpen}
      onClose={() => {
        childInputRef?.current ? childInputRef?.current.focus() : null;
        newTestPage();
        setTimeInfo((timeTestInfo) => ({
          ...timeTestInfo,
          started: false,
          ended: false,
        }));
        setIsOpen(false);
        setResetCounter((counter) => counter + 1);
      }}
    >
      <ModalDialog>
        <ModalClose />
        <Typography level="h4" component="h2">
          Results
        </Typography>
        <Typography>WPM: {Math.round(currentWPM * 100) / 100}</Typography>
        <Typography>Mistakes {mistakes.current}</Typography>
        <Typography>Correct Characters {correctChars.current}</Typography>
      </ModalDialog>
    </Modal>
  );
};
