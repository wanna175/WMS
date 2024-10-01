import React from 'react';
import { Select, Input } from 'antd';
import * as S from "./writeoutbound.styles";
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

const arriveName = [
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
]

export default function OutboundUI({
  userId,
  setUserId,
  requestDate,
  setRequestDate,
  arriveName,
  setArriveName,
  outboundMart,
  setOutboundMart,
  outboundId,
  setOutboundId,
  productName,
  setProductName,
  quantity,
  setQuantity,
  fetchData,
}) {

  return (
    <div style={{ border: "solid 1px grey", padding: "30px", display: "flex", flexDirection: "column", width: "50vw", maxWidth: "700px", margin: "auto", alignContent: "center" }}>
      <h1 style={{ marginBottom: "30px", fontSize: "24px" }}>출고 요청서</h1>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <text style={{ width: "40%", textAlign: "left", paddingLeft: "10px", marginBottom: "5px" }}>품목</text>
        <text style={{ width: "40%", textAlign: "left", paddingLeft: "10px", marginBottom: "5px" }}>수량</text>
      </div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Select
          showSearch
          placeholder="품목"
          onChange={onChange}
          onSearch={onSearch}
          options={products}
          style={{
            width: "40%",
          }}
        />
        <Input
          placeholder='수량'
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          style={{
            width: "40%"
          }}
        />
      </div>
      <br></br>
      <br></br>
      <label style={{ width: "90%", margin: "auto", paddingLeft: "10px" }}>수신지</label>
      <Select
        showSearch
        placeholder="수신지"
        onChange={(e) => setArriveName(e.target.value)}
        value={arriveName}
        onSearch={onSearch}
        options={arriveName}
        style={{
          width: "90%",
          margin: "auto"
        }}
      />
      <select
        value={arriveName}
        onChange={(e) => setArriveName(e.target.value)}>
        <option>선택</option>
        <option>Storage A</option>
        <option>Storage B</option>
        <option>Storage C</option>
        <option>Storage D</option>
        <option>Storage E</option>
      </select>
      <br></br>
      <label>마트 출고 여부</label>
      <select value={outboundMart} onChange={(e) => setOutboundMart(Number(e.target.value))}>
        <option value={0}>미출고</option>
        <option value={1}>출고</option>
      </select>
      <br></br>
      <button onClick={fetchData}>요청</button>
      <button type="reset">초기화</button>
    </div>
  );
}
