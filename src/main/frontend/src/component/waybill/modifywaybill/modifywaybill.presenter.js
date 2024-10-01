// import * as S from './modifywaybill.styles';

// export default function ModifyWaybillPresenter({ waybill, onClose }) {
//   return (
//     <S.PopupWrapper>
//       <h2>운송장 상세보기</h2>
//       <p>운송장 번호: {waybill.waybillId}</p>
//       <p>출발 주소: {waybill.departAddress} {waybill.departAddressDetail}</p>
//       <p>도착 주소: {waybill.arriveAddress} {waybill.arriveAddressDetail}</p>
//       <p>출발 창고: {waybill.departStorageName}</p>
//       <p>도착 창고: {waybill.arriveStorageName}</p>

//       {/* 입고 및 출고 아이템 목록 */}
//       <h3>입고 아이템 목록</h3>
//       {waybill.inboundItemList && waybill.inboundItemList.map((item, idx) => (
//         <div key={idx}>
//           <p>상품 ID: {item.productId}</p>
//           <p>수량: {item.quantity}</p>
//         </div>
//       ))}
      
//       <h3>출고 아이템 목록</h3>
//       {waybill.outboundItemList && waybill.outboundItemList.map((item, idx) => (
//         <div key={idx}>
//           <p>상품 ID: {item.productId}</p>
//           <p>수량: {item.quantity}</p>
//         </div>
//       ))}

//       <button onClick={onClose}>닫기</button>
//     </S.PopupWrapper>
//   );
// }


import React, { useState } from "react";
import ModifyWaybillContainer from "./modifywaybill/modifywaybill.container";

export default function RequestWaybillPresenter({ data }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWaybill, setSelectedWaybill] = useState(null);

  const openModal = (waybill) => {
    setSelectedWaybill(waybill); // 선택된 운송장 데이터를 저장
    setIsModalOpen(true); // 팝업 열기
  };

  const closeModal = () => {
    setIsModalOpen(false); // 팝업 닫기
    setSelectedWaybill(null); // 선택된 운송장 초기화
  };

  return (
    <div>
      {data && data.dtoList.map((waybill) => (
        <div key={waybill.waybillId}>
          <h3>운송장 번호: {waybill.waybillId}</h3>
          <button onClick={() => openModal(waybill)}>수정</button>
        </div>
      ))}

      {isModalOpen && selectedWaybill && (
        <ModifyWaybillContainer
          storageId={selectedWaybill.storageId}
          productId={selectedWaybill.productId}
          waybillData={selectedWaybill} // 선택된 운송장 데이터 전달
          onClose={closeModal} // 팝업 닫기 함수 전달
        />
      )}
    </div>
  );
}
