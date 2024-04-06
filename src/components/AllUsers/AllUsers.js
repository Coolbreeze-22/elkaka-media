import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Grid, Typography, Paper } from "@mui/material";
import { getUsers } from '../../actions/authActions';


const AllUsers = () => {
  const { allUsers } = useSelector((state) => state.auth);
  // OR  // const allUsers = useSelector((state) => state.auth.allUsers);
  console.log(allUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  if (allUsers.length)
    return (
      <Paper>
        {allUsers.map((allUser) => (
          <Grid key={allUser._id} container >
            <Grid item xs={12} sm={6}>
              <Typography>{allUser.name}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>{allUser.email}</Typography>
            </Grid>
          </Grid>
        ))}
      </Paper>
    );
};

export default AllUsers;
