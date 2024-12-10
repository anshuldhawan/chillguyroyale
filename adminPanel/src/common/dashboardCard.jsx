import { Spin } from "antd";
import { StyledDashboardCard } from "./styles";
import { subString } from "../helper/substring";
import { solanaExploreLink } from "../constants/constants";

export const DashboardCard = ({
  title,
  address,
  isRedirect = true,
  amount,
  isLoading,
  instituteRequest,
  isStaking,
  data,
  payMaster,
  payMasterData,
}) => {
  return (
    <StyledDashboardCard>
      <p className="font-poppins500 header-title">{title}</p>
      {isRedirect ? (
        <>
          <div className="redirect">
            <p
              onClick={() => {
                address !== "NA" &&
                  window.open(solanaExploreLink(address), "_blank");
              }}
              className="font-poppins500 font-blue redirect-title"
            >
              {address !== "NA" ? subString(address) : "NA"}
            </p>
            <img src="/images/redirect.svg" alt="" />
          </div>
          <p className="font-poppins500 font-blue amount">
            {amount} <span>CRD </span>
          </p>
        </>
      ) : (
        <>
          {/* <p className="font-poppins500 font-blue amount">
            {isLoading ? <Spin /> : amount}
          </p> */}

          {instituteRequest ? (
            <>
              <div className="institute-request">
                <p className="font-poppins500 font-grey">
                  Total Institute Requests
                </p>
                <p className="font-poppins500 font-blue amount">
                  <span>
                    {isLoading ? <Spin /> : data?.data?.totalRequests}
                  </span>
                </p>
              </div>
              <div className="institute-request">
                <p className="font-poppins500 font-grey">Pending Requests</p>
                <p className="font-poppins500 font-blue amount">
                  <span>
                    {isLoading ? (
                      <Spin />
                    ) : (
                      data?.data?.totalInvitationPendingCount
                    )}
                  </span>
                </p>
              </div>
              <div className="institute-request">
                <p className="font-poppins500 font-grey">Approved Requests</p>
                <p className="font-poppins500 font-blue amount">
                  <span>
                    {isLoading ? <Spin /> : data?.data?.instituteAccpetedCount}
                  </span>
                </p>
              </div>
            </>
          ) : (
            <>
              <p className="font-poppins500 font-blue amount">
                {isLoading ? <Spin /> : amount}
              </p>
              <p className="font-poppins500 font-grey">
                {payMaster
                  ? isStaking
                    ? "USD"
                    : "Institutes"
                  : payMaster !== undefined && (
                      <>
                        <div className="institute-request">
                          <p className="font-poppins500 font-grey">
                            Active wallets
                          </p>
                          <p className="font-poppins500 font-blue amount">
                            <span>
                              {isLoading ? (
                                <Spin />
                              ) : (
                                payMasterData?.activeCount
                              )}
                            </span>
                          </p>
                        </div>
                        <div className="institute-request">
                          <p className="font-poppins500 font-grey">
                            Inactive wallets
                          </p>
                          <p className="font-poppins500 font-blue amount">
                            <span>{isLoading ? <Spin /> : payMasterData?.inActiveCount}</span>
                          </p>
                        </div>
                      </>
                    )}
              </p>
            </>
          )}
        </>
      )}
    </StyledDashboardCard>
  );
};
