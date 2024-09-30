import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
import { useAPI } from "../../../axios/useAPI";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export default function BoundChart(props) {
  const { get } = useAPI();

  const { type } = props;
  const [labelsArray, setLabelsArray] = useState(
    type === "inboundChart" ? ["입고 완료", "미입고"] : ["출고 완료", "미출고"]
  );
  const [graphColor, setGraphColor] = useState(
    type === "inboundChart"
      ? ["rgba(136, 216, 179, 0.8)", "rgba(136, 216, 179, 1)"]
      : ["rgba(155, 193, 250, 0.8)", "rgba(155, 193, 250, 1)"]
  );
  const [dataArray, setDataArray] = useState([]);
  let percentage;

  const fetchDataset = async () => {
    try {
      const response =
        type === "inboundChart"
          ? await get("/inboundForWeekData")
          : await get("/outboundForWeekData");

      const fetchedReqData = response.data.req;
      const fetchedCompData = response.data.comp;

      const data = [fetchedCompData, fetchedReqData - fetchedCompData];
      percentage = ((fetchedCompData / fetchedReqData) * 100).toFixed(2);

      setDataArray(data);
    } catch (error) {
      ////////////////////////////////////////////// 예외 처리 해줘야하는데...
      console.log("입고 에러");
    }
  };

  useEffect(() => {
    fetchDataset();
  }, []);

  const data = {
    labels: labelsArray,
    datasets: [
      {
        label: "건 수",
        data: dataArray,
        backgroundColor: [graphColor[0], "rgba(192, 192, 192, 0.2)"],
        borderColor: [graphColor[1], "rgba(192, 192, 192, 0.2)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
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
    id: "centerText",
    afterDatasetsDraw(chart, args, options) {
      const {
        ctx,
        chartArea: { width, height },
      } = chart;
      ctx.save();

      const text = type === "inboundChart" ? "입고 완료" : "출고 완료";
      ctx.font = "18px Arial";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, width / 2, height / 2.3);

      const percentageText = percentage + "%";
      ctx.font = "24px Arial";
      ctx.fillStyle = graphColor[1];
      ctx.fillText(percentageText, width / 2, height / 1.7);

      ctx.restore();
    },
  };

  return (
    <div style={{ flexGrow: "1", height: "30vh", padding: "16px" }}>
      <Doughnut data={data} options={options} plugins={[centerTextPlugin]} />
    </div>
  );
}
