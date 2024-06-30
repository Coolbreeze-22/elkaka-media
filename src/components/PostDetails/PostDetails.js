import React, { useEffect } from "react";
import "./PostDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import { getPostById, getPostsBySearch } from "../../actions/postActions";
import Comments from "./Comments/Comments";
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
  Grid,
} from "@mui/material";

export const PostDetails = () => {
  const { post, posts } = useSelector((state) => state.posts);
  const { isLoading } = useSelector((state) => state.others);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const recommendedPosts =
    post._id && posts.filter(({ _id }) => _id !== post._id);
  // console.log(recommendedPosts);

  const openPost = (postId) => {
    dispatch(getPostById(postId));
    navigate(`/posts/${postId}`);
  };

  useEffect(() => {
    dispatch(getPostById(id));
  }, [id]);

  useEffect(() => {
    if (post.tags) {
      dispatch(getPostsBySearch({ tags: post?.tags.join(",") }));
    }
  }, [post]);

  const Recommended = ({ title, name, message, likes, selectedFile }) => (
    <div
      style={{
        cursor: "pointer",
        height: "100%",
        backgroundColor: "#11255c",
        borderRadius: "10px",
        border: "2px dotted white",
      }}
    >
      <div style={{ padding: "0 5px 0 5px" }}>
        <p className="RecommendP">{name}</p>
        <h2>{title}</h2>
        <p>{message}</p>
        <p style={{color:"red"}}>Likes: {likes.length}</p>
      </div>
      <div>
        {selectedFile && (
          <img src={selectedFile} alt="img" width="100%" height="150px" />
        )}
      </div>
    </div>
  );

  if (!isLoading && !post._id) {
    return (
      <center>
        <h1 className="postsDetailsNoPost">No Post</h1>
      </center>
    );
  } else if (isLoading && !post._id) {
    return (
      <Paper elevation={6}>
        <CircularProgress size="6em" />
      </Paper>
    );
  }
  return (
    <Paper
      elevation={6}
      sx={{ padding: "5px" }} >
      <div className="postDetailsCard">
        <div className="postDetailsDiv">
          <Typography variant="h4" gutterBottom component="center">
            {post.title}
          </Typography>
          <Typography variant="body1" gutterBottom component="p" >
            {post.message}
          </Typography>
          <Typography variant="h6" gutterBottom  component="h2">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
          <Typography gutterBottom sx={{textTransform:"capitalize"}}>Posted by: {post.name}</Typography>
          <Typography variant="body2" gutterBottom color="black">
            {moment(post.createdAt).fromNow()}
          </Typography>
          <Typography variant="body1"  sx={{backgroundColor:"black", color:"red", padding:"3px", width:{xs:"30%", sm:"50%"}, maxWidth:"50%", borderRadius:"5px"}}>
            Likes: {post.likes.length}
          </Typography>
          <Divider sx={{ margin: "10px 4px 10px -5px", backgroundColor:"white" }} />
          <Typography variant="body1" gutterBottom>
            <strong>Realtime Chat - coming soon!</strong>
          </Typography>
        </div>
        <div className="postDetailsDiv2">
          {post.selectedFile && (
            <img className="postDetailsImg" src={post.selectedFile} alt="img" />
          )}
        </div>
      </div>
      <div>
        <Divider sx={{ margin: "20px 0"}} />
        <Comments post={post} />
        <Divider sx={{ margin: "20px 0" }} />
      </div>
      {recommendedPosts.length ? (
        <div className="postDetailsRecommend">
          <Typography variant="h5" gutterBottom className="RecommendTypo">
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
      ) : null}
    </Paper>
  );
};
