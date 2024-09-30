import DashboardUI from "./dashboard.presenter";
import React, { useState, useEffect } from "react";
import axios from "axios";

/*
  필요한 데이터 셋
  1. 손실
    - 당월 1일부터 당일까지 값 리스트

  2. 사용률
    - 현재 <상품, 적재량> 리스트
    - 창고 전체 적재가능 면적
  
    3. 입고 통계
    - 최근 7일 입고 요청 건수
    - 최근 7일 입고 완료 건수

    - 당월 1일부터 당일까지 입고 요청 건수
    - 당월 1일부터 당일까지 입고 처리 중 건수
    - 당월 1일부터 당일까지 입고 완료 건수
  
    4. 출고 통계
    - 최근 7일 출고 요청 건수
    - 최근 7일 출고 완료 건수

    - 당월 1일부터 당일까지 출고 요청 건수
    - 당월 1일부터 당일까지 출고 처리 중 건수
    - 당월 1일부터 당일까지 출고 완료 건수
  
    5. 재고 추이
      - 1년 전부터 당일까지 <상품, 값> 리스트
*/

export default function Dashboard(props) {
  return <DashboardUI/>;
}
