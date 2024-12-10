import styled from "styled-components";

export const StyledUserDetailsDropdown = styled.div`
  .ant-dropdown-menu-item {
    border-bottom: 1px solid lightgrey;
    border-radius: 0 !important;
    /* padding: 15px 25px !important; */
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
  .header-content {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #3b4856;
    font-size: 18px;
    font-style: poppins;
    font-weight: 500;
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
      width: 197px;
      span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
`;
