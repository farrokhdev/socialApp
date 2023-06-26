import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { MyPost } from "../components/MyPost";
import { useSelector } from "react-redux";
import { PostList } from "../components/PostList";
import { useMediaQuery } from "@mui/material";
import { ProfilePart } from "./Parts/ProfilePart";
import { LastPart } from "./Parts/LastPart";
import { castomAxios } from "../CastomAxios/CastomAxios";

export const HomePage = () => {
  const [user, setUser] = useState();
  const { _id, picturePath } = useSelector((state) => state.user);
  const isMobileScreen = useMediaQuery("(min-width:1000px)");

  const token = useSelector((state) => state.token);

  const getUser = async () => {
    try {
      const { data } = await castomAxios.get(`users/${_id}`, {
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
        // className="sticky top-0"
        gridColumn={isMobileScreen ? "span 1" : "span 3"}
      >
        <ProfilePart {...user} />
      </Box>
      <Box
        // className="sticky top-0"
        gridColumn={isMobileScreen ? "span 2" : "span 3"}
      >
        <div className="flex flex-col gap-4 col-span-2">
          <MyPost picturePath={picturePath} />
          <PostList userId={_id} />
        </div>
      </Box>

      <Box gridColumn={isMobileScreen ? "span 1" : "span 3"}>
        <LastPart userId={_id} />
      </Box>
    </>
  );
};
