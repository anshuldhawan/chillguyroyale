import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Table } from "antd";
import { useCallback, useState } from "react";
import ManageCreditsModal from "./ManageCreditsModal";
import { useDeleteCreditsMutation } from "../../../services/manageCreditsApi";
import moment from "moment";
import Spinner from "../../../components/spinner/Spinner";
import { toast } from "react-toastify";

export const CreditsTable = ({ data }) => {
  console.log("data", data);
  const [visible, setVisible] = useState(false);
  const [editData, setEditData] = useState();
  const [deleteMutation, { isLoading }] = useDeleteCreditsMutation();
  const onClose = () => {
    setVisible(false);
  };

  const handleEdit = (record) => {
    // Logic for editing the question
    setEditData(record);
    setVisible(true);
    console.log("Editing");
  };
  const handleDelete = useCallback(
    async (id) => {
      console.log("id", id);
      try {
        const response = await deleteMutation({ id: id }).unwrap();

        if (response) {
          toast.success(response?.message);
          console.log("responese", response);

          // onClose(); // Close the modal after submission
        }
      } catch (error) {
        console.error("Error updating password:", error);
      }
    },
    [deleteMutation]
  );

  const columns = [
    {
      title: "S.No",
      dataIndex: "sNo",
      key: "sNo",

      render: (text, record, index) => index + 1, // Auto-increment S.No based on the index
    },
    {
      title: "Currency",
      dataIndex: "currency",
      key: "currency",
      align: "center",

      render: (text, record, index) => text, // Auto-increment S.No based on the index
    },
    {
      title: "Amount",
      dataIndex: "amountIn",
      key: "amountIn",
      align: "center",
    },
    {
      title: "Credits",
      dataIndex: "credit",
      key: "credit",
      align: "center",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      render: (text, record, index) => moment(text).format("MM-DD-YYYY"), // Auto-increment S.No based on the index
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
          bordered={true}
          headerColor={"green"}
          headerBg={"blue"}
          tailor={false}
          // loading={isLoading}
          dataSource={data?.credit ?? []}
          columns={columns}
          pagination={true}
        />
        <ManageCreditsModal
          onClose={onClose}
          title={"Edit Credit Package"}
          editData={editData}
          visible={visible}
          data={data}
        />
      </ConfigProvider>
    </>
  );
};
