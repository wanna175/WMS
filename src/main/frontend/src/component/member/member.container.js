import MemberUI from "./member.presenter";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { errorModal } from "../../lib/util";
import { useState,useEffect } from "react";
import axios from "axios";
import { useAPI } from "../../../src/axios/useAPI";


export default function Member() {
  const router = useRouter();
  const { get, post } = useAPI();
  const initialData = []; //초기 데이터
  const [data, setData] = useState([]); // 데이터를 저장할 상태
  const [userStatus, setUserStatus] = useState(1); // 현재 선택된 userStatus
  

  //******디비 연결 */
  // API 호출 함수
  const fetchData = async () => {
    try {
      const response = await post ('/user/list', {}); // 백엔드 API 호출

      console.log(response.dto);

      setData(response.dto.dtoList); // 응답 데이터를 테이블에 매핑

    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);



  const fetchMemberList = async (userStatus) => {
    try {
      
    } catch (error) {
      if (error instanceof Error) errorModal("fail", error.message);
    }
  }

  const onSubmitBoard = async (data) => {
    try {
      console.log(data);
      //rest든 graphql이든 우리 백앤드로 data로 날리는 구간(await)
      router.push(`/wms`);
    } catch (error) {
      if (error instanceof Error) errorModal("fail", error.message);
    }
  };


  const onError = (data) => {
    errorModal("fail", "빈칸없이 입력해주세요");
  };
  
     // 목록 토글 핸들러
    const showEmployeeList = () => {
      setUserStatus(1); // 사원 목록 버튼 클릭 시 userStatus를 1로 설정
    };
  
    const showNonEmployeeList = () => {
      setUserStatus(0); // 비사원 목록 버튼 클릭 시 userStatus를 0으로 설정
    };





  return <MemberUI 
    data = {data}
    showEmployeeList = {showEmployeeList}
    showNonEmployeeList={showNonEmployeeList}
    fetchData={fetchData}
    />;
}
