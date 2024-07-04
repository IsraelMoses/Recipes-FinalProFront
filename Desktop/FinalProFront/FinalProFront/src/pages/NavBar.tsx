import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div
      style={{
        margin: 0,
        padding: 10,
        overflow: "hidden",
        backgroundColor: "#333",
      }}
    >
      <nav>
        <ul style={{ listStyleType: "none", margin: 0, padding: 0 }}>
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
          <li style={{ float: "left" }}>
            <Link
              to="/user-form"
              style={{
                display: "block",
                color: "white",
                textAlign: "center",
                padding: "14px 16px",
                textDecoration: "none",
              }}
            >
              Profile
            </Link>
          </li>
          <li style={{ float: "right" }}>
            <Link
              to="/registration"
              style={{
                display: "block",
                color: "white",
                textAlign: "center",
                padding: "14px 16px",
                textDecoration: "none",
              }}
            >
              Registration
            </Link>
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
