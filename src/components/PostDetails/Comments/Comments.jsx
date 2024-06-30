import React, { useState, useRef } from "react";
import "./Comments.css";
import { Typography, TextField, Button, Grid, IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { commentPost, deleteComment } from "../../../actions/postActions";
import { Delete } from "@mui/icons-material";
// import { v4 as uuidv4 } from "uuid";

const Comments = ({ post }) => {
  const [comments, setComments] = useState(post?.comments);
  const [userComment, setUserComment] = useState("");
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();
  const commentsRef = useRef();
  // console.log(comments);

  const handleClick = async () => {
    const newComment = { message: `${user?.result?.name}: ${userComment}` };
    const finalComment = await dispatch(commentPost(newComment, post._id));
    setComments(finalComment);
    setUserComment("");
    commentsRef.current.scrollIntoView();
  };

  // const handleDelete = async (cId, pId) => {
  //   const post = { pId };
  //   const newComment = await dispatch(deleteComment(cId, post));
  //   setComments(newComment);
  // };

  const handleDelete = (cId, pId) => {
    const post = { pId };
    dispatch(deleteComment(cId, post));
    setComments(comments.filter((c) => c._id !== cId))
  }

  return (
    <div>
      <Typography
        gutterBottom
        variant="h6"
        sx={{
          paddingBottom: "15px",
        }}
      >
        Comments
      </Typography>
      <div className="comment">
        <div className={comments.length ? "comment2a" : "comment2b"}>
          {comments.length ? (
            comments.map((c, i) => (
              <Grid
                container
                spacing={1}
                key={i}
                sx={{
                  margin: "10px 0",
                  boxShadow: "0 0px 2px 0px gray",
                  borderRadius: "5px",
                  maxWidth: "99%",
                }}
              >
                <Grid item xs={10}>
                  <Typography gutterBottom variant="subtitle1">
                    <b style={{ textTransform: "capitalize" }}>
                      {c.message.split(":")[0]}
                    </b>
                    <br />
                    {c.message.split(": ")[1]}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  {(user?.result?.sub === c?.creator ||
                    user?.result?._id === c?.creator ||
                    user?.result?.sub === post?.creator ||
                    user?.result?._id === post?.creator) && (
                    <IconButton
                      sx={{ padding: "0", color: "gray" }}
                      aria-label="delete"
                      onClick={() => handleDelete(c._id, post._id)}
                    >
                      <Delete />
                    </IconButton>
                  )}
                </Grid>
                <div ref={commentsRef} />
              </Grid>
            ))
          ) : (
            <center>
              <h2>Hey!</h2>
              <h4>
                <em>Be the first to comment</em>
              </h4>
            </center>
          )}
        </div>
        {user?.result?.name && (
          <div className="comment4">
            <Typography gutterBottom variant="h6">
              Write a comment
            </Typography>
            <TextField
              fullWidth
              rows={3}
              variant="outlined"
              label="Comment"
              multiline
              value={userComment}
              onChange={(e) => setUserComment(e.target.value)}
              className="commentText"
            />
            <Button
              sx={{ marginTop: "10px" }}
              fullWidth
              disabled={!userComment}
              variant="contained"
              color="primary"
              onClick={handleClick}
            >
              Comment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;
