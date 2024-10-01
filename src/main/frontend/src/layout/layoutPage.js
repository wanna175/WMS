import axios from "axios";
import { useRouter } from "next/router";
import LayoutHeader from "./header/header";
import LayoutNavigation from "./navigation/navigation";
import LayoutFooter from "./footer/footer";
import { Breadcrumb, Layout, theme, Button, Drawer } from "antd";
import { 
  InboxOutlined,
  PieChartOutlined,
  ImportOutlined,
  ExportOutlined,
  TeamOutlined,
  SettingOutlined,
  CloseOutlined,
  DesktopOutlined,
} from "@ant-design/icons";
import themes from "../styles/theme";
import { useState, useRef, useEffect } from "react";
import Notice from "../notice/notice.container";
import * as N from "./NoticeStyle";
import * as P from "./profile/ProfileStyle";
import ProfileItem from "./profile/ProfileItem";
import Notifications from "../sse/sseAPI";
import { SSEContext } from "../sse/sseAPI";
const { Content } = Layout;
const LOGIN_PAGE = [
  "/login",
  "/",
  "/login/new",
  //여기다가 로그인 페이지만 넣고 네비 안뜨게 설정하자구~
];
export default function LayoutPage(props) {
  const router = useRouter();
  const isLoginPage = LOGIN_PAGE.includes(router.asPath);
  const [notices, setNotices] = useState([]);
  const [profile, setProfile] = useState({});

  const [page, setPage] = useState("대시보드");
  const [detail, setDetail] = useState("사원관리");
  const [drawOpen, setDrawOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [noticeOpen, setNoticeOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const modalRef = useRef();

  //sse 관련 변수
  const [events, setEvents] = useState([]);
  //////////////////////////////나중에 다른파일로 바꿔서 import합시다.
  const pageMap = {
    "/wms/dashboard": ["대시보드", "대시보드"],
    "/wms/member": ["회원관리", "사원관리"],
    "/wms/member/newuserrequest": ["회원관리", "회원가입요청"],
    "/wms/warehouse": ["창고관리", "창고조회"],
    "/wms/warehouse/addwarehouse": ["창고관리", "창고등록"],
    "/wms/outbound": ["출고관리", "출고요청서조회"],
    "/wms/outbound/outbounddonelist": ["출고관리", "출고현황"],
    "/wms/outbound/writeoutbound": ["출고관리", "출고요청서작성"],
    "/wms/inbound": ["입고관리", "입고요청서조회"],
    "/wms/inbound/inbounddonelist": ["입고관리", "입고현황"],
    "/wms/inbound/writeinbound": ["입고관리", "입고요청서작성"],
    "/wms/stock": ["재고관리", "재고조회"],
    "/wms/waybill": ["운송장관리", "운송장조회"],
    "/wms/waybill/modifywaybill": ["운송장관리", "운송장수정"],
    "/wms/mypage": ["WMS", "내정보"],
  };
  const getItem = (label, key, icon, children) => {
    return {
      key,
      icon,
      children,
      label,
    };
  };
  const items = [
    getItem("대시보드", "/wms/dashboard", <PieChartOutlined />, [
      getItem(pageMap["/wms/dashboard"][1], "/wms/dashboard"),
    ]),
    getItem("회원관리", "sub1", <TeamOutlined />, [
      getItem(pageMap["/wms/member"][1], "/wms/member"),
      getItem(
        pageMap["/wms/member/newuserrequest"][1],
        "/wms/member/newuserrequest"
      ),
    ]),
    getItem("창고관리", "sub2", <TeamOutlined />, [
      getItem("창고조회", "/wms/warehouse"),
      getItem("창고등록", "/wms/warehouse/addwarehouse"),
    ]),

    getItem("출고관리", "sub3", <DesktopOutlined />, [
      getItem("출고요청서조회", "/wms/outbound"),
      getItem("출고현황", "/wms/outbound/outbounddonelist"),
      getItem("출고요청서작성", "/wms/outbound/writeoutbound"),
    ]),
    getItem("입고관리", "sub4", <PieChartOutlined />, [
      getItem("입고요청서조회", "/wms/inbound"),
      getItem("입고현황", "/wms/inbound/inbounddonelist"),
      getItem("입고요청서작성", "/wms/inbound/writeinbound"),
    ]),
    getItem("재고관리", "sub5", <DesktopOutlined />, [
      getItem("재고조회", "/wms/stock"),
    ]),
    getItem("운송장관리", "sub6", <DesktopOutlined />, [
      getItem("운송장조회", "/wms/waybill"),
      getItem("운송장수정", "/wms/modifywaybill"),
    ]),
  ];
  /////////////////////////////여기 위에 지저분한거 나중에 다른파일로 뺍시다.리팩토링필요
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const onClickNav = ({ item, key, keyPath, domEvent }) => {
    setPage(pageMap[key][0]);
    setDetail(pageMap[key][1]);
    router.push(key);
  };

  // 알림 창 띄우기
  const showNotice = () => {
    setNoticeOpen(true);
    setLoading(true);
  };

  // 프로필 창 띄우기
  const showProfile = async () => {
    setProfileOpen(true);
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:8080/api//test/profile"
      );
      setProfile(response.data);
    } catch (error) {
      setProfile({
        id: "숫자일까 문자일까",
        url: "../../../public/img/gyulobal1.png",
        name: "김정우",
      });
    } finally {
      setLoading(false);
    }
  };

  // 바깥 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setNoticeOpen(false);
        setProfileOpen(false);
      }
    };

    // 마운트 시 이벤트 리스너 추가
    document.addEventListener("mousedown", handleClickOutside);

    // 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        {!isLoginPage && (
          <LayoutNavigation onClickNav={onClickNav} items={items} />
        )}
        <Layout
          style={{
            background: themes.colors.glbWhite,
            border: "none",
          }}
        >
          {!isLoginPage && (
            <>
              <Notifications setNotices={setNotices} notices={notices} />
              <LayoutHeader
                router={router}
                setPage={setPage}
                setDetail={setDetail}
                noticeOpen={noticeOpen}
                showNotice={showNotice}
                profileOpen={profileOpen}
                showProfile={showProfile}
                pageMap={pageMap}
              />
            </>
          )}

          {/* 알림 창 */}
          {noticeOpen && (
            <N.NoticeModal ref={modalRef}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderBottom: "solid 0.5px rgb(217, 217, 217)",
                  padding: "15px",
                  textAlign: "center",
                  fontSize: "18px",
                }}
              >
                알림
                <SettingOutlined />
              </div>
              <div style={{ padding: "0px 15px 15px 15px", overflow: "auto" }}>
                {notices.map((el) => {
                  // JSON 문자열을 파싱해서 실제 객체로 변환

                  const parsedData = JSON.parse(el.data);

                  console.log("통지값이 대체 뭔지", parsedData);

                  return (
                    <Notice
                      key={parsedData.notification_id} // 각 요소에 고유한 key를 설정
                      id={parsedData.notification_id} // 파싱된 데이터에서 id 추출
                      el={parsedData} // 파싱된 데이터 전체를 el로 전달
                      router={router} // 기존 router 값 그대로 전달
                    />
                  );
                })}
              </div>
            </N.NoticeModal>
          )}

          {/* 프로필 창 */}
          {profileOpen && (
            <P.ProfileModal ref={modalRef}>
              <ProfileItem profile={profile} />
            </P.ProfileModal>
          )}

          <Content
            style={{
              margin: "0 16px",
              border: "none",
            }}
          >
            <Breadcrumb
              separator=">"
              style={{
                margin: "16px 0",
                height: "8vh",
              }}
            >
              {!isLoginPage && (
                <h1
                  style={{
                    color: themes.colors.glbBlack,
                    fontSize: "24px",
                    paddingLeft: "16px",
                  }}
                >
                  {detail}
                </h1>
              )}
            </Breadcrumb>
            <div
              style={{
                padding: "0px 0px 0px 0px",
                minHeight: 500,
                background: themes.colors.glbWhite,
                borderRadius: "50px",
              }}
            >
              {props.children}
            </div>
          </Content>
          {!isLoginPage && <LayoutFooter />}
        </Layout>
      </Layout>
    </>
  );
}
