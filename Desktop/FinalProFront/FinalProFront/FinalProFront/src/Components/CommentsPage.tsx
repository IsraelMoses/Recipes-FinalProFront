import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import useUser from "../Services/UserContext";

const CommentsPage = () => {
  const location = useLocation();
  const { postId } = useParams();
  const { user } = useUser();
  const userName = user?.name || user?.userName;
  interface LocationState {
    comments: Array<{ user: string; comment: string }>;
  }
  const comments = (location.state as LocationState)?.comments;
  const onBackToPostsClick = () => {
    window.history.back();
  };
  const [showCommentBox, setShowCommentBox] = useState(false);
  const onAddCommentClick = () => {
    setShowCommentBox(true);
  };
  const onSendCommentClick = async () => {
    console.log(postId);
    const comment = (document.querySelector("textarea") as HTMLTextAreaElement)
      .value;
    comments?.push({ user: userName, comment });
    try {
      const response = await axios.put(
        `http://localhost:3000/post/comments/${postId}`,
        { comments },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${localStorage.getItem("token")}`,
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
      <button
        onClick={onBackToPostsClick}
        type="button"
        className="btn btn-outline-secondary"
        style={{
          border: "2px solid #ccc",
          borderRadius: "10px",
          padding: "10px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          margin: "10px",
          background: "beige",
        }}
      >
        Back
      </button>
      {userName && (
        <button
          onClick={onAddCommentClick}
          type="button"
          className="btn btn-outline-secondary"
          style={{
            border: "2px solid #ccc",
            borderRadius: "10px",
            padding: "10px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            margin: "10px",
            background: "beige",
          }}
        >
          Add Comment
        </button>
      )}
      {showCommentBox && (
        <div>
          <textarea
            placeholder="Enter your comment here..."
            style={{
              border: "2px solid #ccc",
              borderRadius: "10px",
              padding: "10px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              margin: "10px",
              background: "beige",
            }}
          ></textarea>
          <button
            onClick={onSendCommentClick}
            style={{
              border: "2px solid #ccc",
              borderRadius: "10px",
              padding: "10px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              margin: "10px",
              background: "beige",
            }}
          >
            Send
          </button>
        </div>
      )}
      {comments
        ?.slice()
        .reverse()
        .map((comment: { user: string; comment: string }, index: number) => (
          <div key={index} style={{ margin: "10px 0" }}>
            <p
              style={{
                fontWeight: "bold",
                marginBottom: "5px",
                color: "white",
                textShadow: "2px 2px 4px #000000",
              }}
            >
              {"User: " + comment.user}
            </p>
            <div
              style={{
                backgroundColor: "#f0f0f0",
                padding: "20px",
                borderRadius: "10px",
                border: "1px solid #ccc",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                width: "50%",
                background: "beige",
              }}
            >
              {comment.comment}
            </div>
          </div>
        ))}
    </div>
  );
};

export default CommentsPage;
