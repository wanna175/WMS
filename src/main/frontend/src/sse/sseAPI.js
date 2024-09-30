import React, { createContext, useContext, useEffect, useState } from "react";
import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";
import { TokenContext } from "../axios/TokenContext";
// Context 생성
const SSEContext = createContext();

export const SSEProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const { state, dispatch } = useContext(TokenContext);

  useEffect(() => {
    const EventSource = EventSourcePolyfill || NativeEventSource;
    const eventSource = new EventSource(
      "http://localhost:8080/api/notification/connect",
      {
        headers: {
          Authorization: state.accessToken,
        },
      }
    );

    eventSource.onmessage = (event) => {
      console.log("이벤트 : ", event);
      const newEvent = event.data;
      setEvents((prevEvents) => [...prevEvents, newEvent]);
      console.log("새 이벤트 수신:", newEvent);
    };

    eventSource.onerror = (err) => {
      console.error("SSE 에러:", err);
      eventSource.close();
    };

    // 언마운트 시 연결 해제
    return () => {
      eventSource.close();
    };
  }, []);

  return <SSEContext.Provider value={events}>{children}</SSEContext.Provider>;
};

// Context에서 SSE 이벤트를 가져오는 Hook
export const useSSE = () => {
  return useContext(SSEContext);
};
