import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminLogin from "./pages/AdminLogin";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Complaints from "./pages/Complaints";
import Chatbot from "./pages/Chatbot";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/adminlogin"
          element={<AdminLogin />}
        />

        <Route
          path="/student"
          element={<StudentDashboard />}
        />

        <Route
          path="/complaints"
          element={<Complaints />}
        />

        <Route
          path="/chatbot"
          element={<Chatbot />}
        />

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;