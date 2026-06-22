import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("loggedInUser")
  );

  const logout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
    window.location.reload();
  };

  return (
    <nav
      style={{
        background: "#0f172a",
        color: "white",
        padding: "15px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow:
          "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h2
        style={{
          fontSize: "28px",
          fontWeight: "700",
          letterSpacing: "1px",
        }}
      >
        CCMS
      </h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
        }}
      >
        {!user && (
          <>
            <Link
              to="/"
              style={linkStyle}
            >
              Login
            </Link>

            <Link
              to="/signup"
              style={linkStyle}
            >
              Student Sign Up
            </Link>

            <Link
              to="/adminlogin"
              style={linkStyle}
            >
              Admin Login
            </Link>
          </>
        )}

        {user?.role === "student" && (
          <>
            <Link
              to="/student"
              style={linkStyle}
            >
              Dashboard
            </Link>

            <Link
              to="/complaints"
              style={linkStyle}
            >
              Complaints
            </Link>

            <Link
              to="/chatbot"
              style={linkStyle}
            >
              Chatbot
            </Link>

            <button
              onClick={logout}
              style={logoutStyle}
            >
              Logout
            </button>
          </>
        )}

        {user?.role === "admin" && (
          <>
            <Link
              to="/admin"
              style={linkStyle}
            >
              Admin Dashboard
            </Link>

            <button
              onClick={logout}
              style={logoutStyle}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontWeight: "500",
};

const logoutStyle = {
  background: "#ef4444",
  color: "white",
  border: "none",
  padding: "8px 15px",
  borderRadius: "6px",
  cursor: "pointer",
};

export default Navbar;