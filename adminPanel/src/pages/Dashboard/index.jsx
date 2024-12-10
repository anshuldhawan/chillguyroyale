import { Button } from "antd";
import { StyledDashboardWrapper } from "../../styles/dashboardStyles";
import { ManageQuestionsTable } from "./components/QuestionTable";
import { PlusOutlined } from "@ant-design/icons";
import ManageQuestionsModal from "./components/ManageQuestionsModal";
import { useState } from "react";
import { useGetAllQuestionsQuery } from "../../services/manageApi";
import Spinner from "../../components/spinner/Spinner";

const Dashboard = () => {
  const [visible, setIsVisible] = useState(false);
  const { data, isLoading } = useGetAllQuestionsQuery();
  console.log("data", data);
  const onClose = () => {
    setIsVisible(false);
  };
  return (
    <StyledDashboardWrapper>
      {isLoading && <Spinner />}
      <div className="header-container">
        <h2 style={{ fontSize: "32px !important" }} className="font-poppins500">
          Manage Questions
        </h2>
        <div className="search-container">
          <div style={{ display: "flex", gap: 15 }}>
            <Button
              onClick={() => {
                setIsVisible(true);
              }}
              className="add-questions-button"
            >
              Add Questions <PlusOutlined />
            </Button>
          </div>
        </div>
      </div>
      <div className="table-container">
        <ManageQuestionsTable data={data} />
      </div>
      <ManageQuestionsModal
        data={data}
        title={"Add Question"}
        visible={visible}
        onClose={onClose}
        setIsVisible={setIsVisible}
      />
    </StyledDashboardWrapper>
  );
};

export default Dashboard;
