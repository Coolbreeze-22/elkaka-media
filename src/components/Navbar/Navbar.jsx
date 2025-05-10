import React, { useEffect, useState } from "react";
import "./Navbar.css";
import Things from "../../images/Things.jpg";
import { Typography, Link, Avatar, Button, IconButton } from "@mui/material";
import { Menu, Logout, Login } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import decode from "jwt-decode";
import SideBar from "./SideBar/SideBar";

const Navbar = () => {
  const userProfile = process.env.REACT_APP_USER_PROFILE;
  const [sideBar, setSideBar] = useState(false);

  const storedUser = localStorage.getItem(userProfile);
  const [userData, setUserData] = useState(
    storedUser ? JSON.parse(storedUser) : {}
  );

  const user = userData?.result;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };
  const myProfile = () => {
    navigate("/profile");
    setSideBar(false);
  };

  const handleNavbar = () => {
    setSideBar(!sideBar);
  };

  useEffect(() => {
    const token = userData?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        logout();
        setUserData((prev) => {});
      }
    }
  }, [location, user?.id]);

  return (
    <header>
      <nav className="appBarSmall">
        <IconButton sx={{ color: "#698be0" }} onClick={handleNavbar}>
          <Menu />
        </IconButton>
        <Typography variant="h4" sx={{ marginTop: "4px" }}>
          <Link href="/" sx={{ color: "white" }}>
            Memories
          </Link>
        </Typography>
        {user?._id || user?.sub ? (
          <>
            <Avatar
              src={user.picture}
              alt={user.name.charAt(0)}
              sx={{ marginTop: "2px", border: "1px solid white" }}
            />
            <IconButton sx={{ color: "red" }} onClick={logout}>
              <Logout />
            </IconButton>
          </>
        ) : (
          <IconButton sx={{ color: "green" }} href="/auth">
            <Login />
          </IconButton>
        )}
      </nav>
      <SideBar sideBar={sideBar} setSideBar={setSideBar} user={user} />

      <div className="appBarLap">
        <Typography variant="h3" align="center">
          <Link href="/" sx={{ color: "white" }}>
            Memories
          </Link>
        </Typography>
        <img src={Things} alt="Things" className="appImg" />

        {user?._id || user?.sub ? (
          <>
            <Typography
              variant="h6"
              sx={{ margin: "7px 0 0 0", color: "gray" }}
            >
              {user.name}
            </Typography>
            <Avatar
              src={user.picture}
              alt={user.name}
              sx={{ margin: "7px 0 0 0" }}
            >
              {user.name.charAt(0)}
            </Avatar>
            <Button
              variant="outlined"
              color="info"
              sx={{ marginY: "10px" }}
              onClick={myProfile}
            >
              Profile
            </Button>
            <Button
              variant="contained"
              color="secondary"
              sx={{ marginY: "10px" }}
              onClick={logout}
            >
              Logout
            </Button>
          </>
        ) : (
          <Button variant="contained" color="success" sx={{ marginY: "10px" }}>
            <a href="/auth" style={{ color: "white" }}>
              Sign In
            </a>
          </Button>
        )}
      </div>
    </header>
  );
};
export default Navbar;
