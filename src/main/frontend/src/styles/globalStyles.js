import { css } from "@emotion/react";
import theme from "./theme";

export const globalStyles = css`
  *:not(.anticon) {
    margin: 0;
    box-sizing: border-box;
    font-size: 16px;
    font-weight: bold;
  }
  /* 기본 토글 버튼 배경색 변경 */
  .ant-layout-sider-trigger {
    background-color: ${theme.colors.glbOrange} !important;
    border-right: solid 1px white;
    color: white !important;
    font-weight: bold;
  }



  /* 마우스 호버 시 배경색 변경 */
  .ant-layout-sider-trigger:hover {
    background-color: ${theme.colors.glbDarkOrange} !important;
    color: white !important;
    border-right: solid 1px white;
  }



  /* 서브 메뉴 */
  .ant-menu-submenu-title {
    background-color: ${theme.colors.glbOrange} !important;
    color: ${theme.colors.glbWhite} !important;
    border-radius: 0px !important;
    margin-block: 0px !important;
    border-top: solid 1px ${theme.colors.glbWhite};
    margin-inline: 8px !important;

    transition: background-color 0.3s ease, color 0.3s ease, margin 0.3s ease, padding 0.3s ease;
  }

  .ant-menu-submenu-title:hover {
    background-color: ${theme.colors.glbDarkOrange} !important;
  }

  .ant-menu-submenu-title:active {
    background-color: ${theme.colors.glbDarkOrange} !important;
  }

  .ant-menu-submenu-title[aria-expanded="true"] {
    background-color: ${theme.colors.glbWhite} !important;
    color: ${theme.colors.glbOrange} !important;
    border-radius: 20px 0px 0px 0px !important;
    font-weight: bold;

    margin-inline: 8px !important;

    transition: background-color 0.3s ease, color 0.3s ease, margin 0.3s ease, padding 0.3s ease;
  }

  

  /* 메뉴 아이템 */
  .ant-menu-item {
    background: ${theme.colors.glbWhite} !important;
    margin-inline: 8px !important;
    margin-block: 0px !important;
    border-radius: 0px !important;
  }

  .ant-menu-item:hover {
    background-color: ${theme.colors.glbGrey} !important;
  }



  /* 선택된 메뉴 아이템 */
  .ant-menu-item-selected,  {
    background-color: ${theme.colors.glbWhite} !important;
    color: ${theme.colors.glbOrange} !important;
  }

  .ant-menu-item-selected:active {
    background-color: ${theme.colors.glbDarkGrey} !important;
  }


  /* 테두리 설정 */
  .last-item {
    border-radius: 0px 0px 0px 20px !important;
    margin-bottom: 8px !important;
  }

  @font-face {
    //전체 폰트설정은 여기서 해주자고
    font-family: "myFont";
    src: url("/fonts/NanumSquareRoundR.ttf");
  }

  /* 테이블 설정 */
  .ant-tabs-tab-btn[aria-selected="true"] {
    color: ${theme.colors.glbOrange} !important;
  }

  .ant-tabs-tab-btn[aria-selected="false"]:hover {
      color: ${theme.colors.glbOrange} !important;
  }

  .ant-tabs-ink-bar {
    background-color: ${theme.colors.glbOrange} !important;
  }
  
  .ant-pagination-item {
    border-color: ${theme.colors.glbOrange} !important;
  }

  .ant-pagination-item {
    border : none !important;
  }

  .ant-pagination-item>a {
    color: ${theme.colors.glbBlack} !important;
  }

  .ant-pagination-item-active>a {
    border: solid 1px ${theme.colors.glbOrange};
    border-radius: 6px;
    color: ${theme.colors.glbOrange} !important;
  }
`;
