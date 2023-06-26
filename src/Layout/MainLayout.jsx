import React from "react";
import { Header } from "../views/Parts/Header";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

export const MainLayout = () => {
  return (
    <Box>
      <Header />

      <Box
        className={`grid  lg:grid-cols-4 md:grid-cols-3 w-full gap-4 p-4 max-w-6xl m-auto `}
      >
        <Outlet />
      </Box>
    </Box>
  );
};
