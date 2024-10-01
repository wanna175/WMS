import * as H from "../../../styles/pageStyles";

const columns = [
  {
    title: '발송지',
    dataIndex: 'departStorageName',
    // render: (text) => <a>{text}</a>,
  },
  {
    title: '진행상태',
    dataIndex: 'status',
  },
  {
    title: '배송 완료 날짜',
    dataIndex: 'inboundCompleteDate',
  },
  {
    title: '수신지',
    dataIndex: 'arriveName',
  },
  {
    title: '품목 및 수량',
    dataIndex: 'products',
  },
];


export default function SearchDoneContent(props) {
const { type, data } = props;

// 데이터와 타입을 확인하는 콘솔 로그 추가
console.log("Received data:", data);
console.log("Current type:", type);

const filteredData = data && Array.isArray(data)
  ? data.filter((item) => {
      console.log("Item status:", item.status); // 각 항목의 status 확인
      if (type === "all") return true;
      if (type === "start") return item.status === "출고완료";
      if (type === "end") return item.status === "입고완료";
      if (type === "search") return item;
      return false;
    })
  : [];

console.log("Filtered data:", filteredData); // 필터링 결과 확인

return (
  <>
    <H.Htable columns={columns} dataSource={filteredData} />
  </>
);
}


