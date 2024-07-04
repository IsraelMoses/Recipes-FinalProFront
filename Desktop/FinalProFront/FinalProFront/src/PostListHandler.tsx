import PostsList from "./PostsList";
import Post from "./Post";
import { IPost } from "./Post";
import { useNavigate } from "react-router-dom";
import MyPostsList from "./pages/myPosts";

function PostListHandler() {
  const navigate = useNavigate();
  const onMyPostsClick = () => {
    const userId = "667c3e649afdbd947d2902b7";
    navigate(`/my-posts/${userId}`, {
      state: { user: userId },
    });
  };
  const onAddPostClick = () => {
    navigate("/edit-post");
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "10px",
      }}
    >
      <button
        onClick={onAddPostClick}
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
        Add Recipe
      </button>
      <button
        onClick={onMyPostsClick}
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
        My Recipes
      </button>

      <PostsList />
    </div>
  );
}

export default PostListHandler;
