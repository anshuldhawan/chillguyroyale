import { Layout, Menu } from "antd";
import { StyledLayoutWrapper } from "./styles";

import { Link, useLocation } from "react-router-dom";
import { Footer } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getItems } from "../../constants/menueConstants";
import { ROUTES } from "../../routes/routeConstants";

import { XOutlined } from "@ant-design/icons";

const { Sider, Content } = Layout;



export const AppLayout = ({ children }) => {
  const [currentKey, setCurrentKey] = useState("1");
  const userDetails = useSelector((state) => state?.auth?.userDetails);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const location = useLocation();

  useEffect(() => {});


  const items = getItems(userDetails);

  useEffect(() => {
    // Check the pathname and set the currentKey
    if (
      location.pathname === ROUTES.DASHBOARD ||
      location.pathname === ROUTES.HOME
    ) {
      setCurrentKey("1");
    } else {
      const matchingItem = items.find(
        (item) => item.route === location.pathname
      );
      if (matchingItem) {
        setCurrentKey(matchingItem.key);
      } else {
        setCurrentKey(null); // No matching route found
      }
    }
  }, [location.pathname, items]);
  return (
    <>
      <StyledLayoutWrapper>
        <Layout hasSider>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => {
              if (broken) {
                setDrawerVisible(false);
              }
            }}
            style={{
              overflow: "auto",
              height: "100vh",
            }}
            trigger={null}
          >
            <Menu
              style={{
                // background: "#050F33",
                color: "white",
                height: "100vh",
              }}
              selectedKeys={[currentKey]}
            >
              {items.map((item) => (
                <Menu.Item key={item.key} icon={item.icon}>
                  <Link className="route-dec" to={item.route}>
                    {item.label}
                  </Link>
                </Menu.Item>
              ))}
            </Menu>
          </Sider>
          <Layout>
            <Content>{children}</Content>
            <Footer>
              <div className="privacy-tab"></div>
              <div className="privacy-tab">
                <div className="copyright">
                  <img src="/images/dotIcon.svg" alt="" />
                  <p
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                    className="font-poppins500 font-grey"
                  >
                    Build By This Chill Guy → <XOutlined />
                  </p>
                </div>
              </div>
            </Footer>
          </Layout>
        </Layout>
      </StyledLayoutWrapper>
    </>
  );
};
