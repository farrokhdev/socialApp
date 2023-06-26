import { useState } from "react";
import { MainLayout } from "./Layout/MainLayout";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import "./styles/views-styles.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { themeSettings } from "./theme";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { AllRoutes } from "./AllRoutes";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  console.log(isAuth);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AllRoutes isAuth={isAuth} />
        {/* <RouterProvider router={router} /> */}
      </ThemeProvider>
    </>
  );
}

export default App;
