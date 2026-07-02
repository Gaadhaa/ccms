import { useEffect, useState } from "react";
import axios from "axios";

function StudentDashboard() {
  const [complaints, setComplaints] = useState([]);

  const currentUser =
    JSON.parse(localStorage.getItem("loggedInUser")) || {};

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/complaints"
      );

      const myComplaints = res.data.filter(
        (c) => c.studentEmail === currentUser.email
      );

      setComplaints(myComplaints);

    } catch (error) {
      console.log(error);
    }
  };

  const total = complaints.length;

  const pending = complaints.filter(
    (c) => c.status === "Pending"
  ).length;

  const inProgress = complaints.filter(
    (c) => c.status === "In Progress"
  ).length;

  const resolved = complaints.filter(
    (c) => c.status === "Resolved"
  ).length;

  const getStatusColor = (status) => {
    if (status === "Resolved") return "#22c55e";
    if (status === "In Progress") return "#3b82f6";
    return "#f59e0b";
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      style={{
        maxWidth: "1250px",
        margin: "35px auto",
        padding: "20px",
      }}
    >

      <div
        style={{
          textAlign: "center",
          marginBottom: "35px",
        }}
      >
        <h1
          style={{
            fontSize: "42px",
            color: "#0f172a",
          }}
        >
          Welcome, {currentUser.name}
        </h1>

        <p
          style={{
            color: "#64748b",
            fontSize: "17px",
          }}
        >
          Track all your complaints here.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "20px",
          marginBottom: "35px",
        }}
      >
        <Card title="Total" value={total} color="#2563eb" />
        <Card title="Pending" value={pending} color="#f59e0b" />
        <Card title="In Progress" value={inProgress} color="#3b82f6" />
        <Card title="Resolved" value={resolved} color="#22c55e" />
      </div>
            {/* Complaint Table */}

      <div
        style={{
          background: "#fff",
          borderRadius: "15px",
          boxShadow: "0 8px 20px rgba(0,0,0,.08)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "20px",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          <h2
            style={{
              margin: 0,
              color: "#0f172a",
            }}
          >
            My Complaints
          </h2>
        </div>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr
              style={{
                background: "#f8fafc",
              }}
            >
              <th style={thStyle}>Title</th>

              <th style={thStyle}>Category</th>

              <th style={thStyle}>Priority</th>

              <th style={thStyle}>Date</th>

              <th style={thStyle}>Time</th>

              <th style={thStyle}>Status</th>

              <th style={thStyle}>
                Admin Remark
              </th>
            </tr>
          </thead>

          <tbody>

            {complaints.map((item) => (

              <tr
                key={item._id}
                style={{
                  borderBottom:
                    "1px solid #f1f5f9",
                }}
              >

                <td style={tdStyle}>
                  {item.title}
                </td>

                <td style={tdStyle}>
                  {item.category}
                </td>

                <td style={tdStyle}>

                  <span
                    style={{
                      background:
                        item.priority === "High"
                          ? "#ef4444"
                          : item.priority === "Medium"
                          ? "#f59e0b"
                          : "#22c55e",

                      color: "#fff",

                      padding: "6px 14px",

                      borderRadius: "25px",

                      fontSize: "13px",

                      fontWeight: "600",
                    }}
                  >
                    {item.priority}
                  </span>

                </td>

                <td style={tdStyle}>
                  {formatDate(item.createdAt)}
                </td>

                <td style={tdStyle}>
                  {formatTime(item.createdAt)}
                </td>

                <td style={tdStyle}>

                  <span
                    style={{
                      background:
                        getStatusColor(item.status),

                      color: "#fff",

                      padding: "6px 14px",

                      borderRadius: "25px",

                      fontSize: "13px",

                      fontWeight: "600",
                    }}
                  >
                    {item.status}
                  </span>

                </td>

                <td
                  style={{
                    ...tdStyle,
                    maxWidth: "280px",
                    lineHeight: "1.6",
                  }}
                >
                  {item.remark ? (

                    <div
                      style={{
                        background: "#eff6ff",
                        borderLeft:
                          "4px solid #2563eb",
                        padding: "12px",
                        borderRadius: "8px",
                        color: "#334155",
                        fontSize: "14px",
                      }}
                    >
                      {item.remark}
                    </div>

                  ) : (

                    <span
                      style={{
                        color: "#94a3b8",
                        fontStyle: "italic",
                      }}
                    >
                      No remark yet
                    </span>

                  )}
                </td>

              </tr>

            ))}
                        {complaints.length === 0 && (
              <tr>
                <td
                  colSpan="7"
                  style={{
                    textAlign: "center",
                    padding: "40px",
                    color: "#64748b",
                    fontSize: "17px",
                  }}
                >
                  No complaints found.
                </td>
              </tr>
            )}

          </tbody>
        </table>
      </div>

    </div>
  );
}

// ================= CARD =================

function Card({ title, value, color }) {
  return (
    <div
      style={{
        background: color,
        color: "#fff",
        borderRadius: "14px",
        padding: "22px",
        textAlign: "center",
        boxShadow: "0 8px 18px rgba(0,0,0,.12)",
      }}
    >
      <h3
        style={{
          margin: 0,
          fontSize: "18px",
          fontWeight: "600",
        }}
      >
        {title}
      </h3>

      <h1
        style={{
          marginTop: "12px",
          fontSize: "40px",
          fontWeight: "700",
        }}
      >
        {value}
      </h1>
    </div>
  );
}

// ================= TABLE STYLES =================

const thStyle = {
  padding: "15px",
  textAlign: "left",
  color: "#334155",
  fontWeight: "700",
  fontSize: "15px",
};

const tdStyle = {
  padding: "15px",
  color: "#475569",
  verticalAlign: "top",
};

export default StudentDashboard;