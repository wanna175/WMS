import { Layout, theme } from "antd";
const { Header } = Layout;
import styled from "@emotion/styled";
import { UserOutlined, BellOutlined, BellFilled } from "@ant-design/icons";
import themes from "../../styles/theme";
import { Breadcrumb } from "antd";

const Wrapper = styled.div`
  height: 100%;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding-right: 5%;
`;
const Item = styled.div`
  padding-left: 30px;
`;
export default function LayoutHeader(props) {
  const onClickMyPage = () => {
    props.setPage(props.pageMap["/wms/mypage"][0]);
    props.setDetail(props.pageMap["/wms/mypage"][1]);
    props.router.push("/wms/mypage");
  };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Header
      style={{
        padding: 0,
        background: colorBgContainer,
        height: "6vh",
        backgroundColor: themes.colors.glbWhite,
      }}
    >
      <Wrapper>
        <Item>
          {props.noticeOpen ? <BellFilled onClick={props.showNotice} /> : <BellOutlined onClick={props.showNotice} />}
        </Item>
        <Item>
          <UserOutlined onClick={props.showProfile} />
        </Item>
      </Wrapper>
    </Header>
  );
}


