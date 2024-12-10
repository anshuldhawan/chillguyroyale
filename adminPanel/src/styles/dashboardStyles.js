import styled from "styled-components";

export const StyledDashboardWrapper = styled.div`
  h2 {
    text-align: left;
    font-weight: 700 !important;
    font-size: 32px !important;
  }
  .header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .ant-table-cell.center-data {
    text-align: center;
  }
  .add-questions-button {
    background: skyblue;
    color: white !important;
    font-weight: 700;
    height: 40px;
    font-size: 20px !important;
    padding: 15px 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      background: skyblue !important;
    }
  }

  @media screen and (max-width: 728px) {
    .header-container {
      flex-direction: column;
      text-align: center;
      margin-bottom: 20px;
      h2 {
        text-align: center;
      }
    }
  }
  .table-container {
    /* .text-center {
      text-align: center;
    } */
  }

  .ant-table-container {
    overflow-x: auto;
    box-shadow: rgba(0, 103, 153, 0.4) 0px 6px 45px,
      rgba(0, 0, 0, 0) 0px -12px 36px, rgba(0, 0, 0, 0) 0px 4px 6px,
      rgba(0, 0, 0, 0) 0px 12px 13px, rgba(0, 0, 0, 0) 0px -1px 5px;
  }
  &::-webkit-scrollbar {
    width: 12px;
    background-color: #f5f5f5;
  }

  .ant-table-thead > tr > th {
    border-right: none !important;
    color: #777e91;

    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    /* line-height: 102%; 16.32px */
    text-transform: uppercase;
  }
  .ant-table-tbody {
    color: #3b4856;

    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    background: radial-gradient(circle, rgba(0, 102, 153, 0.4), transparent);
  }
  .ant-table-thead > tr > th:last-child {
    border-right: 2px solid rgba(159, 173, 189, 0.3) !important;
  }

  .ant-table-cell {
    border-right: none !important;
    /* text-align: center; */
    white-space: nowrap;
    background: rgba(255, 255, 255, 0.56);
  }

  thead > tr {
    border-radius: 14px 14px 0px 0px;
    border: 2px solid rgba(159, 173, 189, 0.3);
    background: #fff;
  }
  .ant-pagination {
    margin-top: 40px;
    margin-bottom: 40px;
    display: flex;
    justify-content: center;
  }
  .search-container {
    .ant-input-search .ant-input-search-button,
    input {
      height: 38px;
    }
    .ant-btn-primary {
      background: #069;
    }
  }

  .ant-dropdown-menu-item.ant-dropdown-menu-item-only-child:first-child {
    border-bottom: 1px solid lightgray !important;
    border-radius: 0px !important;
  }

`;
