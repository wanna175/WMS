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
      title: '출고 요청 날짜',
      dataIndex: 'requestDate',
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

  export default function SearchNotDoneContent(props) {
    const { type, data, selectedRowKeys, selectedRows, setSelectedRowKeys, setSelectedRows, approveOutboundRequests, rejectOutboundRequests } = props;

  
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
          console.log("Item status:", item.status);
          if (type === "all") return true;
          if (type === "accepted") return item.status === "승인";
          if (type === "denied") return item.status === "미승인";
          if (type === "search") return item;
          return false;
        })
      : [];
  

      const handleApprove = () => {
        approveOutboundRequests(selectedRows);
        setSelectedRowKeys([]);  // 선택된 항목 초기화
        setSelectedRows([]);      // 선택된 행 초기화
      };
    
      const handleReject = () => {
        rejectOutboundRequests(selectedRows);
        setSelectedRowKeys([]);  // 선택된 항목 초기화
        setSelectedRows([]);      // 선택된 행 초기화
      };

      
    return (
      <>
        <H.Htable
          columns={columns}
          dataSource={filteredData}
          rowSelection={rowSelection}
          rowKey="outboundId"  // 행의 고유 ID를 rowKey로 설정
        />
        <H.HButtonWrapper>
          <H.HButtonDefault
            style={{ margin: "2px" }}
            onClick={handleApprove}
          >
            승인
          </H.HButtonDefault>
          <H.HButtonDefault onClick={handleReject}>
            반려
          </H.HButtonDefault>
        </H.HButtonWrapper>
      </>
    );
  }


