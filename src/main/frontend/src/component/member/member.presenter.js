import React, { useState, useEffect } from 'react';
import { Divider, Tabs ,Table, Flex } from 'antd';
import * as H from "../../styles/pageStyles";


// 추가할 기능
// 1. 근무처 칼럼의 데이터는 StorageId로 가져오지만, 창고 이름이 나오도록 디비에서 조회해와서 뿌리기
// 2. 직함 칼럼의 데이터는 Manger, general_manager인데, 테이블에 보여줄 때 '한국어'로 매핑하기
// 3. 페이지 접속 시
  //3-1. 기본 사원목록 데이터 파싱
const onChange = (key) => {
  console.log(key);
}

const items = [
  {
    key: '1',
    label: '사원목록',
  },
  {
    key: '2',
    label: '비사원목록',
  }
];


const columns = [
  {
    title: '이름',
    dataIndex: 'userName',
    // render: (text) => <a>{text}</a>,
  },
  {
    title: '사원번호',
    dataIndex: 'userId',
  },
  {
    title: '이메일',
    dataIndex: 'userEmail',
  },
  {
    title: '근무처',
    dataIndex: 'storageId',
  },
  {
    title: '직함',
    dataIndex: 'userPosition',
  },
];



// const data = [
//   {
//     key: '1',
//     name: '이효승',
//     userId: '960304',
//     email: 'dlgytmd5468@naver.com',
//     address: '강남구 삼성동',
//     role: '사원',
//   },
//   {
//     key: '2',
//     name: '이효승',
//     userId: '960304',
//     email: 'dlgytmd5468@naver.com',
//     address: '강남구 삼성동',
//     role: '사원',
//   },
  
// ];

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === 'Disabled User',
    disabled: record.name === 'User',
    name: record.name,
  }),
};

const onMenuClick = (e) => {
  console.log('click', e);
};


const App = () => {
  const [selectionType, setSelectionType] = useState('checkbox');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false); // Alert 상태 관리

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setShowAlert(true); // Alert 표시
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleAlertClose = () => {
    setShowAlert(false); // Alert 숨기기
  };

  return (
    <form>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      {/* 승인 버튼 */}
      <H.HButtonSuccess type="primary" onClick={showModal}>
        승인
      </H.HButtonSuccess>

      {/* 모달 */}
      <H.HButtonWrapper>
        <H.HModal
          title="승인하시겠습니까?"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          {/* 모달 내용 */}
        </H.HModal>
      </H.HButtonWrapper>

      {/* Alert 버튼 */}
      <H.HButtonFail type="primary" onClick={() => setShowAlert(true)}>
        Alert
      </H.HButtonFail>

      {/* Alert Wrapper */}
      <H.HalertWrapper>
        {showAlert && (
          <>
            <H.Halert
              message="Success Tips"
              type="success"
              showIcon
              closable
              onClose={handleAlertClose} // Alert 닫기 버튼 클릭 시 숨김
            />
            <br />
            <H.Halert
              message="Success Tips"
              description="Detailed description and advice about successful copywriting."
              type="success"
              showIcon
              closable
              onClose={handleAlertClose} // Alert 닫기 버튼 클릭 시 숨김
            />
          </>
        )}
      </H.HalertWrapper>
      <Tabs defaultActiveKey='1' items={items} onChange={onChange}/>
      <H.Htable
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
      />
    </form>
  );
};
export default App;