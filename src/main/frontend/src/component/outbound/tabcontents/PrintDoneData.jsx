import * as H from "../../../styles/pageStyles";
import React, { useState } from 'react';

const columns = [
  {
    title: '출고요청서ID',
    dataIndex: 'outboundId',
  },
    {
      title: '발송지',
      dataIndex: 'departStorageName',
      // render: (text) => <a>{text}</a>,
    },
    {
      title: '진행상태',
      dataIndex: 'status',
    },
    {
      title: '배송 완료 날짜',
      dataIndex: 'inboundCompleteDate',
    },
    {
      title: '수신지',
      dataIndex: 'arriveName',
    },
    {
      title: '품목 및 수량',
      dataIndex: 'products',
    },
  ];


export default function SearchDoneContent(props) {
  const { type, data, selectedRowKeys, selectedRows, setSelectedRowKeys, setSelectedRows, rejectOutboundDone } = props;

  
  const onSelectChange = (newSelectedRowKeys, newSelectedRows) => {
    console.log('selectedRowKeys: ', newSelectedRowKeys);
    console.log('selectedRows: ', newSelectedRows);
    setSelectedRowKeys(newSelectedRowKeys);
    setSelectedRows(newSelectedRows);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User' || record.name === 'User',
      name: record.name,
    }),
  };

  const filteredData = data && Array.isArray(data)
    ? data.filter((item) => {
        console.log("Item status:", item.status); // 각 항목의 status 확인
        if (type === "all") return true;
        if (type === "start") return item.status === "출고완료";
        if (type === "end") return item.status === "입고완료";
        if (type === "search") return item;
        return false;
      })
    : [];

    const handleReject = () => {
      rejectOutboundDone(selectedRows);
      setSelectedRowKeys([]);  // 선택된 항목 초기화
      setSelectedRows([]);      // 선택된 행 초기화
    };

  console.log("Filtered data:", filteredData); // 필터링 결과 확인

  return (
    <>
     <p>*오후 4시 이후로는 승인된 요청이 출고완료가 되어 출고취소가 안됩니다. 주의 부탁드립니다.*</p>
 
      <H.Htable columns={columns} 
      dataSource={filteredData} 
      rowSelection={rowSelection}
      rowKey="outboundId"/>
      <H.HButtonWrapper>
        <H.HButtonDefault style={{ margin: "2px" }} 
        onClick={handleReject}>
          출고 취소
          </H.HButtonDefault>
      </H.HButtonWrapper>
    </>
  );
}


