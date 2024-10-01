  import React from "react";
  import { Divider, Tabs, Table, Button } from 'antd';
  import SearchContent from "./tabcontents/SearchNotDoneContent";
  import PrintData from "./Tabcontents/PrintNotDoneData";



  // OutboundUI 컴포넌트는 검색 조건 입력 UI와 데이터 리스트를 화면에 렌더링합니다.
  export default function OutboundUI({
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
    selectedRowKeys,
    setSelectedRowKeys,
    selectedRows,
    setSelectedRows,
    approveOutboundRequests,
    rejectOutboundRequests,
  }) {

    const onChange = (key) => {
      console.log(key);
    };
    const items = [
      {
        key: '1',
        label: '전체 조회',
        children: <PrintData type="all" data={data}
        approveOutboundRequests={approveOutboundRequests}
        rejectOutboundRequests={rejectOutboundRequests}
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}/>,
      },
      {
        key: '2',
        label: '승인',
        children: <PrintData type="accepted" data={data}
        approveOutboundRequests={approveOutboundRequests}
        rejectOutboundRequests={rejectOutboundRequests}
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}/>,
      },
      {
        key: '3',
        label: '미승인',
        children: <PrintData type="denied" data={data}
        approveOutboundRequests={approveOutboundRequests}
        rejectOutboundRequests={rejectOutboundRequests}
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}/>,
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
              selectedRowKeys={selectedRowKeys}
              setSelectedRowKeys={setSelectedRowKeys}
              selectedRows={selectedRows}
              setSelectedRows={setSelectedRows}
              approveOutboundRequests={approveOutboundRequests}
              rejectOutboundRequests={rejectOutboundRequests}
            />
            <PrintData type="search" data={data} 
            approveOutboundRequests={approveOutboundRequests}
            rejectOutboundRequests={rejectOutboundRequests}
            selectedRowKeys={selectedRowKeys}
            setSelectedRowKeys={setSelectedRowKeys}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            /> {/* PrintData는 SearchContent 아래에서 데이터를 출력 */}
          </>
        ),
      },
    ];
    
    return (
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    );
  }

