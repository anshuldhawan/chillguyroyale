import styled from "styled-components";

export const StyledDashboardCard = styled.div`
  border-radius: 14px;
  border: 2px solid #e7e7e7;

  background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.2) 0%,
      rgba(255, 255, 255, 0) 100%
    ),
    rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(2px);
  height: 183px;
  flex-shrink: 0;
  text-align: left;
  padding: 24px 24px;
  box-shadow: rgba(0, 103, 153, 0.4) 0px 6px 45px,
    rgba(0, 0, 0, 0) 0px -12px 36px, rgba(0, 0, 0, 0) 0px 4px 6px,
    rgba(0, 0, 0, 0) 0px 12px 13px, rgba(0, 0, 0, 0) 0px -1px 5px;
  .redirect {
    border-radius: 8px;
    border: 1px solid rgba(0, 102, 153, 0.25);
    background: #f0f6f9;
    display: flex;
    width: 171px;
    height: 37px;
    align-items: center;
    gap: 10px;
    margin-bottom: 12px !important;

    justify-content: center;
    .redirect-title {
      font-size: 14px !important;
      font-weight: 500 !important;
    }
    img {
      cursor: pointer;
    }
  }
  .font-poppins500 {
    font-size: 18px !important;
    margin: 0 !important;
    font-weight: 600 !important;
  }
  .font-blue {
    font-weight: 700 !important;
    span {
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
    }
  }
  .header-title {
    margin-bottom: 12px !important;
  }
  .amount {
    font-size: 22px !important;
  }
  .institute-request {
    max-width: 318px;
    display: flex !important;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }
`;
