import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { ROUTES } from "./routeConstants";
import { useSelector } from "react-redux";

export default function Auth() {
  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);


  if (isLoggedIn) {
    return <Outlet />;
  } else {
    return (
      <Routes>
        <Route path="*" element={<Navigate to={ROUTES.LOGIN} />} />
      </Routes>
    );
  }
}
