import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";

// Chart.js 구성 요소 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function LossChart(props) {
  const { lossDataset } = props;
  const labelsArray = Object.values(lossDataset).map(item => item.dateTime);
  const dataArray = Object.values(lossDataset).map(item => item.data);

  let total = 0;
  dataArray.map((item) => {
    total += item;
  });

  const data = {
    labels: labelsArray,
    datasets: [
      {
        label: "Loss",
        data: dataArray,
        borderColor: "rgba(255, 0, 0, 0.8)",
        backgroundColor: "rgba(255, 0, 0, 0.3)",
        fill: 'start',
        tension: 0.3
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        align: "start",
        text: " 월간 손실: $" + total,
        padding: 10
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: true,
      },
    },
  };

  return <Line data={data} options={options} />;
}
