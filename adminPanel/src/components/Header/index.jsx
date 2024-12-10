import { Button, Layout } from "antd";
import { StyledHeaderWrapper } from "./styles";
import UserDetailsDropdown from "../UserDatailsDropdown";
import { MenuOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { getItems } from "../../constants/menueConstants";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import CustomDrawer from "../CustomDrawer";

export const HeaderSection = () => {
  const { Header } = Layout;
  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);

  const [currentKey, setCurrentKey] = useState("1");
  const [drawerVisible, setDrawerVisible] = useState(false);
  const userDetails = useSelector((state) => state?.auth?.userDetails);
  const items = getItems(userDetails);

  const location = useLocation();
  useEffect(() => {
    const matchingItem = items.find((item) => item.route === location.pathname);
    if (matchingItem) {
      setCurrentKey(matchingItem.key);
    } else {
      setCurrentKey(null);
    }
  }, [location.pathname, items]);

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onClose = () => {
    setDrawerVisible(false);
  };

  return (
    <>
      <StyledHeaderWrapper>
        <Layout>
          <Header>
            {" "}
            <div className="logo">
              <img
                style={{ width: "50px", height: "50px" }}
                src="/images/chill-guy.png"
                alt=""
              />
              <p
                style={{
                  color: "skyblue",
                  fontWeight: "700",
                  fontSize: "34px",
                }}
              >
                ChillGuy
              </p>
            </div>
            <UserDetailsDropdown />
            {isLoggedIn && (
              <Button
                className="menu-button-drawer"
                icon={<MenuOutlined />}
                onClick={showDrawer}
                style={{ background: "white" }}
              />
            )}
          </Header>
        </Layout>
      </StyledHeaderWrapper>
      <CustomDrawer
        visible={drawerVisible}
        onClose={onClose}
        currentKey={currentKey}
        items={items}
      />
    </>
  );
};
