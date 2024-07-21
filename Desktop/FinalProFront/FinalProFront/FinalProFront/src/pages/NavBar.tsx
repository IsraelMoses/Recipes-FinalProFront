import { Link } from "react-router-dom";
import useUser from "../Services/UserContext";

function NavBar() {
  const { user } = useUser();
  return (
    <div
      style={{
        margin: 0,
        padding: 10,
        overflow: "hidden",
        backgroundColor: "#333",
        display: "flex", // Enable flexbox
        justifyContent: "space-between", // Space between items
      }}
    >
      <nav style={{ width: "100%" }}>
        <ul
          style={{
            listStyleType: "none",
            margin: 0,
            padding: 0,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <li style={{ float: "left" }}>
            <Link
              to="/"
              style={{
                display: "block",
                color: "white",
                textAlign: "center",
                padding: "14px 16px",
                textDecoration: "none",
              }}
            >
              Home
            </Link>
          </li>

          <li style={{ flexGrow: 1, textAlign: "center", alignSelf: "center" }}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <span
                style={{
                  background:
                    "linear-gradient(45deg, red, orange, yellow, green, blue, indigo, violet)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: "35px",
                  fontWeight: "bold",
                  width: "900px",
                }}
              >
                KitchenIt
              </span>
            </Link>
          </li>

          <li style={{ float: "right" }}>
            {user != undefined && user.name !== "" ? (
              <Link
                to="/profile"
                style={{
                  display: "block",
                  color: "white",
                  textAlign: "center",
                  padding: "14px 16px",
                  textDecoration: "none",
                }}
              >
                Profile/LogOut
              </Link>
            ) : (
              <Link
                to="/login"
                style={{
                  display: "block",
                  color: "white",
                  textAlign: "center",
                  padding: "14px 16px",
                  textDecoration: "none",
                }}
              >
                Login/Registration
              </Link>
            )}
          </li>

          <li style={{ float: "right" }}>
            <Link
              to="/about"
              style={{
                display: "block",
                color: "white",
                textAlign: "center",
                padding: "14px 16px",
                textDecoration: "none",
              }}
            >
              About
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
