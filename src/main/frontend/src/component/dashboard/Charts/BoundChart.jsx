import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export default function BoundChart(props) {
  const { type, weekReqData, weekCompData } = props;
  const [percentage, setPercentage] = useState((weekCompData / weekReqData) * 100);

  const label = type === "inboundChart" ? ["입고 완료", "미입고"] : ["출고 완료", "미출고"];

  const data = {
    labels: label,
    datasets: [
      {
        label: "건 수",
        data: [weekCompData, weekReqData - weekCompData],
        backgroundColor: [
          "rgba(136, 216, 179, 0.8)",
          "rgba(192, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(136, 216, 179, 1)",
          "rgba(192, 192, 192, 0.2)",
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
        text: "Doughnut Chart Example",
      },
    },
    cutout: "70%",
  };

  // 중앙 텍스트를 위한 커스텀 플러그인
  const centerTextPlugin = {
    id: 'centerText',
    afterDatasetsDraw(chart, args, options) {
      const { ctx, chartArea: { width, height } } = chart;
      ctx.save();

      const text = type === "inboundChart" ? "입고 완료" : "출고 완료";
      ctx.font = '18px Arial';
      ctx.fillStyle = 'black';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, width / 2, height / 2.3);

      const percentageText = percentage.toFixed(2) + "%";
      ctx.font = '24px Arial';
      ctx.fillStyle = 'rgba(136, 216, 179, 1)';
      ctx.fillText(percentageText, width / 2, height / 1.7);
     
      ctx.restore();
    }
  };

  return (
    <div style={{width: "100%"}}>
      <Doughnut data={data} options={options} plugins={[centerTextPlugin]} />
    </div>
  );
}
