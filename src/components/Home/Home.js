import React, { useState, useEffect } from "react";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import Paginate from "../Pagination/Pagination";
import { getPostsBySearch, getPosts } from "../../actions/postActions";
import { Grid, Grow, TextField, Button } from "@mui/material";

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
      const searchError = dispatch(
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
      setTags(myTags !== "none" ? [myTags] : []);
      dispatch(
        getPostsBySearch({
          title: myTitle !== "none" ? myTitle.trim() : "",
          tags: myTags !== "none" ? myTags.trim() : "",
          page,
        })
      );
    } else if (myTitle === "none" && myTags === "none") {
      dispatch(getPosts(page));
      clear();
    }
  }, [page, myTitle, myTags.length]);

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  return (
    <Grow in>
      <div>
        <Grid container spacing={3} className="HomeGrid">
          <Grid item xs={12} sm={4} md={3}>
            <section className="homeSearch">
              <TextField
                name="memories"
                label="Search Memories"
                value={title}
                variant="outlined"
                fullWidth
                className="HomeTextField"
                onKeyDown={handleKeyDown}
                onChange={(e) => setTitle(e.target.value)}
                sx={{
                  backgroundColor: "#ffffffda",
                }}
              />
              <TextField
                name="tags"
                label="Search Tags"
                value={tags}
                variant="outlined"
                className="HomeTextField"
                fullWidth
                onKeyDown={handleKeyDown}
                onChange={(e) => setTags(e.target.value.split(","))}
                sx={{
                  backgroundColor: "#ffffffda",
                }}
              />
              <Button
                fullWidth
                className="HomeSearchBtn"
                variant="outlined"
                color="primary"
                disabled={!title && !tags.length}
                onClick={searchPost}
                sx={{ marginY: "20px" }}
              >
                Search
              </Button>
              <center>
                <Button
                  className="HomeSearchBtn"
                  variant="outlined"
                  color="secondary"
                  disabled={!title && !tags.length}
                  onClick={clear}
                >
                  Clear
                </Button>
              </center>
            </section>
            <Form page={page} />
          </Grid>

          <Grid item xs={12} sm={8} md={9} className="HomeGrid2">
            <Posts />
            {posts.length ? (
              <div className="HomePaginate">
                <Paginate page={page} title={title} tags={tags} />
              </div>
            ) : null}
          </Grid>
        </Grid>
      </div>
    </Grow>
  );
};

export default Home;
