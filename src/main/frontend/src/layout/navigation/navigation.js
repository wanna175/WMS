import React, { useState } from "react";

import { Layout, Menu } from "antd";
import Logo from "./Logo";
import theme from "../../styles/theme";
const { Sider } = Layout;

export default function LayoutNavigation(props) {
  const [collapsed, setCollapsed] = useState(false);
  const [openKey, setOpenKey] = useState(null);

  const handleOpenChange = (key) => {
    setOpenKey(key);
  };

  // 서브메뉴의 아이템들에 첫 번째와 마지막 아이템에 클래스 추가
  const modifiedItems = props.items.map((item) => {
    if (item.children && item.children.length > 0) {
      // 서브메뉴가 있는 경우
      const modifiedChildren = item.children.map((child, index) => {
        if (index === item.children.length - 1) {
          return {
            ...child,
            className: "last-item", // 마지막 서브메뉴 아이템에 클래스 추가
          };
        }
        return child;
      });

      return {
        ...item,
        children: modifiedChildren, // 수정된 서브메뉴 아이템 리스트
      };
    } else {
      return {
        ...item,
        className: "only-submenu",
      };
    }
  });


  return (
    <Sider
      style={{ backgroundColor: theme.colors.glbOrange, borderRight: "solid 1px white" }}
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <Logo collapsed={collapsed}/> 
      <Menu
        style={{ backgroundColor: theme.colors.glbOrange, fontSize: "16px", border: "none"}}
        defaultSelectedKeys={["/wms/member"]}
        mode="inline"
        openKeys={openKey ? [openKey] : []}
        onOpenChange={(keys) => handleOpenChange(keys[keys.length - 1])}
        items={modifiedItems}
        onClick={props.onClickNav}
      />
    </Sider>
  );
}
