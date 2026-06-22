import express from "express";
import Complaint from "../models/Complaint.js";

const router = express.Router();

// GET ALL COMPLAINTS
router.get("/", async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.json(complaints);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// CREATE COMPLAINT
router.post("/", async (req, res) => {
  try {
    const complaint = await Complaint.create(req.body);

    res.status(201).json(complaint);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// UPDATE COMPLAINT
router.put("/:id", async (req, res) => {
  try {
    const complaint =
      await Complaint.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json(complaint);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// DELETE COMPLAINT
router.delete("/:id", async (req, res) => {
  try {
    await Complaint.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Complaint Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;