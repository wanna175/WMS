import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import theme from "../../../styles/theme";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
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
);

const backgroundColor = [
  "rgba(255, 99, 132, 0.2)",
  "rgba(54, 162, 235, 0.2)",
  "rgba(255, 206, 86, 0.2)",
  "rgba(75, 192, 192, 0.2)",
  "rgba(153, 102, 255, 0.2)",
  "rgba(128, 128, 128, 0.2)",
];

const borderColor = [
  "rgba(255, 99, 132, 1)",
  "rgba(54, 162, 235, 1)",
  "rgba(255, 206, 86, 1)",
  "rgba(75, 192, 192, 1)",
  "rgba(153, 102, 255, 1)",
  "rgba(128, 128, 128, 1)",
];

export default function LineChart() {
  // 선택된 옵션을 관리하는 state
  const [selectedOption, setSelectedOption] = useState("전체");
  const [inDataset, setInDataset] = useState();

  const fetchDataset = async () => {
    try{
      let response;

      switch(selectedOption){
        case "입고":
          response = await axios.get("http://localhost:8080/api/invInTrend");
          break;
        case "출고":
          response = await axios.get("http://localhost:8080/api/invOutTrend");
          break;
        default:
          response = await axios.get("http://localhost:8080/api/invTotalTrend");
          break;
      }

      const labels = Object.keys(response.data);

      console.log("라벨: " + labels);

      const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [],
      };

      labels.map((key, index) => (data.datasets.push({
        label: key,
        data: response.data[key],
        borderColor: borderColor[index],
        backgroundColor: backgroundColor[index],
        tension: 0
      })));

      console.log(data);

      setInDataset(data);
      console.log(inDataset);
      
    } catch(error) {
      console.log("재고 추이 에러...")
    }
  };

  useEffect(() => {
    fetchDataset();
  }, selectedOption);

  

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        position: 'top',
        text: selectedOption + " 재고 추이", // 선택된 옵션에 따라 제목 변경
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  // 버튼 클릭 시 색상 변경을 위한 CSS 클래스
  const leftButtonStyle = (option) => ({
    backgroundColor: selectedOption === option ? theme.colors.glbOrange : theme.colors.glbGrey,
    color: selectedOption === option ? "#fff" : "#000",
    padding: "8px 16px",
    margin: "10px 0px 0px 10px",
    cursor: "pointer",
    border: "none",
    borderRadius: "16px 0px 0px 16px",
    fontSize: "12px",
  });

  const middleButtonStyle = (option) => ({
    backgroundColor: selectedOption === option ? theme.colors.glbOrange : theme.colors.glbGrey,
    color: selectedOption === option ? "#fff" : "#000",
    padding: "8px 16px",
    cursor: "pointer",
    borderRight: "solid 1px #d0d0d0",
    borderLeft: "solid 1px #d0d0d0",
    borderTop: "none",
    borderBottom: "none",
    fontSize: "12px",
  });

  const rightButtonStyle = (option) => ({
    backgroundColor: selectedOption === option ? theme.colors.glbOrange : theme.colors.glbGrey,
    color: selectedOption === option ? "#fff" : "#000",
    padding: "8px 16px",
    cursor: "pointer",
    border: "none",
    borderRadius: "0px 16px 16px 0px",
    fontSize: "12px",
  });

  return (
    <div style={{ width: "100%"}}>
      {/* 입고, 출고, 전체 버튼 */}
      <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
        <div style={{fontWeight: "bold", fontSize: "18px", alignContent: "center", marginLeft: "12px"}}>
          {selectedOption + " 재고 추이"}
        </div>
        <div>
          <button
            style={leftButtonStyle("전체")}
            onClick={() => {
              setSelectedOption("전체");
            }}
          >
            전체
          </button>
          <button
            style={middleButtonStyle("출고")}
            onClick={() => setSelectedOption("출고")}
          >
            출고
          </button>
          <button
            style={rightButtonStyle("입고")}
            onClick={() => setSelectedOption("입고")}
          >
            입고
          </button>
        </div>
      </div>
      {/* 차트 */}
      <div style={{width: "100%", height: "35vh", padding: "12px"}}>
        {inDataset && <Line data={inDataset} options={options} />}
      </div>
    </div>
  );
}
