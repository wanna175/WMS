import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export default function UsageChart(props) {
  const { usageDataset, storageAreaData } = props;
  const labelsArray = Object.values(usageDataset).map(item => item.label);
  const dataArray = Object.values(usageDataset).map(item => item.data);
  
  let total = 0;
  dataArray.map(item => {
    total += item;
  })

  labelsArray.push("남는 공간");
  dataArray.push(storageAreaData - total);

  const data = {
    labels: labelsArray,
    datasets: [
      {
        label: "적재량",
        data: dataArray,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(128, 128, 128, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(128, 128, 128, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
      title: {
        display: false,
        text: "Doughnut Chart Example", // 차트의 기본 제목 (외부)
      },
    },
    cutout: "70%", // 도넛의 중앙을 넓게 만들어 텍스트를 위한 공간 확보
  };

  // 중앙 텍스트를 위한 커스텀 플러그인
  const centerTextPlugin = {
    id: 'centerText',
    afterDatasetsDraw(chart, args, options) {
      const { ctx, chartArea: { width, height } } = chart;
      ctx.save();
      const text = "창고 사용률";
      ctx.font = '20px Arial';
      ctx.fillStyle = 'black';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, width / 2, height / 2); // 차트 중앙에 텍스트 삽입
    }
  };

  return (
    <div style={{width: "100%"}}>
      <Doughnut data={data} options={options} plugins={[centerTextPlugin]} />
    </div>
  );
}
