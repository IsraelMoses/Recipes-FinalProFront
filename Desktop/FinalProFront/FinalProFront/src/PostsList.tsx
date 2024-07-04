import { useEffect, useState } from "react";
import Post from "./Post";
import axios from "axios";
interface PostData {
  title: string;
  content: string;
  owner: string;
}

function PostsList() {
  const [posts, setPosts] = useState<PostData[]>([]);
  useEffect(() => {
    axios.get<PostData[]>("http://localhost:3000/post").then((response) => {
      console.log(response.data);
      setPosts(response.data);
    });
  }, []);
  return (
    <div>
      {posts.map((post, index) => (
        <Post key={index} post={post} title="Post" />
      ))}
    </div>
  );
}

export default PostsList;
