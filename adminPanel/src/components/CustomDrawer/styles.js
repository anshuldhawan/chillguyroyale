import { Drawer } from "antd";
import styled from "styled-components";

export const StyledCustomDrawer = styled(Drawer)`
  .logo {
    border-bottom: 1px solid #d1d2d4;
    img {
      margin: 12px 0 0px 50px;
    }
  }

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
      padding: 6px;
      text-align: center;
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
        fill: #006699 !important;
      }
    }
  }
  .dropdown-user-component {
    margin-top: 20px;
    margin-bottom: 20px;
    .ant-btn-default {
      width: 200px;
      margin-left: 20px;
    }
  }
`;
