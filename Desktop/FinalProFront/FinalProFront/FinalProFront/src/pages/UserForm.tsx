import { useState } from "react";
import useUser from "../Services/UserContext";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const UserForm = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  console.log("user", user);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [imgUrl, setimgUrl] = useState<File | null>(null);

  if (!user) {
    console.error(
      "User is undefined. Make sure UserForm is wrapped in UserContext.Provider with a valid user."
    );
    return <div>User information is not available.</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePasswords()) {
      alert("Passwords do not match");
      return;
    }

    setUser({ ...user, username, password, imgUrl });
    const response = await axios
      .put(`http://localhost:3000/user/${user._id}`, user, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response);
      });
    console.log(response);

    // Handle form submission logic here
  };
  const handleCheckPasswordChange = (e) => {
    setCheckPassword(e.target.value);
  };
  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      setimgUrl(e.target.files[0]);
    }
  };
  const validatePasswords = () => {
    return password === checkPassword;
  };

  // Define styles
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "20px",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "right",
    justifyContent: "center",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  };

  const inputStyle = {
    margin: "10px 0",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    width: "200px",
  };

  const buttonStyle = {
    marginTop: "10px",
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#007bff",
    color: "white",
    cursor: "pointer",
  };

  const labelStyle = {
    fontWeight: "bold",
    margin: "10px 0",
    color: "white",
  };

  const imagePreviewStyle = {
    width: "100px",
    height: "100px",
    marginTop: "10px",
  };
  const h1Style = {
    textShadow: `
    -1px -1px 0 #fff,  
     1px -1px 0 #fff,
    -1px  1px 0 #fff,
     1px  1px 0 #fff`,
  };

  return (
    <div style={containerStyle}>
      <h1 style={h1Style}>User Profile</h1>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div>
          <label style={labelStyle}>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Confirm Password:</label>
          <input
            type="password"
            value={checkPassword}
            onChange={handleCheckPasswordChange}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Image:</label>
          <input type="file" onChange={handleImageChange} style={inputStyle} />
          {imgUrl && (
            <img
              src={URL.createObjectURL(imgUrl)}
              alt="Preview"
              style={imagePreviewStyle}
            />
          )}
        </div>
        <button type="submit" style={buttonStyle}>
          Update
        </button>
      </form>
      <button
        onClick={() => {
          setUser({
            _id: "",
            name: "",
            email: "",
            password: "",
            imgUrl: "",
            tokens: [],
          });

          navigate("/");
        }}
        style={{ ...buttonStyle, backgroundColor: "#dc3545" }}
      >
        Log Out
      </button>
    </div>
  );
};

export default UserForm;
