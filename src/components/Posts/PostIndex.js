import axios from "axios";
import { useCallback, useEffect, useState } from "react";

import { PostForm } from "./PostForm";
import { Post } from "./Post";
import "./Posts.scss";

const PostIndex = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  const getPosts = useCallback(() => {
    axios
      .get("/posts")
      .then((res) => {
        setPosts(res.data.posts);
        setError(res?.data.err);
      })
      .catch((err) => {
        setError(err);
        console.log({ err });
      });
  }, []);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <div className="posts-container">
      {error && <div className="error">{error}</div>}
      <PostForm refresh={getPosts} />
      {posts?.map((post) => {
        return <Post {...{ post }} refresh={getPosts} key={post._id} />;
      })}
    </div>
  );
};

export { PostIndex };
