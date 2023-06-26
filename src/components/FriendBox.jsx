import React, { useEffect } from "react";
import WidgetBox from "./muiComps/WidgetBox";
import { useTheme } from "@mui/material";
import FlexBetween from "./muiComps/FlexBetween";
import { Box, Typography } from "@mui/material";
import { FriendItem } from "./FriendItem";
import { castomAxios } from "../CastomAxios/CastomAxios";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../state";

export const FriendBox = ({ userId }) => {
  const { palette } = useTheme();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const getFriends = async () => {
    try {
      const userFriends = await castomAxios.get(
        `users/${userId}/friends`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (userFriends) {
        dispatch(setFriends({ friends: userFriends.data }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFriends();
  }, []);

  console.log(friends.length);
  return (
    <WidgetBox
      color={palette.neutral.dark}
      backgroundColor={palette.background.alt}
      className="gap-4"
    >
      <Box>
        <Typography color={palette.neutral.dark}>Friends list</Typography>
      </Box>
      {friends.length > 0 ? (
        <>
          {friends.map((friend) => (
            <FriendItem
              key={friend._id}
              friendId={friend._id}
              fullName={friend.firstName + friend.lastName}
              subtitle={friend.location}
              userPicturePath={friend.picPath}
            />
          ))}
        </>
      ) : (
        <>
          <Typography color={palette.neutral.medium}>
            there is no friends
          </Typography>
        </>
      )}
    </WidgetBox>
  );
};
