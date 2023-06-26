import React, { useEffect, useState } from "react";
import { PostItem } from "./PostItem";
import { useDispatch, useSelector } from "react-redux";
import { castomAxios } from "../CastomAxios/CastomAxios";
import { setPost, setPosts } from "../state";
import { Box } from "@mui/material";

export const PostList = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const allPosts = useSelector((state) => state.posts);
  console.log(allPosts);

  const getAllPosts = async () => {
    try {
      const { data } = await castomAxios.get("posts", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log(data);
      if (data) {
        dispatch(setPosts({ posts: data }));
      }
    } catch (err) {}
  };
  const getUserPosts = async () => {
    try {
      const { data } = await castomAxios.get(`posts/${userId}/posts`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data) {
        dispatch(setPosts({ posts: sorted }));
      }
    } catch (err) {}
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getAllPosts();
    }
  }, []);

  if (!allPosts) {
    return null;
  }

  console.log(allPosts);

  return (
    <Box className="post-list-sec flex flex-col gap-4">
      {allPosts.map((onePost) => {
        return <PostItem key={onePost._id} {...onePost} />;
      })}
    </Box>
  );
};
