import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { CommentBox } from "./CommentBox";

import { base64ToString } from "../../imageBufferDataToString";

const ExpandLikes = ({ post }) => (
  <div className="expanded-likes">
    {post?.likes.map((like, i) => (
      <li key={i}>{like.fullName}</li>
    ))}
  </div>
);

const Post = ({ refresh, post }) => {
  const [expandLikes, setExpandLikes] = useState(false);
  const [showRespond, setShowRespond] = useState(false);

  const likePost = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(`/posts/${post._id}/like`)
        .then((res) => console.log(res.data.msg));
      refresh();
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <div className="post">
      <div className="post-info">
        <Link to={`/users/${post.author._id}`}>
          <div className="profilePic">
            <div className="author">{post.author.fullName}</div>
            {post.author?.image && (
              <img
                src={
                  base64ToString(post.author.image) ||
                  "https://fertilitynetworkuk.org/wp-content/uploads/2017/01/Facebook-no-profile-picture-icon-620x389.jpg"
                }
                alt="profile pic"
                width="50"
              ></img>
            )}
          </div>
        </Link>

        <p className="content">{post.content}</p>
        <div className="stats-bar">
          <span
            className="number-likes"
            onMouseEnter={() => setExpandLikes(true)}
            onMouseLeave={() => setExpandLikes(false)}
          >
            {post?.likes?.length || "0"} Likes
          </span>
          {expandLikes && <ExpandLikes {...{ post }} />}
          {" · "}
          <span>{post?.comments?.length} Comments</span>
        </div>

        <div className="actions-bar">
          <button
            className={`like-button ${post.liked && "active"}`}
            onClick={likePost}
          >
            {!!post.liked ? "Unlike" : "Like"}
          </button>
          <button
            className="comment-button"
            onClick={() => setShowRespond(!showRespond)}
          >
            Comment
          </button>
        </div>
      </div>
      <div className="comments">
        {post.comments &&
          [...post.comments]
            .sort((a, b) => (a.dateAdded > b.dateAdded ? 1 : -1))
            .map((comment) => {
              return (
                <div className="comment" key={comment._id}>
                  <div className="author">{comment?.author?.fullName}</div>
                  <p className="content">{comment.content}</p>
                </div>
              );
            })}
        {showRespond && <CommentBox {...{ refresh }} postId={post._id} />}
      </div>
    </div>
  );
};

export { Post };
