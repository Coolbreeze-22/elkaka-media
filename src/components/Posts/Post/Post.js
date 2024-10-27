import React, { useState, useContext } from "react";
import "./Post.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import {
  ThumbUpAlt,
  Delete,
  Edit,
  MoreHoriz,
  ThumbUpAltOutlined,
  Comment,
} from "@mui/icons-material";
import { PostContext } from "../../../context/context";
import {
  deletePost,
  likePost,
  getPostById,
} from "../../../actions/postActions";

const Post = ({ post }) => {
  const userProfile = process.env.REACT_APP_USER_PROFILE;
  const { setCurrentId } = useContext(PostContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem(userProfile))?.result;
  const [likes, setLikes] = useState(post?.likes);
  const [isInfo, setIsInfo] = useState(false);

  const userId = user?.sub || user?._id;
  const hasLiked = likes.find((id) => id === userId);

  const handleLike = async () => {
    dispatch(likePost(post._id));
    if (hasLiked) {
      setLikes(likes.filter((like) => like !== userId));
    } else {
      setLikes([...likes, userId]);
    }
  };

  const openPost = (id) => {
    navigate(`/posts/${id}`);
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
          <ThumbUpAlt fontSize="small" />
          &nbsp;
          {likes.length > 2
            ? `You & ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`}{" "}
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
    <div className="posterCard" >
      <div className="posterOverlay">
        <Button
          className="posterOverlayBtn"
          sx={{ color: "white", zIndex: 9}}
          size="small"
          onClick={() => setIsInfo(!isInfo)}
        >
          <MoreHoriz />
        </Button>
      </div>
      {isInfo && (
        <div className="postInfo">
          <h4 className="postInfoH4">
            <div className="postInfoDiv1" onClick={() => openPost(post._id)}>
              <IconButton>
              <Comment color="success" />
              </IconButton>
              Comments
            </div>
            {(user?.sub === post?.creatorId ||
              user?._id === post?.creatorId) && (
              <div
                className="postInfoDiv1"
                disabled={!user?._id && !user?.sub}
                onClick={() => {setCurrentId(post._id); setIsInfo(false)}}
              ><IconButton>
                <Edit color="warning"/>
                </IconButton>
                Edit
              </div>
            )}
            {user?.sub === post?.creatorId ||
            user?._id === post?.creatorId ||
            (user?.isOwner && !post?.isCreatorOwner) ||
            (user?.isOwner &&
              post?.isCreatorOwner &&
              (user?._id === post?.creatorId ||
                user?.level > post?.creatorLevel)) ||
            (!user?.isOwner &&
              !post?.isCreatorOwner &&
              user?.isAdmin &&
              user?.level > post?.creatorLevel) ? (
              <div
                className="postInfoDiv1"
                disabled={!user?._id && !user?.sub}
                onClick={() => dispatch(deletePost(post._id))}
              >
                <IconButton>
                  <Delete color="error"/>
                </IconButton>
                Delete
              </div>
            ) : null}
          </h4>
        </div>
      )}
      <header className="posterHeader" onClick={() => openPost(post._id)}>
        <Typography
          sx={{
            fontSize: { xs: "15px", sm: "15px", md: "15px" },
            fontFamily: "monospace",
          }}
        >
          {post.name}
        </Typography>
      </header>
      <CardContent onClick={() => setIsInfo(false)}>
        <Typography variant="h6">{post.title}</Typography>
        <Typography className="posterMessage" variant="body1" gutterBottom>
          {post.message}
        </Typography>
      </CardContent>
        <Typography variant="body2" color="darkgray" sx={{margin:"3px"}}>
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      <Typography variant="caption" sx={{ paddingLeft: "10px" }}>
        {moment(post.createdAt).fromNow()}
      </Typography>
      <CardActions>
        <Button
          size="small"
          color="primary"
          variant="contained"
          disabled={!user?._id && !user?.sub}
          onClick={handleLike}
        >
          <Likes />
        </Button>
        <Button
          size="small"
          color="success"
          variant="contained"
          disabled={!user?._id && !user?.sub}
          onClick={() => openPost(post._id)}
        >
          <Comment fontSize="small" />
        </Button>
      </CardActions>
      <div className="posterDivBtn" onClick={() => openPost(post._id)}>
      {post.selectedFile ?
        <CardMedia
          className="posterMedia"
          sx={{ paddingTop: "100%" }}
          image={post.selectedFile}
          title={post.title}
        /> : <footer
        className="posterNoMedia"
        onClick={() => openPost(post._id)}
      >
        <em>see more...</em>
      </footer>}
      </div>
    </div>
  );
};

export default Post;
