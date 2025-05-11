import React, { useState, useEffect } from "react";
import "./Auth.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import {
  Avatar,
  Button,
  Grid,
  Typography,
  Container,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import Input from "./Input";
import { signIn, signUp } from "../../actions/userActions";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const userProfile = process.env.REACT_APP_USER_PROFILE;
  const { authError } = useSelector((state) => state.auth.error);
  const user = JSON.parse(localStorage.getItem(userProfile));
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [errorMessage, setErrorMessage] = useState(authError);
  const [isTrigger, setIsTrigger] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setErrorMessage(authError);
    let timeOutId = null;
    timeOutId = setTimeout(() => {
      setErrorMessage("");
    }, 4000);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [authError, isTrigger]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      dispatch(signUp(formData, navigate));
    } else {
      dispatch(signIn(formData, navigate));
    }
    setIsTrigger(!isTrigger);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);
  const switchMode = () => setIsSignup(!isSignup);

  const googleSuccess = async (res) => {
    const decode = jwt_decode(res.credential);
    const result = decode;
    const token = res?.credential;
    try {
      dispatch({ type: "AUTH", payload: { result, token } });
      navigate("/");
    } catch (error) {}
  };

  const googleError = async (error) => {};

  if (!user?.result._id)
    return (
      <Container maxWidth="xs" className="authMain">
        <main>
          <Avatar sx={{ backgroundColor: "red", marginLeft: "45%" }}>
            <LockOutlined />
          </Avatar>
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            {isSignup ? "Sign Up" : "Sign In"}
          </Typography>
          <Typography
            variant="body2"
            sx={{ textAlign: "center", color: "red" }}
          >
            {errorMessage ? errorMessage : null}
          </Typography>
          <form className="authForm" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {isSignup && (
                <>
                  <Input
                    name="firstName"
                    label="First Name"
                    autoFocus
                    half
                    handleChange={handleChange}
                  />
                  <Input
                    name="lastName"
                    label="Last Name"
                    half
                    handleChange={handleChange}
                  />
                </>
              )}
              <Input
                name="email"
                label="Email Address"
                type="email"
                handleChange={handleChange}
              />
              <Input
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                handleChange={handleChange}
                handleShowPassword={handleShowPassword}
              />
              {isSignup && (
                <Input
                  name="confirmPassword"
                  label="Confirm Password"
                  type={showPassword ? "text" : "password"}
                  handleChange={handleChange}
                />
              )}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              color="primary"
              sx={{ marginY: "10px" }}
            >
              {isSignup ? "Sign Up" : "Sign In"}
            </Button>
            <Button fullWidth variant="text" disabled>
              <GoogleLogin onSuccess={googleSuccess} onError={googleError} />
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item xs="12">
                <Button fullWidth variant="text" onClick={switchMode}>
                  {isSignup
                    ? "Already have an account? Sign in"
                    : "Don't have an account? Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </main>
      </Container>
    );
};

export default Auth;
