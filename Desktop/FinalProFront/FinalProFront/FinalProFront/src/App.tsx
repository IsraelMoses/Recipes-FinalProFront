import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Corrected imports
import CommentsPage from "./Components/CommentsPage";
import PostListHandler from "./PostListHandler";
import MyPostsList from "./pages/myPosts";
import EditPost from "./pages/editPost";
import NavBar from "./pages/NavBar";
import about from "./pages/about";
import UserForm from "./pages/UserForm";
import Registration from "./Components/Registration";
import LoginCompo from "./Components/LoginCompo";
import "./App.css";

function App() {
  return (
    <div className="app-container" style={{ display: "flex" }}>
      <div className="body">
        <Router>
          <NavBar />

          <Routes>
            <Route path="/home" Component={PostListHandler} />
            <Route path="/" Component={PostListHandler} />
            <Route path="/registration" Component={Registration} />
            <Route path="/login" Component={LoginCompo} />
            <Route path="/profile" Component={UserForm} />
            <Route
              path="/post-list-handler/:userName"
              Component={PostListHandler}
            />
            <Route path="/comments-page/:postId" Component={CommentsPage} />
            <Route path="/my-posts/:userName" Component={MyPostsList} />
            <Route path="/edit-post/:postId" Component={EditPost} />
            <Route path="/edit-post" Component={EditPost} />
            <Route path="/about" Component={about} />
          </Routes>
        </Router>
        <iframe
          style={{
            position: "fixed",
            top: "80px", // Adjust this value to be just below your navbar
            right: "8px", // Keeps the sidebar's horizontal position
            borderRadius: "12px",
            width: "200px", // Adjust the width as needed
            height: "100vh", // Adjust the height as needed
            zIndex: 1000, // Ensure the sidebar floats above other content
          }}
          src="https://open.spotify.com/embed/show/3Ll536l6jMVQ0c1bZWqbDm?utm_source=generator"
          width="60%"
          height="100vh"
        ></iframe>
      </div>
    </div>
  );
}

export default App;
