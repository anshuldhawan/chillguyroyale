import { Drawer } from "antd";
import styled from "styled-components";

export const StyledLayoutWrapper = styled.div`
  margin-top: 64px;

  .route-dec{
    font-weight:700;
    font-size:20px;
    /* color:skyblue !important; */
  }
  .ant-layout-content {
    background: #ffffff;
    padding: 15px 35px;
  }

  .ant-layout-sider-children {
    ul {
      padding: 30px 0px;
    }
  }
  .ant-layout-sider,
  .ant-menu {
    background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.2) 0%,
        rgba(255, 255, 255, 0) 100%
      ),
      rgba(255, 255, 255, 0.3);
    .ant-menu-item {
      height: auto !important;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 10px;
      &:hover {
        background-color: #f3f6fab2 !important;
      }
    }
    .ant-menu-item-icon + span {
      margin-inline-start: initial;
    }
    .ant-menu-title-content {
      color: #586777;
      font-family: Roboto;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: 26px;
      white-space: initial;
    }
    .ant-menu-item-selected {
      background-color: #f3f6fab2 !important;
      .ant-menu-title-content {
        color: #006699 !important;
      }
      path {
        fill: skyblue !important;
      }
    }
  }
  .ant-layout-footer {
    padding: 0px 15px;
    z-index: 100 !important;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    border: 4px solid #f3f6fa;
    background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.2) 0%,
        rgba(255, 255, 255, 0) 100%
      ),
      rgba(255, 255, 255, 0.3);
    box-shadow: 0px 4px 4px 0px rgba(0, 102, 153, 0.17);
    backdrop-filter: blur(2px);
    width: 100%;
    .privacy-tab {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
      .copyright {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 17px;
      }
    }
  }

  @media (max-width: 650px) {
    .ant-layout-footer {
      display: flex;
      flex-direction: column;
    }
  }

  @media (max-width: 992px) {
    display: flex;
  }
  p {
    font-size: 14px !important;
    cursor: pointer;
  }
`;

export const SVG = styled.svg`
  fill: ${(props) => props.color};
`;
