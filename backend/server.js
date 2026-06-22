import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import complaintRoutes from "./routes/complaintRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/test", (req, res) => {
  res.send("Test Route Working");
});

app.use("/api/complaints", complaintRoutes);

app.get("/", (req, res) => {
  res.send("CCMS Backend Running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});