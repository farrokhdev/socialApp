import React, { useState } from "react";

import FlexBetween from "./muiComps/FlexBetween";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import ProfileImage from "./muiComps/ProfileImage";
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { setFriends } from "../state";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { castomAxios } from "../CastomAxios/CastomAxios";

export const FriendItem = ({
  fullName,
  friendId,
  subtitle,
  userPicturePath,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriend = Boolean(friends.find((friend) => friend._id === friendId));

  const patchFriend = async () => {
    try {
      const { data } = await castomAxios.patch(
        `users/${_id}/${friendId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (data) {
        dispatch(setFriends({ friends: data }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <FlexBetween>
      <FlexBetween
        className="gap-2 cursor-pointer"
        fontSize={"12px"}
        fontWeight={"400"}
      >
        <ProfileImage
          image={`http://localhost:5173/assets/${userPicturePath}`}
        />
        <Box
          className="flex flex-col gap-1"
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography variant="p" color={palette.primary.dark}>
            {fullName}
          </Typography>
          <Typography
            variant="p"
            fontSize={"11px"}
            color={palette.neutral.dark}
          >
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      <Typography>
        <IconButton
          onClick={() => patchFriend()}
          sx={{ backgroundColor: isFriend ? primaryDark : undefined }}
        >
          {isFriend ? <PersonRemoveOutlined /> : <PersonAddOutlined />}
        </IconButton>
      </Typography>
    </FlexBetween>
  );
};
