import React, { useState, useRef, useEffect } from "react";
import "./Comments.css";
import { useDispatch } from "react-redux";
import { Typography, TextField, Button, Grid, IconButton } from "@mui/material";
import { commentPost, deleteComment } from "../../../actions/postActions";
import { Delete } from "@mui/icons-material";

const Comments = ({ post }) => {
  const userProfile = process.env.REACT_APP_USER_PROFILE;
  const [comments, setComments] = useState(post?.comments);
  const user = JSON.parse(localStorage.getItem(userProfile))?.result;
  const [userComment, setUserComment] = useState("");
  const dispatch = useDispatch();
  const commentsRef = useRef();
  
  useEffect(() => {
    setComments(post?.comments);
  }, [post._id, post.comments.length]);

  const handleMakeComment = () => {
    const newComment = { message: `${user?.name}: ${userComment}` };
    dispatch(commentPost(newComment, post._id));
    setUserComment("");
    commentsRef.current.scrollIntoView();
  };

  const handleDelete = (commentId, postId) => {
    const post = { postId };
    dispatch(deleteComment(commentId, post));
  };

  return (
    <div className="commentMain">
      <Typography
        gutterBottom
        variant="h6"
        sx={{
          paddingBottom: "15px",
          textAlign: "center",
          display: comments.length ? "true" : "none",
        }}
      >
        Comments
      </Typography>
      <div className="comment">
        <div className={comments?.length ? "comment2a" : "comment2b"}>
          {comments?.length ? (
            comments.map((comment, i) => (
              <Grid
                container
                spacing={1}
                key={i}
                sx={{
                  margin: "10px 0",
                  boxShadow: "0 0px 3px 0px red",
                  borderRadius: "5px",
                  maxWidth: "99%",
                }}
              >
                <Grid item xs={10}>
                  <Typography gutterBottom variant="subtitle1">
                    <b style={{ textTransform: "capitalize" }}>
                      {comment?.message?.split(":")[0]}
                    </b>
                    <br />
                    {comment?.message?.split(": ")[1]}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  {
                  user?.sub === comment?.creatorId ||
                  user?._id === comment?.creatorId ||
                  user?.sub === post?.creatorId ||
                  user?._id === post?.creatorId ||
                  (user?.isOwner && !comment?.isCreatorOwner) ||
                  (user?.isOwner &&
                    comment?.isCreatorOwner &&
                    (user?._id === comment?.creatorId ||
                      user?.level > comment?.creatorLevel)) ||
                  (!user?.isOwner &&
                    !comment?.isCreatorOwner &&
                    user?.isAdmin &&
                    user?.level > comment?.creatorLevel) ? (
                    <IconButton
                      color="error"
                      aria-label="delete"
                      onClick={() => handleDelete(comment._id, post._id)}
                    >
                      <Delete />
                    </IconButton>
                  ) : null}
                </Grid>
                <div ref={commentsRef} />
              </Grid>
            ))
          ) : (
            <center style={{ color: "white" }}>
              <Typography
                gutterBottom
                variant="h6"
                sx={{
                  paddingBottom: "15px",
                }}
              >
                Comments
              </Typography>
              <h2>Hey!</h2>
              <h4>
                <em>
                  {user?._id
                    ? "Be the first to comment"
                    : "Login and be the first to comment"}
                </em>
              </h4>
            </center>
          )}
        </div>
        {user?.name && (
          <div className="comment4">
            <Typography gutterBottom variant="subtitle1" fontStyle={"italic"}>
              Write a comment
            </Typography>
            <TextField
              fullWidth
              rows={3}
              variant="outlined"
              sx={{backgroundColor:"white"}}
              label="Comment"
              multiline
              value={userComment}
              onChange={(e) => setUserComment(e.target.value)}
            />
            <Button
              sx={{ marginTop: "10px" }}
              fullWidth
              disabled={!userComment}
              variant="contained"
              color="primary"
              onClick={handleMakeComment}
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
