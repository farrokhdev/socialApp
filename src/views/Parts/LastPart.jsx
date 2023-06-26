import React from "react";

import WidgetBox from "../../components/muiComps/WidgetBox";
import { useTheme } from "@emotion/react";
import { AdvertBox } from "../../components/AdvertBox";
import { FriendBox } from "../../components/FriendBox";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";

export const LastPart = ({ userId }) => {
  return (
    <Box className="flex flex-col gap-4">
      <AdvertBox />
      <FriendBox userId={userId} />
    </Box>
  );
};
