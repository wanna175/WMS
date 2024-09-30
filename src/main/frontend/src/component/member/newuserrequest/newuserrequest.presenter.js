import React, { useState } from 'react';
import { Divider, Tabs, Table, Button } from 'antd';
import * as H from "../../../styles/pageStyles";


const onChange = (key) => {
  console.log(key);
}

const items = [
{
  key: '1',
  label: '신규 요청 목록'
}
]

const columns = [
  {
    title: '이름',
    dataIndex: 'name',
    // render: (text) => <a>{text}</a>,
  },
  {
    title: '사원번호',
    dataIndex: 'userId',
  },
  {
    title: '이메일',
    dataIndex: 'email',
  },
  {
    title: '근무처',
    dataIndex: 'address',
  },
  {
    title: '직함',
    dataIndex: 'role',
  },
];
const data = [
  {
    key: '1',
    name: '고재현',
    userId: '960987',
    email: 'rhwogus0987@naver.com',
    address: '강남구 삼성동',
    role: '대리',
  },
  {
    key: '2',
    name: '김정우',
    userId: '010302',
    email: 'rlawjddn1234@naver.com',
    address: '강남구 삼성동',
    role: '팀장',
  },
];

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === 'Disabled User',
    // Column configuration not to be checked
    name: record.name,
  }),
};
const App = () => {
  const [selectionType, setSelectionType] = useState('checkbox');
  return (
    <div>
      <Tabs defaultActiveKey='1' items={items} onChange={onChange}/>
      <H.Htable
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
      />
      <H.HButtonWrapper>
        <H.HButtonDefault style={{margin: "2px"}}>
          승인
        </H.HButtonDefault>
        <H.HButtonDefault>
          미승인
        </H.HButtonDefault>
      </H.HButtonWrapper>
    </div>
  );
};
export default App;