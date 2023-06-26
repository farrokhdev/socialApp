import React, { useState } from "react";
import WidgetBox from "./muiComps/WidgetBox";
import FlexBetween from "./muiComps/FlexBetween";
import ProfileImage from "./muiComps/ProfileImage";
import Image2 from "../assets/peoples/2.jpg";
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputBase,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import { useDispatch, useSelector } from "react-redux";
import { castomAxios } from "../CastomAxios/CastomAxios";
import { setPosts } from "../state";
import Dropzone from "react-dropzone";
import {
  DeleteOutline,
  DeleteOutlined,
  EditOutlined,
  ImageOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";

export const MyPost = ({ picturePath }) => {
  const dispatch = useDispatch();
  // JUST FOR MOBILE
  const [toggleBtn, setToggleBtn] = useState(false);
  // JUST FOR MOBILE End
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(false);
  const [post, setPost] = useState("");

  const token = useSelector((state) => state.token);
  const { _id } = useSelector((state) => state.user);

  const isNonMobileScreen = useMediaQuery("(min-width:1000px");

  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const def = palette.background.default;

  const handlePost = async () => {
    const formData = new FormData();

    formData.append("userId", _id);
    formData.append("description", post);

    console.log(image);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }

    try {
      const { data } = await castomAxios.post("posts", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log(data);
      if (data) {
        dispatch(setPosts(data));
      }
      setIsImage(false);
      setPost("");
      setImage(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <WidgetBox className="gap-4">
      <FlexBetween className="gap-4">
        <ProfileImage image={picturePath} />
        <Box className="flex items-center" color={dark} flexGrow={"1"}>
          <InputBase
            className="w-full p-4 rounded-full"
            borderRadius={"50%"}
            sx={{
              backgroundColor: def,
            }}
            placeholder="what is on your mind?..."
            onChange={(e) => setPost(e.target.value)}
            value={post}
          />
        </Box>
      </FlexBetween>
      {isImage && (
        <Box
          className="rounded-full p-2"
          color={dark}
          border={`1px solid ${medium}`}
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => {
              setImage(acceptedFiles[0]);
            }}
          >
            {({ getRootProps, getInputProps }) => {
              return (
                <FlexBetween>
                  <Box
                    className="p-1 cursor-pointer w-full"
                    {...getRootProps()}
                  >
                    <input {...getInputProps()} />
                    {!image ? (
                      <Typography variant="p">Add image here</Typography>
                    ) : (
                      <FlexBetween>
                        <Typography variant="p">{image.name}</Typography>
                        <EditOutlined />
                      </FlexBetween>
                    )}
                  </Box>
                  {image && (
                    <IconButton
                      onClick={() => {
                        setImage(null);
                      }}
                    >
                      <DeleteOutlined />
                    </IconButton>
                  )}
                </FlexBetween>
              );
            }}
          </Dropzone>
        </Box>
      )}
      <Divider />
      <FlexBetween>
        <Box
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => setIsImage(!isImage)}
          color={dark}
        >
          <ImageOutlined />
          <Typography>Image</Typography>
        </Box>
        {isNonMobileScreen ? (
          <>
            <Box
              className="flex items-center gap-1 cursor-pointer"
              color={dark}
            >
              <OndemandVideoIcon />
              <Typography>Video</Typography>
            </Box>
            <Box
              className="flex items-center gap-1 cursor-pointer"
              color={dark}
            >
              <AttachFileIcon />
              <Typography>File</Typography>
            </Box>
            <Box
              className="flex items-center gap-1 cursor-pointer"
              color={dark}
            >
              <VolumeDownIcon />
              <Typography>Audio</Typography>
            </Box>
          </>
        ) : (
          <>
            <Box
              className="flex items-center cursor-pointer"
              onClick={() => setToggleBtn(!toggleBtn)}
              gap={"0.25rem"}
            >
              <MoreHorizOutlined sx={{ color: main }} />
            </Box>
          </>
        )}
        <Button
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
            "& :hover": {
              color: palette.background.primary,
            },
          }}
          onClick={handlePost}
        >
          Post
        </Button>
      </FlexBetween>
      {toggleBtn && (
        <Box className="flex flex-col gap-2">
          <Box className="flex items-center gap-1 cursor-pointer" color={dark}>
            <OndemandVideoIcon />
            <Typography>Video</Typography>
          </Box>
          <Box className="flex items-center gap-1 cursor-pointer" color={dark}>
            <AttachFileIcon />
            <Typography>File</Typography>
          </Box>
          <Box className="flex items-center gap-1 cursor-pointer" color={dark}>
            <VolumeDownIcon />
            <Typography>Audio</Typography>
          </Box>
        </Box>
      )}
    </WidgetBox>
  );
};
