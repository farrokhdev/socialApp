import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import {
  Box,
  Typography,
  Button,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../state";
import Dropzone from "react-dropzone";
import FlexBetween from "./muiComps/FlexBetween";
import * as yup from "yup";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { castomAxios } from "../CastomAxios/CastomAxios";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};
const initialValuesLogin = {
  email: "",
  password: "",
};
export const FormComp = () => {
  const [formType, setFormType] = useState("login");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isLogin = formType === "login";
  const isRegister = formType === "register";
  const isNoneMobileScreen = useMediaQuery("(min-width:600px)");

  // REGISTER
  const register = async (values, props) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);
    try {
      const savedUser = await castomAxios.post("auth/register", formData);

      const { data } = savedUser;
      props.resetForm();

      if (data) {
        setFormType("login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // LOGIN
  const login = async (values, props) => {
    try {
      const loggedIn = await castomAxios.post("auth/login", values);

      const { data } = loggedIn;
      props.resetForm();

      if (data) {
        dispatch(
          setLogin({
            user: data.user,
            token: data.token,
          })
        );
      }
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  // HANDLE SUBMIT
  const handleSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Formik
      validationSchema={isLogin ? loginSchema : registerSchema}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      onSubmit={handleSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            className="grid gap-4"
            gridTemplateColumns={"repeat(2,minmax(0,1fr))"}
            sx={{
              "& > div": {
                gridColumn: isNoneMobileScreen ? undefined : "span 2",
              },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label={"First Name"}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name={"firstName"}
                  error={
                    Boolean(touched.firstName) && Boolean(touched.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  // sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label={"Last Name"}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name={"lastName"}
                  error={Boolean(touched.lastName) && Boolean(touched.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  // sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label={"Location"}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name={"location"}
                  error={Boolean(touched.location) && Boolean(touched.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label={"Occupation"}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name={"occupation"}
                  error={
                    Boolean(touched.occupation) && Boolean(touched.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                  sx={{ gridColumn: "span 2" }}
                />
                <Box
                  className={"rounded p-1"}
                  gridColumn={"2 span"}
                  border={`1px solid ${theme.palette.neutral.medium}`}
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) => {
                      setFieldValue("picture", acceptedFiles[0]);
                    }}
                  >
                    {({ getRootProps, getInputProps }) => {
                      return (
                        <Box
                          className="p-1 cursor-pointer"
                          {...getRootProps()}
                          border={`2px solid ${theme.palette.primary.main}`}
                        >
                          <input {...getInputProps()} />
                          {!values.picture ? (
                            <p>Add image here</p>
                          ) : (
                            <FlexBetween>
                              <Typography>{values.picture.name}</Typography>
                              <EditNoteIcon />
                            </FlexBetween>
                          )}
                        </Box>
                      );
                    }}
                  </Dropzone>
                </Box>
              </>
            )}
            <TextField
              label={"Email"}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name={"email"}
              error={Boolean(touched.email) && Boolean(touched.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label={"Password"}
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name={"password"}
              error={Boolean(touched.password) && Boolean(touched.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 2" }}
            />

            <Box className={"flex flex-col gap-2"} gridColumn={"span 2"}>
              <Typography
                onClick={() => {
                  setFormType(isLogin ? "register" : "login");
                  resetForm();
                }}
                className="cursor-pointer"
                fontWeight={"bold"}
                color={theme.palette.primary.main}
                sx={{
                  "&:hover": {
                    color: theme.palette.primary.dark,
                  },
                }}
              >
                {isLogin ? (
                  <>if you are not registered yet click here</>
                ) : (
                  <>if you have an account login from here</>
                )}
              </Typography>
              <Button
                type="submit"
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.background.alt,
                  "&:hover": {
                    // color: theme.palette.primary.alt,
                    backgroundColor: theme.palette.primary.dark,
                  },
                }}
                className="w-full p-2 rounded-full"
              >
                {isLogin ? "Login" : "Register"}
              </Button>
            </Box>
          </Box>
        </form>
      )}
    </Formik>
  );
};
