import * as S from "./outbounddonelist.styles";
import React from "react";
import { Divider, Tabs, Table, Button } from 'antd';
import SearchDoneContent from "../Tabcontents/SearchDoneContent";
import PrintDoneData from "../Tabcontents/PrintDoneData";



// OutboundUI 컴포넌트는 검색 조건 입력 UI와 데이터 리스트를 화면에 렌더링합니다.
export default function OutboundUI({
  data,
  status,
  requestDate,
  setRequestDate,
  setStatus,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  arriveName,
  setArriveName,
  item,
  setItem,
  outboundMart,
  setOutboundMart,
  outboundIds,
  setOutboundIds,
  fetchData,
  rejectOutboundDone,
  handleCheckboxChange
}) {

  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: '1',
      label: '전체 조회',
      children: <PrintDoneData type="all" data={data}/>,
    },
    {
      key: '2',
      label: '출고완료',
      children: <PrintDoneData type="start" data={data}/>,
    },
    {
      key: '3',
      label: '입고완료',
      children: <PrintDoneData type="end" data={data}/>,
    },
    {
      key: '4',
      label: '검색',
      children:  (
        <>
          <SearchDoneContent
            status={status}
            setStatus={setStatus}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={setEndDate}
            setEndDate={setEndDate}
            arriveName={arriveName}
            setArriveName={setArriveName}
            outboundMart={outboundMart}
            setOutboundMart={setOutboundMart}
            item={item}
            setItem={setItem}
            fetchData={fetchData}
            rejectOutboundDone={rejectOutboundDone}
          />
          <PrintDoneData type="search" data={data} /> {/* PrintData는 SearchContent 아래에서 데이터를 출력 */}
        </>
      ),
    },
  ];
  
  return (
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
  );
}


