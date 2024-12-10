import styled from "styled-components";

export const StyledHeaderWrapper = styled.div`
  .ant-layout-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 25px;
    background: #fff;
    border-bottom: 1px solid lightgrey;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: left;
    border-bottom: 1px solid lightgray;
    border-radius: 0;
    padding: 15px 25px;
    z-index: 100 !important;
  }
  .ant-dropdown-menu-item {
    border-bottom: 1px solid lightgray;
    border-radius: 0 !important;
    padding: 15px 25px !important;
    text-align: left;
  }
  .ant-dropdown-menu-item:last-child {
    border-bottom: none;
  }
  .ant-divider-horizontal {
    margin: 0;
  }
  .user-card {
    h2 {
      margin: 0;
    }
    p {
      font-size: 16px;
      color: rgba(153, 153, 153, 1);
    }
  }
  .logo {
    display: flex;
    align-items: center;
  }
  p {
    margin: 0;
  }
  .header-content {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #3b4856;
  }
  .dropdown-section {
    .header-button {
      display: flex;
      padding: 18px 15px;
      justify-content: space-between;
      align-items: center;
      border-radius: 14px;
      border: 1px solid #e7e7e7;
      background: #fff;
      width: 250px;
    }
  }

  @media (max-width: 992px) {
    .dropdown-section {
      display: none;
    }
  }

  .menu-button-drawer {
    display: none;
  }

  @media (max-width: 992px) {
    .menu-button-drawer {
      display: block;
    }
  }
`;
