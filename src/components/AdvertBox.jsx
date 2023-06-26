import React from "react";
import WidgetBox from "./muiComps/WidgetBox";
import { useTheme } from "@mui/material";
import FlexBetween from "./muiComps/FlexBetween";
import { Box, Typography } from "@mui/material";
import TestImg from "../assets/peoples/2.jpg";

export const AdvertBox = () => {
  const { palette } = useTheme();
  return (
    <WidgetBox
      color={palette.neutral.dark}
      backgroundColor={palette.background.alt}
      fontSize={"12px"}
      fontWeight={"400"}
      className="gap-4"
    >
      <FlexBetween>
        <Typography variant="h6" fontSize={"14px"} fontWeight={"500"}>
          Sponsered
        </Typography>
        <Typography variant="p" color={palette.neutral.dark}>
          create Ad
        </Typography>
      </FlexBetween>
      <img
        src={"http://localhost:5173/assets/1.jpg"}
        className="rounded"
        width={"100%"}
        height={"auto"}
        style={{ objectFit: "cover" }}
        alt="post"
      />
      <FlexBetween>
        <Typography variant="h6" fontSize={"14px"} fontWeight={"500"}>
          main Confd
        </Typography>
        <Typography variant="p" color={palette.neutral.dark}>
          www.google.com
        </Typography>
      </FlexBetween>
      <Box>
        <Typography variant="p">
          In publishing and graphic design, Lorem ipsum is a placeholder text
          commonly used to demonstrate the visual form of a document or a
          typeface without relying on meaningful content. Lorem ipsum may be
          used as a plac
        </Typography>
      </Box>
    </WidgetBox>
  );
};
