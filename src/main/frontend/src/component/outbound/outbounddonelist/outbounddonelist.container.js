import { useEffect, useState } from "react"; // useEffect와 useState를 React에서 가져온다.
import axios from "axios"; //HTTP 요청을 보내기 위해 axios 라이브러리 호출.
import OutboundUI from "./outbounddonelist.presenter";
import { useAPI } from "../../../axios/useAPI";

export default function Outbound() {
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
  const [outboundMart, setOutboundMart] = useState("");
  const [outboundIds, setOutboundIds] = useState([]); // 한번에 여러 아이디를 담을거기 때문에 배열로 설정

    // 선택된 행을 상태로 관리
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);

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
      outboundMart,
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

    const responseData = await get("/outbound/request_done_list", params);
    setData(responseData.data.data); // 상태에 데이터 저장
    console.log(responseData.data.data);
  } catch (error) {
    console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
  }
};

// 반려 요청 함수
const rejectOutboundDone = async (selectedRows) => {
  try {
    // selectedRows에서 outboundId만 추출
    const outboundIds = selectedRows.map((row) => row.outboundId);
    if (outboundIds.length === 0) {
      console.error("선택된 출고 요청서가 없습니다.");
      return;
    }
    
    const response = await post("/outbound/done_reject", { outboundIds });
    console.log("반려된 ID:", response.outboundIds);
    setOutboundIds([]); // 반려 후 선택된 ID 초기화
    fetchData(); // 데이터 다시 불러오기
  } catch (error) {
    console.error("반려 요청 중 오류가 발생했습니다:", error);
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
      <OutboundUI
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
        outboundMart={outboundMart}
        setOutboundMart={setOutboundMart}
        setItem={setItem}
        outboundIds={outboundIds}
        setOutboundIds={setOutboundIds}
        fetchData={fetchData} // fetchData 함수 전달
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        rejectOutboundDone={rejectOutboundDone}
      /> // 데이터를 OutboundUI에 전달
    ) : (
      <p>데이터를 불러오는 중...</p>
    )}
  </div>
);
}
