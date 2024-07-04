import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";

const CommentsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { postId } = useParams();
  interface LocationState {
    comments: Array<{ user: string; comment: string }>;
  }
  const comments = (location.state as LocationState)?.comments;
  const onBackToPostsClick = () => {
    navigate("/");
  };
  const [showCommentBox, setShowCommentBox] = useState(false);
  const onAddCommentClick = () => {
    setShowCommentBox(true);
  };
  const onSendCommentClick = async () => {
    console.log(postId);
    const comment = (document.querySelector("textarea") as HTMLTextAreaElement)
      .value;
    comments?.push({ user: "User", comment });
    try {
      const response = await axios.put(
        `http://localhost:3000/post/${postId}`,
        { comments },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjgxMzA2ZDRjZDcwYThmMzQyOGRkZjIiLCJpYXQiOjE3MTk3NDI1OTcsImV4cCI6MTcyNzUxODU5N30.FB4P-o6s8nlDedipZMCtCajzSG0_SPiDHmN2W4SEdkM",
          },
        }
      );

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    setShowCommentBox(false);
  };

  return (
    <div>
      <button onClick={onBackToPostsClick}>Back</button>
      <button onClick={onAddCommentClick}>Add Comment</button>
      {showCommentBox && (
        <div>
          <textarea placeholder="Enter your comment here..."></textarea>
          <button onClick={onSendCommentClick}>Send</button>
        </div>
      )}
      {comments?.map(
        (comment: { user: string; comment: string }, index: number) => (
          <p key={index}>
            {comment.user}: {comment.comment}
          </p>
        )
      )}
    </div>
  );
};

export default CommentsPage;
