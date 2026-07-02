import { useEffect, useState } from "react";
import axios from "axios";

function StudentDashboard() {

  const [complaints, setComplaints] = useState([]);

  const [selectedComplaint, setSelectedComplaint] =
    useState(null);

  const currentUser = JSON.parse(
    localStorage.getItem("loggedInUser")
  );

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/complaints"
      );

      const userComplaints = res.data.filter(
        (c) =>
          c.studentEmail === currentUser?.email
      );

      setComplaints(userComplaints);

    } catch (err) {

      console.log(err);

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

    if (status === "Resolved")
      return "#22c55e";

    if (status === "In Progress")
      return "#2563eb";

    return "#f59e0b";

  };

  const formatDate = (date) => {

    return new Date(date).toLocaleDateString();

  };

  const formatTime = (date) => {

    return new Date(date).toLocaleTimeString();

  };

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
          zIndex: 1000,
        }}
      >

        <div
          style={{
            width: "500px",
            background: "#fff",
            padding: "30px",
            borderRadius: "15px",
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
            <b>Title:</b>{" "}
            {selectedComplaint.title}
          </p>

          <p>
            <b>Category:</b>{" "}
            {selectedComplaint.category}
          </p>

          <p>
            <b>Status:</b>{" "}
            {selectedComplaint.status}
          </p>

          <p>
            <b>Student:</b>{" "}
            {selectedComplaint.studentName}
          </p>

          <p>
            <b>Email:</b>{" "}
            {selectedComplaint.studentEmail}
          </p>

          <p>
            <b>Date:</b>{" "}
            {formatDate(
              selectedComplaint.createdAt
            )}
          </p>

          <p>
            <b>Time:</b>{" "}
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
              marginTop: "20px",
              padding: "12px",
              background: "#2563eb",
              color: "white",
              border: "none",
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
      maxWidth: "1200px",
      margin: "30px auto",
      padding: "20px",
    }}
  >
    {/* Heading */}

    <div
      style={{
        textAlign: "center",
        marginBottom: "35px",
      }}
    >
      <h1
        style={{
          fontSize: "40px",
          color: "#0f172a",
        }}
      >
        Welcome, {currentUser?.name}
      </h1>

      <p
        style={{
          color: "#64748b",
        }}
      >
        Track and manage all your complaints
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

    {/* Table */}

    <div
      style={{
        background: "#fff",
        borderRadius: "15px",
        padding: "25px",
        boxShadow:
          "0 5px 15px rgba(0,0,0,.08)",
      }}
    >
      <h2
        style={{
          marginBottom: "20px",
          color: "#0f172a",
        }}
      >
        My Complaints
      </h2>

      {complaints.length === 0 ? (
        <p>No complaints found.</p>
      ) : (
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
              <th style={{ padding: "12px" }}>
                Title
              </th>

              <th style={{ padding: "12px" }}>
                Category
              </th>

              <th style={{ padding: "12px" }}>
                Date
              </th>

              <th style={{ padding: "12px" }}>
                Time
              </th>

              <th style={{ padding: "12px" }}>
                Status
              </th>

              <th style={{ padding: "12px" }}>
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {complaints.map((item) => (
              <tr
                key={item._id}
                style={{
                  textAlign: "center",
                  borderBottom:
                    "1px solid #ddd",
                }}
              >
                <td
                  style={{
                    padding: "12px",
                  }}
                >
                  {item.title}
                </td>

                <td
                  style={{
                    padding: "12px",
                  }}
                >
                  {item.category}
                </td>

                <td
                  style={{
                    padding: "12px",
                  }}
                >
                  {formatDate(
                    item.createdAt
                  )}
                </td>

                <td
                  style={{
                    padding: "12px",
                  }}
                >
                  {formatTime(
                    item.createdAt
                  )}
                </td>

                <td
                  style={{
                    padding: "12px",
                  }}
                >
                  <span
                    style={{
                      background:
                        getStatusColor(
                          item.status
                        ),
                      color: "white",
                      padding:
                        "6px 12px",
                      borderRadius:
                        "20px",
                      fontSize: "13px",
                    }}
                  >
                    {item.status}
                  </span>
                </td>

                <td
                  style={{
                    padding: "12px",
                  }}
                >
                  <button
                    onClick={() =>
                      setSelectedComplaint(
                        item
                      )
                    }
                    style={{
                      background:
                        "#2563eb",
                      color: "white",
                      border: "none",
                      padding:
                        "8px 15px",
                      borderRadius:
                        "6px",
                      cursor:
                        "pointer",
                    }}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
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
        color: "white",
        padding: "25px",
        borderRadius: "15px",
        textAlign: "center",
        boxShadow:
          "0 5px 15px rgba(0,0,0,.1)",
      }}
    >
      <h3>{title}</h3>

      <h1
        style={{
          fontSize: "42px",
        }}
      >
        {value}
      </h1>
    </div>
  );
}

}

export default StudentDashboard;