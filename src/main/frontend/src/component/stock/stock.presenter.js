import { useAPI } from "../../axios/useAPI";
import * as S from "./stock.styles";
import * as H from "../../styles/pageStyles";
import { SearchOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { Divider, Table, Input, Button, message } from 'antd';

const columns = ({
  editingKey, 
  setEditingKey, 
  editedQuantity, 
  setEditedQuantity, 
  handleSave, 
  handleCancel 
}) => [
  {
    title: '상품Id',
    dataIndex: 'productId',
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
    render: (text, record) => {
      return editingKey === record.key ? (
        <Input
          value={editedQuantity}
          onChange={(e) => setEditedQuantity(e.target.value)} 
          style={{ width: '100px' }}
        />
      ) : (
        text
      );
    },
  },
  {
    title: '수정',
    dataIndex: 'edit',
    render: (_, record) => {
      const editable = editingKey === record.key;
      return editable ? (
        <>
          <Button onClick={() => handleSave(record)} type="primary" style={{ marginRight: 8 }}>
            확인
          </Button>
          <Button onClick={handleCancel}>취소</Button>
        </>
      ) : (
        <Button onClick={() => setEditingKey(record.key)}>수정</Button>
      );
    },
  },
];

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
};

const App = ({
  data,
  productName,
  setProductName,
  storageName,
  setStorageName,
  fetchData,
  quantity,
  setQuantity,
}) => {
  const [selectionType, setSelectionType] = useState('checkbox');
  const [editingKey, setEditingKey] = useState(''); 
  const [editedQuantity, setEditedQuantity] = useState(''); 

  const { post } = useAPI();

  // const handleSave = async (record) => {
  //   try {
  //     const params = {
  //       productId: record.productId,
  //       storageId: record.storageId,
  //       quantity: editedQuantity,
  //     };

  //     const response = await post(`/stock/modify`, params);
      
  //     if (response.status === 200) {
  //       message.success('재고가 성공적으로 수정되었습니다.');
  //       fetchData(); 
  //       setEditingKey(''); 
  //     } else {
  //       message.error('재고 수정 중 오류가 발생했습니다.');
  //     }
  //   } catch (error) {
  //     message.error('재고 수정 중 오류가 발생했습니다.');
  //     console.error(error);
  //   }
  // };
  const handleSave = async (record) => {
    try {
      const params = {
        productId: record.productId,
        storageId: record.storageId,
        quantity: editedQuantity,  // editedQuantity는 상태로 관리
      };
  
      // POST 요청을 통해 수량 수정 API 호출
      const response = await post(`/stock/modify`, params);

      console.log("응답!!!!!!",response);
      
      console.log("응답.status!!!!!!",response.status);
      
      
      // 응답이 성공적인 경우
      if (response.status === 'success') {
        message.success('재고가 성공적으로 수정되었습니다.');
  
        // 재고 목록을 새로 고침하여 업데이트
        fetchData();  // 데이터를 다시 가져와서 상태를 업데이트
        
        // 수정 모드 종료
        setEditingKey('');
      } else {
        // 응답이 실패한 경우
        message.error('재고 수정 중 오류가 발생했습니다.');
      }
    } catch (error) {
      // 요청 중 오류가 발생한 경우
      message.error('재고 수정 중 오류가 발생했습니다.');
      console.error('에러 발생:', error);
    }
  };
  
  
  const handleCancel = () => {
    setEditingKey(''); 
  };

  const tableData = data?.dtoList?.map((item, index) => ({
    key: index + 1,
    productId: item.productId,
    productName: item.productName,
    storageId: item.storageId,
    storageName: item.storageName,
    stockQuantity: item.stockQuantity,
  }));

  const handleSearch = () => {
    fetchData(); 
  };

  const handleReset = () => {
    setProductName("");
    setStorageName("");
  };

  useEffect(() => {
    if (productName === "" && storageName === "") {
      fetchData();
    }
  }, [productName, storageName]);

  return (
    <>
      <H.HSelectWrapper>
        <S.Title>품목</S.Title>
        <H.HSelect
          showSearch
          placeholder="품목을 선택해주세요"
          onChange={(value) => setProductName(value)}
          value={productName}
          options={data?.productList?.map((p, index) => ({
            key: index + 1,
            label: p.content,
            value: p.content,
          }))}
        />

        <S.Title>창고별</S.Title>
        <H.HSelect
          showSearch
          placeholder="창고를 선택해주세요"
          onChange={(value) => setStorageName(value)}
          value={storageName}
          options={data?.storageDTOList?.map((s, index) => ({
            key: index + 1,
            label: s.storageName,
            value: s.storageName,
          }))}
        />
      </H.HSelectWrapper>

      <div style={{ display: 'flex', gap: '10px' }}>
        <H.HButtonWrapper>
          <H.HButtonDefault type="primary" icon={<SearchOutlined />} onClick={handleSearch}>
            검색
          </H.HButtonDefault>
        </H.HButtonWrapper>

        <H.HButtonWrapper>
          <H.HButtonDefault type="default" icon={<SearchOutlined />} onClick={handleReset}>
            초기화
          </H.HButtonDefault>
        </H.HButtonWrapper>
      </div>

      <Divider />

      <div>
        <H.Htable
          columns={columns({
            editingKey,
            setEditingKey,
            editedQuantity,
            setEditedQuantity,
            handleSave,
            handleCancel,
          })}
          dataSource={tableData}
        />
      </div>
    </>
  );
};

export default App;
