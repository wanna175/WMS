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

    // 선택된 행을 상태로 관리
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);

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
    try {
      // selectedRows에서 outboundId만 추출
      const storageIds = selectedRows.map((row) => row.storageId);
      if (storageIds.length === 0) {
        console.error("선택된 출고 요청서가 없습니다.");
        return;
      }

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
  fetchData={fetchData}
  selectedRowKeys={selectedRowKeys}
  setSelectedRowKeys={setSelectedRowKeys}
  selectedRows={selectedRows}
  setSelectedRows={setSelectedRows}
  modifyStorage={modifyStorage}
  removeStorage={removeStorage}
  />
    ) : (
      <p>데이터를 불러오는 중...</p>
    )}
    </div>
  );
}
