import * as S from "./warehouse.styles";
import React from "react";
import { Divider, Tabs, Table, Button } from 'antd';
import PrintData from "./tabcontents/PrintData"

export default function WarehouseUI({
  data,
  storageIds,
  storageId,
  setStorageId,
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
  handleCheckboxChange,
  removeStorage,
  modifyStorage
}) {
  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: '1',
      label: '창고 조회',
      children:  (
        <>
          <PrintData 
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
          handleCheckboxChange={handleCheckboxChange}
          modifyStorage={modifyStorage}
          removeStorage={removeStorage}
          /> {/* PrintData는 SearchContent 아래에서 데이터를 출력 */}
        </>
      ),
    },
  ];
  
  return (
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
  );
}
