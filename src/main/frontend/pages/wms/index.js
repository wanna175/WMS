import { useSSE } from "../../src/sse/sseAPI";

export default function WMSHome() {
  const events = useSSE();
  console.log("events2 : ", events);
  return (
    <>
      <div>로그인성공후 디폴트 페이지.</div>
      <div>
        <h1>SSE 이벤트</h1>
        <ul>
          {events
            ? events.map((event, index) => <li key={index}>{event}</li>)
            : "로드중"}
        </ul>
      </div>
    </>
  );
}
