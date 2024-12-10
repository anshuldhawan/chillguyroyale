import { FormCard } from "../../components/FormCard";
import Spinner from "../../components/spinner/Spinner";

import { ChangePasswordForm } from "./components/ChangePassword";
import { useSelector } from "react-redux";
import { StyledSetPassword } from "./styles";

const ChangePassword = () => {
  const isLoading = useSelector((state) => state?.loader?.isLoading);

  return (
    <StyledSetPassword marginTop={"150px"}>
      {isLoading && <Spinner />}
      <FormCard title={"Change Password"} child={<ChangePasswordForm />} />
    </StyledSetPassword>
  );
};

export default ChangePassword;
