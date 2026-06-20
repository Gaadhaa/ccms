import { useState, useEffect } from "react";

function Complaints() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [complaints, setComplaints] = useState([]);

  const user =
    JSON.parse(localStorage.getItem("loggedInUser")) || {};

  useEffect(() => {
    const allComplaints =
      JSON.parse(localStorage.getItem("complaints")) || [];

    const myComplaints = allComplaints.filter(
      (c) => c.studentEmail === user.email
    );

    setComplaints(myComplaints);
  }, [user.email]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !category) {
      alert("Please fill all fields");
      return;
    }

    const newComplaint = {
      id: Date.now(),
      title,
      category,
      status: "Pending",
      studentName: user.name,
      studentEmail: user.email,
    };

    const existing =
      JSON.parse(localStorage.getItem("complaints")) || [];

    existing.push(newComplaint);

    localStorage.setItem(
      "complaints",
      JSON.stringify(existing)
    );

    setComplaints([
      ...complaints,
      newComplaint,
    ]);

    setTitle("");
    setCategory("");

    alert("Complaint Submitted Successfully");
  };

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "30px auto",
        padding: "20px",
      }}
    >
      {/* Form Card */}

      <div
        style={{
          background: "#ffffff",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          marginBottom: "30px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "25px",
            color: "#0f172a",
          }}
        >
          Submit Complaint
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Complaint Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            style={{
              width: "100%",
              padding: "14px",
              marginBottom: "15px",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              fontSize: "16px",
            }}
          />

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            style={{
              width: "100%",
              padding: "14px",
              marginBottom: "20px",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              fontSize: "16px",
            }}
          >
            <option value="">
              Select Category
            </option>

            <option value="Internet">
              Internet
            </option>

            <option value="Hostel">
              Hostel
            </option>

            <option value="Library">
              Library
            </option>

            <option value="Classroom">
              Classroom
            </option>

            <option value="Transport">
              Transport
            </option>

            <option value="Electrical">
              Electrical
            </option>
          </select>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Submit Complaint
          </button>
        </form>
      </div>

      {/* Complaints Table */}

      <div
        style={{
          background: "#ffffff",
          padding: "25px",
          borderRadius: "15px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
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
          <p>No complaints submitted yet.</p>
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
                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                  }}
                >
                  Title
                </th>

                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                  }}
                >
                  Category
                </th>

                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                  }}
                >
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {complaints.map((item) => (
                <tr
                  key={item.id}
                  style={{
                    borderBottom:
                      "1px solid #e5e7eb",
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
                    <span
                      style={{
                        background:
                          item.status ===
                          "Resolved"
                            ? "#22c55e"
                            : item.status ===
                              "In Progress"
                            ? "#3b82f6"
                            : "#f59e0b",
                        color: "white",
                        padding:
                          "6px 12px",
                        borderRadius:
                          "20px",
                        fontSize: "14px",
                      }}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Complaints;