import { useState } from "react";

function Chatbot() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const getBotReply = (msg) => {
    msg = msg.toLowerCase();

    if (msg.includes("submit complaint"))
      return "Go to the Complaints page and fill out the complaint form.";

    if (msg.includes("status"))
      return "You can track complaint status in the Dashboard or Complaints page.";

    if (msg.includes("admin"))
      return "Admin can view and update complaints through the Admin Dashboard.";

    if (msg.includes("hello") || msg.includes("hi"))
      return "Hello! How can I help you today?";

    return "Sorry, I don't understand. Please try another question.";
  };

  const sendMessage = () => {
    if (!message.trim()) return;

    const userMsg = {
      sender: "You",
      text: message,
    };

    const botMsg = {
      sender: "Bot",
      text: getBotReply(message),
    };

    setChat([...chat, userMsg, botMsg]);
    setMessage("");
  };

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "30px auto",
        background: "#fff",
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>
        CCMS Assistant
      </h2>

      <div
        style={{
          height: "350px",
          overflowY: "auto",
          border: "1px solid #ddd",
          padding: "15px",
          borderRadius: "10px",
          marginBottom: "15px",
        }}
      >
        {chat.map((msg, index) => (
          <p key={index}>
            <strong>{msg.sender}: </strong>
            {msg.text}
          </p>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          gap: "10px",
        }}
      >
        <input
          type="text"
          placeholder="Ask something..."
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <button
          onClick={sendMessage}
          style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "12px 20px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chatbot;