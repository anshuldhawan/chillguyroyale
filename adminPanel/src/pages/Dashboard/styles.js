import { Modal } from "antd";
import styled from "styled-components";

export const StyledQuestionsModal = styled(Modal)`
  .question-form-container {
    .ant-col,
    .ant-form-item-label {
      margin-bottom: 25px !important;
    }
  }
  .imageUpload {
    .ant-col,
    .ant-form-item-label {
      margin-bottom: ${(props) => props.fileList && "25px !important"};
    }
  }
  .badgeUpload {
    .ant-col,
    .ant-form-item-label {
      margin-bottom: ${(props) => props.badgeList && "25px !important"};
    }
  }
  * {
    font-family: "Indie Flower";
  }
  width: 700px !important;
  .ant-modal-close {
    top: 30px !important;
    right: 30px !important;
  }
  .ant-modal-content {
    border-radius: 14px;
    border: 2px solid #e7e7e7;
    backdrop-filter: blur(2px);
    max-width: ${(props) => props.width || "100%"};
    padding: 25px 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: rgba(0, 103, 153, 0.4) 0px 6px 45px,
      rgba(0, 0, 0, 0) 0px -12px 36px, rgba(0, 0, 0, 0) 0px 4px 6px,
      rgba(0, 0, 0, 0) 0px 12px 13px, rgba(0, 0, 0, 0) 0px -1px 5px;
    border: 1px solid grey;
    border: 2px solid #e7e7e7 !important;
    background: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);

    border-radius: 14px;
    .ant-form-item-label > label {
      font-weight: 600;
      font-size: 20px;
    }

    .ant-modal-body {
      max-width: 100% !important;
      height: 100% !important;
      background: #fff;
      border-radius: 14px;
      width: 100%;
      height: 100%;
      .title {
        border-bottom: 2px solid #f3f6fa;
        text-align: center;
        h2 {
          /* padding: 20px 20px; */
          color: skyblue !important;
          font-family: "Indie Flower";
          font-size: 30px;
          font-style: normal;
          font-weight: 700;
          line-height: 102%; /* 32.64px */
        }
      }

      .upload-button {
        background: skyblue !important;
        color: white !important;
        font-weight: 700 !important;
        font-size: 16px;
      }
      .button-container {
        .ant-form-item-control-input-content {
          display: flex;
          justify-content: center;
          .button-submit {
            background: skyblue !important;
            width: 100% !important;
            font-size: 22px;
            padding: 20px 20px;
            font-weight: bold;
          }
        }
      }
    }
  }
  .ant-input-number,
  .ant-input-number-outlined,
  .ant-form-item-control-input,
  .ant-select-selector {
    height: 40px !important;
    input {
      height: 40px !important;
    }
  }
  .ant-input-number-input {
    &::placeholder {
      font-family: "Indie Flower" !important;
    }
  }
`;
