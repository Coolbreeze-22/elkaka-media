import React, { useEffect, useState } from "react";
import "./Home.css";
import { useDispatch } from "react-redux";
import { getPosts, getPostsBySearch } from "../../actions/postActions";
import { Grid, Grow, Container, Paper, AppBar, TextField, Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
// import { Chip } from "@mui/material";

import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import Paginate from "../Pagination/Pagination";


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const dispatch = useDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);


  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const searchPost = () => {
    if(title.trim() || tags) {
      dispatch(getPostsBySearch({ title, tags: tags.join(',') }));
      navigate(`/posts/search?title=${title || 'none'}&tags=${tags.join(',')}`);
    } else {
      navigate('/')
    }
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      searchPost()
    }
  };

  return (
    <Grow in>
      <Container>
        <Grid
          container
          justify=" space-between"
          alignItems="stretch"
          spacing={3}
          className="HomeGrid"
        >
          <Grid item xs={12} sm={6} md={3} className="HomeGrid1">
            <AppBar className="homeAppBar" position="static" color="inherit">
              <TextField
                name="memories"
                label="Search Memories"
                value={title}
                variant="outlined"
                fullWidth
                onKeyDown={handleKeyDown}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                name="tags"
                label="Search Tags"
                value={tags}
                variant="outlined"
                sx={{ margin: "10px 0" }}
                fullWidth
                onKeyDown={handleKeyDown}
                onChange={(e) => setTags(e.target.value.split(","))}
              />
              <Button onClick={searchPost} className="HomeSearchBtn"                 variant="contained" color="primary">Search</Button>
            </AppBar>
            <Form />
            <Paper elevation={6} className="HomePaper">
              <Paginate />
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={9}>
            <Posts />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
