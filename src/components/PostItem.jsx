import React, { useState } from "react";
import ProfileImg from "../assets/peoples/2.jpg";
import WidgetBox from "./muiComps/WidgetBox";
import FlexBetween from "./muiComps/FlexBetween";
import ProfileImage from "./muiComps/ProfileImage";
import {
  PersonAddOutlined,
  PersonRemoveOutlined,
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import { FriendItem } from "./FriendItem";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../state";
import { castomAxios } from "../CastomAxios/CastomAxios";

export const PostItem = ({
  _id,
  userId,
  firstName,
  lastName,
  description,
  location,
  picturePath,
  userPicPath,
  likes,
  comments,
}) => {
  const fullName = firstName + lastName;
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();

  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likesCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    try {
      const updatedPost = await castomAxios.patch(
        `posts/${_id}/like`,
        { userId: loggedInUserId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (updatedPost.data) {
        dispatch(setPost({ post: updatedPost.data }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <WidgetBox className="gap-4">
      <FriendItem
        friendId={userId}
        fullName={firstName + lastName}
        subtitle={location}
        userPicturePath={userPicPath ? userPicPath : picturePath}
      />
      <Box
        className="desc-sec"
        color={palette.neutral.dark}
        fontSize={"12px"}
        fontWeight={"300"}
      >
        <Typography color={main}>{description}</Typography>
      </Box>
      {picturePath && (
        <img
          width={"100%"}
          height={"100%"}
          src={`http://localhost:5173/assets/${picturePath}`}
          alt="post"
          style={{ borderRadius: "0.75rem" }}
        />
      )}
      <FlexBetween>
        <FlexBetween className="gap-2">
          <FlexBetween className="gap-2">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography sx={{ color: main }}>{likesCount}</Typography>
          </FlexBetween>
          <FlexBetween className="gap-2">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography sx={{ color: main }}>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton className="share flex gap-2">
          <ShareOutlined />
        </IconButton>
      </FlexBetween>

      {isComments && (
        <Box className="mt-4">
          {comments.map((comment, i) => {
            return (
              <Box
                className="my-2 p-2 flex flex-col gap-2"
                key={`${fullName}-${i}`}
              >
                <Divider />
                <Typography sx={{ color: main }}>{comment}</Typography>
                <Divider />
              </Box>
            );
          })}
        </Box>
      )}
    </WidgetBox>
  );
};
