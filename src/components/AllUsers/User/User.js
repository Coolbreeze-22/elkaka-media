import React, { useEffect, useState } from "react";
import "./User.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import moment from "moment";
import {
  getUserById,
  makeAdmin,
  removeAdmin,
  adminLevels,
  deleteUser,
} from "../../../actions/userActions";
import {
  Container,
  Typography,
  TextField,
  CircularProgress,
  Grid,
  Button,
  IconButton,
  Avatar,
  InputAdornment,
} from "@mui/material";
import { AdminPanelSettings, Close } from "@mui/icons-material";

const User = () => {
  const userProfile = process.env.REACT_APP_USER_PROFILE;
  const {
    user,
    error: { userError },
    isLoading,
  } = useSelector((state) => state.auth);

  const localUser = JSON.parse(localStorage.getItem(userProfile)).result;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [level, setLevel] = useState("");
  const [activeId, setActiveId] = useState("");
  const [deleteWarningId, setDeleteWarningId] = useState("");
  const [levelError, setLevelError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { id } = useParams();

  useEffect(() => {
    dispatch(getUserById(id));
  }, [id]);

  const handleErrorMessage = (message) => {
    if (message) {
      setErrorMessage(message);
      setTimeout(() => {
        setErrorMessage("");
      }, 4000);
    }
  };

  const adminLevel = (id) => {
    setActiveId(id);
    setTimeout(() => {
      setActiveId("");
    }, 3000);
  };

  const handleMakeAdmin = async (id) => {
    const message = await dispatch(makeAdmin(id));
    handleErrorMessage(message);
  };

  const handleRemoveAdmin = async (id) => {
    const message = await dispatch(removeAdmin(id));
    handleErrorMessage(message);
  };

  const handleLevel = async (id) => {
    if (level > 0 && level < 4) {
      const message = await dispatch(adminLevels(id, { newLevel: level }));
      setLevel("");
      handleErrorMessage(message);
    } else {
      setLevelError(true);
      setTimeout(() => {
        setLevelError(false);
      }, 4000);
    }
  };

  const handleDeleteUser = async (id) => {
    const message = await dispatch(deleteUser(id));
    navigate("/users");
    setDeleteWarningId("");
    handleErrorMessage(message);
  };

  return (
    <Container maxWidth="sm" className="user">
      {isLoading ? (
        <CircularProgress size="3em" />
      ) : !isLoading && !user.email ? (
        <center>
          <h1 className="postsMessage">No Users</h1>
        </center>
      ) : (
        <>
          <center>
            <Avatar
              src={user.name.charAt(0)}
              alt={user.name.charAt(0)}
              sx={{
                marginBottom: "15px",
                height: "60px",
                width: "60px",
                border: "2px solid white",
              }}
            >
              {user?.name?.charAt(0).toUpperCase()}
            </Avatar>
          </center>

          {user?.email && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography className="userTypo1">
                  <span className="userSpan">Name: </span>
                  {user.name}
                  {user.isAdmin && (
                    <>
                      <IconButton onClick={() => adminLevel(user._id)}>
                        <AdminPanelSettings sx={{ color: "greenYellow" }} />
                        {activeId === user._id && (
                          <Typography color="greenYellow">
                            {user.level}
                          </Typography>
                        )}
                      </IconButton>
                      {user.isOwner && (
                        <IconButton>
                          <AdminPanelSettings sx={{ color: "red" }} />
                        </IconButton>
                      )}
                    </>
                  )}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography height="100%" className="userTypo1">
                  <span className="userSpan">Email: </span>
                  {user.email}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography height="100%" className="userTypo1">
                  <span className="userSpan">Admin level: </span>
                  {user.level}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography height="100%" className="userTypo1">
                  <span className="userSpan">Created: </span>
                  {moment(user.createdAt).fromNow()}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography height="100%" className="userTypo1">
                  <span className="userSpan">Updated: </span>
                  {moment(user.updatedAt).fromNow()}
                </Typography>
              </Grid>
            </Grid>
          )}

          {user.isAdmin ? (
            <>
              {localUser.level > user.level || localUser.isOwner ? (
                <>
                  <center className="userCenter">
                    {levelError && (
                      <div style={{ color: "red", padding: "0 0 5px 0" }}>
                        Level from 0 - 3
                      </div>
                    )}
                    {errorMessage && (
                      <div style={{ color: "red", padding: "0 0 5px 0" }}>
                        {errorMessage}
                      </div>
                    )}
                    <TextField
                      variant="outlined"
                      label="Admin Level"
                      name="adminLevel"
                      value={level}
                      type="number"
                      size="small"
                      sx={{
                        backgroundColor: "#ffffffda",
                        borderRadius: "15px",
                      }}
                      onChange={(e) => setLevel(e.target.value)}
                      InputProps={
                        level && {
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={() => setLevel("")}>
                                <Close />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }
                      }
                    />
                  </center>
                  <center className="userCenter">
                    <Button
                      variant="contained"
                      color="success"
                      sx={{ width: "80%", borderRadius: "30px" }}
                      onClick={() => handleLevel(user._id)}
                    >
                      EDIT USER
                    </Button>
                  </center>
                </>
              ) : null}
            </>
          ) : (
            <center>
              <Button
                variant="contained"
                color="success"
                size="small"
                style={{ marginTop: "20px", marginBottom: "10px" }}
                onClick={() => handleMakeAdmin(user._id)}
              >
                MAKE ADMIN
              </Button>
            </center>
          )}

          {deleteWarningId && (
            <div>
              Are you sure you want to delete this user ?
              <center>
                <Button
                  variant="outlined"
                  color="error"
                  sx={{ margin: "10px 80px 0 0" }}
                  onClick={() => handleDeleteUser(user._id)}
                >
                  YES
                </Button>
                <Button
                  variant="outlined"
                  color="success"
                  onClick={() => setDeleteWarningId("")}
                >
                  CANCEL
                </Button>
              </center>
            </div>
          )}

          {localUser.isAdmin && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
              }}
            >
              {(user.isAdmin && localUser.level > user.level) ||
              (user.isAdmin && localUser.isOwner) ? (
                <Button
                  variant="contained"
                  color="success"
                  size="small"
                  onClick={() => handleRemoveAdmin(user._id)}
                >
                  REMOVE ADMIN
                </Button>
              ) : null}

              {localUser.level > user.level ||
              localUser._id === user._id ||
              localUser.isOwner ? (
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  disabled={deleteWarningId ? true : false}
                  onClick={() => setDeleteWarningId(user._id)}
                >
                  DELETE USER
                </Button>
              ) : null}
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default User;
