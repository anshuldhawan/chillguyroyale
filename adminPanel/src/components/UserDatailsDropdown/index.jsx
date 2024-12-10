import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routeConstants";
import { Button, Dropdown } from "antd";
import { StyledUserDetailsDropdown } from "./styles";
import { setIsLoggedIn, setToken } from "../../services/auth";

const UserDetailsDropdown = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state?.auth?.userDetails);
  console.log("userDetails", userDetails);

  console.log("location from header seciton", location);
  const handleSignOut = useCallback(() => {
    localStorage.clear();
    dispatch(setIsLoggedIn(false));
    dispatch(setToken(null));

    navigate(ROUTES.LOGIN);
    window.location.reload();
  }, [dispatch, navigate]);

  const items = [
    {
      key: "1",
      label: (
        <>
          <div className="user-card ">
            <h2 className="font-poppins500">{userDetails?.name}</h2>
            <p className="font-poppins500">{userDetails?.email}</p>
          </div>
        </>
      ),
    },
   
    {
      key: "2",
      label: (
        <>
          <Link to={ROUTES.CHANGE_PASSWORD}>
            <p className="header-content font-poppins500">
              <img src="/images/password.svg" alt="" />
              Change Password
            </p>
          </Link>
        </>
      ),
    },
    {
      key: "3",
      label: (
        <>
          <p onClick={handleSignOut} className="header-content font-poppins500">
            <img src="/images/signout.svg" alt="" />
            Sign Out
          </p>
        </>
      ),
    },
  ];
  return (
    <StyledUserDetailsDropdown>
      {location?.pathname !== ROUTES.SETPASSWORD &&
        location.pathname !== ROUTES.LOGIN &&
        location?.pathname !== ROUTES.FORGET && (
          <div className="dropdown-section">
            <Dropdown
              menu={{
                items,
              }}
              placement="bottom"
              // open={true}
              getPopupContainer={(trigger) => trigger.parentElement}
              // dropdownAlign={{ offset: [-40, 4] }}
              // overlayStyle={{ minWidth: 200 }}
              // align={{ offset: [-40, 4] }}
            >
              <Button
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
                className="header-button font-poppins500 font-blue"
              >
                {userDetails?.name ?? userDetails?.email}
                <img src="/images/downOutlined.svg" alt="" />
              </Button>
            </Dropdown>
          </div>
        )}
    </StyledUserDetailsDropdown>
  );
};

export default UserDetailsDropdown;
