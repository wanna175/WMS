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

      // 상태 초기화 (옵션)
      setStorageName("");
      setAddress("");
      setAddressDetail("");
      setZipcode("");
      setStorageArea("");
    } catch (error) {
      console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
    }
  };

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
