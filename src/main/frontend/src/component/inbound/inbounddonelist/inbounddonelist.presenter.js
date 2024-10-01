import * as S from "./inbounddonelist.styles";
import React from "react";
import { Divider, Tabs, Table, Button } from 'antd';
import SearchDoneContent from "../tabcontents/SearchDoneContent";
import PrintDoneData from "../tabcontents/PrintDoneData";

export default function InboundUI({
  data,
  status,
  setStatus,
  startDate,
  setStartDate,
  setEndDate,
  arriveName,
  setArriveName,
  item,
  setItem,
  outboundMart,
  setOutboundMart,
  fetchData,
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