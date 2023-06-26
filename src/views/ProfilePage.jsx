import { Box, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ProfilePart } from "./Parts/ProfilePart";
import { LastPart } from "./Parts/LastPart";
import { MyPost } from "../components/MyPost";
import { PostList } from "../components/PostList";
import { useParams } from "react-router-dom";
import { castomAxios } from "../CastomAxios/CastomAxios";
import { FriendBox } from "../components/FriendBox";

export const ProfilePage = () => {
  const [user, setUser] = useState();
  const { picturePath } = useSelector((state) => state.user);
  const { userId } = useParams();
  const isMobileScreen = useMediaQuery("(min-width:1000px)");

  const token = useSelector((state) => state.token);

  const getUser = async () => {
    try {
      const { data } = await castomAxios.get(`users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data) {
        setUser(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) {
    return null;
  }
  return (
    <>
      <Box
        className="flex flex-col gap-4"
        gridColumn={isMobileScreen ? "span 1" : "span 4"}
      >
        <ProfilePart {...user} />
        <FriendBox userId={userId} />
      </Box>
      <Box
        // className="sticky top-0"
        gridColumn={isMobileScreen ? "span 3" : "span 4"}
      >
        <div className="flex flex-col gap-4 col-span-2">
          <MyPost picturePath={user.picturePath} />
          <PostList userId={userId} isProfile />
        </div>
      </Box>
    </>
  );
};
