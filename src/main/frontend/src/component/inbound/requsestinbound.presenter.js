import React from "react";

// InboundUI 컴포넌트는 검색 조건 입력 UI와 데이터 리스트를 화면에 렌더링합니다.
export default function InboundUI({
  data,
  status,
  setStatus,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  arriveName,
  setArriveName,
  item,
  setItem,
  inboundIds,
  fetchData,
  approveInboundRequests,
  rejectInboundRequests,
  handleCheckboxChange
}) {
  return (
    <div>
      <h2>출고 요청 리스트</h2>
      {/* 검색 조건 입력 UI */}
      <div>
        <input
          type="text"
          placeholder="상태"
          value={status}
          //값이 변경될 때 호출되는 이벤트 핸들러
          //onChange : 사용자가 입력 필드 내용을 변경할 때 발생하는 이벤트
          //(e) : 이벤트 객체
          //e.target.value : 입력 필드의 현재값
          onChange={(e) => setStatus(e.target.value)}
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="수신지"
          value={arriveName}
          onChange={(e) => setArriveName(e.target.value)}
        />
        <input
          type="text"
          placeholder="품목"
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />
        <button onClick={fetchData}>검색</button>
      </div>

      {/* 데이터 리스트 렌더링 */}
      {/* data와 data.data가 존재하고, data.data가 배열인지 확인 */}
      {/* data : data가 null이나 undefined인지 확인 */}
      {/* Array.isArray(data.data) : .map() 메서드를 사용하기 위해서 data.data가 배열인지 확인 */}
      {/* data.data.length : 길이가 0이면 출력할 데이터가 없는 것이므로 false를 반환 */}
      {data && Array.isArray(data.data) && data.data.length > 0 ? (
        <ul>
          {data.data.map((item, index) => (
            <li key={index}>
            
              {/* 체크박스와 출고 ID 표시 */}
              <input
                type="checkbox"
                checked={inboundIds.includes(item.inboundId)}
                onChange={() => handleCheckboxChange(item.inboundId)}
              />

              <p>출고 ID: {item.inboundId}</p>
              <p>진행상태: {item.status}</p>
              <p>출고 창고명: {item.departStorageName}</p>
              <p>도착지 이름: {item.arriveName}</p>
              <p>상품 목록: {item.products}</p>
              <p>요청 날짜: {item.requestDate}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>데이터가 없습니다.</p> // 데이터를 찾을 수 없을 때 출력
      )}

      
      {/* 승인 버튼 추가 */}
        <button onClick={approveInboundRequests}>승인</button>
        <button onClick={rejectInboundRequests}>반려</button>
    </div>
  );
}