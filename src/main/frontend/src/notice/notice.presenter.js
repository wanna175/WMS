import * as S from "./notice.styles";
import { Card } from "antd";
import theme from "../styles/theme";
import styled from "@emotion/styled";
import { useState } from "react";
import { CheckSquareOutlined, PlusSquareOutlined, DeleteOutlined } from "@ant-design/icons";

export default function NoticeUI(props) {
  const [isHoverd, setIsHovered] = useState(false);

  return (
    <>
      <Card
        style={{
          width: "100%",
          border: "none",
          backgroundColor: isHoverd
            ? theme.colors.glbLightGrey
            : theme.colors.glbWhite
        }}
        bodyStyle={{ padding: "8px 0px" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div style={{ display: "inline" }}>
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
              <div style={{
                width: "6px", height: "6px",
                // el.checked로 변경되게 바꿔줘야 함
                backgroundColor: theme.colors.glbOrange,
                visibility: props.color === "white"
                  ? "hidden"
                  : "visible",
                borderRadius: "50%",
                margin: "8px"
              }} />
              <p style={{ fontSize: "18px" }}>{props.el.title}</p>
            </div>
            {isHoverd ?
              <div style={{ color: theme.colors.glbDarkGrey }}>
                {props.color === "white"
                  ? <PlusSquareOutlined style={{marginRight: "12px"}} onClick={props.onClickNotice} />
                  : <CheckSquareOutlined style={{marginRight: "12px"}} onClick={props.onClickNotice} />}
                <DeleteOutlined style={{marginRight: "12px"}} onClick={() => { return console.log("삭제하는 기능도 넣어주세요") }} />
              </div>
              : <p style={{ fontSize: "12px", marginRight: "12px", color: theme.colors.glbDarkGrey }}>{props.el.date}</p>}
          </div>
          <p style={{ marginLeft: "22px" }}>{props.el.content}</p>
        </div>
      </Card>
      <div style={{ hegith: "1px", border: "solid 0.5px rgb(217, 217, 217)", }} />
    </>
  );
}
