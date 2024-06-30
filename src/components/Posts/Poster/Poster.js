import React, { useState, useContext } from "react";
import "./Poster.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { Card, CardActions, CardContent, CardMedia, Button, Typography,
} from "@mui/material";
import { ThumbUpAlt, Delete, MoreHoriz, ThumbUpAltOutlined,
} from "@mui/icons-material";
import { PostContext } from "../../../context/context";
import { deletePost, likePost } from "../../../actions/postActions";

const Poster = ({ post }) => {
  const { setCurrentId } = useContext(PostContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("profile"));
  const [likes, setLikes] = useState(post?.likes)

  const userId = user?.result?.sub || user?.result._id
  const hasLiked = likes.find((id) => id === userId)

  const handleLike = async () => {
    dispatch(likePost(post._id));
    if (hasLiked) {
      setLikes(likes.filter((like) => like !== userId))
    } else {
      setLikes([ ...likes, userId])
    }
  }
  
  const openPost = (id) => {
    // dispatch(getPostById(id))
    navigate(`/posts/${id}`)}


  const Likes = () => {
    if (likes.length > 0) {
      return likes.find(
        (like) => like === userId
      ) ? (
        <>
          <ThumbUpAlt fontSize="small" />
          &nbsp;
          {likes.length > 2
            ? `You & ${likes.length - 1} others`
            : `${likes.length} like${
                likes.length > 1 ? "s" : ""
              }`}{" "}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}{" "}
        </>
      );
    }
    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };



  return (
    <Card className="posterCard" elevation={4} sx={{ borderRadius: "20px" }}>
        <div className="posterOverlay">
          {(user?.result?.sub === post?.creator ||
            user?.result?._id === post?.creator) && (
            <Button className="posterOverlayBtn"
              sx={{ color: "black", zIndex: 9 }}
              size="small"
              onClick={() => setCurrentId(post._id)}
            >
              <MoreHoriz fontSize="small" />
            </Button>
          )}
        </div>
      <div className="posterDivBtn" onClick={() => openPost(post._id)}>
        <CardMedia
          className="posterMedia"
          sx={{ height: "50px", paddingTop: "100%" }}
          image={post.selectedFile}
          title={post.title}
        />
        <div className="posterOverlay2">
          <Typography sx={{fontSize: {xs:"20px", sm:"15px", md:"15px"}, fontFamily:"monospace"}}>{post.name}</Typography>
        </div>
      </div>
        <div className="posterDetails">
          <Typography variant="body2" color="textSecondary">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <CardContent>
          <Typography variant="h6">{post.title}</Typography>
          <Typography className="posterMessage" variant="body1" gutterBottom>
            {post.message}
          </Typography>
        </CardContent>

        <Typography variant="caption" sx={{paddingLeft:"10px"}}>
          {moment(post.createdAt).fromNow()}
        </Typography>
      <CardActions className="posterActions">
        <Button
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={handleLike}
        >
          <Likes />
        </Button>

        {(user?.result?.sub === post?.creator ||
          user?.result?._id === post?.creator) && (
          <Button
            size="small"
            color="error"
            disabled={!user?.result}
            onClick={() => dispatch(deletePost(post._id))}
          >
            <Delete fontSize="small" />
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Poster;
