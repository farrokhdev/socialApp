import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "./Layout/MainLayout";
import SignIn from "./views/SignIn";

import { HomePage } from "./views/HomePage";
import { ProfilePage } from "./views/ProfilePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
  {
    path: "/profile/:userId",
    element: <ProfilePage />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
]);
