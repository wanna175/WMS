import * as S from "./requestwaybill.styles";
import { useState } from 'react';
//import ModifyWaybillContainer from "../waybill/modifywaybill/modifywaybill.container";



import axios from "axios";

export default function WaybillUI(
  { data,

  startDate,
  setStartDate,
  endDate,
  setEndDate,
  arriveStorageName,
  setArriveStorageName,
  departStorageName,
  setDepartStorageName,
  waybillId,
  setWaybillId,
  departAddress,
  setDepartAddress,
  arriveAddress,
  setArriveAddress,
  departAddressDetail,
  setDepartAddressDetail,
  arriveAddressDetail,
  setArriveAddressDetail,
  departZipcode,
  setDepartZipcode,
  arriveZipcode,
  setArriveZipcode,
  modifyWaybill,

  fetchData

  }) {

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedWaybill, setSelectedWaybill] = useState(null);
  
    const handleDetailClick = (waybill) => {
        setSelectedWaybill(waybill);
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };



    // handleSearch: 버튼 클릭 시 fetchData 호출
    const handleSearch = () => {
      fetchData(); // 버튼 클릭으로 데이터 검색
    };
  return (
    <S.Wrapper>
      <h2>운송장 조회 페이지</h2>

     {/* 날짜 검색 필터 추가 */}
     <div>
        <label>시작 날짜:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <label>종료 날짜:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      <br></br>
      {/* 창고 선택 필터 추가 */}
      <label>출발 창고:</label>
        <select
          value={departStorageName}
          onChange={(e) => setDepartStorageName(e.target.value)}
        >
          <option value="">선택하세요</option> 
          {data.storageDTOList && data.storageDTOList.map((storage, index) => (
            <option key={index} value={storage.storageName}>{storage.storageName}</option>
          ))}
        </select>

        {/* 창고 선택 필터 추가 */}
      <label>도착 창고:</label>
        <select
          value={arriveStorageName}
          onChange={(e) => setArriveStorageName(e.target.value)}
        >
          <option value="">선택하세요</option> 
          {data.storageDTOList && data.storageDTOList.map((storage, index) => (
            <option key={index} value={storage.storageName}>{storage.storageName}</option>
          ))}
        </select>

<br></br>

{/* 운송장 번호 입력 필터 추가 */}
<div>
        <label>운송장 번호:</label>
        <input
          type="text"
          value={waybillId} // 운송장 번호 상태로 연결
          onChange={(e) => setWaybillId(e.target.value)} // 상태 업데이트
        />
      </div>
<br></br>

        <button onClick={handleSearch}>검색</button>
      </div>



      {data && data.dtoList.length > 0 ? (
        data.dtoList.map((waybill, index) => (
          <div key={index} style={{ marginBottom: "20px", border: "1px solid #ddd", padding: "10px" }}>
            <h3>운송장 번호: {waybill.waybillId}</h3>
            {/* <p>출발 주소: {waybill.departAddress} {waybill.departAddressDetail}</p>
            <p>출발 우편번호: {waybill.departZipcode}</p> */}
            <p>출발 창고: {waybill.departStorageName}</p>
            {/* <p>도착 주소: {waybill.arriveAddress} {waybill.arriveAddressDetail}</p>
            <p>도착 우편번호: {waybill.arriveZipcode}</p> */}
            <p>도착 창고: {waybill.arriveStorageName}</p>
            <p>생성일: {new Date(waybill.createdDate).toLocaleDateString()}</p>


            {/* 상세보기 버튼 추가 */}
            <button onClick={() => handleDetailClick(waybill)}>상세보기</button>




            {/* Inbound Items */}
            {/* {waybill.inboundItemList && waybill.inboundItemList.length > 0 && (
              <div>
                <h4>입고 아이템 목록</h4>
                {waybill.inboundItemList.map((item, idx) => (
                  <div key={idx}>
                    <p>상품 ID: {item.productId}</p>
                    <p>수량: {item.quantity}</p>
                  </div>
                ))}
              </div>
            )} */}

            {/* Outbound Items */}
            {/* {waybill.outboundItemList && waybill.outboundItemList.length > 0 && (
              <div>
                <h4>출고 아이템 목록</h4>
                {waybill.outboundItemList.map((item, idx) => (
                  <div key={idx}>
                    <p>상품 ID: {item.productId}</p>
                    <p>수량: {item.quantity}</p>
                  </div>
                ))}
              </div>
            )} */}

<br></br>
<br></br>
            <div>
      <h2>운송장 수정</h2>
      
      {/* 수정할 창고 정보 입력 폼 */}
      <div>
        <label>운송장번호</label>
      <input
          type="text"
          value={waybillId}
          onChange={(e) => setWaybillId(e.target.value)}
        />
        <br></br>
        <label>발신지</label>
      <input
          type="text"
          value={departStorageName}
          onChange={(e) => setDepartStorageName(e.target.value)}
        />
        <br></br>
<label>발신지주소</label>
      <input
          type="text"
          value={departAddress}
          onChange={(e) => setDepartAddress(e.target.value)}
        />
        <br></br>
        <label>발신지주소상세</label>
      <input
          type="text"
          value={departAddressDetail}
          onChange={(e) => setDepartAddressDetail(e.target.value)}
        />
        
        <br></br>
        <label>발신지 우편번호</label>
        <input
          type="text"
          value={departZipcode}
          onChange={(e) => setDepartZipcode(e.target.value)}
        />
<br></br>
<label>수신지</label>
      <input
          type="text"
          value={arriveStorageName}
          onChange={(e) => setArriveStorageName(e.target.value)}
        />
        <br></br>
<label>수신지주소</label>
      <input
          type="text"
          value={arriveAddress}
          onChange={(e) => setArriveAddress(e.target.value)}
        />
        <br></br>
        <label>수신지주소상세</label>
      <input
          type="text"
          value={arriveAddressDetail}
          onChange={(e) => setArriveAddressDetail(e.target.value)}
        />
        <br></br>

        <label>수신지 우편번호</label>
        <input
          type="text"
          value={arriveZipcode}
          onChange={(e) => setArriveZipcode(e.target.value)}
        />
<br></br>

        <button onClick={modifyWaybill}>수정하기</button>
      </div>
    </div>



          </div>




        ))
      ) : (
        <p>조회된 운송장이 없습니다.</p>
      )}
{/* 팝업창 */}
{isPopupOpen && (
        <ModifyWaybillContainer
          waybill={selectedWaybill}
          onClose={handleClosePopup}
        />
      )}

    </S.Wrapper>
  );
}
