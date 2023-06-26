import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "./Layout/MainLayout";
import { HomePage } from "./views/HomePage";
import SignIn from "./views/SignIn";
import { ProfilePage } from "./views/ProfilePage";

export const AllRoutes = ({ isAuth }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<MainLayout />}>
          <Route
            path={"/"}
            element={isAuth ? <HomePage /> : <Navigate to="/sign-in" />}
          />
        </Route>
        <Route path={"/"} element={<MainLayout />}>
          <Route path="/profile/:userId" element={<ProfilePage />} />
        </Route>
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
};
