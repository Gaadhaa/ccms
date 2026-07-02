import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {

  const [complaints, setComplaints] = useState([]);

  const [selectedComplaint, setSelectedComplaint] =
    useState(null);

  useEffect(() => {
    fetchComplaints();
  }, []);

  // Fetch all complaints

  const fetchComplaints = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/complaints"
      );

      setComplaints(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  // Update Status

  const updateStatus = async (id, status) => {

    try {

      await axios.put(
        `http://localhost:5000/api/complaints/${id}`,
        {
          status,
        }
      );

      fetchComplaints();

    } catch (err) {

      console.log(err);

      alert("Status Update Failed");

    }

  };

  // Dashboard Counts

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

  // Badge Color

  const getStatusColor = (status) => {

    if (status === "Resolved")
      return "#22c55e";

    if (status === "In Progress")
      return "#2563eb";

    return "#f59e0b";

  };

  // Date

  const formatDate = (date) => {

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );

  };

  // Time

  const formatTime = (date) => {

    return new Date(date).toLocaleTimeString(
      "en-IN"
    );

  };

  // Popup

  const ComplaintModal = () => {

    if (!selectedComplaint) return null;

    return (

      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,.45)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 999,
        }}
      >

        <div
          style={{
            width: "520px",
            background: "#fff",
            borderRadius: "15px",
            padding: "30px",
            boxShadow:
              "0 10px 25px rgba(0,0,0,.2)",
          }}
        >

          <h2
            style={{
              color: "#2563eb",
              marginBottom: "20px",
            }}
          >
            Complaint Details
          </h2>

          <p>
            <b>Student :</b>{" "}
            {selectedComplaint.studentName}
          </p>

          <p>
            <b>Email :</b>{" "}
            {selectedComplaint.studentEmail}
          </p>

          <p>
            <b>Title :</b>{" "}
            {selectedComplaint.title}
          </p>

          <p>
            <b>Category :</b>{" "}
            {selectedComplaint.category}
          </p>

          <p>
            <b>Status :</b>{" "}
            {selectedComplaint.status}
          </p>

          <p>
            <b>Date :</b>{" "}
            {formatDate(
              selectedComplaint.createdAt
            )}
          </p>

          <p>
            <b>Time :</b>{" "}
            {formatTime(
              selectedComplaint.createdAt
            )}
          </p>

          <button
            onClick={() =>
              setSelectedComplaint(null)
            }
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "20px",
              border: "none",
              background: "#2563eb",
              color: "#fff",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Close
          </button>

        </div>

      </div>

    );

  };
  return (
  <div
    style={{
      maxWidth: "1300px",
      margin: "30px auto",
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
        }}
      >
        Admin Dashboard
      </h1>

      <p
        style={{
          color: "#64748b",
        }}
      >
        Manage Student Complaints
      </p>
    </div>

    {/* Cards */}

    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit,minmax(220px,1fr))",
        gap: "20px",
        marginBottom: "35px",
      }}
    >
      <Card title="Total" value={total} color="#2563eb" />
      <Card title="Pending" value={pending} color="#f59e0b" />
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
        padding: "25px",
        boxShadow: "0 5px 15px rgba(0,0,0,.08)",
      }}
    >
      <h2
        style={{
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

            <th style={{ padding: "12px" }}>Date</th>

            <th style={{ padding: "12px" }}>Time</th>

            <th style={{ padding: "12px" }}>Status</th>

            <th style={{ padding: "12px" }}>Action</th>
          </tr>
        </thead>

        <tbody>
          {complaints.map((item) => (
            <tr
              key={item._id}
              style={{
                borderBottom: "1px solid #e5e7eb",
                textAlign: "center",
              }}
            >
              <td style={{ padding: "12px" }}>
                {item.studentName}
              </td>

              <td style={{ padding: "12px" }}>
                {item.title}
              </td>

              <td style={{ padding: "12px" }}>
                {item.category}
              </td>

              <td style={{ padding: "12px" }}>
                {formatDate(item.createdAt)}
              </td>

              <td style={{ padding: "12px" }}>
                {formatTime(item.createdAt)}
              </td>

              <td style={{ padding: "12px" }}>
                <span
                  style={{
                    background: getStatusColor(
                      item.status
                    ),
                    color: "#fff",
                    padding: "6px 12px",
                    borderRadius: "20px",
                    fontSize: "13px",
                  }}
                >
                  {item.status}
                </span>
              </td>

              <td style={{ padding: "12px" }}>
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <button
                    onClick={() =>
                      setSelectedComplaint(item)
                    }
                    style={{
                      background: "#2563eb",
                      color: "#fff",
                      border: "none",
                      padding: "8px 14px",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    View
                  </button>

                  <select
                    value={item.status}
                    onChange={(e) =>
                      updateStatus(
                        item._id,
                        e.target.value
                      )
                    }
                    style={{
                      padding: "8px",
                      borderRadius: "6px",
                    }}
                  >
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Resolved</option>
                  </select>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <ComplaintModal />
  </div>
);

// Card Component

function Card({
  title,
  value,
  color,
}) {
  return (
    <div
      style={{
        background: color,
        color: "#fff",
        borderRadius: "15px",
        padding: "25px",
        textAlign: "center",
        boxShadow:
          "0 5px 15px rgba(0,0,0,.1)",
      }}
    >
      <h3>{title}</h3>

      <h1
        style={{
          fontSize: "42px",
          marginTop: "10px",
        }}
      >
        {value}
      </h1>
    </div>
  );
}

}

export default AdminDashboard;