import { BullseyeIcon } from "../../icons/bullseye";
import { ClockIcon } from "../../icons/clock";
import { ProgressCircleIcon } from "../../icons/progress-circle";
import { FlagIcon } from "../../icons/flag";
import { RadarIcon } from "../../icons/radar";
import { Modal, ModalClose, ModalDialog, Typography, Box } from "@mui/joy";
import { useRef } from "react";
import { useTheme } from "@mui/joy/styles";
import { addPlus } from "../../utils/util";

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
  setIsResultsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
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
  setIsResultsModalOpen,
  childInputRef,
  setResetCounter,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  // Example values for demonstration; replace with your actual logic
  const accuracy = correctChars.current
    ? Math.round(
        (correctChars.current /
          (correctChars.current + (mistakes.current || 0))) *
          100 *
          10,
      ) / 10
    : 0;
  const score = 2025;
  const timeSpent = 5.2;
  const wpmDelta = 2.7;
  const accDelta = 1.8;
  const scoreDelta = -1920;

  const theme = useTheme();
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
        setIsResultsModalOpen(false);
        setResetCounter((counter) => counter + 1);
      }}
    >
      <ModalDialog
        sx={{
          bgcolor: (theme) => theme.palette.neutral[600],
          borderRadius: "md",
          boxShadow: "lg",
          width: "797px",
          p: 4,
        }}
      >
        <ModalClose />
        <Box
          sx={{
            display: "flex",
            gap: "22px",
            justifyContent: "space-between",
          }}
        >
          {/* WPM */}
          <Box
            sx={{
              bgcolor: (theme) => theme.palette.neutral[700],
              borderRadius: "30px",
              padding: "22px",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "start",
              position: "relative",
            }}
          >
            <Box
              display="flex"
              flexDirection="row"
              alignItems="flex-start"
              mb={1}
              gap="3px"
            >
              <Typography level="body-xs" sx={{ fontSize: "18px", mb: 1 }}>
                WPM
              </Typography>
              <RadarIcon
                sx={{ marginTop: "7px", width: "22px", height: "13px" }}
              />
            </Box>
            <Typography level="h2" sx={{ fontWeight: 700 }}>
              {Math.round(currentWPM * 10) / 10}
            </Typography>
            <Typography
              level="body-xs"
              sx={{
                fontSize: "14px",
                color:
                  wpmDelta >= 0
                    ? theme.vars.palette.success.plainColor
                    : theme.vars.palette.danger.plainColor,
              }}
            >
              {addPlus(wpmDelta)}
            </Typography>
          </Box>
          {/* Accuracy */}
          <Box
            sx={{
              bgcolor: (theme) => theme.palette.neutral[700],
              borderRadius: "30px",
              padding: "22px",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "start",
              position: "relative",
            }}
          >
            <Box
              display="flex"
              flexDirection="row"
              alignItems="start"
              mb={1}
              gap="3px"
            >
              <Typography level="body-xs" sx={{ fontSize: "18px", mb: 1 }}>
                Accuracy
              </Typography>
              <BullseyeIcon
                sx={{ marginTop: "-3px", width: "27px", height: "30px" }}
              />
            </Box>
            <Typography level="h2" sx={{ fontWeight: 700 }}>
              {accuracy}%
            </Typography>
            <Typography
              level="body-xs"
              sx={{
                fontSize: "14px",
                color:
                  accDelta >= 0
                    ? theme.vars.palette.success.plainColor
                    : theme.vars.palette.danger.plainColor,
              }}
            >
              {addPlus(accDelta)}%
            </Typography>
          </Box>
          {/* Score */}
          <Box
            sx={{
              bgcolor: (theme) => theme.palette.neutral[700],
              borderRadius: "30px",
              padding: "22px",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "start",
              position: "relative",
            }}
          >
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              mb={1}
              gap="4px"
            >
              <Typography level="body-xs" sx={{ fontSize: "18px", mb: 1 }}>
                Score
              </Typography>
              <FlagIcon
                sx={{ marginBottom: "5px", width: "16px", height: "16px" }}
              />
            </Box>
            <Typography level="h2" sx={{ fontWeight: 700 }}>
              {score}
            </Typography>
            <Typography
              level="body-xs"
              sx={{
                fontSize: "14px",
                color:
                  scoreDelta >= 0
                    ? theme.vars.palette.success.plainColor
                    : theme.vars.palette.danger.plainColor,
              }}
            >
              {addPlus(scoreDelta)}
            </Typography>
          </Box>
          {/* Time Spent */}
          <Box
            sx={{
              bgcolor: (theme) => theme.palette.neutral[700],
              borderRadius: "30px",
              padding: "22px",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "start",
            }}
          >
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              mb={1}
              gap="3px"
            >
              <Typography level="body-xs" sx={{ fontSize: "18px", mb: 1 }}>
                Daily Time
              </Typography>
              <ClockIcon
                sx={{ width: "18px", height: "18px", mb: 1, ml: "3px" }}
              />
            </Box>
            <ProgressCircleIcon
              progress={(timeSpent / 15) * 100}
              sx={{
                width: "60px",
                height: "60px",
              }}
            />
          </Box>
        </Box>
      </ModalDialog>
    </Modal>
  );
};
