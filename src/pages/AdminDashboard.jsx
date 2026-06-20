import { useEffect, useState } from "react";

function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const storedComplaints =
      JSON.parse(localStorage.getItem("complaints")) || [];

    setComplaints(storedComplaints);
  }, []);

  const updateStatus = (index, status) => {
    const updated = [...complaints];
    updated[index].status = status;

    setComplaints(updated);
    localStorage.setItem("complaints", JSON.stringify(updated));
  };

  const total = complaints.length;
  const pending = complaints.filter(
    (c) => c.status === "Pending"
  ).length;

  const resolved = complaints.filter(
    (c) => c.status === "Resolved"
  ).length;

  const inProgress = complaints.filter(
    (c) => c.status === "In Progress"
  ).length;

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1
          style={{
            fontSize: "42px",
            fontWeight: "700",
            color: "#0f172a",
            marginBottom: "10px",
          }}
        >
          Admin Dashboard
        </h1>

        <p
          style={{
            color: "#64748b",
            fontSize: "16px",
          }}
        >
          Manage and track student complaints
        </p>
      </div>

      {/* Stats Cards */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          justifyContent: "center",
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
            color: "white",
            borderRadius: "14px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
          }}
        >
          <h3>Total Complaints</h3>
          <h1>{total}</h1>
        </div>

        {/* Pending */}
        <div
          style={{
            width: "220px",
            height: "130px",
            background: "#f59e0b",
            color: "white",
            borderRadius: "14px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
          }}
        >
          <h3>Pending</h3>
          <h1>{pending}</h1>
        </div>

        {/* In Progress */}
        <div
          style={{
            width: "220px",
            height: "130px",
            background: "#3b82f6",
            color: "white",
            borderRadius: "14px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
          }}
        >
          <h3>In Progress</h3>
          <h1>{inProgress}</h1>
        </div>

        {/* Resolved */}
        <div
          style={{
            width: "220px",
            height: "130px",
            background: "#22c55e",
            color: "white",
            borderRadius: "14px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
          }}
        >
          <h3>Resolved</h3>
          <h1>{resolved}</h1>
        </div>
      </div>

      {/* Complaint Table */}
      <div
        style={{
          background: "#fff",
          padding: "25px",
          borderRadius: "15px",
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
          Complaint Management
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
              <th style={{ padding: "12px" }}>Student</th>
              <th style={{ padding: "12px" }}>Complaint</th>
              <th style={{ padding: "12px" }}>Category</th>
              <th style={{ padding: "12px" }}>Status</th>
              <th style={{ padding: "12px" }}>Update</th>
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
                <td style={{ padding: "12px" }}>
                  {c.studentEmail}
                </td>

                <td style={{ padding: "12px" }}>
                  {c.title}
                </td>

                <td style={{ padding: "12px" }}>
                  {c.category}
                </td>

                <td style={{ padding: "12px" }}>
                  {c.status}
                </td>

                <td style={{ padding: "12px" }}>
                  <select
                    value={c.status}
                    onChange={(e) =>
                      updateStatus(index, e.target.value)
                    }
                    style={{
                      padding: "8px",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                    }}
                  >
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Resolved</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;