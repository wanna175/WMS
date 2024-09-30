import React, { useState } from 'react';
import { Divider, Tabs ,Table, Flex } from 'antd';
import * as H from "../../styles/pageStyles";

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
    name: '이효승',
    userId: '960304',
    email: 'dlgytmd5468@naver.com',
    address: '강남구 삼성동',
    role: '사원',
  },
  {
    key: '2',
    name: '이효승',
    userId: '960304',
    email: 'dlgytmd5468@naver.com',
    address: '강남구 삼성동',
    role: '사원',
  },
  
];

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === 'Disabled User',
    disabled: record.name === 'User',
    // Column configuration not to be checked
    name: record.name,
  }),
};

const onMenuClick = (e) => {
  console.log('click', e);
};


const App = () => {

  const [selectionType, setSelectionType] = useState('checkbox');
  return (
    <div>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      <H.Htable
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};
export default App;