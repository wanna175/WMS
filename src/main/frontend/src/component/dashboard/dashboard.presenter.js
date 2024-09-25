import * as S from "./dashboard.styles";

import LineChart from "../../../src/component/dashboard/Charts/LineChart";
import LossChart from "../../../src/component/dashboard/Charts/LossChart";
import UsageChart from "./Charts/UsageChart";
import BoundChart from "./Charts/BoundChart";

export default function DashboardUI(props) {
  console.log(props);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", border: "solid 1px grey" }}>
        <div style={{ width: "40%", border: "solid 1px grey", margin: "10px" }}>공지사항</div>
        <div style={{ width: "40%", border: "solid 1px grey", margin: "10px" }}><LossChart lossDataset={props.lossDataset} /></div>
        <div style={{ width: "20%", border: "solid 1px grey", margin: "10px" }}><UsageChart usageDataset={props.usageDataset} storageAreaData={props.storageAreaData} /></div>
      </div>


      <div style={{ display: "flex", justifyContent: "space-between", border: "solid 1px grey" }}>
        <div style={{ width: "50%", display: "flex", justifyContent: "space-between", border: "solid 1px grey", margin: "10px" }}>
          <div style={{ width: "50%", border: "solid 1px grey", margin: "10px" }}>
            <div style={{ display: "flex", border: "solid 1px grey" }}>
              <div style={{ border: "solid 1px grey" }}>입고 아이콘</div>
              <div>
                <div style={{ border: "solid 1px grey" }}>입고</div>
                <div style={{ border: "solid 1px grey" }}>최근 7일 기준</div>
              </div>
            </div>
            <BoundChart type="inboundChart" weekReqData={props.weekReqData} weekCompData={props.weekCompData} />
          </div>
          <div style={{ width: "50%", border: "solid 1px grey", margin: "10px" }}>
            <div>
              <div>입고 월간 누적</div>
              <div>당월 기준 (08.01 ~ 08.31)</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <div style={{ backgroundColor: "grey", padding: "20px", textAlign: "center" }}>
                <text>입고 예정</text>
                <text>5건</text>
              </div>
              <div style={{ backgroundColor: "grey", padding: "20px", textAlign: "center" }}>
                <text>처리 중</text>
                <text>47건</text>
              </div>
              <div style={{ backgroundColor: "grey", padding: "20px", textAlign: "center" }}>
                <text>입고 완료</text>
                <text>75건</text>
              </div>
              <div style={{ backgroundColor: "grey", padding: "20px", textAlign: "center" }}>
                <text>총 입고 수</text>
                <text>127건</text>
              </div>
            </div>
          </div>
        </div>


        <div style={{ width: "50%", display: "flex", justifyContent: "space-between", border: "solid 1px grey", margin: "10px" }}>
          <div style={{ width: "50%", border: "solid 1px grey", margin: "10px" }}>
            <div style={{ display: "flex", border: "solid 1px grey" }}>
              <div style={{ border: "solid 1px grey" }}>출고 아이콘</div>
              <div>
                <div style={{ border: "solid 1px grey" }}>출고</div>
                <div style={{ border: "solid 1px grey" }}>최근 7일 기준</div>
              </div>
            </div>
            {/* <BoundChart tyep="outboundChart" usageDataset={props.usageDataset} storageAreaData={props.storageAreaData} /> */}
          </div>
          <div style={{ width: "50%", border: "solid 1px grey", margin: "10px" }}>
            <div>
              <div>출고 월간 누적</div>
              <div>당월 기준 (08.01 ~ 08.31)</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <div style={{ backgroundColor: "grey", padding: "20px", textAlign: "center" }}>
                <text>출고 예정</text>
                <text>5건</text>
              </div>
              <div style={{ backgroundColor: "grey", padding: "20px", textAlign: "center" }}>
                <text>처리 중</text>
                <text>47건</text>
              </div>
              <div style={{ backgroundColor: "grey", padding: "20px", textAlign: "center" }}>
                <text>출고 완료</text>
                <text>75건</text>
              </div>
              <div style={{ backgroundColor: "grey", padding: "20px", textAlign: "center" }}>
                <text>총 출고 수</text>
                <text>127건</text>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div style={{ width: "100%" }}>
        <LineChart />
      </div>
      <div style={{ width: "100%" }}>
        <LineChart />
      </div>
      <div style={{ width: "100%" }}>
        <LineChart />
      </div>
    </div>
  );
}
