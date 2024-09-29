import InboundUI from "./writeinbound.presenter";
import {useEffect, useState} from "react";
import axios from "axios";
import { useAPI } from "../../../axios/useAPI";

export default function Inbound() {
  const { post } = useAPI();
  
  
  const [data, setData] = useState(null);

  const [userId, setUserId] = useState("");
  const [requestDate, setRequestDate] = useState("");
  const [departStorageName, setDepartStorageName] = useState("");
  const [inboundMart, setInboundMart] = useState(0);
  const [inboundId, setInboundId] = useState("");
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [items, setItems] = useState([]);

  const addItem = () => {
    setItems([...items, { productName: "", quantity: "" }]); // 새로운 품목 추가
  };

    // 품목이나 수량 입력 시 호출 (index는 입력된 품목의 인덱스)
    const handleItemChange = (index, field, value) => {
      const updatedItems = [...items];
      updatedItems[index][field] = value; // 해당 품목의 필드를 업데이트
      setItems(updatedItems);
    };


  const fetchData = async () => {
    try {
      console.log("userId:", userId);
      console.log("departStorageName:", departStorageName);
      console.log("inboundMart:", inboundMart);
      console.log("productName:", productName);
      console.log("quantity:", quantity);

      // 요청할 데이터를 inboundDTO로 구성
      const inboundDTO = {
          userId, //userId 받는 방법 몰라서 일단 설정
          status:"미승인",
          departStorageName,
          inboundMart,
          items
      };
      console.log("보내는 데이터:", inboundDTO);
  
      // 서버로 POST 요청 (백엔드 API로 데이터 전송)
      const response = await post("/inbound/write_inbound", inboundDTO)
      console.log("보내는 데이터:", inboundDTO);

      // 요청 성공 시 추가로 처리할 작업 (예: 알림 표시 등)
      alert("출고 요청이 성공적으로 처리되었습니다.");
      
    } catch (error) {
      // 오류 발생 시 처리할 로직
      console.error("출고 요청 중 오류가 발생했습니다:", error);
      alert("출고 요청에 실패했습니다. 다시 시도해 주세요.");
    }
  };

// 컴포넌트가 렌더링할 때 특정 동작을 수행하는 useEffect로 컴포넌트가 처음 렌더링될 때
  // 데이터를 가져오는 fetchData를 호출
  useEffect(() => {
    if (userId && departStorageName && productName && quantity) {
      console.log("상태 값 확인 완료. fetchData 호출 가능");
    }
  }, [userId, departStorageName, productName, quantity]);




  return <InboundUI 
  userId={userId}
  setUserId={setUserId}
  requestDate={requestDate}
  setRequestDate={setRequestDate}
  departStorageName={departStorageName}
  setDepartStorageName={setDepartStorageName}
  inboundMart={inboundMart}
  setInboundMart={setInboundMart}
  inboundId={inboundId}
  setInboundId={setInboundId}
  productName={productName}
  setProductName={setProductName}
  quantity={quantity}
  setQuantity={setQuantity}
  items={items}
  setItems={setItems}
  addItem={addItem}
  handleItemChange={handleItemChange}
  fetchData={fetchData} // fetchData 함수 전달
  />;
}
