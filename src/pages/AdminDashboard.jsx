import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/complaints"
      );

      setComplaints(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const updateComplaint = async (complaint) => {
    try {

      await axios.put(
        `http://localhost:5000/api/complaints/${complaint._id}`,
        {
          status: complaint.status,
          remark: complaint.remark,
        }
      );

      alert("Complaint Updated Successfully");

      fetchComplaints();

    } catch (error) {

      console.log(error);

      alert("Failed to update complaint");

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

  return (
    <div
      style={{
        maxWidth: "1300px",
        margin: "35px auto",
        padding: "20px",
      }}
    >

      {/* Header */}

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
            marginBottom: "10px",
          }}
        >
          Admin Dashboard
        </h1>

        <p
          style={{
            color: "#64748b",
            fontSize: "17px",
          }}
        >
          Manage student complaints efficiently
        </p>
      </div>

      {/* Dashboard Cards */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(4,1fr)",
          gap: "20px",
          marginBottom: "35px",
        }}
      >

        <Card
          title="Total"
          value={total}
          color="#2563eb"
        />

        <Card
          title="Pending"
          value={pending}
          color="#f59e0b"
        />

        <Card
          title="In Progress"
          value={inProgress}
          color="#3b82f6"
        />

        <Card
          title="Resolved"
          value={resolved}
          color="#22c55e"
        />

      </div>
            {/* Complaint Table */}

      <div
        style={{
          background: "#fff",
          borderRadius: "15px",
          boxShadow:
            "0 8px 20px rgba(0,0,0,.08)",
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
            Complaint Management
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
              <th style={thStyle}>Student</th>

              <th style={thStyle}>Complaint</th>

              <th style={thStyle}>Category</th>

              <th style={thStyle}>Priority</th>

              <th style={thStyle}>Status</th>

              <th style={thStyle}>
                Admin Remark
              </th>

              <th style={thStyle}>
                Action
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
                  {item.studentName}
                </td>

                <td style={tdStyle}>
                  {item.title}
                </td>

                <td style={tdStyle}>
                  {item.category}
                </td>

                <td style={tdStyle}>

                  <span
                    style={{
                      padding:
                        "5px 12px",
                      borderRadius:
                        "20px",
                      color: "#fff",
                      background:
                        item.priority ===
                        "High"
                          ? "#ef4444"
                          : item.priority ===
                            "Medium"
                          ? "#f59e0b"
                          : "#22c55e",
                    }}
                  >
                    {item.priority}
                  </span>

                </td>

                <td style={tdStyle}>

                  <select
                    value={item.status}
                    onChange={(e) => {

                      const updated =
                        [...complaints];

                      updated.find(
                        (c) =>
                          c._id ===
                          item._id
                      ).status =
                        e.target.value;

                      setComplaints(
                        updated
                      );

                    }}
                    style={{
                      padding: "8px",
                      borderRadius:
                        "8px",
                    }}
                  >
                    <option>
                      Pending
                    </option>

                    <option>
                      In Progress
                    </option>

                    <option>
                      Resolved
                    </option>

                  </select>

                </td>

                <td style={tdStyle}>

                  <textarea
                    rows="3"
                    placeholder="Write remark..."
                    value={
                      item.remark || ""
                    }
                    onChange={(e) => {

                      const updated =
                        [...complaints];

                      updated.find(
                        (c) =>
                          c._id ===
                          item._id
                      ).remark =
                        e.target.value;

                      setComplaints(
                        updated
                      );

                    }}
                    style={{
                      width: "230px",
                      padding: "10px",
                      borderRadius:
                        "8px",
                      border:
                        "1px solid #cbd5e1",
                      resize: "none",
                    }}
                  />

                </td>

                <td style={tdStyle}>

                  <button
                    onClick={() =>
                      updateComplaint(
                        item
                      )
                    }
                    style={{
                      background:
                        "#2563eb",
                      color: "#fff",
                      border: "none",
                      padding:
                        "10px 18px",
                      borderRadius:
                        "8px",
                      cursor:
                        "pointer",
                      fontWeight:
                        "600",
                    }}
                  >
                    Update
                  </button>

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

export default AdminDashboard;