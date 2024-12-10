import { Button, Dropdown, Form, Select } from "antd";
import styled from "styled-components";

export const StyledGlobalWrapper = styled.div`
  .font-poppins500 {
    font-family: "Indie Flower";
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    color: rgba(0, 0, 0, 1);
  }
  .font-blue {
    color: #069;
  }
  .font-grey {
    color: rgba(119, 126, 145, 1);
  }
  .font-inter500 {
    color: #777e91;
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;

export const StyledForm = styled(Form)`
  * {
    font-family: "Indie Flower";
  }
  padding: ${(props) => props.padding || "20px"};
  /* padding: 20px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: ${(props) => props.paddingTop || "40px"};
  .forget-para {
    font-family: "Indie Flower";
    cursor: pointer;
    text-align: end;
    color: #069;
    width: 80%;
  }
  .ant-form-item {
    width: 80%;
  }
  input,
  .ant-input-affix-wrapper {
    border-radius: 8px;
    border: 1px solid #d8e1ed;
    background: rgba(255, 255, 255, 0.7);
    height: 56px;
    color: #3b4856 !important;
    font-family: "Indie Flower";

    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
  input::placeholder,
  .ant-input-affix-wrapper::placeholder {
    color: #3b4856;
    font-family: "Indie Flower";

    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  .ant-input-affix-wrapper {
    padding: 0px 11px !important;
  }

  .ant-form-item-label,
  .ant-form-item-required {
    color: #777e91 !important;
    font-family: "Indie Flower";

    font-size: 18px !important;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    font-weight: bold;
  }
  .ant-form-item-explain-error {
    text-align: left;
  }

  .ant-upload-list-item {
    border-radius: 10px;
    padding: 20px 20px;
    background: rgba(216, 225, 237, 0.5);
  }
  .ant-upload-icon .anticon {
    color: black !important;
  }
  .ant-upload-list-item-name {
    color: #069 !important;

    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
  .anticon-delete {
    color: black !important;
  }
  .ant-upload-select {
    width: 100%;
    border-radius: 8px;
    background: var(--Blue, #069);
    height: 48px;
    padding: 14px 38px 13px 38px;
    color: #fff;
    font-family: Poppins;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    cursor: pointer;
    line-height: normal;
  }

  .heading-paymaster {
    text-align: center;
    margin-bottom: 25px;
    margin-top: 20px;
    span {
      font-size: 20px;
    }
  }
  .wallet-card-pay-master {
    display: flex;
    align-items: center;
    gap: 20px;
    border: 1px solid rgba(0, 102, 153, 0.25);
    padding: 2px 20px 2px 20px;
    margin-bottom: 20px;
    border-radius: 8px;
    font-size: 13px;
    margin-top: 20px;
    background: #f0f6f9;
    cursor: pointer;
  }
`;

export const CommonButton = styled(Button)`
  border-radius: 8px;
  background-color: ${(props) => (props.primary ? "skyBlue" : "#FFF")};
  color: ${(props) => props.color || "white"};
  display: flex;
  border: ${(props) => (props.bordered ? "1px solid #000" : "none")};
  font-size: ${(props) => props.fontSize || "16px"};
  align-items: center;
  box-shadow: none;
  font-weight: 600;
  outline: none;
  width: ${(props) => props.width || "auto"};
  height: ${(props) => props.height || "auto"};
  justify-content: center;
  padding: 7px 0px 7px 0px;

  &:hover {
    background: ${(props) => (props.primary ? "skyBlue" : "#FFF")} !important;
    color: ${(props) => props.color || "white"} !important;
    border: ${(props) =>
      props.bordered ? "1px solid #000" : "none"} !important;
  }
`;

export const CreateButton = styled(Button)`
  border-radius: 8px;
  background-color: ${(props) => props.backgroundColor || "#069"};
  /* background-color: #069; */
  color: #fff;
  font-family: Poppins;
  font-size: ${(props) => props.fontSize || "18px"};
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  display: flex;

  align-items: center;
  box-shadow: none;
  font-weight: 600;
  outline: none;

  justify-content: center;
  height: ${(props) => props.height || "48px"};
  padding: 11px 26px 10px 27px;
  &:hover {
    background: #069 !important;
    color: #fff !important;
  }
`;

export const FilterButton = styled(Dropdown)`
  width: 110px;
  height: ${(props) => props.height || "48px"};
  .ant-dropdown-menu-item,
  .ant-dropdown-menu-item-only-child {
    border-radius: 0px;
    border-bottom: 1px solid lightgray !important;
  }
  .ant-dropdown-menu-item {
    background-color: red !important;
  }
`;

export const SelectFilter = styled(Select)`
  .ant-select {
    width: 100px !important;
  }
`;
