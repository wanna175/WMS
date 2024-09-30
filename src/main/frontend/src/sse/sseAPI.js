import React, { useEffect, useContext, createContext } from "react";
import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";
import { TokenContext } from "../axios/TokenContext";
export default function Notifications(props) {
  const { state } = useContext(TokenContext);
  useEffect(() => {
    const EventSource = EventSourcePolyfill || NativeEventSource;
    // EventSource 연결 설정 (개별 SSE 연결)
    const eventSource = new EventSource(
      "http://localhost:8080/api/notification/connect",
      {
        headers: {
          Authorization: state.accessToken,
        },
      }
    );

    // 서버로부터 오는 이벤트 처리
    eventSource.onmessage = (event) => {
      if (event.data !== "dummy") {
        props.setNotices((prev) => [...prev, event]);
      }
    };

    // 에러 처리
    eventSource.onerror = (err) => {
      console.error("SSE 연결 에러:", err);
      eventSource.close(); // 에러 발생 시 연결 종료
    };

    // 컴포넌트 언마운트 시 SSE 연결 해제
    return () => {
      eventSource.close();
    };
  }, []); // 빈 배열을 두 번째 인자로 전달하면, 컴포넌트가 마운트될 때 한 번만 실행

  return <></>;
}
