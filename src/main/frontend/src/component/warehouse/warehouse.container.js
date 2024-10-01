import WarehouseUI from "./warehouse.presenter";
import { useAPI } from "../../axios/useAPI";
import { useEffect, useState } from "react"; // useEffect와 useState를 React에서 가져온다.


export default function Warehouse() {
  const { get, post } = useAPI();
  // data변수와 그것을 사용하기 위한 setData함수
  // 초기데이터는 null이며 axios를 통해 가져온 데이터를 저장할 곳
  const [data, setData] = useState([]);

  const [storageId, setStorageId] = useState("");
  const [storageName, setStorageName] = useState("");
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [storageArea, setStorageArea] = useState("");
  const [storageIds, setStorageIds] = useState([]);

  // 데이터를 가져오는 fetchData 함수 정의
  const fetchData = async () => {
    try {
      const rawParams = {
        storageName,
        address,
        addressDetail,
        zipcode,
        storageArea,
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

      const responseData = await get("/storage/storage_list", params);
      setData(responseData.data.data); // 상태에 데이터 저장
      console.log(responseData);
    } catch (error) {
      console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
    }
  };

  // 체크박스 클릭 시 호출될 함수
  // 매개변수를 id로 받는 함수
  const handleCheckboxChange = (id) => {
    if (storageIds.includes(id)) {
      // outboudids 배열에 id가 있는지 확인하고 true, false를 반환
      // 이미 체크된 ID는 체크 해제
      setStorageIds(storageIds.filter((storageId) => storageId !== id));
    } else {
      // 새로운 ID는 체크 추가
      setStorageIds([...storageIds, id]);
      console.log("현재 선택된 storageIds:", storageIds); // 상태 출력
    }
  };
  



  // 승인 요청 함수
  const modifyStorage = async () => {
    try {
      const storageDTO = {
        storageName,
        address,
        addressDetail,
        zipcode,
        storageArea,
        storageId,
      };

      const response = await post("/storage/modify_storage", storageDTO);
    } catch (error) {
      console.error("승인 요청 중 오류가 발생했습니다:", error);
    }
  };

  const removeStorage = async () => {
    // 전송 데이터 확인
    console.log("보낼 데이터:", { storageIds });
    
    if (storageIds.length === 0) {
      console.error("선택된 항목이 없습니다.");
      return;
    }
  
    try {
      // 요청 전송
      const response = await post("/storage/remove_storage", storageIds);
      console.log("삭제된 ID:", response.storageIds);
      setStorageIds([]); // 삭제 후 선택된 ID 초기화
      fetchData(); // 데이터 다시 불러오기
    } catch (error) {
      console.error("승인 요청 중 오류가 발생했습니다:", error);
      console.error(error.response.data); // 서버로부터 반환된 에러 메시지 확인
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
  <WarehouseUI 
  data={data}
  storageId={storageId}
  setStorageId={setStorageId}
  storageName={storageName}
  setStorageName={setStorageName}
  address={address}
  setAddress={setAddress}
  addressDetail={addressDetail}
  setAddressDetail={setAddressDetail}
  zipcode={zipcode}
  setZipcode={setZipcode}
  storageArea={storageArea}
  setStorageArea={setStorageArea}
  storageIds={storageIds}
  setStorageIds={setStorageIds}
  handleCheckboxChange={handleCheckboxChange}
  fetchData={fetchData}
  modifyStorage={modifyStorage}
  removeStorage={removeStorage}
  />
    ) : (
      <p>데이터를 불러오는 중...</p>
    )}
    </div>
  );
}
