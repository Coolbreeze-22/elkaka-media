import React, { useState, useEffect } from "react";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import Paginate from "../Pagination/Pagination";
import { getPostsBySearch, getPosts } from "../../actions/postActions";

import { Grid, Grow, Container, Paper, TextField, Button } from "@mui/material";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const { posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get("page") || 1;
  const myTitle = query.get("title") || "none";
  const myTags = query.get("tags") || "none";
  const [title, setTitle] = useState(myTitle !== "none" ? myTitle : "");
  const [tags, setTags] = useState(myTags !== "none" ? [myTags] : []);


  const searchPost = () => {
    if (title || tags.length) {
      dispatch(
        getPostsBySearch({ title: title.trim(), tags: tags.join(","), page })
      );
      navigate(
        `/posts/search?title=${title || "none"}&tags=${
          tags.join(",") || "none"
        }&page=${page}`
      );
    }
  };

  const clear = () => {
    setTitle("");
    setTags([]);
  };

  useEffect(() => {
      if (myTitle !== "none" || myTags !== "none") {
        setTitle(myTitle !== "none" ? myTitle : "");
        dispatch(
          getPostsBySearch({
            title: myTitle !== "none" ? myTitle.trim() : "",
            tags: tags.join(","),
            page,
          })
        );
      } else if (myTitle === "none" && myTags === "none") {
        dispatch(getPosts(page));
        clear()
      }
  }, [page, myTitle, navigate]);

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  return (
    <Grow in>
      <Container>
        <Grid container spacing={3} className="HomeGrid">
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              sx={{ boxShadow: "0px 0px 1.5px 0 black" }}
              className="homeAppBar"
              color="inherit"
            >
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
              <Button
                fullWidth
                className="HomeSearchBtn"
                variant="contained"
                color="primary"
                onClick={searchPost}
              >
                Search
              </Button>
            </Paper>
            <Form page={page} />
          </Grid>

          <Grid item xs={12} sm={6} md={9} className="HomeGrid2">
            <Posts />
            {posts.length ? (
              <Paper
                sx={{ boxShadow: "0px 0px 1.5px 0 black" }}
                className="HomePaper"
              >
                <Paginate page={page} title={title} tags={tags} />
              </Paper>
            ) : null}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
