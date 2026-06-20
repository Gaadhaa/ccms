import { useEffect, useState } from "react";

function StudentDashboard() {
  const [complaints, setComplaints] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    const allComplaints =
      JSON.parse(localStorage.getItem("complaints")) || [];

    const userComplaints = allComplaints.filter(
      (c) => c.studentEmail === currentUser?.email
    );

    setComplaints(userComplaints);
  }, []);

  const pendingCount = complaints.filter(
    (c) => c.status === "Pending"
  ).length;

  const resolvedCount = complaints.filter(
    (c) => c.status === "Resolved"
  ).length;

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      {/* Heading */}
      <div style={{ textAlign: "center", marginBottom: "35px" }}>
        <h1
          style={{
            fontSize: "42px",
            fontWeight: "700",
            color: "#0f172a",
            marginBottom: "8px",
          }}
        >
          Welcome, {currentUser?.name}
        </h1>

        <p
          style={{
            color: "#64748b",
            fontSize: "16px",
          }}
        >
          Track and manage your complaints
        </p>
      </div>

      {/* Stats Cards */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
          marginBottom: "40px",
        }}
      >
        {/* Total */}
        <div
          style={{
            width: "220px",
            height: "130px",
            background: "#2563eb",
            borderRadius: "14px",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ fontSize: "20px", fontWeight: "600" }}>
            Total Complaints
          </div>

          <div
            style={{
              fontSize: "42px",
              fontWeight: "700",
              marginTop: "10px",
            }}
          >
            {complaints.length}
          </div>
        </div>

        {/* Pending */}
        <div
          style={{
            width: "220px",
            height: "130px",
            background: "#f59e0b",
            borderRadius: "14px",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ fontSize: "20px", fontWeight: "600" }}>
            Pending
          </div>

          <div
            style={{
              fontSize: "42px",
              fontWeight: "700",
              marginTop: "10px",
            }}
          >
            {pendingCount}
          </div>
        </div>

        {/* Resolved */}
        <div
          style={{
            width: "220px",
            height: "130px",
            background: "#22c55e",
            borderRadius: "14px",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ fontSize: "20px", fontWeight: "600" }}>
            Resolved
          </div>

          <div
            style={{
              fontSize: "42px",
              fontWeight: "700",
              marginTop: "10px",
            }}
          >
            {resolvedCount}
          </div>
        </div>
      </div>

      {/* Recent Complaints */}
      <div
        style={{
          background: "#fff",
          borderRadius: "15px",
          padding: "25px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#0f172a",
          }}
        >
          Recent Complaints
        </h2>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr
              style={{
                background: "#f1f5f9",
              }}
            >
              <th style={{ padding: "12px" }}>Title</th>
              <th style={{ padding: "12px" }}>Category</th>
              <th style={{ padding: "12px" }}>Status</th>
            </tr>
          </thead>

          <tbody>
            {complaints.map((c, index) => (
              <tr
                key={index}
                style={{
                  textAlign: "center",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                <td style={{ padding: "12px" }}>{c.title}</td>
                <td style={{ padding: "12px" }}>{c.category}</td>
                <td style={{ padding: "12px" }}>{c.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentDashboard;