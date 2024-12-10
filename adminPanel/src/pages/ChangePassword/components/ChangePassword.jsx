import { Form, Input } from "antd";
import { CommonButton, StyledForm } from "../../../styles/globalStyles";
import { useUpdatePasswordMutation } from "../../../services/auth";
import { useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../routes/routeConstants";
import { useDispatch } from "react-redux";
import { setIsLoading } from "../../../store/loaderSlice";
import { variables } from "../../../constants/variables";
import { messages } from "../../../constants/messages";
import { errors } from "../../../constants/errors";

export const ChangePasswordForm = () => {
  const dispatch = useDispatch();
  const [updatePassword, { isLoading, error }] = useUpdatePasswordMutation();
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Success:", values);
    setPassword({
      oldPassword: values?.oldPassword,
      password: values?.password,
    });
  };
  useEffect(() => {
    dispatch(setIsLoading(isLoading));
  }, [dispatch, isLoading]);

  const setPassword = useCallback(
    async (payload) => {
      try {
        const response = await updatePassword({
          newPassword: payload?.password,
          currentPassword: payload?.oldPassword,
        }).unwrap();
        console.log("response", response);
        if (response) {
          toast.success(response?.message);
          navigate(ROUTES.DASHBOARD);
        }
      } catch (error) {
        console.log("error", error);
        toast.error(error?.data?.message);
      }
    },
    [navigate, updatePassword]
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
        name="oldPassword"
        label="Old Password"
        rules={[
          {
            required: true,
            message: "Please input your old password!",
          },
        ]}
        // hasFeedback
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
          {
            min: 8,
            message: errors.MIN_PASSWORD_LENGTH,
            // validateTrigger: "onBlur"
          },
          {
            pattern: new RegExp(variables.REGEX_FOR_PASSWORD),
            message: messages.PASSWORD_REQUIREMENT,
            // validateTrigger: "onBlur"
          },
        ]}
        // hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        // hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The new password that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <div className="button-container">
          <CommonButton
            htmlType="sumbit"
            fontSize="18px"
            primary
            color="#FFF"
            width="45%"
          >
            Confirm
          </CommonButton>
          <CommonButton
            onClick={() => navigate(-1)}
            width="45%"
            bordered
            fontSize="18px"
            color="#000"
          >
            Back
          </CommonButton>
        </div>
      </Form.Item>
    </StyledForm>
  );
};
