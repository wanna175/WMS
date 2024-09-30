import MemberUI from "./member.presenter";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { errorModal } from "../../lib/util";
import { useState,useEffect } from "react";
import axios from "axios";
import { useAPI } from "../../../src/axios/useAPI";


export default function Member() {
  const router = useRouter();
  const initialData = []; //초기 데이터
  const [data, setData] = useState([]); // 데이터를 저장할 상태
  const [userStatus, setUserStatus] = useState(1); // 현재 선택된 userStatus
  

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
  
  
    useEffect(() => {
      // 데이터 가져오기
      const fetchData = async () => {
        try {
          // POST 요청으로 userStatus 값을 본문에 포함시킴

          const response = (await axios.post('/api/member/list', { Byte: userStatus }));
          setData(response.data);
        } catch (error) {
          console.error('데이터를 가져오는 중 오류 발생:', error);
        }
      };
  
      fetchData();
    }, [userStatus]); // userStatus가 변경될 때마다 데이터를 다시 가져옴
  
  
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
    />;
}
