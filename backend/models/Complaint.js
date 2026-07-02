import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["Pending", "In Progress", "Resolved"],
      default: "Pending",
    },

    priority: {
      type: String,
      enum: ["High", "Medium", "Low"],
      default: "Low",
    },

    // NEW
    remark: {
      type: String,
      default: "",
    },

    studentName: {
      type: String,
      required: true,
      trim: true,
    },

    studentEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Complaint",
  complaintSchema
);