import React from "react";
import { useSelector } from "react-redux";
import './Posts.css';
import Poster from "./Poster/Poster";
import { Grid, CircularProgress } from '@mui/material';

const Posts = () => {
  const posts = useSelector((state) => state.posts.posts);
  const { isLoading } = useSelector((state) => state.others);

  if (!isLoading && !posts.length ) return <center><h1 className="postsMessage">No Post</h1></center>;

  return (
    isLoading ? <CircularProgress size="5em" /> : (
      <Grid container alignItems="stretch" spacing={3} >
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={6} md={3}>
            <Poster post={post} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Posts;
