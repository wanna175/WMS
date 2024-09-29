import * as S from "./writeinbound.styles";

export default function InboundUI({
  userId,
  setUserId,
  departStorageName,
  setDepartStorageName,
  inboundMart,
  setInboundMart,
  items,
  addItem,
  handleItemChange,
  fetchData,
}) {

  return (
    <S.Wrapper>
      <h2>출고 요청서 작성</h2>
      <br></br>
      <label>사용자 ID</label>
      <input
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="사용자 ID를 입력하세요"
      />
      
       {items.map((item, index) => (
        <div key={index}>
          <label>품목</label>
          <select
            value={item.productName}
            onChange={(e) => handleItemChange(index, "productName", e.target.value)}
          >
            <option>선택</option>
            <option>귤</option>
            <option>감귤</option>
            <option>한라봉</option>
            <option>사과</option>
            <option>레몬</option>
          </select>

          <label>수량</label>
          <input
            type="text"
            value={item.quantity}
            onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
          />
          <br></br>
        </div>
      ))}
      <button onClick={addItem}>+ 품목 추가하기</button>
      <br></br>
      <br></br>
      <label>발신지</label>
      <select
      value={departStorageName}
      onChange={(e) => setDepartStorageName(e.target.value)}>
        <option>선택</option>
        <option>서울 창고</option> 
        <option>부산 창고</option> 
        <option>대구 창고</option> 
        <option>광주 창고</option> 
        <option>인천 창고</option> 
      </select>
      <br></br>
      <label>마트 출고 여부</label>
        <select value={inboundMart} onChange={(e) => setInboundMart(Number(e.target.value))}>
          <option value={0}>미출고</option>
          <option value={1}>출고</option>
        </select>
        <br></br>
      <button onClick={fetchData}>요청</button>
      <button type="reset">초기화</button>
    </S.Wrapper>
  );
}
