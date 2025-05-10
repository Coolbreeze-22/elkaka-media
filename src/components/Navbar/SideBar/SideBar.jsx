import { Close } from "@mui/icons-material";
import { Avatar, Button, IconButton, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import ClickAwayListener from "../../ClickAwayListener";

const SideBar = ({ sideBar, setSideBar, user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };
  const myProfile = () => {
    navigate("/profile");
    setSideBar(false);
  };

  const handleNavigate = () => {
    navigate("/");
    setSideBar(false);
  };
  const handleNavbar = () => {
    setSideBar((prev) => !sideBar);
  };
  const handleClickAway = () => {
    setSideBar(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className={sideBar ? "appBarMob" : "noAppBarMob"}>
        <header className="appBarMobHeader">
          <IconButton sx={{ color: "#698be0" }} onClick={handleNavbar}>
            <Close />
          </IconButton>
          {user?._id || user?.sub ? (
            <>
              <Typography variant="h6" className="appBarMobTypo">
                {user.name}
              </Typography>
              <Avatar
                src={user.picture}
                alt={user.name.charAt(0)}
                variant="rounded"
                sx={{ border: "1px solid #698be0" }}
              />
            </>
          ) : null}
        </header>
        <h3 className="appBarMobH2" onClick={myProfile}>
          Profile
        </h3>
        <h3 className="appBarMobH2" onClick={handleNavigate}>
          Home
        </h3>
        <h3 className="appBarMobH2" onClick={handleNavigate}>
          Create Post
        </h3>
        <h3 className="appBarMobH2" onClick={handleNavigate}>
          About
        </h3>
        <h3 className="appBarMobH2" onClick={handleNavigate}>
          FAQ
        </h3>
        <center>
          <p>
            <em>Copyright Coolbreeze 2023</em>
          </p>
        </center>
        {user?._id ? (
          <center>
            <Button
              variant="outlined"
              color="error"
              sx={{ fontSize: "10px" }}
              onClick={logout}
            >
              Sign Out
            </Button>
          </center>
        ) : (
          <center>
            <Button
              variant="outlined"
              color="success"
              sx={{ fontSize: "10px" }}
            >
              <a href="/auth" style={{ color: "white" }}>
                Sign In
              </a>
            </Button>
          </center>
        )}
        {user?.isAdmin && user?.level > 1 && (
          <div style={{ marginTop: "20px", alignSelf: "center" }}>
            <Button
              variant="outlined"
              size="small"
              color="info"
              sx={{ fontSize: "10px" }}
              onClick={() => {
                navigate("/users");
                setSideBar(false);
              }}
            >
              ADMIN PANEL
            </Button>
          </div>
        )}
      </div>
    </ClickAwayListener>
  );
};

export default SideBar;
