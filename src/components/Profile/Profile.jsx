import React, { useState } from "react";
import "./Profile.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { deleteUser } from "../../actions/userActions";
import {
  Container,
  Typography,
  Grid,
  Button,
  IconButton,
  Avatar,
} from "@mui/material";
import { AdminPanelSettings } from "@mui/icons-material";

const Profile = () => {
  const userProfile = process.env.REACT_APP_USER_PROFILE;
  const user = JSON.parse(localStorage.getItem(userProfile))?.result;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeId, setActiveId] = useState("");
  const [deleteWarningId, setDeleteWarningId] = useState("");

  const adminLevel = (id) => {
    setActiveId(id);
    setTimeout(() => {
      setActiveId("");
    }, 3000);
  };


  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
    navigate("/users");
    setDeleteWarningId("");
  };
  if(user?._id)
    return (
      <Container maxWidth="sm" className="profile">
        <center>
          <Avatar
            src={user.name.charAt(0)}
            alt={user.name.charAt(0).toUpperCase()}
            sx={{
              marginBottom: "15px",
              height: "60px",
              width: "60px",
              border: "2px solid white",
            }}
          />
        </center>

        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography className="profileTypo1">
              <span className="profileSpan">Name: </span>
              {user.name}
              {user.isAdmin && (
                <>
                  <IconButton
                    sx={{ color: "greenYellow" }}
                    onClick={() => adminLevel(user._id)}
                  >
                    <AdminPanelSettings />
                    {activeId === user._id && (
                      <Typography>{user.level}</Typography>
                    )}
                  </IconButton>
                  {user.isOwner && (
                    <IconButton sx={{ color: "red" }}>
                      <AdminPanelSettings  />
                    </IconButton>
                  )}
                </>
              )}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography className="profileTypo1">
              <span className="profileSpan">Email: </span>
              {user.email}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography className="profileTypo1">
              <span className="profileSpan">Admin level: </span>
              {user.level}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography className="profileTypo1">
              <span className="profileSpan">Created: </span>
              {moment(user.createdAt).fromNow()}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography className="profileTypo1">
              <span className="profileSpan">Updated: </span>
              {moment(user.updatedAt).fromNow()}
            </Typography>
          </Grid>
        </Grid>

        {deleteWarningId && (
          <div style={{margin:"20px 0 15px 0", color:"red"}}>
            Are you sure you want to delete your account? This action cannot be undone.
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

        <Button
          variant="contained"
          color="error"
          size="small"
          sx={{marginTop:"20px"}}
          disabled={deleteWarningId ? true : false}
          onClick={() => setDeleteWarningId(user._id)}
        >
          DELETE USER
        </Button>
      </Container>
    );
};

export default Profile;
