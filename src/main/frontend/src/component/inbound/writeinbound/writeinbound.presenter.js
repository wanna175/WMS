import * as S from "./writeinbound.styles";
import React, { useState } from 'react';
import { Select, Input, Button } from 'antd';
import { CloseOutlined } from "@ant-design/icons";
import theme from '../../../styles/theme';
import styled from '@emotion/styled';


const onChange = (value) => {
  console.log(`selected ${value}`);
};
const onSearch = (value) => {
  console.log('search:', value);
};

const products = [
  {
    value: 'product A',
    label: 'Product A'
  },
  {
    value: 'product B',
    label: 'Product B'
  },
  {
    value: 'product C',
    label: 'Product C'
  },
  {
    value: 'product D',
    label: 'Product D'
  },
  {
    value: 'product E',
    label: 'Product E'
  },
];

const arriveNames = [
  {
    value: 'Storage A',
    label: 'Storage A'
  },
  {
    value: 'Storage B',
    label: 'Storage B'
  },
  {
    value: 'Storage C',
    label: 'Storage C'
  },
  {
    value: 'Storage D',
    label: 'Storage D'
  },
  {
    value: 'Storage E',
    label: 'Storage E'
  },
];

const isInboundMart = [
  {
    value: 0,
    label: '미입고'
  },
  {
    value: 1,
    label: '입고'
  },

];

export default function InboundUI({
  userId,
  setUserId,
  requestDate,
  setRequestDate,
  arriveName,
  setArriveName,
  inboundMart,
  setInboundMart,
  inboundId,
  setInboundId,
  productName,
  setProductName,
  quantity,
  setQuantity,
  fetchData,
}) {
  const [fields, setFields] = useState([{ product: '', quantity: '' }]);

  // 필드 추가
  const handleAddField = () => {
    setFields([...fields, { product: '', quantity: '' }]);
  };

  // 필드 삭제
  const handleRemoveField = (index) => {
    const updatedFields = fields.filter((_, i) => i !== index);
    setFields(updatedFields);
  };

  // 입력 값 업데이트
  const handleFieldChange = (index, field, value) => {
    const updatedFields = [...fields];
    updatedFields[index][field] = value;
    setFields(updatedFields);
  };

  // 폼 초기화
  const handleReset = () => {
    setFields([{ product: '', quantity: '' }]); // 품목과 수량 초기화
    setArriveName(''); // 수신지 초기화
    setInboundMart(0); // 입고 여부 초기화
  };

  return (
    <form style={{ border: "solid 1px grey", padding: "30px", display: "flex", flexDirection: "column", width: "50vw", maxWidth: "700px", margin: "auto", marginBottom: "60px", alignContent: "center" }}>
      <h1 style={{ marginBottom: "30px", fontSize: "24px" }}>입고 요청서</h1>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <text style={{ width: "45%", textAlign: "left", paddingLeft: "10px", marginBottom: "5px" }}>품목</text>
        <text style={{ width: "45%", textAlign: "left", paddingLeft: "10px", marginBottom: "5px" }}>수량</text>
        <div style={{ width: "4%" }} />
      </div>


      {fields.map((field, index) => (
        <div key={index} style={{ display: "flex", justifyContent: "space-around", marginBottom: "10px" }}>
          <Select
            showSearch
            placeholder="품목"
            onChange={(value) => handleFieldChange(index, 'product', value)}
            onSearch={onSearch}
            options={products}
            value={field.product}
            style={{ width: "45%" }}
          />
          <Input
            placeholder='수량'
            value={field.quantity}
            onChange={(e) => handleFieldChange(index, 'quantity', e.target.value)}
            style={{ width: "45%" }}
          />
          <button
            type="button"
            onClick={() => handleRemoveField(index)}
            style={{ padding: "auto", border: "none", backgroundColor: theme.colors.glbWhite, }}
          >
            <CloseOutlined />
          </button>
        </div>
      ))}

      {/* 추가 버튼 */}
      <S.Button type='button' onClick={handleAddField} style={{ width: "98%", border: "none", backgroundColor: theme.colors.glbWhite }}>
        + 품목 추가
      </S.Button>


      <br></br>
      <br></br>
      <label style={{ width: "98%", margin: "auto", paddingLeft: "10px" }}>발신지</label>
      <Select
        showSearch
        placeholder="발신지"
        onChange={(e) => setArriveName(e)}
        onSearch={onSearch}
        options={arriveNames}
        style={{
          width: "98%",
          margin: "auto"
        }}
      />

      <br></br>
      <label style={{ width: "98%", margin: "auto", paddingLeft: "10px" }}>수신지</label>
      <Select
        showSearch
        placeholder="수신지"
        onSearch={onSearch}
        value={"자기 창고로 넣어야하는데............."}
        disabled
        style={{
          width: "98%",
          margin: "auto"
        }}
      />

      <br></br>
      <div style={{ display: "flex", justifyContent: "end", marginTop: "60px", width: "98%" }}>
        <S.Button onClick={fetchData} style={{ marginRight: "3px" }}>요청</S.Button>
        <S.Button onClick={handleReset}>초기화</S.Button>
      </div>
    </form>
  );
}