import BullseyeIcon from "../../icons/bullseye";
import { ProgressCircleIcon } from "../../icons/progress-circle";
import ScoreIcon from "../../icons/score";
import WPMIcon from "../../icons/wpm";
import { Modal, ModalClose, ModalDialog, Typography, Box } from "@mui/joy";
import { useRef, useEffect, useState, RefAttributes } from "react";
import { useTheme } from "@mui/joy/styles";
import { addPlus } from "../../utils/util";
import { BarChartProps } from "@mui/x-charts/BarChart";

interface Props {
  setTimeInfo: React.Dispatch<
    React.SetStateAction<{
      started: boolean;
      ended: boolean;
    }>
  >;
  currentWPM: number;
  currentAccuracy: number;
  currentScore: number;
  currentTime: number;
  keyTimeMap: React.RefObject<Record<string, number[]>>;
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
  currentAccuracy,
  currentScore,
  currentTime,
  keyTimeMap,
  setTimeInfo,
  isOpen,
  newTestPage,
  setIsResultsModalOpen,
  childInputRef,
  setResetCounter,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  // Example values for demonstration; replace with your actual logic
  const timeSpent = 5.2 + currentTime / 60;
  const wpmDelta = 2.7;
  const accDelta = 1.8;
  const scoreDelta = -1920;
  const [keyArray, setKeyArray] = useState<string[]>([]);
  const [timeArray, setTimeArray] = useState<number[]>([]);
  const [BarChartComponent, setBarChartComponent] =
    useState<null | React.ComponentType<
      BarChartProps & RefAttributes<SVGSVGElement>
    >>(null);

  useEffect(() => {
    if (process.env.NODE_ENV !== "test") {
      import("@mui/x-charts").then((mui) => {
        setBarChartComponent(mui.BarChart);
      });
    }
  }, []);

  useEffect(() => {
    const keyArr = keyTimeMap?.current ? Object.keys(keyTimeMap.current) : [];
    const timeArr = keyTimeMap?.current
      ? Object.values(keyTimeMap.current).reduce((acc, curr) => {
          const totalTime = curr.reduce((sum, time) => sum + time, 0);
          acc.push(totalTime / curr.length);
          return acc;
        }, [])
      : [];
    const list = [];
    for (let j = 0; j < keyArr.length; j++)
      list.push({ key: keyArr[j], time: timeArr[j] });

    //2) sort:
    list.sort(function (a, b) {
      return a.time > b.time ? -1 : a.time == b.time ? 0 : 1;
    });

    //3) separate them back out:
    for (let k = 0; k < list.length; k++) {
      keyArr[k] = list[k].key;
      timeArr[k] = list[k].time;
    }

    setKeyArray(keyArr);
    setTimeArray(timeArr);
  }, [isOpen, keyTimeMap]);

  const theme = useTheme();
  return (
    <Modal
      ref={ref}
      open={isOpen}
      onClose={() => {
        childInputRef?.current ? childInputRef?.current.focus() : null;
        newTestPage();
        keyTimeMap.current = {};
        setTimeInfo({
          started: false,
          ended: false,
        });
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
          gap: "22px",
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
              borderRadius: "20px",
              padding: "14px",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "start",
              position: "relative",
            }}
          >
            <WPMIcon />
            <Typography
              level="body-xs"
              sx={{ fontSize: "18px", mt: 1.5, mb: 0.5 }}
            >
              WPM
            </Typography>
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
              borderRadius: "20px",
              padding: "14px",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "start",
              position: "relative",
            }}
          >
            <BullseyeIcon />
            <Typography level="body-xs" sx={{ fontSize: "18px", my: 0.5 }}>
              Accuracy
            </Typography>
            <Typography level="h2" sx={{ fontWeight: 700 }}>
              {Math.round(currentAccuracy * 10) / 10}%
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
              borderRadius: "20px",
              padding: "14px",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "start",
              position: "relative",
            }}
          >
            <ScoreIcon />
            <Typography
              level="body-xs"
              sx={{ fontSize: "18px", mt: 0, mb: 0.25 }}
            >
              Score
            </Typography>
            <Typography level="h2" sx={{ fontWeight: 700 }}>
              {Math.round(currentScore)}
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
              borderRadius: "20px",
              padding: "14px",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "start",
            }}
          >
            <ProgressCircleIcon
              progress={(timeSpent / 15) * 100}
              sx={{
                width: "70px",
                height: "70px",
              }}
            />
            <Typography
              level="body-xs"
              sx={{ fontSize: "18px", mt: 0.5, mb: 0.3 }}
            >
              Daily Time
            </Typography>
            <Typography level="h2" sx={{ fontWeight: 700 }}>
              {Math.round(currentScore)}m
            </Typography>
          </Box>
        </Box>

        {BarChartComponent ? (
          <Box
            sx={{
              bgcolor: (theme) => theme.palette.neutral[700],
              borderRadius: "20px",
              padding: "10px",
            }}
          >
            <BarChartComponent
              title="Key Press Times"
              colors={[theme.vars.palette.primary[800]]}
              xAxis={[{ label: "Keys", data: keyArray }]}
              yAxis={[{ label: "Average Time (ms)" }]}
              series={[{ data: timeArray }]}
              height={300}
            />
          </Box>
        ) : (
          <div />
        )}
      </ModalDialog>
    </Modal>
  );
};
