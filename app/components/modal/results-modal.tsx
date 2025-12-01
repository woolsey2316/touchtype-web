import BullseyeIcon from "../../icons/bullseye";
import { ProgressCircleIcon } from "../../icons/progress-circle";
import ScoreIcon from "../../icons/score";
import WPMIcon from "../../icons/wpm";
import { Modal, ModalClose, ModalDialog, Typography, Box } from "@mui/joy";
import { useRef, useEffect, useState, RefAttributes } from "react";
import { useTheme } from "@mui/joy/styles";
import { addPlus } from "../../utils/util";
import { BarPlotProps } from "@mui/x-charts/BarChart";
import { LinePlotProps } from "@mui/x-charts/LineChart";
import { ChartContainerProps } from "@mui/x-charts/ChartContainer";
import { ChartsYAxisProps, ChartsXAxisProps } from "@mui/x-charts";
import { ChartsReferenceLineProps } from "@mui/x-charts/ChartsReferenceLine";
import { ChartsTooltipProps } from "@mui/x-charts/ChartsTooltip";
import { useKeyTimeArrays } from "../../hooks/useKeyTimeArrays";
import { useResultModalData } from "../../hooks/useResultModalData";
interface Props {
  setTimeInfo: React.Dispatch<
    React.SetStateAction<{
      started: boolean;
      ended: boolean;
    }>
  >;
  previousWPM: number | undefined;
  previousAccuracy: number | undefined;
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
  previousWPM,
  previousAccuracy,
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
  const { resultModalData } = useResultModalData();
  // Example values for demonstration; replace with your actual logic
  const timeSpent = resultModalData?.data
    ? resultModalData?.data / 60 + currentTime / 60
    : currentTime / 60;
  const wpmDelta = previousWPM
    ? Math.round((currentWPM - previousWPM) * 10) / 10
    : "";
  const accDelta = previousAccuracy
    ? Math.round((currentAccuracy - previousAccuracy) * 10) / 10
    : "";
  const [BarChartComponent, setBarChartComponent] =
    useState<null | React.ComponentType<
      BarPlotProps & RefAttributes<SVGSVGElement>
    >>(null);
  const [LineChartComponent, setLineChartComponent] =
    useState<null | React.ComponentType<
      LinePlotProps & RefAttributes<SVGSVGElement>
    >>(null);
  const [ChartComponent, setComponent] = useState<null | React.ComponentType<
    ChartContainerProps & RefAttributes<SVGSVGElement>
  >>(null);
  const [ChartsYAxisComponent, setChartsYAxisComponent] =
    useState<null | React.ComponentType<
      ChartsYAxisProps & RefAttributes<SVGSVGElement>
    >>(null);
  const [ChartsXAxisComponent, setChartsXAxisComponent] =
    useState<null | React.ComponentType<
      ChartsXAxisProps & RefAttributes<SVGSVGElement>
    >>(null);
  const [ChartsReferenceLine, setChartsReferenceLine] =
    useState<null | React.ComponentType<
      ChartsReferenceLineProps & RefAttributes<SVGSVGElement>
    >>(null);
  const [ChartsTooltip, setChartsToolTip] = useState<null | React.ComponentType<
    ChartsTooltipProps & RefAttributes<SVGSVGElement>
  >>(null);

  useEffect(() => {
    if (process.env.NODE_ENV !== "test") {
      import("@mui/x-charts/ChartContainer").then((mui) => {
        setComponent(() => mui.ChartContainer);
      });
      import("@mui/x-charts/BarChart").then((mui) => {
        setBarChartComponent(() => mui.BarPlot);
      });
      import("@mui/x-charts/LineChart").then((mui) => {
        setLineChartComponent(() => mui.LinePlot);
      });
      import("@mui/x-charts").then((mui) => {
        setChartsYAxisComponent(() => mui.ChartsYAxis);
      });
      import("@mui/x-charts").then((mui) => {
        setChartsXAxisComponent(() => mui.ChartsXAxis);
      });
      import("@mui/x-charts").then((mui) => {
        setChartsReferenceLine(() => mui.ChartsReferenceLine);
      });
      import("@mui/x-charts").then((mui) => {
        setChartsToolTip(() => mui.ChartsTooltip);
      });
    }
  }, []);

  const { timeArray, keyArray } = useKeyTimeArrays(keyTimeMap);
  const theme = useTheme();
  const averageTime =
    timeArray.reduce((acc, curr) => acc + curr, 0) / timeArray.length;
  return (
    <Modal
      ref={ref}
      open={isOpen}
      onClose={() => {
        if (childInputRef?.current) {
          childInputRef?.current.focus();
        }
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
          width: "900px",
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
                  wpmDelta !== "" && wpmDelta >= 0
                    ? theme.vars.palette.success.plainColor
                    : theme.vars.palette.danger.plainColor,
              }}
            >
              {wpmDelta !== "" && addPlus(wpmDelta)}
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
                  accDelta !== "" && accDelta >= 0
                    ? theme.vars.palette.success.plainColor
                    : theme.vars.palette.danger.plainColor,
              }}
            >
              {accDelta !== "" && addPlus(accDelta)}%
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
              progress={Math.min(timeSpent / 15, 1) * 100}
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
              {Math.round(timeSpent)}m
            </Typography>
          </Box>
        </Box>

        {ChartComponent &&
        BarChartComponent &&
        LineChartComponent &&
        ChartsYAxisComponent &&
        ChartsXAxisComponent &&
        ChartsReferenceLine &&
        ChartsTooltip ? (
          <Box
            sx={{
              bgcolor: (theme) => theme.palette.neutral[700],
              borderRadius: "20px",
              padding: "10px",
            }}
          >
            <ChartComponent
              title=""
              colors={[
                theme.vars.palette.primary[800],
                theme.vars.palette.primary[300],
              ]}
              xAxis={[
                { scaleType: "band", label: "Keyboard Char", data: keyArray },
              ]}
              yAxis={[{ label: "Average Time (ms)" }]}
              height={300}
              series={[
                {
                  type: "bar",
                  data: Array.isArray(timeArray) ? timeArray : [],
                  valueFormatter: (value: number | null) =>
                    Math.round(value ?? 0) + "ms",
                },
              ]}
            >
              <BarChartComponent />
              <LineChartComponent />
              <ChartsReferenceLine
                y={averageTime}
                label={"Avg: " + Math.round(averageTime) + "ms"}
                lineStyle={{
                  stroke: theme.vars.palette.primary[300],
                  strokeDasharray: "5 5",
                }}
                labelStyle={{ marginLeft: "100px" }}
              />
              <ChartsXAxisComponent />
              <ChartsYAxisComponent />
              <ChartsTooltip />
            </ChartComponent>
          </Box>
        ) : (
          <div>Loading Chart...</div>
        )}
      </ModalDialog>
    </Modal>
  );
};
