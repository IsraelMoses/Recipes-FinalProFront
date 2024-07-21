import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import useUser from "../Services/UserContext";
function LoginCompo() {
  const { user, setUser } = useUser();

  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleUserEmailChange = (event) => {
    setUserEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onLoginClick = async () => {
    console.log("Login button clicked");
    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        email: userEmail,
        password: password,
      });
      const accessToken = response.data.accessToken;
      const userName = response.data.userName;

      console.log("Login response: ", response.data.accessToken);
      if (accessToken) {
        alert("Login successful");
        localStorage.setItem("accessToken", accessToken);
        const tokens = [...user.tokens, accessToken];
        setUser({
          _id: response.data._id,
          password: password,
          email: response.data.email,
          name: response.data.userName,
          tokens: tokens,
        });
        console.log("user", user.user);
        navigate(`/post-list-handler/${userName}`, {
          state: { userEmail: userEmail },
        });
      } else alert("User not found");
    } catch (error) {
      console.error("Login error: ", error);
    }
  };
  return (
    <div
      style={{
        height: "600px",
        width: "400px",
        margin: "0 auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "5px",

        //boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "white",
          textShadow: "2px 2px 4px #000000",
        }}
      >
        Login
      </h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <label
          style={{
            marginBottom: "10px",
            color: "white",
            textShadow: "1px 1px 2px #000000",
          }}
        >
          UserEmail:
          <input
            type="text"
            name="email"
            value={userEmail}
            onChange={handleUserEmailChange}
            style={{
              padding: "10px",
              marginTop: "5px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              boxSizing: "border-box",
            }}
          />
        </label>
        <br />
        <label
          style={{
            marginBottom: "10px",
            color: "white",
            textShadow: "1px 1px 2px #000000",
          }}
        >
          Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            style={{
              padding: "10px",
              marginTop: "5px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              boxSizing: "border-box",
            }}
          />
        </label>
        <br />
        <button
          type="button"
          onClick={onLoginClick}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginTop: "20px",
          }}
        >
          Login
        </button>
        <div>
          <p
            style={{
              color: "white",
              textShadow: "1px 1px 2px #000000",
              marginTop: "40px",
              margin: 0,
              padding: 0,
            }}
          >
            Not yet login?{" "}
          </p>
          <Link
            to="/registration"
            style={{
              display: "block",
              textAlign: "center",
              marginTop: 0,
              color: "#007bff",
              textDecoration: "none",
              backgroundColor: "white",
              width: "60%",
              padding: 0,
            }}
          >
            go to Registration
          </Link>
        </div>
      </form>
    </div>
  );
  {
    /*</div>
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "#yourBackgroundColor",
        color: "white",
        textShadow: "2px 2px 4px #000000",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="vstack gap-2 col-md-5 mx-auto"
        style={{
          width: "200px",
          padding: "20px",
        }}
      >
        <h1>Login</h1>
        <div
          style={{
            width: "100%",
            flexDirection: "column",
            alignItems: "center",
            padding: "260px",
          }}
        >
          <form
            onSubmit={(e) => e.preventDefault()}
            style={{
              margin: "20px",
              padding: "20px",
              justifyContent: "space-between",
            }}
          >
            <div className="form-floating" style={{ width: "40%" }}>
              <input
                type="text"
                name="name"
                value={username}
                onChange={handleUsernameChange}
                className="form-control"
                id="floatingInput"
                placeholder=" "
              />
              <label htmlFor="floatingInput">Username</label>
            </div>

            <div className="form-floating" style={{ width: "40%" }}>
              <input
                type="password"
                name="password"
                className="form-control"
                id="floatingPassword"
                placeholder=" "
                value={password}
                onChange={handlePasswordChange}
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>

            <button
              type="button"
              className="btn btn-primary"
              onClick={onLoginClick}
            >
              Login
            </button>
          </form>

          <div>Not yet login?</div>
          <Link to="/registration">Go to Registration</Link>
        </div>
      </div>
    </div>
  );*/
  }

  {
    /*return (
    <div style={{ height: "600px" }}>
      <h1>Login</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          Username:
          <input
            type="text"
            name="name"
            value={username}
            onChange={handleUsernameChange}
          />
        </label>
        <br />
        <label htmlFor="floatingPassword">
          Password:
          <input
            type="password"
            name="password"
            className="form-control"
            id="floatingPassword"
            placeholder="
                "
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <br />
        <button
          type="button"
          className="btn btn-primary"
          onClick={onLoginClick}
        >
          Login
        </button>
      </form>

      <Link to="/registration">
        {"Not yet login?" + "\n"}
        <br />
        {"go to Registration"}
      </Link>
    </div>
  );*/
  }
}

export default LoginCompo;
