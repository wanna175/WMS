import * as S from "./requsestinbound.styles";
import React from "react";
import { Divider, Tabs, Table, Button } from 'antd';
import SearchContent from "./tabcontents/SearchNotDoneContent";
import PrintData from "./tabcontents/PrintNoteDoneData";

export default function InboundUI({
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
  approveInboundRequests,
  rejectInboundRequests,
  handleCheckboxChange,
}) {
  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: '1',
      label: '전체 조회',
      children: <PrintData type="all" data={data}/>,
    },
    {
      key: '2',
      label: '승인',
      children: <PrintData type="accepted" data={data}/>,
    },
    {
      key: '3',
      label: '미승인',
      children: <PrintData type="denied" data={data}/>,
    },
    {
      key: '4',
      label: '검색',
      children:  (
        <>
          <SearchContent
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
            approveInboundRequests={approveInboundRequests}
            rejectInboundRequests={rejectInboundRequests}
            handleCheckboxChange={handleCheckboxChange}
          />
          <PrintData type="search" data={data} /> {/* PrintData는 SearchContent 아래에서 데이터를 출력 */}
        </>
      ),
    },
  ];
  
  return (
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
  );
}

