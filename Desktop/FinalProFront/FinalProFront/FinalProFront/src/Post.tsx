import { useNavigate } from "react-router-dom";
import useUser from "./Services/UserContext";
import { IPost } from "./Interfaces/IPost";
import "./App.css";

interface IProps {
  post: IPost;
  title: string;
  onRemoveCbk: () => void;
}

const Post = ({ post /*, title, onRemoveCbk*/ }: IProps) => {
  const navigate = useNavigate();
  const { user } = useUser();
  const onCommentClick = () => {
    navigate(`/comments-page/${post._id}`, {
      state: { comments: post.comments },
    });
  };

  return (
    <>
      <div
        className="post-container"
        style={{ margin: "0 auto", width: "90%" }}
      >
        <h1
          className="post-title"
          style={{ color: "white", textShadow: "2px 2px 4px #000000" }}
        >
          {post.title}
        </h1>
        <p
          className="post-author"
          style={{ color: "white", textShadow: "2px 2px 4px #000000" }}
        >
          Posted by: {post.authorName}
        </p>
      </div>
      <div
        className="container text-center"
        style={{
          display: "flex",
          flexDirection: "row",
          margin: "0 auto",
          width: "90%",
        }}
      >
        <div
          style={{
            flex: "40%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              marginBottom: "20px",
              border: "2px solid #ccc",
              borderRadius: "10px",
              padding: "20px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              background: "beige",
              overflow: "auto",
            }}
          >
            <h2>Products:</h2>
            {post.products}
          </div>
          <div
            style={{
              flex: "1",
              border: "2px solid #ccc",
              borderRadius: "10px",
              padding: "20px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              background: "beige",
              overflow: "auto",
            }}
          >
            <h3>How To Make it:</h3>
            {post.content}
          </div>
        </div>
        <div
          className="post-image"
          style={{
            position: "relative", // Set position to relative
            flex: "40%",
            //border: "2px solid #ccc",
            borderRadius: "10px",
            padding: "10px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            margin: "10px",
            overflow: "hidden", // Ensure the image does not overflow the border
          }}
        >
          {post.imgUrl && (
            <div // Image container with fixed size
              style={{
                width: "100%", // Fixed width for the container
                height: "100%", // Fixed height for the container
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
                  borderRadius: "10px",
                }}
              />
            </div>
          )}
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
            background: "beige",
          }}
        >
          Comments: {Array.isArray(post.comments) ? post.comments.length : 0}
        </button>
      </div>
    </>
  );
};

export default Post;
