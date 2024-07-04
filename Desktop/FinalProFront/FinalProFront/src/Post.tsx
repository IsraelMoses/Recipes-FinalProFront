import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import React from "react";
import "./App.css";
import StyledPostContent from "./App.css";

export interface IPost {
  _id: string;
  authorName: string;
  title: string;
  content: string;
  imgUrl?: string;
  products?: string;
  comments?: Array<{
    comment: string;
    user: string;
  }>;
}
interface IProps {
  post: IPost;
  title: string;
  onRemoveCbk: () => void;
}

const Post = ({ post /*, title, onRemoveCbk*/ }: IProps) => {
  const navigate = useNavigate();

  const onCommentClick = () => {
    navigate(`/comments-page/${post._id}`, {
      state: { comments: post.comments },
    });
  };

  return (
    <>
      <div
        className="post-container"
        style={{ margin: "0 auto", width: "70%" }}
      >
        <h1 className="post-title">{post.title}</h1>
        <p className="post-author">Posted by: {post.authorName}</p>
      </div>
      <div
        className="container text-center"
        style={{ margin: "0 auto", width: "90%" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <div
            className="postContent"
            style={{
              flex: "40%",
              border: "2px solid #ccc",
              borderRadius: "10px",
              padding: "20px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              margin: "10px",
              width: "100px",
              height: "600px",
              overflow: "auto",
            }}
          >
            {post.content}
          </div>
          <div
            style={{
              flex: "20%",
              border: "2px solid #ccc",
              borderRadius: "10px",
              padding: "20px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              margin: "10px",
              width: "100px",
              height: "600px",
              overflow: "auto",
            }}
          >
            <h2>Products:</h2>
            {post.products}
          </div>
          <div
            className="post-image"
            style={{
              position: "relative", // Set position to relative
              flex: "40%",
              border: "2px solid #ccc",
              borderRadius: "10px",
              padding: "20px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              margin: "10px",
              overflow: "hidden", // Ensure the image does not overflow the border
            }}
          >
            {post.imgUrl && (
              <div // Image container with fixed size
                style={{
                  width: "600px", // Fixed width for the container
                  height: "550px", // Fixed height for the container
                  position: "relative", // Relative positioning for the container
                  margin: "0 auto", // Center the container
                }}
              >
                <img
                  src={post.imgUrl}
                  style={{
                    width: "100%", // Image fills the container width
                    height: "100%", // Image fills the container height
                    objectFit: "cover", // Ensure the image covers the area without distorting its aspect ratio
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        className="post-container"
        style={{ margin: "0 auto", width: "70%" }}
      >
        <button
          onClick={onCommentClick}
          type="button"
          className="btn btn-outline-secondary"
          style={{
            border: "2px solid #ccc",
            borderRadius: "10px",
            padding: "10px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            margin: "10px",
          }}
        >
          Comments: {Array.isArray(post.comments) ? post.comments.length : 0}
        </button>
      </div>
    </>
  );

  {
    /*<div
        style={{
          maxWidth: "600px",
          margin: "20px auto",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        {post.imgUrl && (
          
            <img
              src={post.imgUrl}
              alt="description"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          
        )}
        <h1 style={{ color: "#333" }}>{post.title}</h1>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p style={{ color: "#666", flex: "6.5", marginRight: "20px" }}>
            {post.content}
          </p>
          {post.products && (
            <p style={{ color: "#666", flex: "3.5" }}>{post.products}</p>
          )}
        </div>
        <p style={{ color: "#999", fontStyle: "italic" }}>
          Posted by: {post.authorName}
        </p>
        <button
          onClick={onCommentClick}
          style={{
            color: "#999",
            fontStyle: "italic",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            marginBottom: "10px",
          }}
        >
          Comments: {Array.isArray(post.comments) ? post.comments.length : 0}
        </button>
      </div>*/
  }
};

export default Post;
