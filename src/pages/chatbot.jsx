import { useState } from "react";

function Chatbot() {
  const currentUser = JSON.parse(
    localStorage.getItem("loggedInUser")
  );

  const [message, setMessage] = useState("");

  const [typing, setTyping] = useState(false);

  const [chat, setChat] = useState([
    {
      sender: "Bot",
      text:
        "👋 Welcome to CCMS Assistant!\n\nI can help you with:\n\n📶 Internet Issues\n💧 Water Problems\n🏠 Hostel\n🍽️ Canteen\n📚 Academics\n📋 Complaint Status\n\nClick a suggestion below or ask me anything!",
    },
  ]);

  const suggestions = [
    "WiFi Issue",
    "Water Problem",
    "Hostel",
    "Canteen",
    "Academics",
    "Complaint Status",
  ];

  const getBotReply = (msg) => {
    msg = msg.toLowerCase();

    if (
      msg.includes("hello") ||
      msg.includes("hi") ||
      msg.includes("hey")
    ) {
      return "👋 Hello " + (currentUser?.name || "") + "! How can I help you today?";
    }

    if (msg.includes("thanks")) {
      return "😊 You're welcome! Happy to help.";
    }

    if (msg.includes("bye")) {
      return "👋 Goodbye! Have a wonderful day.";
    }

    if (
      msg.includes("wifi") ||
      msg.includes("internet") ||
      msg.includes("network")
    ) {
      return "📶 Internet Issue\n\nIf your WiFi isn't working:\n\n• Restart your device\n• Check if others have the same issue\n• Submit an Internet complaint through CCMS.";
    }

    if (
      msg.includes("water") ||
      msg.includes("tap") ||
      msg.includes("pipe")
    ) {
      return "💧 Water Problems\n\nYou can report:\n\n• No water supply\n• Water leakage\n• Dirty water\n\nChoose 'Hostel' category while submitting the complaint.";
    }

    if (
      msg.includes("hostel") ||
      msg.includes("room")
    ) {
      return "🏠 Hostel Support\n\nYou can raise complaints regarding:\n\n• Cleaning\n• Electricity\n• Furniture\n• Water\n• Maintenance";
    }

    if (
      msg.includes("canteen") ||
      msg.includes("food") ||
      msg.includes("meal")
    ) {
      return "🍽️ Canteen Support\n\nYou can complain about:\n\n• Food quality\n• Hygiene\n• Delay in service\n• Pricing";
    }

    if (
      msg.includes("teacher") ||
      msg.includes("exam") ||
      msg.includes("class") ||
      msg.includes("academic")
    ) {
      return "📚 Academic Support\n\nAcademic complaints include:\n\n• Attendance\n• Internal marks\n• Timetable\n• Faculty issues";
    }

    if (
      msg.includes("submit") ||
      msg.includes("complaint")
    ) {
      return "📝 To submit a complaint:\n\n1. Open the Complaints page\n2. Fill in the title\n3. Select category\n4. Describe the issue\n5. Click Submit";
    }

    if (
      msg.includes("status") ||
      msg.includes("track")
    ) {
      return "📋 Complaint Status\n\n🟡 Pending\nComplaint received.\n\n🔵 In Progress\nComplaint is being handled.\n\n🟢 Resolved\nComplaint has been successfully solved.";
    }

    if (msg.includes("help")) {
      return "🤖 I can help you with:\n\n📶 WiFi\n💧 Water\n🏠 Hostel\n🍽️ Canteen\n📚 Academics\n📋 Complaint Status\n📝 Submit Complaint";
    }

    return "🤔 Sorry, I couldn't understand that.\n\nType 'help' to see what I can do.";
  };

  const sendMessage = (text = message) => {
    if (!text.trim()) return;

    const updatedChat = [
      ...chat,
      {
        sender: "You",
        text,
      },
    ];

    setChat(updatedChat);
    setMessage("");
    setTyping(true);

    setTimeout(() => {
      setTyping(false);

      setChat([
        ...updatedChat,
        {
          sender: "Bot",
          text: getBotReply(text),
        },
      ]);
    }, 900);
  };
  return (
  <div
    style={{
      maxWidth: "900px",
      margin: "30px auto",
      background: "#ffffff",
      borderRadius: "20px",
      overflow: "hidden",
      boxShadow: "0 10px 30px rgba(0,0,0,.15)",
    }}
  >
    {/* Header */}
    <div
      style={{
        background: "#0f172a",
        color: "white",
        padding: "18px 25px",
        display: "flex",
        alignItems: "center",
        gap: "15px",
      }}
    >
      <div
        style={{
          width: "55px",
          height: "55px",
          borderRadius: "50%",
          background: "#2563eb",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "28px",
        }}
      >
        🤖
      </div>

      <div>
        <h2 style={{ margin: 0 }}>
          CCMS AI Assistant
        </h2>

        <small style={{ color: "#cbd5e1" }}>
          Always online • Ask me anything
        </small>
      </div>
    </div>

    {/* Suggestions */}

    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        padding: "15px",
        background: "#f8fafc",
      }}
    >
      {suggestions.map((item) => (
        <button
          key={item}
          onClick={() => sendMessage(item)}
          style={{
            border: "none",
            background: "#2563eb",
            color: "white",
            padding: "10px 18px",
            borderRadius: "30px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          {item}
        </button>
      ))}
    </div>

    {/* Chat Area */}

    <div
      style={{
        height: "480px",
        overflowY: "auto",
        background: "#eef4ff",
        padding: "20px",
      }}
    >
      {chat.map((msg, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            justifyContent:
              msg.sender === "You"
                ? "flex-end"
                : "flex-start",
            marginBottom: "18px",
          }}
        >
          <div
            style={{
              maxWidth: "70%",
              background:
                msg.sender === "You"
                  ? "#2563eb"
                  : "#ffffff",
              color:
                msg.sender === "You"
                  ? "white"
                  : "#111827",
              padding: "14px 18px",
              borderRadius: "18px",
              whiteSpace: "pre-line",
              boxShadow:
                "0 2px 8px rgba(0,0,0,.12)",
            }}
          >
            <strong>
              {msg.sender === "You"
                ? "You"
                : "🤖 Assistant"}
            </strong>

            <br />

            {msg.text}
          </div>
        </div>
      ))}

      {typing && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "12px 18px",
              borderRadius: "18px",
              boxShadow:
                "0 2px 8px rgba(0,0,0,.12)",
            }}
          >
            🤖 CCMS Assistant is typing...
          </div>
        </div>
      )}
    </div>

    {/* Input */}

    <div
      style={{
        display: "flex",
        gap: "10px",
        padding: "20px",
        background: "#ffffff",
      }}
    >
      <input
        value={message}
        onChange={(e) =>
          setMessage(e.target.value)
        }
        onKeyDown={(e) => {
          if (e.key === "Enter")
            sendMessage();
        }}
        placeholder="Ask your question..."
        style={{
          flex: 1,
          padding: "15px",
          borderRadius: "12px",
          border: "1px solid #d1d5db",
          fontSize: "15px",
          outline: "none",
        }}
      />

      <button
        onClick={() => sendMessage()}
        style={{
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "12px",
          padding: "15px 28px",
          cursor: "pointer",
          fontWeight: "700",
          fontSize: "16px",
        }}
      >
        Send 🚀
      </button>
    </div>
  </div>
);

}

export default Chatbot;