import * as H from "../../../styles/pageStyles";

const columns = [
  {
    title: '창고ID',
    dataIndex: 'storageId',
  },
  {
    title: '창고명',
    dataIndex: 'storageName',
  },
  {
    title: '창고 주소',
    dataIndex: 'address',
  },
  {
    title: '창고 상세 주소',
    dataIndex: 'addressDetail',
  },
  {
    title: '우편번호',
    dataIndex: 'zipcode',
  },
  {
    title: '창고 면적',
    dataIndex: 'storageArea',
  },
];

export default function PrintData(props) {
  const { data, selectedRowKeys, selectedRows, setSelectedRowKeys, setSelectedRows, modifyStorage, removeStorage } = props;

  // 데이터와 타입을 확인하는 콘솔 로그 추가
  console.log("Received data:", data);

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
        return true;
      })
    : [];

  console.log("Filtered data:", filteredData); // 필터링 결과 확인

  const handleRemove = () => {
    removeStorage(selectedRows);
    setSelectedRowKeys([]);  // 선택된 항목 초기화
    setSelectedRows([]);      // 선택된 행 초기화
  };

  return (
    <>
      {/* rowKey를 "storageId"로 설정하여 고유 키 제공 */}
      <H.Htable columns={columns} 
      dataSource={filteredData} 
      rowSelection={rowSelection}
      rowKey="storageId" />
      <H.HButtonWrapper>
        <H.HButtonDefault style={{ margin: "2px" }} onClick={modifyStorage} >수정</H.HButtonDefault>
        <H.HButtonDefault style={{ margin: "2px" }} onClick={handleRemove}>삭제</H.HButtonDefault>
      </H.HButtonWrapper>
    </>
  );
}
