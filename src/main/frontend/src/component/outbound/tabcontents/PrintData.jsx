import * as H from "../../../styles/pageStyles";

const columns = [
    {
      title: '발송지',
      dataIndex: 'departAddress',
      // render: (text) => <a>{text}</a>,
    },
    {
      title: '진행상태',
      dataIndex: 'status',
    },
    {
      title: '출고 요청 날짜',
      dataIndex: 'requestDate',
    },
    {
      title: '수신지',
      dataIndex: 'arriveAddress',
    },
    {
      title: '품목',
      dataIndex: 'item',
    },
    {
        title: '수량',
        dataIndex: 'quantity',
      },
  ];
  const data = [
    {
      key: '1',
      departAddress: '서울특별시 강남구',
      status: '출고 대기',
      requestDate: '2024-09-01',
      arriveAddress: '부산광역시 해운대구',
      item: '노트북',
      quantity: 10,
    },
    {
      key: '2',
      departAddress: '서울특별시 종로구',
      status: '출고 완료',
      requestDate: '2024-09-02',
      arriveAddress: '인천광역시 연수구',
      item: '모니터',
      quantity: 15,
    },
    {
      key: '3',
      departAddress: '서울특별시 용산구',
      status: '배송 중',
      requestDate: '2024-09-03',
      arriveAddress: '대전광역시 서구',
      item: '키보드',
      quantity: 50,
    },
    {
      key: '4',
      departAddress: '경기도 성남시',
      status: '출고 대기',
      requestDate: '2024-09-04',
      arriveAddress: '광주광역시 북구',
      item: '마우스',
      quantity: 30,
    },
    {
      key: '5',
      departAddress: '서울특별시 송파구',
      status: '출고 완료',
      requestDate: '2024-09-05',
      arriveAddress: '울산광역시 중구',
      item: '헤드셋',
      quantity: 12,
    },
    {
      key: '6',
      departAddress: '경기도 고양시',
      status: '배송 중',
      requestDate: '2024-09-06',
      arriveAddress: '세종특별자치시',
      item: '프린터',
      quantity: 5,
    },
    {
      key: '7',
      departAddress: '부산광역시 중구',
      status: '출고 완료',
      requestDate: '2024-09-07',
      arriveAddress: '대구광역시 달서구',
      item: '책상',
      quantity: 20,
    },
    {
      key: '8',
      departAddress: '대전광역시 유성구',
      status: '배송 중',
      requestDate: '2024-09-08',
      arriveAddress: '경기도 수원시',
      item: '의자',
      quantity: 40,
    },
    {
      key: '9',
      departAddress: '경상북도 포항시',
      status: '출고 대기',
      requestDate: '2024-09-09',
      arriveAddress: '전라북도 전주시',
      item: '모니터 받침대',
      quantity: 25,
    },
    {
      key: '10',
      departAddress: '충청북도 청주시',
      status: '출고 완료',
      requestDate: '2024-09-10',
      arriveAddress: '강원도 춘천시',
      item: 'USB 허브',
      quantity: 100,
    },
    {
      key: '11',
      departAddress: '전라남도 여수시',
      status: '출고 대기',
      requestDate: '2024-09-11',
      arriveAddress: '제주특별자치도 제주시',
      item: '외장하드',
      quantity: 12,
    },
    {
      key: '12',
      departAddress: '경상남도 창원시',
      status: '배송 중',
      requestDate: '2024-09-12',
      arriveAddress: '경기도 평택시',
      item: '그래픽카드',
      quantity: 8,
    },
    {
      key: '13',
      departAddress: '충청남도 아산시',
      status: '출고 완료',
      requestDate: '2024-09-13',
      arriveAddress: '부산광역시 기장군',
      item: '파워 서플라이',
      quantity: 18,
    },
    {
      key: '14',
      departAddress: '경기도 안양시',
      status: '출고 대기',
      requestDate: '2024-09-14',
      arriveAddress: '서울특별시 마포구',
      item: '램',
      quantity: 60,
    },
    {
      key: '15',
      departAddress: '전라북도 군산시',
      status: '배송 중',
      requestDate: '2024-09-15',
      arriveAddress: '충청북도 제천시',
      item: 'SSD',
      quantity: 45,
    },
    {
      key: '16',
      departAddress: '경기도 의정부시',
      status: '출고 완료',
      requestDate: '2024-09-16',
      arriveAddress: '경상남도 진주시',
      item: '마우스 패드',
      quantity: 70,
    },
    {
      key: '17',
      departAddress: '서울특별시 동작구',
      status: '출고 대기',
      requestDate: '2024-09-17',
      arriveAddress: '전라남도 목포시',
      item: '스피커',
      quantity: 35,
    },
    {
      key: '18',
      departAddress: '경기도 광명시',
      status: '출고 완료',
      requestDate: '2024-09-18',
      arriveAddress: '충청남도 천안시',
      item: '모바일 스탠드',
      quantity: 14,
    },
    {
      key: '19',
      departAddress: '부산광역시 남구',
      status: '배송 중',
      requestDate: '2024-09-19',
      arriveAddress: '대구광역시 수성구',
      item: '노트북 스탠드',
      quantity: 55,
    },
    {
      key: '20',
      departAddress: '강원도 원주시',
      status: '출고 대기',
      requestDate: '2024-09-20',
      arriveAddress: '경기도 성남시',
      item: '태블릿',
      quantity: 22,
    },
  ];
  

export default function SearchContent(props) {

  console.log(props.data);
    // 여기서 각각 colums랑 data 값 넣어주면 될듯
  switch (props.type) {
    case "all":
      console.log("all");
      break;
    case "accepted":
      console.log("accepted");
      break;
    default:
      console.log("denied");
      break;
  }

  return (
    <>
      <H.Htable columns={columns} dataSource={data} />
      <H.HButtonWrapper>
        <H.HButtonDefault style={{ margin: "2px" }}>승인</H.HButtonDefault>
        <H.HButtonDefault>반려</H.HButtonDefault>
      </H.HButtonWrapper>
    </>
  );
}
