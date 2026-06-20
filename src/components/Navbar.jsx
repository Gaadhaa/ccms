import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user =
    JSON.parse(localStorage.getItem("loggedInUser"));

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
      }}
    >
      <h2>CCMS</h2>

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
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              Login
            </Link>

            <Link
              to="/signup"
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              Student Sign Up
            </Link>

            <Link
              to="/adminlogin"
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              Admin Login
            </Link>
          </>
        )}

        {user?.role === "student" && (
          <>
            <Link
              to="/student"
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              Dashboard
            </Link>

            <Link
              to="/complaints"
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              Complaints
            </Link>

            <button
              onClick={logout}
              style={{
                background: "#ef4444",
                color: "white",
                border: "none",
                padding: "8px 15px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        )}

        {user?.role === "admin" && (
          <>
            <Link
              to="/admin"
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              Admin Dashboard
            </Link>

            <button
              onClick={logout}
              style={{
                background: "#ef4444",
                color: "white",
                border: "none",
                padding: "8px 15px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;