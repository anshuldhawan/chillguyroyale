import { useState } from "react";
import { StyledDashboardWrapper } from "../../styles/dashboardStyles";
import { CreditsTable } from "./components/CreditsTable";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import ManageCreditsModal from "./components/ManageCreditsModal";
import { useGetAllCreditsQuery } from "../../services/manageCreditsApi";
import Spinner from "../../components/spinner/Spinner";

const ManageCredits = () => {
  const [visible, setIsVisible] = useState(false);
  const { data, error, isLoading, isFetching } = useGetAllCreditsQuery();
  const onClose = () => {
    setIsVisible(false);
  };

  return (
    <StyledDashboardWrapper>
      {isLoading && <Spinner />}

      <div className="header-container">
        <h2 style={{ fontSize: "32px !important" }} className="font-poppins500">
          Manage Credits
        </h2>
        <div className="search-container">
          <div style={{ display: "flex", gap: 15 }}>
            <Button
              onClick={() => {
                setIsVisible(true);
              }}
              className="add-questions-button"
            >
              Add Credits Package <PlusOutlined />
            </Button>
          </div>
        </div>
      </div>
      <div className="table-container">
        <CreditsTable data={data} />
      </div>
      
      <ManageCreditsModal
        title={"Add Credits Package"}
        data={data}
        visible={visible}
        onClose={onClose}
        setIsVisible={setIsVisible}
      />
    </StyledDashboardWrapper>
  );
};

export default ManageCredits;
