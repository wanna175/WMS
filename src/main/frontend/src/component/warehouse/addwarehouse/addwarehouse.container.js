import WarehouseUI from "./addwarehouse.presenter";
import { useAPI } from "../../../axios/useAPI";
import { useEffect, useState } from "react"; // useEffect와 useState를 React에서 가져온다.

export default function Warehouse() {
  const { post } = useAPI();

  const [data, setData] = useState([]);

  const [storageName, setStorageName] = useState("");
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [storageArea, setStorageArea] = useState("");


  // 데이터를 가져오는 fetchData 함수 정의
  const fetchData = async () => {
    try {
      const storageDTO = {
        storageName,
        address,
        addressDetail,
        zipcode,
        storageArea,
      };

      const responseData = await post("/storage/register_storage", storageDTO);
      setData(responseData); // 상태에 데이터 저장
      console.log(responseData);
    } catch (error) {
      console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
    }
  };

   // 컴포넌트가 렌더링할 때 특정 동작을 수행하는 useEffect로 컴포넌트가 처음 렌더링될 때
  // 데이터를 가져오는 fetchData를 호출
  useEffect(() => {
    fetchData(); // 데이터를 가져오는 함수 호출
  }, []); // 의존성 배열이 빈 배열로 되어 있어, 컴포넌트가 처음 렌더링될 때 한 번만 실행됨

  return (
    <div>
    {data ? (
  <WarehouseUI 
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
  fetchData={fetchData}
  />
    ) : (
      <p>데이터를 불러오는 중...</p>
    )}
    </div>
  );
}
