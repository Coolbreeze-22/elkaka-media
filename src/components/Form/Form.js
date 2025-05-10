import React, { useContext, useEffect, useState } from "react";
import "./Form.css";
import { TextField, Button, Typography } from "@mui/material";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { createPost, updatePost } from "../../actions/postActions";
import { useSelector } from "react-redux";
import { PostContext } from "../../context/context";
import { useLocation } from "react-router-dom";

const Form = ({ page }) => {
  const userProfile = process.env.REACT_APP_USER_PROFILE;
  const initial = { title: "", message: "", tags: "", selectedFile: "" };
  const { currentId, setCurrentId } = useContext(PostContext);
  const post = useSelector((state) =>
    currentId ? state.posts.posts.find((p) => p._id === currentId) : null
  );
  const [postData, setPostData] = useState(initial);
  const [formError, setFormError] = useState("");

  const storedUser = localStorage.getItem(userProfile);
    const [userData, setUserData] = useState(
      storedUser ? JSON.parse(storedUser) : {}
    );
    const user = userData?.result;
    const token = userData?.token;

  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem(userProfile);
    setUserData(storedUser ? JSON.parse(storedUser) : {});
  }, [location, user?.id]);

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const requiredInput = postData.title && postData.message;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId && post.creatorId === user?.result?._id && requiredInput) {
      dispatch(updatePost(currentId, postData));
      clear();
    } else if (!currentId && requiredInput) {
      const newPost = { ...postData, name: user?.result?.name };
      dispatch(createPost(newPost, page));
      clear();
    } else if (!postData.title || !postData.message) {
      !postData.title ? setFormError("Add title") : setFormError("Add message");
    }
  };

  const clear = () => {
    setPostData(initial);
    setCurrentId(null);
    setFormError("");
  };

  if (!token) {
    return (
      <div className="formNoUser">
        Sign in to create your memories
        <a href="/auth">Sign in</a>
      </div>
    );
  } else {
    return (
      <main className="formMain">
        <form
          autoComplete="off"
          noValidate
          className="formForm"
          onSubmit={handleSubmit}
        >
          <Typography variant="h6" textAlign="center">
            {currentId ? "Edit" : "Create"} a memory
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{ paddingY: "5px", textAlign: "center", color: "red" }}
          >
            {formError && formError}
          </Typography>

          <TextField
            variant="outlined"
            type="text"
            label="Title"
            name="title"
            fullWidth
            className="formTextField"
            value={postData.title}
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
          />

          <TextField
            variant="outlined"
            fullWidth
            name="message"
            label="Message"
            value={postData.message}
            className="formTextField"
            onChange={(e) =>
              setPostData({ ...postData, message: e.target.value })
            }
          />

          <TextField
            variant="outlined"
            fullWidth
            name="tags"
            label="Tags"
            value={postData.tags}
            className="formTextField"
            onChange={(e) =>
              setPostData({ ...postData, tags: e.target.value.split(",") })
            }
          />

          <div>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setPostData({ ...postData, selectedFile: base64 })
              }
            />
          </div>

          <Button
            sx={{ marginY: "20px" }}
            variant="outlined"
            color="primary"
            size="medium"
            type="submit"
            fullWidth
          >
            Submit
          </Button>

          <Button
            sx={{ marginTop: "20px" }}
            variant="outlined"
            color="error"
            size="small"
            // fullWidth
            onClick={clear}
          >
            Clear
          </Button>
        </form>
      </main>
    );
  }
};

export default Form;
