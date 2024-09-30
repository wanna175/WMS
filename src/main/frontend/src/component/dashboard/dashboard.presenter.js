import * as S from "./dashboard.styles";

import styled from "@emotion/styled";
import theme from "../../styles/theme";
import {
  TruckOutlined
} from "@ant-design/icons";

import LineChart from "../../../src/component/dashboard/Charts/LineChart";
import LossChart from "../../../src/component/dashboard/Charts/LossChart";
import UsageChart from "./Charts/UsageChart";
import BoundChart from "./Charts/BoundChart";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const Item = styled.div`
  background-color: ${theme.colors.glbWhite};
  border-radius: 20px;
  border: ${theme.borders.greyBorder};
  padding: 12px;
`;

const TableItem = styled.div`
  background-color: ${theme.colors.glbLightGrey};
  border-radius: 20px;


  padding: 12px 8px 0px 8px;
  display: flex;
  flex-direction: column;

  .title {
    flex-shrink: 0;
    height: 18px;
  }

  .content {
    flex-grow:1;
    align-content:center;
    padding-bottom: 12px;
  }
`;

const Title = styled.text`
  font-weight: bold;
  font-size: 18px;
`;

export default function DashboardUI(props) {
  return (
    <Wrapper>
      <Container>
        <Item style={{ width: "50%", marginRight: "12px" }}>
          <Title>대기 중인 요청 수</Title>
          <div style={{ display: "flex", flexDirection:"row", height: "80%", marginTop: "5px" }}>
            <TableItem style={{flexGrow: "1", marginRight: "10px"}}>
              <div class="title" style={{ fontSize: "12px" }}>입고 예정</div>
              <div class="content" style={{ fontSize: "32px", textAlign: "center" }}>5건</div>
            </TableItem>
            <TableItem style={{flexGrow: "1"}}>
              <div class="title" style={{ fontSize: "12px" }}>입고 예정</div>
              <div class="content" style={{ fontSize: "32px", textAlign: "center" }}>5건</div>
            </TableItem>
          </div>
        </Item>
        <Item style={{ width: "50%" }}><LossChart /></Item>
      </Container>


      <Container style={{ height: "50vh", minHeight: "400px" }}>
        <Item style={{ width: "50%", display: "flex", marginRight: "12px" }}>
          <div style={{ display: "flex", flexDirection: "column", width: "50%", margin: "10px" }}>
            <div style={{ display: "flex", height: "15%" }}>
              <TruckOutlined style={{ color: theme.colors.glbDarkOrange }} />
              <div>
                <Title>입고</Title>
                <div style={{}}>최근 7일 기준</div>
              </div>
            </div>
            <BoundChart type="inboundChart" />
          </div>
          <div style={{ width: "50%", margin: "10px" }}>
            <div style={{ height: "15%" }}>
              <text style={{ fontWeight: "bold" }}>입고 월간 누적</text>
              <div>당월 기준 (08.01 ~ 08.31)</div>
            </div>
            <div style={{ height: "5%" }} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", height: "80%" }}>
              <TableItem>
                <div class="title" style={{ fontSize: "12px" }}>입고 예정</div>
                <div class="content" style={{ fontSize: "32px", textAlign: "center" }}>5건</div>
              </TableItem>
              <TableItem>
                <div class="title" style={{ fontSize: "12px" }}>처리 중</div>
                <div class="content" style={{ fontSize: "32px", textAlign: "center" }}>47건</div>
              </TableItem>
              <TableItem>
                <div class="title" style={{ fontSize: "12px" }}>입고 완료</div>
                <div class="content" style={{ fontSize: "32px", textAlign: "center" }}>75건</div>
              </TableItem>
              <TableItem>
                <div class="title" style={{ fontSize: "12px" }}>총 입고 수</div>
                <div class="content" style={{ fontSize: "32px", textAlign: "center" }}>127건</div>
              </TableItem>
            </div>
          </div>
        </Item>


        <Item style={{ width: "50%", display: "flex" }}>
          <div style={{ display: "flex", flexDirection: "column", width: "50%", margin: "10px" }}>
            <div style={{ display: "flex", height: "15%" }}>
              <TruckOutlined style={{ color: theme.colors.glbGreen }} />
              <div>
                <Title>출고</Title>
                <div style={{}}>최근 7일 기준</div>
              </div>
            </div>
            <BoundChart type="outboundChart" />
          </div>
          <div style={{ width: "50%", margin: "10px" }}>
            <div style={{ height: "15%" }}>
              <text style={{ fontWeight: "bold" }}>출고 월간 누적</text>
              <div>당월 기준 (08.01 ~ 08.31)</div>
            </div>
            <div style={{ height: "5%" }} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", height: "80%" }}>
              <TableItem>
                <div class="title" style={{ fontSize: "12px" }}>출고 예정</div>
                <div class="content" style={{ fontSize: "32px", textAlign: "center" }}>10건</div>
              </TableItem>
              <TableItem>
                <div class="title" style={{ fontSize: "12px" }}>처리 중</div>
                <div class="content" style={{ fontSize: "32px", textAlign: "center" }}>27건</div>
              </TableItem>
              <TableItem>
                <div class="title" style={{ fontSize: "12px" }}>출고 완료</div>
                <div class="content" style={{ fontSize: "32px", textAlign: "center" }}>45건</div>
              </TableItem>
              <TableItem>
                <div class="title" style={{ fontSize: "12px" }}>총 출고 수</div>
                <div class="content" style={{ fontSize: "32px", textAlign: "center" }}>82건</div>
              </TableItem>
            </div>
          </div>
        </Item>
      </Container>


      <Container>
        <Item style={{ width: "70%", marginRight: "12px" }}>
          <LineChart />
        </Item>
        <Item style={{ width: "30%" }}>
          <UsageChart />
        </Item>
      </Container>
    </Wrapper>
  );
}
