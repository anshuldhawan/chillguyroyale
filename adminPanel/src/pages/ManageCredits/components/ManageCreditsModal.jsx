import React, { useEffect, useState } from "react";
import { Form, Button, Select, InputNumber } from "antd";

import { StyledQuestionsModal } from "../../Dashboard/styles";
import {
  useAddCreditsMutation,
  useUpdateCreditsMutation,
} from "../../../services/manageCreditsApi";
import Spinner from "../../../components/spinner/Spinner";
import { toast } from "react-toastify";
const { Option } = Select;
const ManageCreditsModal = ({ visible, onClose, title, editData, width }) => {
  const [form] = Form.useForm();

  const [addCredits, { isLoading, error, isSuccess }] = useAddCreditsMutation();
  const [updateCredits, { isLoading: updateLoader }] =
    useUpdateCreditsMutation();

  useEffect(() => {
    if (editData) {
      console.log("editData", editData);
      form.setFieldsValue({
        currency: editData?.currency,
      });
      form.setFieldsValue({
        amount: Number(editData?.amountIn),
      });
      form.setFieldsValue({
        credit: Number(editData?.credit),
      });
    }
  }, [editData, form]);

  const handleSubmit = async (values) => {
    console.log("values", values);
    const formData = {
      currency: values.currency,
      amountIn: values.amount,
      credit: values.credit,
    };

    try {
      const response = editData
        ? await updateCredits({ formData, id: editData?._id }).unwrap()
        : await addCredits(formData).unwrap();

      if (response) {
        console.log("Password updated successfully", response);
        toast.success(response?.message);
        form.resetFields();
        onClose();
      }
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  return (
    <>
      {(isLoading || updateLoader) && <Spinner />}
      <StyledQuestionsModal
        visible={visible}
        onCancel={onClose}
        footer={null}
        width={width}
      >
        <div className="ant-modal-body">
          <div className="title">
            <h2>{title}</h2>
          </div>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            style={{ maxWidth: 600, margin: "0 auto" }}
            requiredMark={false}
            valuePropName={"fileList"}
          >
            {/* Currency Dropdown */}
            <Form.Item
              label="Currency"
              name="currency"
              rules={[{ required: true, message: "Please select a currency!" }]}
            >
              <Select placeholder="Select a currency">
                <Option value="SOL">Sol</Option>
                <Option value="CHILL-GUY">ChillGuy</Option>
              </Select>
            </Form.Item>

            {/* Amount Input */}
            <Form.Item
              label="Amount"
              name="amount"
              rules={[
                { required: true, message: "Please enter an amount!" },
                {
                  type: "number",
                  min: 0,
                  message: "Amount must be a positive number",
                },
              ]}
            >
              <InputNumber
                style={{ width: "100%" }}
                placeholder="Enter amount"
                min={0}
              />
            </Form.Item>

            {/* Credit Input */}
            <Form.Item
              label="Credit"
              name="credit"
              rules={[
                { required: true, message: "Please enter a credit value!" },
                {
                  type: "number",
                  min: 0,
                  message: "Credit must be a positive number",
                },
              ]}
            >
              <InputNumber
                style={{ width: "100%" }}
                placeholder="Enter credit"
                min={0}
              />
            </Form.Item>
            {/* Submit Button */}
            <Form.Item className="button-container">
              <Button
                className="button-submit"
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </StyledQuestionsModal>
    </>
  );
};

export default ManageCreditsModal;
