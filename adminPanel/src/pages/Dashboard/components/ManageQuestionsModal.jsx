import { StyledQuestionsModal } from "../styles";
import React, { useEffect, useState } from "react";
import { Form, Input, Upload, Button, Radio } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import {
  useAddQuestionMutation,
  useUpdateQuestionMutation,
} from "../../../services/manageApi";
import Spinner from "../../../components/spinner/Spinner";
import { toast } from "react-toastify";

const ManageQuestionsModal = ({
  visible,
  onClose,
  title,
  children,
  width,
  editData,
  data,
}) => {
  const [form] = Form.useForm();
  const [addQuestion, { isLoading, error, isSuccess }] =
    useAddQuestionMutation();
  const [updateQuestion, { isLoading: updateLoader }] =
    useUpdateQuestionMutation();
  const [fileList, setFileList] = useState([]);
  const [badgeFileList, setBadgeFileList] = useState([]);
  console.log("fileList,badgeFileList", fileList, badgeFileList);
  console.log("data count", data?.totalCount);

  // Pre-fill the form fields when the modal is visible
  useEffect(() => {
    if (editData) {
      console.log("editData", editData);
      form.setFieldsValue({
        question: editData?.question,
      });
      form.setFieldsValue({
        option1: editData?.option1,
      });
      form.setFieldsValue({
        option2: editData?.option2,
      });
      form.setFieldsValue({
        badge: editData?.badgeName,
      });
      form.setFieldsValue({
        correctOption: editData?.correctOption === 1 ? "option1" : "option2",
      });

      // Simulate file upload for main image
      const mainImageFile = new File(
        ["sample content"], // File content (can be empty for placeholders)
        `https://c8.alamy.com/comp/2RCTA4X/gpi-logo-gpi-letter-gpi-letter-logo-design-initials-gpi-logo-linked-with-circle-and-uppercase-monogram-logo-gpi-typography-for-technology-busines-2RCTA4X.jpg`, // File name
        { type: "image/png" } // MIME type
      );

      // Simulate file upload for badge image
      const badgeImageFile = new File(["sample content"], "badge-image.png", {
        type: "image/png",
      });

      setFileList([
        {
          uid: "-1",
          name: "main-image.png",
          status: "done",
          url: `${editData?.image}`,
          originFileObj: mainImageFile, // Add fake File object
        },
      ]);

      setBadgeFileList([
        {
          uid: "-2",
          name: "badge-image.png",
          status: "done",
          url: editData?.badgeImage,
          originFileObj: badgeImageFile, // Add fake File object
        },
      ]);
    }
  }, [
    visible,
    form,
    editData?.question,
    editData?.image,
    editData?.badgeImage,
    editData,
  ]);
  const handleFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  // Handle badge image file change
  const handleBadgeFileChange = ({ fileList: newBadgeFileList }) => {
    setBadgeFileList(newBadgeFileList);
  };

  const handleSubmit = async (values) => {
    console.log("values", values);
    const formData = new FormData();

    // Append main image to FormData
    if (fileList.length > 0) {
      formData.append("image", fileList[0]?.originFileObj); // Main image file
    }

    // Append badge image to FormData
    if (badgeFileList.length > 0) {
      formData.append("badgeImage", badgeFileList[0]?.originFileObj); // Badge image file
    }

    // Append other form fields

    formData.append("question", values.question);
    formData.append("option1", values.option1);
    formData.append("option2", values.option2);
    formData.append(
      "correctOption",
      values.correctOption === "option1" ? 1 : 2
    );
    formData.append("badgeName", values.badge);

    console.log("formData", formData);
    try {
      // Use RTK Query to send FormData
      const response = editData
        ? await updateQuestion({ formData, id: editData?._id }).unwrap()
        : await addQuestion(formData).unwrap();

      // Handle response if successful
      if (response) {
        console.log("response", response);
        console.log("Password updated successfully", response);
        // Optionally reset the form or close the modal
        toast.success(response?.message);
        setBadgeFileList([]);
        setFileList([]);

        form.resetFields();
        onClose(); // Close the modal after submission
      }
    } catch (error) {
      console.error("Error updating password:", error);
    }
    // Send FormData to backend API
  };

  return (
    <>
      {(isLoading || updateLoader) && <Spinner />}
      <StyledQuestionsModal
        visible={visible}
        onCancel={() => {
          setBadgeFileList([]);
          setFileList([]);
          onClose();
        }}
        footer={null}
        width={width}
        fileList={fileList?.length > 0}
        badgeList={badgeFileList?.length > 0}
      >
        <div className="ant-modal-body">
          <img style={{ width: "500px" }} src={editData?.image} alt="" />
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
            {/* Image Upload */}
            <Form.Item
              name="image"
              label="Upload Image"
              className="imageUpload"
              rules={[
                {
                  validator: (_, value) => {
                    if (fileList.length > 0) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Please upload an image!"));
                  },
                },
              ]}
            >
              <Upload
                onChange={handleFileChange}
                maxCount={1}
                name="image"
                listType="picture"
                beforeUpload={() => false}
                fileList={fileList}
                showUploadList={{ showRemoveIcon: true }}
              >
                <Button className="upload-button" icon={<UploadOutlined />}>
                  Click to Upload
                </Button>
              </Upload>
            </Form.Item>

            {/* Question Input */}
            <Form.Item
              name="question"
              label="Enter Question"
              className="question-form-container"
              rules={[{ required: true, message: "Please enter a question!" }]}
            >
              <Input.TextArea placeholder="Enter your question here" rows={4} />
            </Form.Item>

            {/* Option 1 Input */}
            <Form.Item
              name="option1"
              label="Option 1"
              rules={[{ required: true, message: "Please enter Option 1!" }]}
            >
              <Input.TextArea placeholder="Enter Option 1 here" rows={2} />
            </Form.Item>

            {/* Option 2 Input */}
            <Form.Item
              name="option2"
              label="Option 2"
              rules={[{ required: true, message: "Please enter Option 2!" }]}
            >
              <Input.TextArea placeholder="Enter Option 2 here" rows={2} />
            </Form.Item>

            {/* Radio Buttons for Correct Option */}
            <Form.Item
              name="correctOption"
              label="Choose the Correct Option"
              rules={[
                {
                  required: true,
                  message: "Please select the correct option!",
                },
              ]}
            >
              <Radio.Group>
                <Radio value="option1">Option 1</Radio>
                <Radio value="option2">Option 2</Radio>
              </Radio.Group>
            </Form.Item>

            {/* Badge Input */}
            <div className="badge-container">
              <Form.Item
                name="badgeImage"
                label="Badge"
                className="badgeUpload"
                rules={[
                  {
                    validator: (_, value) => {
                      if (fileList.length > 0) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Please upload an image!")
                      );
                    },
                  },
                ]}
              >
                <Upload
                  name="badge-image"
                  listType="picture"
                  beforeUpload={() => false}
                  maxCount={1}
                  onChange={handleBadgeFileChange}
                  fileList={badgeFileList}
                >
                  <Button className="upload-button" icon={<UploadOutlined />}>
                    Click to Upload
                  </Button>
                </Upload>
              </Form.Item>
              <Form.Item
                name="badge"
                rules={[{ required: true, message: "Please enter a badge!" }]}
              >
                <Input placeholder="Enter badge here" />
              </Form.Item>
            </div>

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

export default ManageQuestionsModal;
