import React, { useEffect, useState } from "react";
import "./AllUsers.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUsers, updateUserModel } from "../../actions/userActions";
import {
  Button,
  IconButton,
  Typography,
  Container,
  Avatar,
  TextField,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { AdminPanelSettings, Person, Close } from "@mui/icons-material";

const AllUsers = () => {
  const userProfile = process.env.REACT_APP_USER_PROFILE;
  const { users, isLoading } = useSelector((state) => state.auth);
  const user = JSON.parse(localStorage.getItem(userProfile))?.result;
  const [search, setSearch] = useState("");
  const [activeId, setActiveId] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchedUser = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search) ||
      u.name.charAt(0).toUpperCase().includes(search) ||
      u.name.charAt(0).toLowerCase().includes(search) ||
      u.name.includes(search)
  );
  const generalUsers = search ? searchedUser : users;

  const admin1 = user?.isAdmin && user?.level > 0;

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch, navigate]);

  const openUser = (id) => {
    navigate(`/users/user/${id}`);
  };
  const adminLevel = (id) => {
    setActiveId(id);
    setTimeout(() => {
      setActiveId("");
    }, 3000);
  };

  const handleModel = () => {
    dispatch(updateUserModel());
  };

  if (!isLoading && !users.length)
    return (
      <center>
        <h1 className="postsMessage">No Users</h1>
      </center>
    );

  if (admin1)
    return (
      <Container maxWidth="sm" className="all">
        {isLoading ? (
          <CircularProgress size="3em" />
        ) : (
          <>
            <div style={{ textAlign: "center", marginBottom: "15px" }}>
              <TextField
                variant="outlined"
                label="Search"
                name="search"
                value={search}
                type="text"
                size="small"
                sx={{ backgroundColor: "white", borderRadius: "20px" }}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={
                  search && {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setSearch("")}>
                          <Close />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }
                }
              />
            </div>
            {generalUsers.map((u) => (
              <div key={u._id} className="allDiv">
                <Typography variant="subtitle2" className="allTypo">
                  {u.name}
                  {u.isAdmin && (
                    <IconButton onClick={() => adminLevel(u._id)}>
                      <AdminPanelSettings sx={{ color: "greenYellow" }} />
                      {activeId === u._id && (
                        <Typography color="greenYellow">{u.level}</Typography>
                      )}
                    </IconButton>
                  )}
                  {u.isOwner && (
                    <IconButton>
                      <AdminPanelSettings sx={{ color: "red" }} />
                    </IconButton>
                  )}
                </Typography>
                <Avatar sx={{display:{ sm: "none"}}} onClick={() => openUser(u._id)}>
                  <Person sx={{ color: "black" }} />
                </Avatar>
                <Typography variant="body2" className="allTypo">
                  {u.email}
                </Typography>
                <Avatar sx={{display:{xs: "none", sm:"yes"}}} onClick={() => openUser(u._id)}>
                  <Person sx={{ color: "black" }} />
                </Avatar>
                <Button variant="outlined" sx={{color:"white"}} onClick={() => openUser(u._id)}>
                  Profile
                </Button>
              </div>
            ))}
            {users.map((u) => {
              u.isOwner && (
                <Button
                  variant="contained"
                  size="small"
                  color="error"
                  sx={{ marginTop: "50px" }}
                  onClick={handleModel}
                >
                  Update
                </Button>
              );
            })}
          </>
        )}
      </Container>
    );
};

export default AllUsers;
