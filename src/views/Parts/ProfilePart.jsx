import React, { useEffect, useState } from "react";
import ProfliePic from "../../assets/peoples/1.jpg";
import { Link, useNavigate } from "react-router-dom";
import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Box, Typography, Divider, useTheme, IconButton } from "@mui/material";
import FlexBetween from "../../components/muiComps/FlexBetween";
import ProfileImage from "../../components/muiComps/ProfileImage";
import WidgetBox from "../../components/muiComps/WidgetBox";
import Image1 from "../../assets/peoples/1.jpg";

export const ProfilePart = ({
  firstName,
  lastName,
  email,
  picturePath,
  location,
  occupation,
  viewedProfile,
  impression,
  friends,
}) => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;

  return (
    <WidgetBox className="gap-2">
      <FlexBetween className="w-full">
        <Box className="flex items-center gap-2">
          <ProfileImage image={picturePath} />
          <Box className="flex flex-col gap-0 capitalize">
            <Typography
              variant="p"
              sx={{ fontSize: "12px", fontWeight: "600", color: dark }}
              className="username"
            >
              {firstName + " " + lastName}
            </Typography>
            <Typography
              variant="p"
              sx={{ fontSize: "11px", fontWeight: "400", color: medium }}
              className="friends"
            >
              {"friends" + " " + friends.length}
            </Typography>
          </Box>
        </Box>
        <IconButton>
          <ManageAccountsOutlined
            sx={{
              fontSize: "20px",
            }}
          />
        </IconButton>
      </FlexBetween>
      <Divider />
      <Box
        className="flex flex-col gap-2"
        color={dark}
        fontWeight={"300"}
        fontSize={"12px"}
      >
        <Typography
          variant="p"
          sx={{ fontSize: "12px", fontWeight: "300", color: dark }}
          className="email"
        >
          {email}
        </Typography>
        <Box
          className="location capitalize"
          sx={{
            "& .MuiSvgIcon-root": {
              fontSize: "15px",
            },
          }}
        >
          <LocationOnOutlined color={medium} /> : {location}
        </Box>
        <Box
          className="occupation capitalize"
          sx={{
            "& .MuiSvgIcon-root": {
              fontSize: "15px",
            },
          }}
        >
          <WorkOutlineOutlined /> : {occupation}
        </Box>
      </Box>
      <Divider />
      <FlexBetween>
        <Box
          className="flex flex-col gap-2 "
          fontSize={"12px"}
          fontWeight={"300"}
          color={dark}
        >
          <Typography className="views" variant="p">
            Profile views
          </Typography>
          <Typography className="impretion" variant="p">
            Impretion of your post
          </Typography>
        </Box>
        <Box
          className="flex flex-col gap-2"
          fontSize={"12px"}
          fontWeight={"300"}
          color={dark}
        >
          <Typography variant="p" className="views-num">
            {viewedProfile}
          </Typography>
          <Typography variant="p" className="impretion-num">
            {impression}
          </Typography>
        </Box>
      </FlexBetween>
      <Divider />
      <Box
        className="flex flex-col gap-2"
        fontSize={"12px"}
        fontWeight={"300"}
        color={dark}
      >
        <Typography variant="h6" fontSize={"0.75rem"} fontWeight={"500"}>
          Social profiles
        </Typography>
        <FlexBetween>
          <Box
            className="flex flex-col gap-2"
            sx={{
              "& .MuiSvgIcon-root": {
                fontSize: "15px",
              },
            }}
          >
            <Typography variant="p" className="">
              <TwitterIcon /> Social network
            </Typography>
          </Box>
          <Box
            sx={{
              "& .MuiSvgIcon-root": {
                fontSize: "15px",
              },
            }}
          >
            <IconButton>
              <EditOutlined />
            </IconButton>
          </Box>
        </FlexBetween>
        <FlexBetween>
          <Box
            className="flex flex-col gap-2 "
            sx={{
              "& .MuiSvgIcon-root": {
                fontSize: "15px",
              },
            }}
          >
            <Typography variant="p" className="">
              <LinkedInIcon /> Network platform
            </Typography>
          </Box>
          <Box
            sx={{
              "& .MuiSvgIcon-root": {
                fontSize: "15px",
              },
            }}
          >
            <IconButton>
              <EditOutlined />
            </IconButton>
          </Box>
        </FlexBetween>
      </Box>
    </WidgetBox>
  );
};
