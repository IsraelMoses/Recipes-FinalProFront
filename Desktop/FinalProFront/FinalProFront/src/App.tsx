import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Corrected imports
import CommentsPage from "./Components/CommentsPage";
import PostListHandler from "./PostListHandler";
import MyPostsList from "./pages/myPosts";
import EditPost from "./pages/editPost";
import NavBar from "./pages/NavBar";
import about from "./pages/about";
import UserForm from "./pages/UserForm";
import Registration from "./Components/Registration";

function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" Component={PostListHandler} />
          <Route path="/post-list-handler" Component={PostListHandler} />
          <Route path="/comments-page/:postId" Component={CommentsPage} />
          <Route path="/my-posts/:userId" Component={MyPostsList} />
          <Route path="/edit-post/:postId" Component={EditPost} />
          <Route path="/edit-post" Component={EditPost} />
          <Route path="/about" Component={about} />
          <Route path="/user-form" Component={UserForm} />
          <Route path="/registration" Component={Registration} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
