
import React, { useState, useEffect } from 'react';
import App from './stock.presenter'; // presenter 파일 불러오기
import { useAPI } from "../../axios/useAPI";

export default function Stock(){

const { get, post, put} = useAPI();
const [data, setData] = useState(null);

  //검색 조건
  const [productName, setProductName] = useState("");
  const [storageName, setStorageName] = useState("");
  const [quantity, setQuantity] = useState("");

  const fetchData = async () =>{
    try {
      const rawParams ={
        productName,
        storageName,
        quantity,
      };

    const params = Object.keys(rawParams).reduce((acc, key)=> {
        if(
          rawParams[key] !== "" &&
          rawParams[key] !== null &&
          rawParams[key] !== undefined
        ){
          acc[key] = rawParams[key];
        }
        return acc;
      },{});

      const responseData = await post("/stock/list", params);
      setData(responseData);
      console.log("응답 데이터",responseData);
    }
      catch (error) {
        console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
      }
    };

    

  useEffect(() => {
    fetchData(); // 데이터를 가져오는 함수 호출
    
    console.log("데이터 출력", data); // 여기서 데이터가 제대로 설정되는지 확인

  }, []);

 
  return (
    <div>
      {data ? (
        <App 
        data={data}

        productName={productName}
        setProductName={setProductName}
        storageName={storageName}
        setStorageName={setStorageName}
        quantity={quantity}
        setQuantity = {setQuantity}

        fetchData = {fetchData}


        />
      ) : (
        <p>데이터를 불러오는 중...</p>
      )}
    </div>
  );
};
