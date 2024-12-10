import React, { Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { HeaderSection } from "./Header";
import { ROUTES } from "../routes/routeConstants";
import { AppLayout } from "./Layout";
import Spinner from "./spinner/Spinner";
import Auth from "../routes/auth";

import Dashboard from "../pages/Dashboard";
import { useSelector } from "react-redux";

const ProtectedRoutes = React.lazy(() => import("../routes/ProtectedRoutes"));
const ChangePassword = React.lazy(() =>
  import("../../src/pages/ChangePassword/index")
);
const Login = React.lazy(() => import("../../src/pages/Login/index"));

export default function MainSectionWrapper() {
  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  const location = useLocation();

  return (
    <>
      <HeaderSection />
      <Suspense fallback={<Spinner />}>
        {isLoggedIn && location?.pathname === ROUTES.HOME && (
          <AppLayout>
            <Routes>
              <Route path="" element={<Auth />}>
                <Route path={"/"} element={<Dashboard />} />
              </Route>
            </Routes>
          </AppLayout>
        )}
        <Routes>
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path="" element={<Auth />}>
            <Route path={ROUTES.CHANGE_PASSWORD} element={<ChangePassword />} />
          </Route>

          <Route path="*" element={<ProtectedRoutes />} />
        </Routes>
      </Suspense>
    </>
  );
}
