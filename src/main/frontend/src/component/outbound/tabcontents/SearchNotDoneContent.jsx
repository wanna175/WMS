import React, { useEffect } from "react";
import { DatePicker, Space, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import * as H from "../../../styles/pageStyles";
import theme from "../../../styles/theme";


const statusOption = [
  { value: "전체", label: "전체" },
  { value: "미승인", label: "미승인" },
  { value: "승인", label: "승인" },
  { value: "반려", label: "반려" },
];
const arriveNameOption = [
  { value: "서울 창고", label: "서울 창고" },
  { value: "부산 창고", label: "부산 창고" },
  { value: "대구 창고", label: "대구 창고" },
  { value: "광주 창고", label: "광주 창고" },
  { value: "인천 창고", label: "인천 창고" },
  { value: "귤로벌마트", label: "귤로벌마트" },
];
const itemOption = [
  { value: "귤", label: "귤" },
  { value: "한라봉", label: "한라봉" },
  { value: "사과", label: "사과" },
  { value: "레몬", label: "레몬" },
  { value: "감귤", label: "감귤" },
];


export default function SearchNotDoneContent({
  data,
  status,
  setStatus,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  arriveName,
  setArriveName,
  item,
  setItem,
  fetchData,
}) {
  const { RangePicker } = DatePicker;
  console.log("SearchContent 렌더링"); // 렌더링될 때마다 출력
  console.log("fetchData: ", fetchData);


  const handleArriveNameChange = (value) => {
    console.log("ArriveName changed to: ", value);
    const selectedValue = value;
    // 수신지가 '귤로벌마트'일 경우 arrive_storage_id를 null로 보내도록 처리
    if (selectedValue === "귤로벌마트") {
      setArriveName(null); // arrive_storage_id를 null로 설정
      //setOutboundMart(1);
    } else {
      setArriveName(value); // 다른 창고명은 그대로 설정
      //setOutboundMart(0);
    }
  };
  const handleDateChange = (dates, dateStrings) => {
    console.log("Dates changed to: ", dates, dateStrings);
    if (dates) {
      setStartDate(dateStrings[0]); // 시작일
      setEndDate(dateStrings[1]); // 종료일
    } else {
      setStartDate(null);
      setEndDate(null);
    }


  };
  return (
    <div>
      <Select
        showSearch
        placeholder="진행 상태"
        value={status || undefined}
        onChange={(value) => setStatus(value)}
        options={statusOption}
        style={{ width: "auto", minWidth: "150px", marginRight: "3px" }}
      />
      <Space direction="vertical" size={12} style={{marginRight: "3px"}}>
        <RangePicker
          placeholder={["시작일", "종료일"]}
          onChange={handleDateChange}
        />
      </Space>
      <Select
        showSearch
        placeholder="수신지"
        value={arriveName || undefined}
        onChange={handleArriveNameChange}
        options={arriveNameOption}
        style={{ width: "auto", minWidth: "150px", marginRight: "3px" }}
      />
      <Select
        showSearch
        placeholder="품목"
        value={item || undefined}
        onChange={(value) => setItem(value)}
        options={itemOption}
        style={{ width: "auto", minWidth: "150px", marginRight: "3px" }}
      />
      <button onClick={fetchData} style={{backgroundColor: theme.colors.glbWhite, border: "none"}}><SearchOutlined/></button>


    </div>
  );
}
