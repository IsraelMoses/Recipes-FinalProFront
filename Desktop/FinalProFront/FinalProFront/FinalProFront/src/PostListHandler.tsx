import PostsList from "./PostsList";
import { useNavigate } from "react-router-dom";
import useUser from "./Services/UserContext";

function PostListHandler() {
  const navigate = useNavigate();
  const { user } = useUser();
  const userName = user?.userName;
  const onMyPostsClick = () => {
    console.log("userName", user);
    navigate(`/my-posts/${userName}`, {
      state: { _id: user?._id, userEmail: user?.email },
    });
  };
  const onAddPostClick = () => {
    navigate(`/edit-post/`);
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
      {user?.name !== "" && user?.name !== "default" && (
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <button
            onClick={onAddPostClick}
            type="button"
            className="btn btn-outline-secondary"
            style={{
              display: "inline-block", // Makes the button an inline-block element
              width: "auto", // Adjusts the width to fit the content
              border: "2px solid #ccc",
              borderRadius: "10px",
              padding: "10px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              margin: "10px", // Adjusts margin for spacing between buttons
              background: "beige",
            }}
          >
            Add Recipe
          </button>
          <button
            onClick={onMyPostsClick}
            type="button"
            className="btn btn-outline-secondary"
            style={{
              display: "inline-block", // Makes the button an inline-block element
              width: "auto", // Adjusts the width to fit the content
              border: "2px solid #ccc",
              borderRadius: "10px",
              padding: "10px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              margin: "10px", // Adjusts margin for spacing between buttons
              background: "beige",
            }}
          >
            My Recipes
          </button>
        </div>
      )}

      <PostsList />
    </div>
  );
}

export default PostListHandler;
