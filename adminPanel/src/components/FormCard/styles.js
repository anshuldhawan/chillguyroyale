import styled from "styled-components";

export const StyledFormCard = styled.div`
  border-radius: 14px;
  border: 2px solid #e7e7e7;
  backdrop-filter: blur(2px);
  width: ${(props) => props.width || "50%"};
  padding: 25px 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: rgba(0, 103, 153, 0.4) 0px 6px 45px,
    rgba(0, 0, 0, 0) 0px -12px 36px, rgba(0, 0, 0, 0) 0px 4px 6px,
    rgba(0, 0, 0, 0) 0px 12px 13px, rgba(0, 0, 0, 0) 0px -1px 5px;
  border: 1px solid grey;
  padding: 25px 25px;
  border: 2px solid #e7e7e7;
  background: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);

  border-radius: 14px;

  .inner-container {
    background: #fff;
    border-radius: 14px;
    width: 100%;
    height: 100%;
    .button-container {
      display: flex;
      gap: 25px;
      margin-top: 35px;
      margin-bottom: 35px;
    }

    .title {
      border-bottom: 2px solid #f3f6fa;
      h2 {
        /* padding: 20px 20px; */
        color: #000;
        font-family: Poppins;
        font-size: 28px;
        font-style: normal;
        font-weight: 700;
        line-height: 102%; /* 32.64px */
      }
    }
  }
`;
