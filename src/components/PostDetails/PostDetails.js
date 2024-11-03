import React, { useEffect } from "react";
import "./PostDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import { getPostById, getRelatedPosts } from "../../actions/postActions";
import Comments from "./Comments/Comments";
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
  Grid,
} from "@mui/material";

export const PostDetails = () => {
  const { post, recommendPosts, isLoading } = useSelector(
    (state) => state.posts
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const recommendedPosts =
    post?._id && recommendPosts.filter(({ _id }) => _id !== post._id);

  const openPost = (postId) => {
    navigate(`/posts/${postId}`);
  };

  useEffect(() => {
    dispatch(getPostById(id));
  }, [id]);

  useEffect(() => {
    if (post?.tags) {
      dispatch(getRelatedPosts({ tags: post?.tags.join(",") }));
    }
  }, [post]);

  const Recommended = ({ title, name, message, likes, selectedFile }) => (
    <div
      style={{
        cursor: "pointer",
        height: "100%",
        backgroundColor: "#020c27",
        borderRadius: "10px",
        boxShadow: "0px 0px 3px 0px #344caa",
      }}
    >
      <div style={{ padding: "5px 5px 0 5px" }}>
        <center className="postDetailsRecommendCenter">
          <b>{name}</b>
        </center>
        <h2>{title}</h2>
        <p>{message}</p>
        <p style={{ color: "red" }}>Likes: {likes.length}</p>
      </div>
      <div style={{ height: "150px" }}>
        {selectedFile && (
          <img
            src={selectedFile}
            alt="img"
            width="100%"
            height="150px"
            style={{ borderRadius: " 0 0 10px 10px" }}
          />
        )}
      </div>
    </div>
  );

  if (isLoading && !post?._id) {
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
            <Typography variant="h5" gutterBottom component="center">
              {post.title}
            </Typography>
            <Typography variant="body1" gutterBottom component="p">
              {post.message}
            </Typography>
            <Typography variant="h6" gutterBottom color="gray">
              {post.tags.map((tag) => `#${tag} `)}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#8ea5ff",
                padding: "3px",
              }}
            >
              Likes: {post.likes.length}
            </Typography>
            <Typography gutterBottom sx={{ textTransform: "capitalize" }}>
              Posted by: {post.name}
            </Typography>
            <Typography variant="body2" gutterBottom color="gray">
              {moment(post.createdAt).fromNow()}
            </Typography>
            <Divider
              sx={{ margin: "10px 5px 10px -5px", backgroundColor: "#344caa" }}
            />
            <Typography variant="body1" paddingBottom={"8px"}>
              <strong>Realtime Chat - coming soon!</strong>
            </Typography>
          </div>
          <div>
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


      {isLoading && !recommendedPosts.length ? (
        <div>
          <CircularProgress size="4em" />
        </div>
      ) : !isLoading && !recommendedPosts.length ? (
        <Paper
          elevation={6}
          sx={{
            textAlign: "center",
            fontSize: "20px",
            padding: "10px 0",
          }}
        >
          Related posts will appear here
        </Paper>
      ) : (
        <div>
          <Typography variant="h6" gutterBottom className="RecommendTypo">
            You might also like:
          </Typography>

          <Grid container spacing={1}>
            {recommendedPosts.map(
              ({ title, message, name, likes, selectedFile, _id }) => (
                <Grid
                  item
                  key={_id}
                  xs={6}
                  sm={3.97}
                  md={2.39}
                  sx={{ fontSize: { xs: "15px", sm: "15px" } }}
                  onClick={() => openPost(_id)}
                >
                  <Recommended
                    title={title}
                    name={name}
                    message={message}
                    likes={likes}
                    selectedFile={selectedFile}
                  />
                </Grid>
              )
            )}
          </Grid>
        </div>
      )}
    </div>
  );
};
