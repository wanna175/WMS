import { useAPI } from "../../src/axios/useAPI";
export default function WMSHome() {
  const { get } = useAPI();
  const onClickButton = async () => {
    await get("/test/notice");
  };
  return (
    <>
      <div>로그인성공후 디폴트 페이지.</div>
      <button onClick={onClickButton}>셀프로 알림 보내보기.</button>
    </>
  );
}
