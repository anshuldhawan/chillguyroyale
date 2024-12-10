import { Navigate, Route, Routes } from "react-router-dom";
import Auth from "./auth";
import { AppLayout } from "../components/Layout";
import { ROUTES } from "./routeConstants";
import React, { Suspense, lazy } from "react";
import Spinner from "../components/spinner/Spinner";
const Dashboard = lazy(() => import("../pages/Dashboard"));
const ManageCredits = lazy(() => import("../pages/ManageCredits"));

export default function ProtectedRoutes() {
  return (
    <>
      <AppLayout>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="" element={<Auth />}>
              <Route path="/" element={<Dashboard />} />
              <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
              <Route
                path={ROUTES.MANAGE_CREDITS}
                element={<ManageCredits />}
              />{" "}
              <Route path="*" element={<Navigate to={ROUTES.LOGIN} />} />
            </Route>
          </Routes>
        </Suspense>
      </AppLayout>
    </>
  );
}
