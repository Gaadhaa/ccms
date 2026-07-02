import { useState } from "react";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const sendResetLink = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter your registered email.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        {
          email,
        }
      );

      alert(res.data.message);

      setEmail("");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Something went wrong."
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg,#0f172a,#2563eb)",
      }}
    >
      <div
        style={{
          width: "430px",
          maxWidth: "90%",
          background: "#ffffff",
          padding: "40px",
          borderRadius: "18px",
          boxShadow: "0 12px 35px rgba(0,0,0,.25)",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              fontSize: "60px",
              marginBottom: "10px",
            }}
          >
            🔐
          </div>

          <h1
            style={{
              color: "#2563eb",
              margin: 0,
              fontSize: "34px",
              fontWeight: "700",
            }}
          >
            Forgot Password
          </h1>

          <p
            style={{
              color: "#64748b",
              marginTop: "12px",
              lineHeight: "1.6",
              fontSize: "16px",
            }}
          >
            Enter your registered email address.
            <br />
            We'll send you a secure password reset link.
          </p>
        </div>

        <form onSubmit={sendResetLink}>

          <input
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
            style={{
              width: "100%",
              padding: "15px",
              border: "1px solid #d1d5db",
              borderRadius: "10px",
              fontSize: "16px",
              marginBottom: "22px",
              outline: "none",
            }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "15px",
              background: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              fontSize: "17px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            {loading
              ? "Sending..."
              : "Send Reset Link"}
          </button>

        </form>

      </div>
    </div>
  );
}

export default ForgotPassword;