import * as S from "./warehouse.styles";

export default function WarehouseUI({
  data,
  storageIds,
  storageId,
  setStorageId,
  storageName,
  setStorageName,
  address,
  setAddress,
  addressDetail,
  setAddressDetail,
  zipcode,
  setZipcode,
  storageArea,
  setStorageArea,
  handleCheckboxChange,
  removeStorage,
  modifyStorage
}) {
  return (
    
    <div>
      <h2>창고 리스트</h2>
      {/* 데이터 리스트 렌더링 */}
      <ul>
        {/* data.data로 접근 */}
        {data && Array.isArray(data.data) && data.data.length > 0 ? (
          data.data.map((item, index) => (
            <li key={index}>
              {/* 체크박스와 창고 정보 표시 */}
              <input
                type="checkbox"
                checked={storageIds.includes(item.storageId)}
                onChange={() => handleCheckboxChange(item.storageId)}
              />
              <p>창고명: {item.storageName}</p>
              <p>주소: {item.address}</p>
              <p>주소 상세: {item.addressDetail}</p>
              <p>우편번호: {item.zipcode}</p>
              <p>창고 면적: {item.storageArea}</p>
            </li>
          ))
        ) : (
          <p>데이터가 없습니다.</p>
        )}
      </ul>
      <button onClick={removeStorage}>삭제</button>






      <div>
      <h2>창고 수정</h2>
      
      {/* 수정할 창고 정보 입력 폼 */}
      <div>
        <label>창고ID</label>
      <input
          type="text"
          value={storageId}
          onChange={(e) => setStorageId(e.target.value)}
        />

        <label>창고 이름</label>
        <input
          type="text"
          value={storageName}
          onChange={(e) => setStorageName(e.target.value)}
        />

        <label>창고 주소</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <label>주소 상세</label>
        <input
          type="text"
          value={addressDetail}
          onChange={(e) => setAddressDetail(e.target.value)}
        />

        <label>우편번호</label>
        <input
          type="text"
          value={zipcode}
          onChange={(e) => setZipcode(e.target.value)}
        />

        <label>면적</label>
        <input
          type="text"
          value={storageArea}
          onChange={(e) => setStorageArea(e.target.value)}
        />

        <button onClick={modifyStorage}>수정</button>
      </div>
    </div>
    </div>
  );
}
