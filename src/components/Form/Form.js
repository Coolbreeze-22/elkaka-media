import React, { useContext, useEffect, useState } from "react";
import "./Form.css";
import { TextField, Button, Grid, Typography, Paper } from "@mui/material";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { createPost, updatePost } from "../../actions/postActions";
import { useSelector } from "react-redux";
import { PostContext } from "../../context/context";

const Form = () => {
  const initial = { title: "", message: "", tags: "", selectedFile: "" };
  const [postData, setPostData] = useState(initial);
  const { currentId, setCurrentId } = useContext(PostContext);
  const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null
  );
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(updatePost(currentId, postData));
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }));
    }
    clear();
  };

  const clear = () => {
    setPostData(initial);
    setCurrentId(null);
  };

  if (!user?.token) {
    return (
      <Paper>
        <Typography variant="h6" align="center">
          Please sign in to create your memories
        </Typography>
      </Paper>
    );
  } else {
    return (
      <Paper className="formPaper" sx={{ boxShadow: "0px 1px 2px 0 gray" }}>
        <form autoComplete="off" noValidate className="formForm" onSubmit={handleSubmit} >
          <Typography variant="h6" textAlign="center">
            {currentId ? "Editing" : "Creating"} a Memory
          </Typography>

          <TextField variant="outlined" label="Title" fullWidth sx={{ marginBottom: "8px" }} value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value }) }/>

          <TextField variant="outlined" fullWidth sx={{ marginBottom: "8px" }} name="title" label="Message" value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />

          <TextField variant="outlined" fullWidth sx={{ marginBottom: "8px" }} name="tags" label="Tags" value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(",") })} />

          <div>
            <FileBase type="file" multiple={false} onDone={({ base64 }) =>   setPostData({ ...postData, selectedFile: base64 })} />
          </div>

          <Button sx={{ marginY: "8px" }} variant="contained" color="primary" size="large" type="submit" fullWidth>
            Submit
          </Button>

          <Button sx={{ marginBottom: "8px" }} className="formButClear formText" variant="contained" color="secondary" size="small" fullWidth onClick={clear}>
            Clear
          </Button>
        </form>
      </Paper>
    );
  }
};

export default Form;
