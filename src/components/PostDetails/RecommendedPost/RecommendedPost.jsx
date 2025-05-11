import { CircularProgress, Grid, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const RecommendedPost = () => {
  const { post, recommendPosts, isLoading } = useSelector(
    (state) => state.posts
  );
  const navigate = useNavigate();

  const recommendedPosts =
    post?._id && recommendPosts.filter(({ _id }) => _id !== post._id);

  const openPost = (postId) => {
    navigate(`/posts/${postId}`);
  };

  return (
    <>
      {isLoading ? (
        <div style={{ margin: "10px 0" }}>
          <CircularProgress size="4em" />
        </div>
      ) : !isLoading && !recommendedPosts.length ? (
        <div
          elevation={6}
          style={{
            textAlign: "center",
            padding: "10px 0",
            marginTop: "30px",
            boxShadow: "0 0 3px 0 #24367e",
          }}
        >
          Related posts will appear here
        </div>
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
                  <div
                    style={{
                      cursor: "pointer",
                      height: "100%",
                      backgroundColor: "#192735",
                      borderRadius: "10px",
                      boxShadow: "0px 0px 3px 0px #24367e",
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
                </Grid>
              )
            )}
          </Grid>
        </div>
      )}
    </>
  );
};

export default RecommendedPost;
