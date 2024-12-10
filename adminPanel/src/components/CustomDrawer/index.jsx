import React from "react";
import { Drawer, Menu } from "antd";
import { Link } from "react-router-dom";
import UserDetailsDropdown from "../UserDatailsDropdown";
import { StyledCustomDrawer } from "./styles";

const CustomDrawer = ({ visible, onClose, currentKey, items }) => {
  return (
    <StyledCustomDrawer
      placement="left"
      onClose={onClose}
      visible={visible}
      bodyStyle={{ padding: 0 }}
      closable={false}
      width={250}
    >
      <div style={{
            display: "flex",
            alignItems: "center"
      }} className="logo">
        <img
          style={{ width: "50px", height: "50px" }}
          src="/images/chill-guy.png"
          alt=""
        />
        <p style={{ color: "skyblue", fontWeight: "700", fontSize: "34px" }}>
          ChillGuy
        </p>
      </div>
      <div className="dropdown-user-component">
        <UserDetailsDropdown />
      </div>
      <Menu selectedKeys={[currentKey]} onClick={onClose}>
        {items.map((item) => (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.route}>{item.label}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </StyledCustomDrawer>
  );
};

export default CustomDrawer;
