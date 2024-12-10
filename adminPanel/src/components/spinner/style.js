import styled from "styled-components";

export const StyledSpinner = styled.div`
  position: fixed;
  width: 100%;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99999;
  display: flex;
  justify-content: center;
  align-items: center;
  .ant-spin-nested-loading > div > .ant-spin {
    /* top: 250px; */
  }
  .ant-spin-lg .ant-spin-dot i {
    width: 30px;
    height: 30px;
  }
  .ant-spin-lg .ant-spin-dot {
    font-size: 0px;
  }
  .ant-spin-nested-loading > div > .ant-spin .ant-spin-dot {
    /* left: 51%; */
  }
`;
