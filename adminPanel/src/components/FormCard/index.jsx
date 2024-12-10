import { Button, Form, Input } from "antd";
import { StyledFormCard } from "./styles";
import { CommonButton, StyledForm } from "../../styles/globalStyles";
import { useEffect } from "react";

export const FormCard = ({ child, title }) => {
  return (
    <StyledFormCard width={"600px"}>
      {}
      <div className="inner-container">
        <div className="title">
          <h2 style={{ padding: "0px 20px", textAlign: "center" }}>{title}</h2>
        </div>
        <div className="form-container">{child}</div>
      </div>
    </StyledFormCard>
  );
};
