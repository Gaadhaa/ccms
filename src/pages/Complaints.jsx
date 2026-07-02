import { useState, useEffect } from "react";
import axios from "axios";

function Complaints() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");

  const [complaints, setComplaints] = useState([]);

  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const user =
    JSON.parse(localStorage.getItem("loggedInUser")) || {};

  // Fetch Complaints

  const fetchComplaints = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/complaints"
      );

      const myComplaints = res.data.filter(
        (c) => c.studentEmail === user.email
      );

      setComplaints(myComplaints);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  // Submit Complaint

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !category) {
      alert("Please fill all fields.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/complaints",
        {
          title,
          category,
          status: "Pending",
          studentName: user.name,
          studentEmail: user.email,
        }
      );

      alert("Complaint Submitted Successfully");

      setTitle("");
      setCategory("");

      fetchComplaints();
    } catch (err) {
      console.log(err);
      alert("Failed to submit complaint.");
    }
  };

  // Delete Complaint

  const deleteComplaint = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this complaint?"
    );

    if (!confirmDelete) return;

    try {

      await axios.delete(
        `http://localhost:5000/api/complaints/${id}`
      );

      alert("Complaint Deleted Successfully");

      fetchComplaints();

    } catch (err) {

      console.log(err);

      alert("Delete Failed");

    }

  };

  // Status Badge

  const getStatusColor = (status) => {

    if (status === "Resolved")
      return "#22c55e";

    if (status === "In Progress")
      return "#2563eb";

    return "#f59e0b";

  };

  // Date

  const formatDate = (date) => {

    return new Date(date).toLocaleDateString();

  };

  // Time

  const formatTime = (date) => {

    return new Date(date).toLocaleTimeString();

  };

  // View Details Popup

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
            width: "500px",
            background: "#fff",
            padding: "30px",
            borderRadius: "15px",
            boxShadow: "0 10px 25px rgba(0,0,0,.2)",
          }}
        >

          <h2
            style={{
              marginBottom: "20px",
              color: "#2563eb",
            }}
          >
            Complaint Details
          </h2>

          <p><b>Title:</b> {selectedComplaint.title}</p>

          <p><b>Category:</b> {selectedComplaint.category}</p>

          <p><b>Status:</b> {selectedComplaint.status}</p>

          <p><b>Student:</b> {selectedComplaint.studentName}</p>

          <p><b>Email:</b> {selectedComplaint.studentEmail}</p>

          <p>
            <b>Date:</b>{" "}
            {formatDate(selectedComplaint.createdAt)}
          </p>

          <p>
            <b>Time:</b>{" "}
            {formatTime(selectedComplaint.createdAt)}
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
    {/* Submit Complaint */}

    <div
      style={{
        background: "#fff",
        padding: "30px",
        borderRadius: "15px",
        boxShadow: "0 5px 15px rgba(0,0,0,.1)",
        marginBottom: "30px",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: "#2563eb",
          marginBottom: "25px",
        }}
      >
        Submit Complaint
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Complaint Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "14px",
            marginBottom: "15px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "14px",
            marginBottom: "20px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        >
          <option value="">Select Category</option>
          <option>Internet</option>
          <option>Hostel</option>
          <option>Library</option>
          <option>Classroom</option>
          <option>Transport</option>
          <option>Electrical</option>
        </select>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "14px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Submit Complaint
        </button>
      </form>
    </div>

    {/* Complaint Table */}

    <div
      style={{
        background: "#fff",
        padding: "25px",
        borderRadius: "15px",
        boxShadow: "0 5px 15px rgba(0,0,0,.1)",
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
              <th style={{ padding: "12px" }}>Title</th>
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
                  textAlign: "center",
                  borderBottom: "1px solid #ddd",
                }}
              >
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
                      color: "white",
                      padding: "6px 12px",
                      borderRadius: "20px",
                      fontSize: "13px",
                    }}
                  >
                    {item.status}
                  </span>
                </td>

                <td
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "8px",
                    padding: "12px",
                  }}
                >
                  <button
                    onClick={() =>
                      setSelectedComplaint(item)
                    }
                    style={{
                      background: "#2563eb",
                      color: "white",
                      border: "none",
                      padding: "8px 14px",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    View
                  </button>

                  {item.status === "Pending" && (
                    <button
                      onClick={() =>
                        deleteComplaint(item._id)
                      }
                      style={{
                        background: "#ef4444",
                        color: "white",
                        border: "none",
                        padding: "8px 14px",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  )}
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

}

export default Complaints;