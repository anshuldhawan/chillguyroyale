import { useSelector } from "react-redux";
import { FormCard } from "../../components/FormCard";

import { LoginForm } from "./components/LoginForm";
import Spinner from "../../components/spinner/Spinner";
import { StyledSetPassword } from "../ChangePassword/styles";

const Login = () => {
  const isLoading = useSelector((state) => state?.loader?.isLoading);
  return (
    <StyledSetPassword marginTop={"150px"}>
      {isLoading && <Spinner />}
      <FormCard title={"Login"} child={<LoginForm />} />
    </StyledSetPassword>
  );
};

export default Login;
