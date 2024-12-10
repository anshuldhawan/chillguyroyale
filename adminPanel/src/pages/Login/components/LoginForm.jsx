import { Form, Input } from "antd";
import { CommonButton, StyledForm } from "../../../styles/globalStyles";
import {
  setIsLoggedIn,
  setToken,
  setUserDetails,
  useLoginMutation,
} from "../../../services/auth";
import { useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../routes/routeConstants";
import { useDispatch } from "react-redux";

import { setIsLoading } from "../../../store/loaderSlice";

export const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginMutation, { isLoading: loginLoader }] = useLoginMutation();

  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Success:", values);
    login({
      email: values?.email,
      password: values?.password,
    });
  };

  useEffect(() => {
    dispatch(setIsLoading(loginLoader));
  }, [dispatch, loginLoader]);

  const login = useCallback(
    async (payload) => {
      try {
        const response = await loginMutation({
          email: payload?.email,
          password: payload?.password,
        }).unwrap();
        console.log("response", response);
        if (response) {
          toast.success(response?.message);
          navigate(ROUTES.DASHBOARD);
          dispatch(setIsLoggedIn(true));
          dispatch(setToken(response?.token));
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("token", response?.token);
          dispatch(setUserDetails(response?.user));
          localStorage.setItem("userDetails", JSON.stringify(response?.user));
        }
      } catch (error) {
        console.log("error", error);
        toast.error(error?.data?.message);
      }
    },
    [dispatch, loginMutation, navigate]
  );

  return (
    <StyledForm
      requiredMark={false}
      layout="vertical"
      onFinish={onFinish}
      autoComplete="off"
      form={form}
    >
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: "Please enter a valid email address!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input placeholder="Enter Email" />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password placeholder="Enter Password" />
      </Form.Item>

      <Form.Item>
        <div className="button-container">
          <CommonButton
            htmlType="sumbit"
            fontSize="18px"
            primary
            color="#FFF"
            width="100%"
          >
            Submit
          </CommonButton>
        </div>
      </Form.Item>
    </StyledForm>
  );
};
