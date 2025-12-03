import BullseyeIcon from "../../icons/bullseye";
import { ProgressCircleIcon } from "../../icons/progress-circle";
import ScoreIcon from "../../icons/score";
import WPMIcon from "../../icons/wpm";
import { Modal, ModalClose, ModalDialog, Box } from "@mui/joy";
import { useRef, useEffect, useState, RefAttributes } from "react";
import { useTheme } from "@mui/joy/styles";
import { displayPercentage, addPlusIfPositive } from "../../utils/display";
import { BarPlotProps } from "@mui/x-charts/BarChart";
import { LinePlotProps } from "@mui/x-charts/LineChart";
import { ChartContainerProps } from "@mui/x-charts/ChartContainer";
import { ChartsYAxisProps, ChartsXAxisProps } from "@mui/x-charts";
import { ChartsReferenceLineProps } from "@mui/x-charts/ChartsReferenceLine";
import { ChartsTooltipProps } from "@mui/x-charts/ChartsTooltip";
import { useKeyTimeArrays } from "../../hooks/useKeyTimeArrays";
import { useResultModalData } from "../../hooks/useResultModalData";
import { StatCard } from "../stat-card";

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
      Promise.all([
        import("@mui/x-charts/ChartContainer"),
        import("@mui/x-charts/BarChart"),
        import("@mui/x-charts/LineChart"),
        import("@mui/x-charts"),
      ]).then(([chartContainer, barChart, lineChart, charts]) => {
        setComponent(() => chartContainer.ChartContainer);
        setBarChartComponent(() => barChart.BarPlot);
        setLineChartComponent(() => lineChart.LinePlot);
        setChartsYAxisComponent(() => charts.ChartsYAxis);
        setChartsXAxisComponent(() => charts.ChartsXAxis);
        setChartsReferenceLine(() => charts.ChartsReferenceLine);
        setChartsToolTip(() => charts.ChartsTooltip);
      });
    }
  }, []);

  const closeModal = () => {
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
  };

  const determineColor = (value: number | "") => {
    return value !== "" && value >= 0
      ? theme.vars.palette.success.plainColor
      : theme.vars.palette.danger.plainColor;
  };

  const { timeArray, keyArray } = useKeyTimeArrays(keyTimeMap);
  const theme = useTheme();
  const averageTime =
    timeArray.reduce((acc, curr) => acc + curr, 0) / timeArray.length;
  return (
    <Modal ref={ref} open={isOpen} onClose={closeModal}>
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
          <StatCard
            icon={
              <WPMIcon
                sx={{
                  width: "60px",
                  height: "38px",
                  marginTop: "16px",
                  marginBottom: "8px",
                }}
              />
            }
            label="WPM"
            value={Math.round(currentWPM * 10) / 10}
            delta={addPlusIfPositive(wpmDelta)}
            color={determineColor(wpmDelta)}
          />
          <StatCard
            icon={<BullseyeIcon />}
            label="Accuracy"
            value={`${Math.round(currentAccuracy * 10) / 10}%`}
            delta={displayPercentage(accDelta)}
            color={determineColor(accDelta)}
          />
          <StatCard
            icon={<ScoreIcon />}
            label="Score"
            value={Math.round(currentScore)}
          />
          <StatCard
            icon={
              <ProgressCircleIcon
                progress={Math.min(timeSpent / 15, 1) * 100}
                sx={{
                  width: "70px",
                  height: "70px",
                }}
              />
            }
            label="Daily Time"
            value={`${Math.round(timeSpent)}m`}
          />
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
