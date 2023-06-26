import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import FlexBetween from "../components/muiComps/FlexBetween";
import { FormComp } from "../components/FormComp";

const SignIn = () => {
  const theme = useTheme();

  const alt = theme.palette.background.default;
  const primaryDark = theme.palette.primary.dark;

  const isNoneMobileScreen = useMediaQuery("(min-width:1000px)");
  return (
    <>
      <Box className="w-full flex justify-center p-4" backgroundColor={alt}>
        <Typography fontWeight={"bold"} fontSize={"1rem"} color={primaryDark}>
          Social app
        </Typography>
      </Box>
      <Box
        className="flex flex-col gap-4 p-4 my-4 mx-auto rounded"
        backgroundColor={alt}
        width={isNoneMobileScreen ? "50%" : "90%"}
      >
        <Typography fontWeight={"bold"} variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to social media!
        </Typography>
        {/* FORM  */}
        <FormComp />
      </Box>
    </>
  );
};

export default SignIn;
