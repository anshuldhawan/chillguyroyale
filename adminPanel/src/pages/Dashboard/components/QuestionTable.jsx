import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, ConfigProvider, Pagination, Popover, Table } from "antd";
import { useCallback, useState } from "react";
import ManageQuestionsModal from "./ManageQuestionsModal";
import { useDeleteQuestionMutation } from "../../../services/manageApi";
import Spinner from "../../../components/spinner/Spinner";
import { toast } from "react-toastify";

export const ManageQuestionsTable = ({ data }) => {
  const [visible, setVisible] = useState(false);
  const [editData, setEditData] = useState();

  const [deleteQuestion, { isLoading }] = useDeleteQuestionMutation();

  const handleClick = (question) => {};
  const handleEdit = (record) => {
    // Logic for editing the question
    setEditData(record);
    setVisible(true);
    console.log("Editing");
  };
  const onClose = () => {
    setVisible(false);
  };

  const handleDelete = useCallback(
    async (id) => {
      console.log("id", id);
      try {
        const response = await deleteQuestion({ id: id }).unwrap();

        if (response) {
          console.log("responese", response);
          toast.success(response?.message);

          onClose(); // Close the modal after submission
        }
      } catch (error) {
        console.error("Error updating password:", error);
      }
    },
    [deleteQuestion]
  );

  const columns = [
    {
      title: "S.No",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "Questions",
      dataIndex: "question",
      key: "question",
      align: "center",

      render: (text) => (
        <Popover
          content={<div>{text}</div>}
          title="Question &nbsp;:"
          trigger="click"
          // getPopupContainer={(trigger) => trigger.parentElement}
        >
          <Button
            style={{ padding: 0 }}
            type="link"
            onClick={() => handleClick(text)}
          >
            {text.length > 200 ? text.slice(0, 200) + "..." : text}
          </Button>
        </Popover>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",

      render: (_, record) => (
        <div>
          <Button
            type="link"
            icon={<EditOutlined color="skyblue" />}
            onClick={() => handleEdit(record)}
          />
          <Button
            type="link"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record._id)}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      {isLoading && <Spinner />}
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#fff",
              borderColor: "rgba(159, 173, 189, 0.30)",
              headerSplitColor: "transparent",
            },
          },
        }}
      >
        <Table
          columns={columns}
          dataSource={data?.questions ?? []}
          
          pagination={true}
        />
        <ManageQuestionsModal
          onClose={onClose}
          title={"Edit Question"}
          editData={editData}
          visible={visible}
          data={data}
        />
      </ConfigProvider>
     
    </>
  );
};
