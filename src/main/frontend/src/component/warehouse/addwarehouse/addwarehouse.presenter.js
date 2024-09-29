import * as S from "./addwarehouse.styles";

export default function WarehouseUI({
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
  fetchData={fetchData}
}) {
  return (
    <S.Wrapper>
      창고등록페이지 입니다.
      <h2>창고 수정</h2>
      
      {/* 수정할 창고 정보 입력 폼 */}
      <div>
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

        <button onClick={fetchData}>등록</button>
      </div>
    </S.Wrapper>
  );
}
