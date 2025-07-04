import { Modal, ModalClose, ModalDialog, Typography } from "@mui/joy";
import { useEffect, useRef } from "react";

interface Props {
  setTimeInfo: React.Dispatch<
    React.SetStateAction<{
      started: boolean;
      start: number | null;
      end: number | null;
      ended: boolean;
    }>
  >;
  timeTestInfo: {
    started: boolean;
    ended: boolean;
    start: number | null;
    end: number | null;
  };
  lastWPM: number;
  mistakes: number;
  correctChars: number;
  childInputRef: React.RefObject<HTMLDivElement | null>;
}
export const ResultsModal = ({
  timeTestInfo,
  lastWPM,
  mistakes,
  correctChars,
  setTimeInfo,
  childInputRef,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (timeTestInfo.ended) {
      ref?.current?.focus();
    }
  }, [timeTestInfo.ended]);
  return (
    <Modal
      ref={ref}
      open={timeTestInfo.ended}
      onClose={() => {
        childInputRef?.current ? childInputRef?.current.focus() : null;
        setTimeInfo((timeTestInfo) => ({
          ...timeTestInfo,
          started: false,
          ended: false,
        }));
      }}
    >
      <ModalDialog>
        <ModalClose />
        <Typography level="h4" component="h2">
          Results
        </Typography>
        <Typography>WPM: {Math.round(lastWPM * 100) / 100}</Typography>
        <Typography>Mistakes {mistakes}</Typography>
        <Typography>Correct Characters {correctChars}</Typography>
        <textarea tabIndex={0}></textarea>
      </ModalDialog>
    </Modal>
  );
};
