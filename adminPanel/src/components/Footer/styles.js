import styled from "styled-components";

export const StyledFooterSection = styled.div`
  position: absolute;
  width: 100%;
  .ant-layout {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 0;
    border: 4px solid #f3f6fa;
    background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.2) 0%,
        rgba(255, 255, 255, 0) 100%
      ),
      rgba(255, 255, 255, 0.3) !important;
    box-shadow: 0px 4px 4px 0px rgba(0, 102, 153, 0.17);
    backdrop-filter: blur(2px);
    margin-top: 50px;
    background: transparent !important;
    .ant-layout-footer {
      padding: 0px 15px;
      z-index: 100 !important;
      display: flex;
      justify-content: space-between;
      background: transparent !important;
      width: 100%;
      .privacy-tab,
      .copyright {
        display: flex;
        align-items: center;
        gap: 10px;
      }
    }
  }
  p {
    font-size: 14px !important;
    cursor: pointer;
  }
`;
