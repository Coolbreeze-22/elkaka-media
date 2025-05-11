import React, { useEffect } from "react";
import "./PostDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";
import { getPostById } from "../../actions/postActions";
import Comments from "./Comments/Comments";
import { Typography, CircularProgress, Divider, Grid } from "@mui/material";
import RecommendedPost from "./RecommendedPost/RecommendedPost";

export const PostDetails = () => {
  const { post, isLoading } = useSelector((state) => state.posts);

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch({ type: "RESET_POST", payload: null });
    dispatch({ type: "RESET_POSTS", payload: [] });
    dispatch(getPostById(id));
  }, [id]);

  if (isLoading || (!isLoading && post === null)) {
    return (
      <div>
        <CircularProgress size="5em" />
      </div>
    );
  } else if (!isLoading && !post?._id) {
    return (
      <center>
        <h1>No Post</h1>
      </center>
    );
  }
  return (
    <div>
      <div className="postDetailsMain">
        <div className="postDetailsPost">
          <div className="postDetailsDiv1">
            <Typography gutterBottom component="center" sx={{
            fontSize: {
              xs: 18,
              sm: 20
            },
            fontWeight:"500"
          }}>
              {post.title}
            </Typography>
            <Typography variant="body1" gutterBottom component="p" sx={{
            fontSize: {
              xs: 14,
              sm: 16,
            },
          }}>
              {post.message}
            </Typography>
            <Typography variant="h6" gutterBottom color="gray" sx={{
            fontSize: {
              xs: 15,
              sm: 17,
            },
          }}>
              {post.tags.map((tag) => `#${tag} `)}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#8ea5ff",
                padding: "3px",
                fontSize: {
              xs: 14,
              sm: 16,
            },
              }}
            >
              Likes: {post.likes.length}
            </Typography>
            <Typography gutterBottom sx={{ textTransform: "capitalize", fontSize:{xs: 14,
              sm: 16} }}>
              Posted by: {post.name}
            </Typography>
            <Typography variant="body2" gutterBottom color="gray">
              {moment(post.createdAt).fromNow()}
            </Typography>
            <Divider
              sx={{ margin: "10px 5px 10px -5px", backgroundColor: "#24367e" }}
            />
            <Typography variant="body1" paddingBottom={"8px"} sx={{
            fontSize: {
              xs: 14,
              sm: 16
            },
          }}>
              <strong>Realtime Chat - coming soon!</strong>
            </Typography>
          </div>
          <div className="postDetailsImg-wrapper">
            {post.selectedFile && (
              <img
                className="postDetailsImg"
                src={post.selectedFile}
                alt="img"
              />
            )}
          </div>
        </div>
        <div className="postDetailsComment">
          <Comments post={post} />
        </div>
      </div>
      <RecommendedPost />
    </div>
  );
};
