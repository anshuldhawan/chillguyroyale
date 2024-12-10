import React from "react";
import { Space, Spin } from "antd";
import { StyledSpinner } from "./style";
const Spinner = () => (
  <StyledSpinner>
    <Space
      direction="vertical"
      style={{
        width: "100%"
      }}>
      <Spin size="large">
        <div className="content" />
      </Spin>
    </Space>
  </StyledSpinner>
);
export default Spinner;
