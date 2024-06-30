import React, { useEffect, useState } from "react";
import "./AllUsers.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getUsers,
  getUserById,
  deleteUser,
  addAdmin,
  deleteAdmin,
  updateUserModel,
} from "../../actions/authActions";
import {
  Button,
  IconButton,
  Grid,
  Typography,
  Container,
  Avatar,
  TextField,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import {
  Delete,
  DeleteForever,
  AdminPanelSettings,
  AddModerator,
  Person,
  Close,
} from "@mui/icons-material";

const AllUsers = () => {
  const { users } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.others);
  const user = JSON.parse(localStorage.getItem("profile"))?.result;
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
  }, [dispatch]);

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
  // if (!admin) {
  //   navigate("/posts")
  // }
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

                <Typography variant="body2" className="allTypo">
                  {u.email}
                </Typography>
                <Avatar onClick={() => openUser(u._id)}>
                  <Person sx={{ color: "black" }} />
                </Avatar>
              </div>
            ))}
            {users.map((u) => {
              u.isOwner && (
                <Button
                  // disabled
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
