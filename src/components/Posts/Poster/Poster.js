import React, { useContext } from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography,
} from "@mui/material";
// import DeleteIcon from '@mui/icons-material/Delete';
import { ThumbUpAlt, Delete, MoreHoriz, ThumbUpAltOutlined } from "@mui/icons-material";
import moment from "moment";
import "./Poster.css";
import { PostContext } from "../../../context/context";
import { deletePost, likePost } from "../../../actions/postActions";
import { useDispatch } from "react-redux";


const Poster = ({ post }) => {
  const { setCurrentId } = useContext(PostContext);
  const dispatch = useDispatch();
  // console.log(post._id);
  const user = JSON.parse(localStorage.getItem("profile"));
  // console.log(post?.creator)
  // console.log(user?.result?._id)
  // console.log(user?.result?.sub)

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find((like) => like === (user?.result?.sub || user?.result._id))
      ? (
        <><ThumbUpAlt fontSize="small" />&nbsp;{post.likes.length > 2 ? `You & ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` } </>
      ) : (
        <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'} </>
      )
    }
    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>
  };

  return (
    <Card className="posterCard" sx={{borderRadius:'20px'}}>
      <CardMedia className="posterMedia" sx={{ height: 0, paddingTop: '100%'  }} image={post.selectedFile} title={post.title} />
      <div className="posterOverlay" >
      {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (
        <Button sx={{color: "white", zIndex: 10 }} size="large" onClick={() => setCurrentId(post._id)}>
          <MoreHoriz fontSize="default" />
        </Button>
        )}
      </div>
      <div className="posterOverlay2">
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="h6">{moment(post.createdAt).fromNow()}</Typography>
      </div>
      <div className="posterDetails">
        <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
      </div>
      <CardContent>
        <Typography variant="h6">{post.title}</Typography>
        <Typography className="posterMessage" variant="body1" gutterBottom>{post.message}</Typography>
      </CardContent>
      <CardActions className="posterActions">
        <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
          <Likes />
        </Button>

        {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (
          <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(deletePost(post._id))}>
            <Delete fontSize="small" />
          Delete
          </Button>
          )}
      </CardActions>
    </Card>
  );
};

export default Poster;
