import { useEffect, useState } from "react"; // useEffect와 useState를 React에서 가져온다.
import axios from "axios"; //HTTP 요청을 보내기 위해 axios 라이브러리 호출.
import InboundUI from "./inbounddonelist.presenter";
import { useAPI } from "../../../axios/useAPI";

export default function Inbound() {
  const { get, post } = useAPI();
  // data변수와 그것을 사용하기 위한 setData함수
  // 초기데이터는 null이며 axios를 통해 가져온 데이터를 저장할 곳
  const [data, setData] = useState(null);

  //검색어 설정

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [item, setItem] = useState("");
  const [status, setStatus] = useState("");
  const [arriveName, setArriveName] = useState("");
  const [outboundStorageName, setOutboundStorageName] = useState("");
  const [inboundIds, setInboundIds] = useState([]); // 한번에 여러 아이디를 담을거기 때문에 배열로 설정

 // 데이터를 가져오는 fetchData 함수 정의
 const fetchData = async () => {
  try {
    const rawParams = {
      status,
      startDate,
      endDate,
      item,
      arriveName,
      outboundStorageName,
    };

    // 빈 문자열, null, undefined를 필터링
    const params = Object.keys(rawParams).reduce((acc, key) => {
      if (
        rawParams[key] !== "" &&
        rawParams[key] !== null &&
        rawParams[key] !== undefined
      ) {
        acc[key] = rawParams[key];
      }
      return acc;
    }, {});

    const responseData = await get("/inbound/request_done_list", params);
    setData(responseData.data.data); // 상태에 데이터 저장
    console.log(responseData);
  } catch (error) {
    console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
  }
};

// 체크박스 클릭 시 호출될 함수
// 매개변수를 id로 받는 함수
const handleCheckboxChange = (id) => {
  if (inboundIds.includes(id)) {
    // outboudids 배열에 id가 있는지 확인하고 true, false를 반환
    // 이미 체크된 ID는 체크 해제
    setInboundIds(inboundIds.filter((inboundId) => inboundId !== id));
  } else {
    // 새로운 ID는 체크 추가
    setInboundIds([...inboundIds, id]);
  }
};

// 컴포넌트가 렌더링할 때 특정 동작을 수행하는 useEffect로 컴포넌트가 처음 렌더링될 때
// 데이터를 가져오는 fetchData를 호출
useEffect(() => {
  fetchData(); // 데이터를 가져오는 함수 호출
}, []); // 의존성 배열이 빈 배열로 되어 있어, 컴포넌트가 처음 렌더링될 때 한 번만 실행됨

// 반환해서 presenter에서 쓸 값들
return (
  <div>
    {data ? (
      <InboundUI
        data={data}
        status={status}
        setStatus={setStatus}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        arriveName={arriveName}
        setArriveName={setArriveName}
        item={item}
        setItem={setItem}
        inboundIds={inboundIds}
        setInboundIds={setInboundIds}
        fetchData={fetchData} // fetchData 함수 전달
        handleCheckboxChange={handleCheckboxChange}
      /> // 데이터를 InboundUI에 전달
    ) : (
      <p>데이터를 불러오는 중...</p>
    )}
  </div>
);
}
