import * as S from "./stock.styles";
import * as H from "../../styles/pageStyles";
import { SearchOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { Divider, Table, Select, Calendar } from 'antd';



// 검색창 콜백 함수
const onChange = (value) => {
  console.log(`selected ${value}`);// 사용자가 선택한 값 콘솔에 출력
};
const onSearch = (value) => {
  console.log('search:', value);// 사용자가 검색한 내용 콘솔에 출력
};

// 테이블 컬럼 작성 (테이블의 각 열에 대한 정의)
const columns = [
  {
    title: '상품Id',//테이블 열 제목
    dataIndex: 'productId',//데이터에서 가져올 항목 이름
  },
  {
    title: '상품명',
    dataIndex: 'productName',
  },
  {
    title: '창고ID',
    dataIndex: 'storageId',
  },
  {
    title: '창고이름',
    dataIndex: 'storageName',
  },
  {
    title: '재고',
    dataIndex: 'stockQuantity',
  },
];

// 테이블 데이터 (테이블에 표시될 데이터 행)
const data = [
  {
    key: '1',
    productId: '960304',
    productName: '이효승',
    storageId: '960115',
    storageName: '서울창고',
    stockQuantity: '5',
  },
];

// 테이블 row 선택 기능
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    //사용자가 선택한 행의 키 및 해당 행의 데이터를 콘솔에 출력
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
};

// 반환되는 App 컴포넌트
const App = () => {
  //체크박스를 선택하는 타입을 관리하는 usestate 선언
  const [selectionType, setSelectionType] = useState('checkbox');
  return (
    <>
      {/* H.HSelectWrapper로 Select와 타이틀들을 감싸는 부분 */}
      <H.HSelectWrapper>
        <S.Title>품목</S.Title>
        <H.HSelect
          showSearch
          placeholder="품목을 선택해주세요"
          optionFilterProp="label"
          onChange={onChange}
          onSearch={onSearch}
          options={[
            { value: 'jack', label: 'Jack' },
            { value: 'lucy', label: 'Lucy' },
            { value: 'tom', label: 'Tom' },
          ]}
        />

        <S.Title>창고별</S.Title>
        <H.HSelect
          showSearch
          placeholder="창고를 선택해주세요"
          optionFilterProp="label"
          onChange={onChange}
          onSearch={onSearch}
          options={[
            { value: 'jack', label: 'Jack' },
            { value: 'lucy', label: 'Lucy' },
            { value: 'tom', label: 'Tom' },
          ]}
        />
      </H.HSelectWrapper>
      <H.HButtonWrapper>
        <H.HButtonDefault type="primary"
          icon={<SearchOutlined />} >
          재고수정
        </H.HButtonDefault>
      </H.HButtonWrapper>




      {/* Divider는 H.HSelectWrapper 밖에 둡니다 */}
      <Divider />

      {/* 테이블 */}
      <div>
        <H.Htable
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          columns={columns}
          dataSource={data}
        />
      </div>
    </>
  );
}

// App 컴포넌트를 기본 내보내기로 설정
export default App;

