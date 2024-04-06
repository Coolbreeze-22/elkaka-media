import React from "react";
import { useSelector } from "react-redux";
import Poster from "./Poster/Poster";
import { Grid, CircularProgress } from '@mui/material';

const Posts = () => {
  const posts = useSelector((state) => state.posts);
  // console.log(posts);
  return (
    !posts.length ? <CircularProgress /> : (
      <Grid className="postsGrid" container alignItems="stretch" spacing={3} >
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={6}>
            <Poster post={post} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Posts;
