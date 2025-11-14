import { BarChart } from "@mui/x-charts/BarChart";
const rawData = [
  5, 15, 25, 40, 60, 80, 90, 105, 112, 115, 118, 120, 115, 110, 90, 70, 50, 30,
  20, 10, 5,
];

const dataBins = [
  "20",
  "30",
  "40",
  "50",
  "60",
  "70",
  "80",
  "90",
  "100",
  "110",
  "120",
  "130",
  "140",
  "150",
  "160",
  "170",
  "180",
  "190",
  "200",
  "210",
  "220",
  "230",
];

export default function WpmBellCurveChart() {
  return (
    <BarChart
      width={500}
      height={300}
      series={[
        {
          type: "bar",
          data: rawData, // Your binned data
          label: "Observed Frequency",
        },
      ]}
      borderRadius={12}
      xAxis={[{ scaleType: "band", data: dataBins, label: "wpm" }]}
      yAxis={[{ position: "none" }]}
    ></BarChart>
  );
}
