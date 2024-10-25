import React, { useEffect, useState } from "react";
import "./Navbar.css";
import Things from "../../images/Things.jpg";
import { PostContext } from "../../context/context";
import { useContext } from "react";
import {
  Typography,
  Link,
  Avatar,
  Button,
  IconButton,
} from "@mui/material";
import { Close, Menu, Logout, Login } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import decode from "jwt-decode";
// import moment from "moment";

const Navbar = () => {
  const userProfile = process.env.REACT_APP_USER_PROFILE;
  const { user, setUser } = useContext(PostContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [sideBar, setSideBar] = useState(false);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    setUser();
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
    setSideBar(!sideBar);
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < Date.now()) logout();
      // if (decodedToken.exp * 1000 < new Date().getTime) logout(); not working, wrap date() with moment to make it work and remove .getTime
    }
    setUser(JSON.parse(localStorage.getItem(userProfile)));
  }, [location]);

  return (
    <header>
      <nav className="appBarSmall">
        <IconButton
          sx={{ color: "white", opacity: "0.7" }}
          onClick={handleNavbar}
        >
          <Menu />
        </IconButton>
        <Typography variant="h4" sx={{ marginTop: "4px" }}>
          <Link href="/" sx={{ color: "white" }}>
            Memories
          </Link>
        </Typography>
        {user?.result?._id  || user?.result?.sub ? (
          <>
            <Avatar
              src={user.result.picture}
              alt={user.result.name.charAt(0)}
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

      <div className={sideBar ? "appBarMob" : "noAppBarMob"}>
        <header className="appBarMobHeader">
          <IconButton className="appBarMobClose" onClick={handleNavbar}>
            <Close />
          </IconButton>
          {user?.result?._id  || user?.result?.sub ? (
            <>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "monospace",
                  padding: "3px 10px",
                  borderRadius: "5px",
                  border: "1px dotted white",
                }}
              >
                {user.result.name}
              </Typography>
              <Avatar
                src={user.result.picture}
                alt={user.result.name.charAt(0)}
                variant="rounded"
                sx={{ border: "1px solid red" }}
              />
            </>
          ) : null}
        </header>
        <h3 className="appBarMobH2" onClick={myProfile}>Profile</h3>
        <h3 className="appBarMobH2" onClick={handleNavigate}>Home</h3>
        <h3 className="appBarMobH2" onClick={handleNavigate}>Create Post</h3>
        <h3 className="appBarMobH2" onClick={handleNavigate}>About</h3>
        <h3 className="appBarMobH2" onClick={handleNavigate}>FAQ</h3>
        <center>
          <p>
            <em>Copyright Coolbreeze 2023</em>
          </p>
        </center>
        {user ? (
          <center>
            <Button
              variant="contained"
              color="error"
              sx={{ color: "white" }}
              onClick={logout}
            >
              Sign Out
            </Button>
          </center>
        ) : (
          <center>
            <Button variant="contained" color="success">
              <a href="/auth" style={{ color: "white" }}>
                Sign In
              </a>
            </Button>
          </center>
        )}
        {user?.result?.isAdmin && user?.result?.level > 1 &&
        <div style={{ marginTop:"20px"}}>
            <Button variant="contained" size="small" color="info" onClick={()=>{navigate("/users"); setSideBar(false)}}>
                ADMIN PANEL
            </Button>
          </div>}
      </div>


      <div className="appBarLap">
        <Typography variant="h3" align="center">
          <Link href="/" sx={{ color: "white" }}>
            Memories
          </Link>
        </Typography>
        <img src={Things} alt="Things" className="appImg" />

        {user?.result?._id  || user?.result?.sub ? (
          <>
            <Typography
              variant="h6"
              sx={{ margin: "7px 0 0 0", color: "gray" }}
            >
              {user.result.name}
            </Typography>
            <Avatar
              src={user.result.picture}
              alt={user.result.name}
              sx={{ margin: "7px 0 0 0" }}
            >
              {user.result.name.charAt(0)}
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
          <Button variant="contained" color="success" sx={{ marginY: "10px"}}>
            <a href="/auth" style={{color:"white" }}>Sign In</a>
          </Button>
        )}
      </div>
    </header>
  );
};
export default Navbar;
