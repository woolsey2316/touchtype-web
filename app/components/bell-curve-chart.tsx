import { BarChart } from "@mui/x-charts/BarChart";
import { Box } from "@mui/joy";
import useSWR from "swr";

export default function WpmBellCurveChart() {
  const baseURL = import.meta.env.VITE_API_ORIGIN || "";
  const token = localStorage.getItem("authToken");
  const fetcher = (path: string) =>
    fetch(`${baseURL}${path}`, {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`, // Assuming Bearer token authentication
        "Content-Type": "application/json", // Example of another header
      },
    }).then((res) => res.json());
  const { data } = useSWR(`/api/wpm-bell-curve`, fetcher);

  if (!data) {
    return <Box sx={{ padding: "1em", textAlign: "center" }}>Loading...</Box>;
  }

  const rawData: number[] = data.rawData;
  const dataBins: string[] = data.dataBins;
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
