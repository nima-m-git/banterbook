import axios from "axios";
import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { motion } from "framer-motion";

const CommentBox = ({ postId, refresh }) => {
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState([]);

  const handleResult = (result) => {
    setErrors(
      result?.errors
        ? result.errors.map((err) => err.msg)
        : result?.err
        ? [result.err]
        : []
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(`/posts/${postId}`, {
        content: comment,
      })
      .then((res) => handleResult(res))
      .catch((err) => setErrors([...errors, err.response.data.err]));

    setComment("");
    refresh();
  };

  return (
    <motion.form
      className="comment-box"
      onSubmit={handleSubmit}
      key="commentBox"
      // initial={{ y: -25, height: "0px" }}
      // animate={{ y: 0, height: "fit-content" }}
      // exit={{ y: -25, height: "0px" }}
      variants={{ collapsed: { scaleY: 0, y: -25 }, open: { scaleY: 1, y: 0 } }}
    >
      <TextareaAutosize
        onChange={(e) => setComment(e.target.value)}
        value={comment}
        rows={1}
        cols={40}
        maxLength={300}
        placeholder="Write a reply..."
      />
      <motion.button className="submit-btn">Submit</motion.button>
      {errors && errors.map((error) => <div className="error">{error}</div>)}
    </motion.form>
  );
};

export { CommentBox };
