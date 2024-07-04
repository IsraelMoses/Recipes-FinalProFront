import { useEffect, useState } from "react";
import Post from "../Post";
import axios from "axios";
import { useNavigate } from "react-router-dom";
interface PostData {
  title: string;
  content: string;
  _id: string;
  author: string;
  authorName: string;
}

function MyPostsList() {
  const [posts, setPosts] = useState<PostData[]>([]);
  useEffect(() => {
    axios.get<PostData[]>("http://localhost:3000/post").then((response) => {
      console.log(response.data);
      const filteredPosts = response.data.filter(
        (post) => post.author == "6681306d4cd70a8f3428ddf2"
      );
      setPosts(filteredPosts);
    });
  }, []);
  const navigate = useNavigate();
  
  function onEditPostClick(postId: string) {
    console.log(`Editing post ${postId}`);
    navigate(`/edit-post/${postId}`);
  }

  const onBackToPostsClick = () => {
    navigate("/");
  };
  return (
    <div>
      <button onClick={onBackToPostsClick}>Back</button>
      {posts.map((post, index) => (
        <div key={index}>
          <Post post={post} title="Post" />
          <button onClick={() => onEditPostClick(post._id)}>Edit</button>
        </div>
      ))}
    </div>
  );
}

export default MyPostsList;
