import React from "react";
import {
  Box,
  Typography,
  IconButton,
  InputBase,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import {
  Close,
  Menu,
  Help,
  Notifications,
  DarkMode,
  LightMode,
  Message,
  Search,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setMode, setLogOut } from "../../state/index.js";

import FlexBetween from "../../components/muiComps/FlexBetween.jsx";
import { useState } from "react";

export const Header = () => {
  const [isMobileToggled, setIsMobileToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNoneMobileScreen = useMediaQuery("(min-width:1000px)");
  const theme = useTheme();

  const nuturalLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const primaryDark = theme.palette.primary.dark;
  const alt = theme.palette.background.alt;

  // const fullName = `${user.firstname} ${user.lastName}`;

  return (
    <FlexBetween
      // className="p-4  text-white"
      padding={"1rem"}
      backgroundColor={alt}
    >
      <FlexBetween className="gap-4">
        {/* logo  */}
        <Typography
          fontWeight={"bold"}
          fontSize={"clamp(1rem 2rem 2.25rem)"}
          className="log capitalize cursor-pointer transition ease"
          color={"primary"}
          onClick={() => navigate("/")}
          sx={{
            "&:hover": {
              color: primaryLight,
            },
          }}
        >
          Social media
        </Typography>

        {/* Search  */}
        {isNoneMobileScreen && (
          <FlexBetween
            className="search py-1 px-3 rounded-full"
            backgroundColor={background}
          >
            <InputBase placeholder="search..." />
            <Search
              sx={{
                color: primaryDark,
              }}
            />
          </FlexBetween>
        )}
      </FlexBetween>

      <FlexBetween className="gap-4">
        {/* ICons  */}
        {isNoneMobileScreen ? (
          <FlexBetween className="icons gap-2">
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            <IconButton>
              <Message sx={{ fontSize: "25px" }} />
            </IconButton>
            <IconButton>
              <Notifications sx={{ fontSize: "25px" }} />
            </IconButton>
            <IconButton>
              <Help sx={{ fontSize: "25px" }} />
            </IconButton>
            <FormControl variant="standard" value={"test"}>
              <Select
                className="w-[150px] rounded-full"
                value={"test"}
                sx={{
                  backgroundColor: nuturalLight,
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: nuturalLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={"test"}>
                  <Typography>test</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogOut)}>Log Out</MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        ) : (
          <IconButton onClick={() => setIsMobileToggled(!isMobileToggled)}>
            <Menu />
          </IconButton>
        )}
        {!isNoneMobileScreen && isMobileToggled && (
          <Box
            className={"fixed p-4 bottom-0 right-0 h-full"}
            backgroundColor={background}
            zIndex={100}
          >
            {/* CLOSE BTN  */}
            <Box className="p-2" display={"flex"} justifyContent={"flex-end"}>
              <IconButton onClick={() => setIsMobileToggled(!isMobileToggled)}>
                <Close />
              </IconButton>
            </Box>
            {/* MENU ITEMS  */}
            <FlexBetween className="flex-col justify-center items-center gap-3">
              <IconButton onClick={() => dispatch(setMode())}>
                {theme.palette.mode === "dark" ? (
                  <FlexBetween className="gap-4">
                    {/* <Typography className="capitalize">Theme</Typography> */}
                    <DarkMode sx={{ fontSize: "25px" }} />
                  </FlexBetween>
                ) : (
                  <FlexBetween className="gap-4">
                    {/* <Typography className="capitalize">Theme</Typography> */}
                    <LightMode sx={{ color: dark, fontSize: "25px" }} />
                  </FlexBetween>
                )}
              </IconButton>
              <IconButton>
                <Message sx={{ fontSize: "25px" }} />
              </IconButton>
              <IconButton>
                <Notifications sx={{ fontSize: "25px" }} />
              </IconButton>
              <IconButton>
                <Help sx={{ fontSize: "25px" }} />
              </IconButton>
              <FormControl variant="standard" value={"test"}>
                <Select
                  className="w-[150px] rounded-full"
                  value={"test"}
                  sx={{
                    backgroundColor: nuturalLight,
                    p: "0.25rem 1rem",
                    "& .MuiSvgIcon-root": {
                      pr: "0.25rem",
                      width: "3rem",
                    },
                    "& .MuiSelect-select:focus": {
                      backgroundColor: nuturalLight,
                    },
                  }}
                  input={<InputBase />}
                >
                  <MenuItem value={"test"}>
                    <Typography>test</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => dispatch(setLogOut())}>
                    Log Out
                  </MenuItem>
                </Select>
              </FormControl>
            </FlexBetween>
          </Box>
        )}
      </FlexBetween>
    </FlexBetween>
  );
};
