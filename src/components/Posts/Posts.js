import React from "react";
import { useSelector } from "react-redux";
import "./Posts.css";
import Post from "./Post/Post";
import { Grid, CircularProgress } from "@mui/material";

const Posts = () => {
  const { posts, isLoading } = useSelector((state) => state.posts);

  if (isLoading && !posts.length) {
    return <CircularProgress size="5em" />;
  } else if (!isLoading && !posts.length) {
    return (
      <center>
        <h1 className="postsMessage">No Post</h1>
      </center>
    );
  }
  
  return (
    <Grid container alignItems="stretch" spacing={3}>
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={6} md={3}>
          <Post post={post} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
