import { useEffect, useState } from "react";
import Post from "../Post";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import useUser from "../Services/UserContext";
interface PostData {
  title: string;
  content: string;
  _id: string;
  author: string;
  authorName: string;
}

function MyPostsList() {
  const [posts, setPosts] = useState<PostData[]>([]);
  const navigate = useNavigate();
  const { user } = useUser();
  const params = useParams();
  useEffect(() => {
    axios.get<PostData[]>("http://localhost:3000/post").then((response) => {
      console.log(response.data);
      const filteredPosts = response.data.filter(
        (post) => post.authorName == params.userName
      );
      setPosts(filteredPosts);
    });
  }, []);

  function onEditPostClick(postId: string) {
    navigate(`/edit-post/${postId}`);
  }
  const onDelletePostClick = async (postId: string) => {
    await axios.delete(`http://localhost:3000/post/${postId}`);
    navigate(-1);
  };

  return (
    <div>
      <button
        onClick={() => {
          navigate(-1);
        }}
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
      {posts
        .slice()
        .reverse()
        .map((post, index) => (
          <div key={index}>
            <Post post={post} title="Post" />

            <button
              onClick={() => onEditPostClick(post._id)}
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
              Edit Recipe
            </button>
            {
              <button
                onClick={() => onDelletePostClick(post._id)}
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
                Dellete
              </button>
            }
          </div>
        ))}
    </div>
  );
}

export default MyPostsList;
