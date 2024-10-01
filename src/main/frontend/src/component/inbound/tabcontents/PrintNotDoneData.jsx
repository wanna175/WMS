import * as H from "../../../styles/pageStyles";

const columns = [
  {
    title: '입고요청서ID',
    dataIndex: 'inboundId',
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
      dataIndex: 'inboudCompleteDate',
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
  const { type, data, selectedRowKeys, selectedRows, setSelectedRowKeys, setSelectedRows, approveInboundRequests, rejectInboundRequests } = props;

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
        if (type === "accepted") return item.status === "승인";
        if (type === "denied") return item.status === "미승인";
        if (type === "search") return item;
        return false;
      })
    : [];

  console.log("Filtered data:", filteredData); // 필터링 결과 확인


  const handleApprove = () => {
    approveInboundRequests(selectedRows);
    setSelectedRowKeys([]);  // 선택된 항목 초기화
    setSelectedRows([]);      // 선택된 행 초기화
  };

  const handleReject = () => {
    rejectInboundRequests(selectedRows);
    setSelectedRowKeys([]);  // 선택된 항목 초기화
    setSelectedRows([]);      // 선택된 행 초기화
  };

  return (
    <>
      <H.Htable columns={columns} 
      dataSource={filteredData}
      rowSelection={rowSelection}
      rowKey="inboundId" />
      <H.HButtonWrapper>
        <H.HButtonDefault style={{ margin: "2px" }} onClick={handleApprove}>승인</H.HButtonDefault>
        <H.HButtonDefault onClick={handleReject}>반려</H.HButtonDefault>
      </H.HButtonWrapper>
    </>
  );
}


