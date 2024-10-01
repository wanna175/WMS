// import WarehouseUI from "./modifywaybill.presenter";

// export default function Warehouse() {
//   return <WarehouseUI />;
// }

import modifyWaybill from "./modifywaybill.presenter";
import { useAPI } from "../../../axios/useAPI";
import { useEffect, useState } from "react"; // useEffect와 useState를 React에서 가져온다.




export default function ModifyWaybillContainer({ waybillData, onClose }) {

  const { get, post} = useAPI();

  const [data, setData] = useState(null);

  // 기존 waybillData를 우선 보여주고 상태로 관리
  const [formData, setFormData] = useState({
    waybillId: waybillData.waybillId,
    departStorageName: waybillData.departStorageName,
    arriveStorageName: waybillData.arriveStorageName,
    departAddress: waybillData.departAddress,
    arriveAddress: waybillData.arriveAddress,
    departAddressDetail: waybillData.departAddressDetail,
    arriveAddressDetail: waybillData.arriveAddressDetail,
    departZipcode: waybillData.departZipcode,
    arriveZipcode: waybillData.arriveZipcode,
    inboundItemList: waybillData.inboundItemList,
    outboundItemList: waybillData.outboundItemList,
    // 필요한 다른 필드들
  });

  const handleModify = () => {
    modifyWaybill(storageId, productId, formData);
    onClose(); // 수정 후 팝업 닫기
  };

  return (
    <div className="modal">
      <h2>운송장 수정</h2>
      <div>
        <label>운송장 번호:</label>
        <input
          type="text"
          value={formData.waybillId}
          onChange={(e) => setFormData({ ...formData, waybillId: e.target.value })}
        />
      </div>
      <div>
        <label>출발 창고:</label>
        <input
          type="text"
          value={formData.departStorageName}
          onChange={(e) => setFormData({ ...formData, departStorageName: e.target.value })}
        />
      </div>
      <div>
        <label>도착 창고:</label>
        <input
          type="text"
          value={formData.arriveStorageName}
          onChange={(e) => setFormData({ ...formData, arriveStorageName: e.target.value })}
        />
      </div>
      {/* 다른 필드들도 마찬가지로 추가 */}
      <div>
        <label>출발 주소:</label>
        <input
          type="text"
          value={formData.departAddress}
          onChange={(e) => setFormData({ ...formData, departAddress: e.target.value })}
        />
      </div>
      <div>
        <label>도착 주소:</label>
        <input
          type="text"
          value={formData.arriveAddress}
          onChange={(e) => setFormData({ ...formData, arriveAddress: e.target.value })}
        />
      </div>

      {/* Inbound 및 Outbound 아이템 목록 */}
      <div>
        <h3>입고 아이템 목록</h3>
        {formData.inboundItemList && formData.inboundItemList.map((item, idx) => (
          <div key={idx}>
            <p>상품 ID: {item.productId}</p>
            <p>수량: {item.quantity}</p>
          </div>
        ))}
      </div>
      <div>
        <h3>출고 아이템 목록</h3>
        {formData.outboundItemList && formData.outboundItemList.map((item, idx) => (
          <div key={idx}>
            <p>상품 ID: {item.productId}</p>
            <p>수량: {item.quantity}</p>
          </div>
        ))}
      </div>

      <button onClick={handleModify}>수정</button>
      <button onClick={onClose}>닫기</button>
    </div>
  );
}