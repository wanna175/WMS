import WaybillUI from "./requestwaybill.presenter";
import { useAPI } from "../../axios/useAPI";
import { useEffect, useState } from "react"; // useEffect와 useState를 React에서 가져온다.

export default function Waybill() {
  const { get, post, put} = useAPI();

  const [data, setData] = useState(null);

  //검색조건
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [arriveStorageName, setArriveStorageName] = useState("");
  const [departStorageName, setDepartStorageName] = useState("");
  const [waybillId, setWaybillId] = useState("");

  const [departAddress, setDepartAddress] = useState("");
  const [arriveAddress, setArriveAddress] = useState("");
  const [departAddressDetail, setDepartAddressDetail] = useState("");
  const [arriveAddressDetail, setArriveAddressDetail] = useState("");
  const [departZipcode, setDepartZipcode] = useState(""); 
  const [arriveZipcode, setArriveZipcode] = useState(""); 


  const fetchData = async ()=>{
    try {
      const rawParams = {
        startDate,
        endDate,
        arriveStorageName,
        departStorageName,
        waybillId,
        departAddress,
        arriveAddress,
        departAddressDetail,
        arriveAddressDetail,
        departZipcode,
        arriveZipcode,
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

      const responseData = await post("/waybill/list", params);
      
      setData(responseData);
      console.log("응답 데이터",responseData);

            
    } catch (error) {
      console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
    }
  };


  const modifyWaybill = async () => {
    try {
      const pageWaybillRequestDTO = {
        arriveStorageName,
    departStorageName,
    waybillId,
    departAddress,
    arriveAddress,
    departAddressDetail,
    arriveAddressDetail,
    departZipcode,
    arriveZipcode,
      };

      const response = await post("/waybill/modify",pageWaybillRequestDTO);
    } catch (error) {
      console.error("승인 요청 중 오류가 발생했습니다:", error);
    }
  };


    // 컴포넌트가 렌더링할 때 특정 동작을 수행하는 useEffect로 컴포넌트가 처음 렌더링될 때
  // 데이터를 가져오는 fetchData를 호출
  useEffect(() => {
    fetchData(); // 데이터를 가져오는 함수 호출
    
    console.log("데이터 출력", data); // 여기서 데이터가 제대로 설정되는지 확인

  }, []); // 의존성 배열이 빈 배열로 되어 있어, 컴포넌트가 처음 렌더링될 때 한 번만 실행됨


return (
  <div>
    {data ? (
      <WaybillUI
        data={data}

        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        arriveStorageName={arriveStorageName}
        setArriveStorageName={setArriveStorageName}
        departStorageName={departStorageName}
        setDepartStorageName={setDepartStorageName}
        waybillId={waybillId}
        setWaybillId={setWaybillId}
        departAddress={departAddress}
        setDepartAddress={setDepartAddress}
        arriveAddress={arriveAddress}
        setArriveAddress={setArriveAddress}
        departAddressDetail={departAddressDetail}
        setDepartAddressDetail={setDepartAddressDetail}
        arriveAddressDetail={arriveAddressDetail}
        setArriveAddressDetail={setArriveAddressDetail}
        departZipcode={departZipcode}
        setDepartZipcode={setDepartZipcode}
        arriveZipcode={arriveZipcode}
        setArriveZipcode={setArriveZipcode}

        fetchData={fetchData} // fetchData 함수 전달

        modifyWaybill={modifyWaybill}//운송장 수정 함수
      /> // 데이터를 WaybillUI에 전달
    ) : (
      <p>데이터를 불러오는 중...</p>
    )}
  </div>
);
}