import React, { useState } from "react";
import "./Home.css";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import Paginate from "../Pagination/Pagination";
import { getPostsBySearch } from "../../actions/postActions";

import { Grid, Grow, Container, Paper, TextField, Button,
} from "@mui/material";
// import { Chip } from "@mui/material";


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const dispatch = useDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get("page") || 1;
  // const searching = query.get("searching");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);

  const searchPost = () => {
    if(title || tags.length) {
      dispatch(getPostsBySearch({ title: title.trim(), tags: tags.join(','), page }));
      navigate(`/posts/search?title=${title || 'none'}&tags=${tags.join(',') || 'none'}&page=${page}`);
    } else {
      navigate('/posts')
    }
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  return (
    <Grow in >
      <Container>
        <Grid
          container
          justify=" space-between"
          alignItems="stretch"
          spacing={3}
          className="HomeGrid"
        >
          <Grid item xs={12} sm={6} md={3} className="HomeGrid1">
            <Paper sx={{ boxShadow: "0px 0px 1.5px 0 black" }} className="homeAppBar" color="inherit">
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
            <Paper sx={{ boxShadow: "0px 0px 1.5px 0 black" }} className="HomePaper">
              <Paginate page={page} title={title} tags={tags} />
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
