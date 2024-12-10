import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/homePage/Home";
import PlayQuiz from "../pages/playQuizPage/PlayQuiz";
import { LeaderBoard } from "../pages/leaderBoardPage/LeaderBoard";
import { ROUTES } from "./routeConstant";
import NotFound from "@/components/NotFound";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route
            path={ROUTES.PLAYQUIZ}
            element={
              <ProtectedRoute>
                <PlayQuiz />
              </ProtectedRoute>
            }
          />
          <Route path={ROUTES.LEADERBOARD} element={<LeaderBoard />} />
          <Route path={ROUTES.NOTFOUND} element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
  ("");
};

export default AppRoutes;
