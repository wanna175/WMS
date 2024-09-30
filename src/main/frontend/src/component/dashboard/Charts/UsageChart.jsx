import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export default function UsageChart(props) {
  const [labelsArray, setLabelsArray] = useState([]);
  const [dataArray, setDataArray] = useState([]);
  let percentage;
  
  // 창고 사용률 그래프 데이터셋 초기화
  const fetchUsageDataset = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/usageData");

      const fetchedData = response.data.products;
      const maxCapacity = response.data.storageArea;

      const labels = fetchedData.map((item) => item.label);
      const data = fetchedData.map((item) => item.data);
      const totalUsage = data.reduce((acc, item) => acc + item, 0);

      labels.push("남는 공간");
      data.push(maxCapacity - totalUsage);

      percentage = ((totalUsage / maxCapacity) * 100).toFixed(2);
      
      setLabelsArray(labels);
      setDataArray(data);

    } catch (error) {
      ////////////////////////////////////////////// 예외 처리 해줘야하는데...
      console.log('창고 사용률 에러');
    }
  }

  useEffect(() => {
    fetchUsageDataset();
  }, []);

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
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
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

      const text = "창고 사용";
      ctx.font = '18px Arial';
      ctx.fillStyle = 'black';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, width / 2, height / 2.3);

      const percentageText = percentage + "%";
      ctx.font = '24px Arial';
      ctx.fillStyle = "rgba(128, 128, 128, 1)";
      ctx.fillText(percentageText, width / 2, height / 1.7);
    }
  };

  return (
    <div style={{width: "100%", height:"100%"}}>
      <div style={{fontWeight: "bold", fontSize: "18px", marginLeft: "12px", height: "5vh"}}>
        재고 추이
      </div>
      <div style={{width: "100%", height: "35vh"}}>
        <Doughnut data={data} options={options} plugins={[centerTextPlugin]} />
      </div>
    </div>
  );
}
