import InboundUI from "./writeinbound.presenter";
import {useEffect, useState} from "react";
import axios from "axios";

export default function Inbound() {
  
  const [data, setData] = useState(null);

  const [userId, setUserId] = useState("user1");
  const [requestDate, setRequestDate] = useState(null);
  const [arriveName, setArriveName] = useState(null);
  const [inboundMart, setInboundMart] = useState(0);
  const [inboundId, setInboundId] = useState(null);
  const [productName, setProductName] = useState(null);
  const [quantity, setQuantity] = useState(null);


  const fetchData = async () => {
    try {
      // 요청할 데이터를 inboundDTO로 구성
      const inboundDTO = {
        // userId,
        // arriveName,
        // inboundMart,
        // inboundId,
        // productName,
        // quantity,
        userId: 'user1',
        arriveName: 'Storage B',
        inboundMart: false,
        items: [
            { productName: 'Product A', quantity: 10 },
            { productName: 'Product B', quantity: 5 }
        ]
      };
  
      // 서버로 POST 요청 (백엔드 API로 데이터 전송)
      const response = await axios.post("http://localhost:8080/api/inbound/write_inbound", inboundDTO)
  
      // 요청 성공 시 추가로 처리할 작업 (예: 알림 표시 등)
      alert("입고 요청이 성공적으로 처리되었습니다.");
      
    } catch (error) {
      // 오류 발생 시 처리할 로직
      console.error("입고 요청 중 오류가 발생했습니다:", error);
      alert("입고 요청에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  return <InboundUI 
  userId={userId}
  setUserId={setUserId}
  requestDate={requestDate}
  setRequestDate={setRequestDate}
  arriveName={arriveName}
  setArriveName={setArriveName}
  inboundMart={inboundMart}
  setInboundMart={setInboundMart}
  inboundId={inboundId}
  setInboundId={setInboundId}
  productName={productName}
  setProductName={setProductName}
  quantity={quantity}
  setQuantity={setQuantity}
  fetchData={fetchData} // fetchData 함수 전달
  />;
}
